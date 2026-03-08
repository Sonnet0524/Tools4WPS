---
title: Event Security Check
breadcrumb: WPS365应用开发 > 事件订阅 > 事件安全校验
source: raw_md/app-integration-dev/wps365/server/event-subscription/security-verification.md
---

# 事件安全校验

WPS 开放平台推送的事件消息，均会经过加密。
应用接收到 WPS 开放平台推送的消息后，需根据消息体的签名 `signature` 判断该消息的可靠性，再通过提供的解密算法，对 `encrypted_data` 解密，得到消息内容。<br/>
应用方接收到消息后，向 WPS 开放平台返回 `200` 状态码，即表示消息接收成功。<br/>

## 事件体说明

应用接收到的加密消息体参数如下：

| **名称**       | **参数类型** | **是否必带** | **说明**                         |
| :------------- | :----------- | :----------- | :------------------------------- |
| topic          | string       | 是           | 消息主题（根据不同事件而定）     |
| operation      | string       | 是           | 消息变更动作（根据不同事件而定） |
| time           | integer      | 是           | 时间（秒为单位的时间戳）         |
| nonce          | string       | 是           | iv 向量（解密时使用）            |
| signature      | string       | 是           | 消息签名                         |
| encrypted_data | string       | 是           | 消息变更的加密字段               |

> **计算签名：**

1、计算签名原文 `content` 内容，使用应用 APPID 作为 `access_key` ，和其它参数拼接。编码内容：`access_key:topic:nonce:time:encrypted_data` （**注意：** 字段使用 `:` 分隔）
2、`signature` 为消息的签名，使用 `content` 作为原文， HMAC-SHA256 作为哈希算法，应用 APPKEY 作为密钥 `sercet_key` 进行计算
3、注：签名经过 HMAC-SHA256 计算后，需要使用 **URL 安全的无填充 base64 编码**（长度不是 4 的倍数时不会填充 `=`）<br/>

> **解密数据：**

1、加密字段 `encrypted_data` 使用**标准的有填充 base64 编码**（长度不是 4 的倍数时填充 `=`），解密前需要先进行 base64 解码 
2、数据通过 AES-CBC 进行加密，获取解密的消息体数据，需要使用加密字段 `encrypted_data`、密钥 `cipher` 和 iv 向量 `nonce` 

- `encrypted_data` 为 base64 解码后的数据（**注意：** 使用标准的有填充 base64）
- `cipher` 为 md5 编码后的 secretKey
- `nonce` 即 iv 向量
- 解密后的数据经过 PKCS7 填充，解密后需要将尾部填充内容删除

## Golang 代码示例

### 解密算法

```go
package main

import (
    "bytes"
    "crypto/aes"
    "crypto/cipher"
    "crypto/hmac"
    "crypto/md5"
    "crypto/sha256"
    "encoding/base64"
    "encoding/hex"
    "errors"
)

func Encrypt(rawData []byte, cipher, nonce string) (string, error) {
    data, err := AESCBCEncrypt(rawData, []byte(cipher), []byte(nonce))
    if err != nil {
        return "", err
    }

    return base64.StdEncoding.EncodeToString(data), nil
}

func Decrypt(encryptedData, cipher, nonce string) (string, error) {
    data, err := base64.StdEncoding.DecodeString(encryptedData)
    if err != nil {
        return "", err
    }
    rawData, err := AESCBCPKCS7Decrypt(data, []byte(cipher), []byte(nonce))
    if err != nil {
        return "", err
    }

    return string(rawData), nil
}

func AESCBCEncrypt(rawData, key, nonce []byte) ([]byte, error) {
    block, err := aes.NewCipher(key)
    if err != nil {
        return nil, err
    }

    blockSize := block.BlockSize()
    rawData = PKCS7Padding(rawData, blockSize)
    cipherText := make([]byte, len(rawData))

    iv := nonce[:blockSize]
    mode := cipher.NewCBCEncrypter(block, iv)
    mode.CryptBlocks(cipherText, rawData)

    return cipherText, nil
}

func AESCBCPKCS7Decrypt(encryptData, key, nonce []byte) ([]byte, error) {
    block, err := aes.NewCipher(key)
    if err != nil {
        panic(err)
    }

    blockSize := block.BlockSize()
    if len(encryptData) < blockSize {
        return nil, errors.New("cipher text too short")
    }
    if len(encryptData)%blockSize != 0 {
        return nil, errors.New("cipher text is not a multiple of the block size")
    }

    iv := nonce[:blockSize]
    mode := cipher.NewCBCDecrypter(block, iv)
    mode.CryptBlocks(encryptData, encryptData)

    encryptData = PKCS7UnPadding(encryptData)
    return encryptData, nil
}

func PKCS7Padding(cipherText []byte, blockSize int) []byte {
    padding := blockSize - len(cipherText)%blockSize
    paddingText := bytes.Repeat([]byte{byte(padding)}, padding)
    return append(cipherText, paddingText...)
}

func PKCS7UnPadding(origData []byte) []byte {
    length := len(origData)
    unPadding := int(origData[length-1])
    return origData[:(length - unPadding)]
}

func Md5(s string) string {
    h := md5.New()
    h.Write([]byte(s))
    return hex.EncodeToString(h.Sum(nil))
}

func HmacSha256(message string, secret string) string {
    key := []byte(secret)
    h := hmac.New(sha256.New, key)
    h.Write([]byte(message))
    return base64.RawURLEncoding.EncodeToString(h.Sum(nil))
}
```

### 接收示例

```go
package main

import (
    "encoding/json"
    "github.com/gin-gonic/gin"
    "net/http"
    "strconv"
)

const (
    accessKey = "xxx"
    secretKey = "xxx"
)

// Event 收到的消息体
type Event struct {
    Topic         string `json:"topic"`
    Operation     string `json:"operation"`
    Time          int64  `json:"time"`
    Nonce         string `json:"nonce"`
    Signature     string `json:"signature"`
    EncryptedData string `json:"encrypted_data"`
}

// EventData 解密后的消息体
type EventData struct {
    AppId     string `json:"app_id"`
    AppTicket string `json:"app_ticket"`
}

func main() {
    router := gin.Default()

    router.POST("/open/receive", func(c *gin.Context) {
        event := &Event{}
        if err := c.ShouldBindJSON(event); err != nil {
            c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
            return
        }

        // (1) 验证签名
        content := fmt.Sprintf("%s:%s:%s:%d:%s", accessKey, event.Topic, event.Nonce, event.Time, event.EncryptedData)
        signature := HmacSha256(content, secretKey)
        if signature != event.Signature {
            c.JSON(http.StatusBadRequest, gin.H{"error": "signature check failed"})
            return
        }

        // (2) 解密数据
        cipher := Md5(secretKey)
        decryptedData, err := Decrypt(event.EncryptedData, cipher, event.Nonce)
        if err != nil {
            c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
            return
        }

        data := &EventData{}
        err = json.Unmarshal([]byte(decryptedData), data)
        if err != nil {
            c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
            return
        }

        // TODO 处理业务逻辑
        // service.DoSomething(data)

        c.JSON(http.StatusBadRequest, gin.H{"code": 0})
    })

    _ = router.Run()
}

```

## Java 代码示例

### 解密算法

```java
import javax.crypto.Cipher;
import javax.crypto.Mac;
import javax.crypto.spec.IvParameterSpec;
import javax.crypto.spec.SecretKeySpec;
import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.util.Base64;

public class KsoEventUtil {

    public static String getSignature(String data, String secret) throws Exception {
        Mac mac = Mac.getInstance("HmacSHA256");
        SecretKeySpec secret_key = new SecretKeySpec(secret.getBytes(StandardCharsets.UTF_8), "HmacSHA256");
        mac.init(secret_key);
        byte[] bytes = mac.doFinal(data.getBytes(StandardCharsets.UTF_8));

        return Base64.getUrlEncoder().withoutPadding().encodeToString(bytes);
    }

    public static String decrypt(String encryptedData, String cipher, String nonce) throws Exception {
        byte[] data = Base64.getDecoder().decode(encryptedData);

        byte[] rawData = AESCBCPKCS7Decrypt(
                data,
                cipher.getBytes(StandardCharsets.UTF_8),
                nonce.getBytes(StandardCharsets.UTF_8)
        );
        return new String(rawData);
    }

    private static byte[] AESCBCPKCS7Decrypt(byte[] encryptedData, byte[] key, byte[] nonce) throws Exception {
        SecretKeySpec secretKey = new SecretKeySpec(key, "AES");

        IvParameterSpec ivParameterSpec = new IvParameterSpec(nonce);
        Cipher cipher = Cipher.getInstance("AES/CBC/PKCS5Padding");
        cipher.init(Cipher.DECRYPT_MODE, secretKey, ivParameterSpec);

        return cipher.doFinal(encryptedData);
    }

    public static String md5(String s) throws Exception {
        MessageDigest md = MessageDigest.getInstance("MD5");
        byte[] digest = md.digest(s.getBytes(StandardCharsets.UTF_8));
        StringBuilder sb = new StringBuilder();
        for (byte b : digest) {
            sb.append(String.format("%02x", b));
        }
        return sb.toString();
    }
}
```

### 接收示例

```java
@Data
public class Event {
    private String topic;
    private String operation;
    private Integer time;
    private String nonce;
    private String signature;
    private String encrypted_data;
}

//

public class Main {

    private static final String ACCESS_KEY = "xxx";
    private static final String SECRET_KEY = "xxx";

    public static void main(String[] args) {
        // 模拟接收数据
        Event event = new Event();
        event.setTopic("kso.test");
        event.setOperation("update");
        event.setTime(1704074400);
        event.setNonce("aae******3bb2a6");
        event.setSignature("zbwP0rFm7T******CMbNQIHuX-UU");
        event.setEncryptedData("79Nsnsdq******fK2lZZFMQ==");

        // (1) 验证签名
        String content = String.format("%s:%s:%s:%d:%s", ACCESS_KEY, event.getTopic(), event.getNonce(), event.getTime(), event.getEncryptedData());
        String signature = "";
        try {
            signature = KsoEventUtil.getSignature(content, SECRET_KEY);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }

        if (!event.getSignature().equals(signature)) {
            throw new RuntimeException("signature check failed");
        }

        // (2) 解密数据
        String eventData = "";
        try {
            String cipher = KsoEventUtil.md5(SECRET_KEY);
            eventData = KsoEventUtil.decrypt(event.getEncryptedData(), cipher, event.getNonce());
        } catch (Exception e) {
            throw new RuntimeException(e);
        }

        // TODO 处理业务逻辑
        System.out.Println(eventData);
    }
}
```

## Python 代码示例

需要依赖库：`pip install pycryptodome`

### 解密算法

```python
def get_signature(message: str, secret_key: str) -> str:
    message = message.encode('utf-8')
    secret_key = secret_key.encode('utf-8')

    signature = base64.urlsafe_b64encode(hmac.new(secret_key, message, digestmod=hashlib.sha256).digest())
    return signature.decode('utf-8').rstrip('=')


def decrypt(encrypted_data: str, cipher: str, nonce: str) -> str:
    encrypted_data = encrypted_data.encode('utf-8')
    cipher = cipher.encode('utf-8')
    nonce = nonce.encode('utf-8')

    encrypted_data = base64.decodebytes(encrypted_data)
    block = AES.new(cipher, AES.MODE_CBC, nonce)
    raw_data = unpad(block.decrypt(encrypted_data), AES.block_size)
    return raw_data.decode()
```

### 接收示例

```python
ACCESS_KEY = 'xxx'
SECRET_KEY = 'xxx'


if __name__ == '__main__':
    def test():
        # 模拟接收数据
        data = {
            'topic': 'kso.test',
            'operation': 'update',
            'time': 1704074400,
            'nonce': 'aae******3bb2a6',
            'signature': 'zbwP0rFm7T******CMbNQIHuX-UU',
            'encrypted_data': '79Nsnsdq******fK2lZZFMQ==',
        }

        # (1) 验证签名
        content = '{}:{}:{}:{}:{}'.format(ACCESS_KEY, data['topic'], data['nonce'], str(data['time']), data['encrypted_data'])
        signature = get_signature(content, SECRET_KEY)
        if signature != data['signature']:
            raise Exception('signature check failed')

        # (2) 解密数据
        cipher = hashlib.md5(SECRET_KEY.encode('utf-8')).hexdigest()
        event_data = decrypt(data['encrypted_data'], cipher, data['nonce'])

        # TODO 处理业务逻辑
        print('decrypted_data: ' + event_data)


    test()
```
