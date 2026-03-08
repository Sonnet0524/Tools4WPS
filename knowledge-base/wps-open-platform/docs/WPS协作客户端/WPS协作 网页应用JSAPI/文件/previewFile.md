# previewFile

## 描述
预览文件。  
> 网页应用需要完成[鉴权](/app-integration-dev/wps365/client/web-jsapi/jsapiAuth)后调用该接口。  

## 支持说明
| 客户端平台 | WPS协作版本要求 | 
|------------|----------|
| iOS | &gt;&#x3D;2.0.0 |
| Android | &gt;&#x3D;2.0.0 |


## 输入
| 名称 | 数据类型 | 是否必填 | 描述 |
|------|----------|----------|------|
| params |` object `| 是 |  |
  | ∟ filePath | `string` | 是 | 需要预览的文件的本地路径<br>注意：仅移动端支持<br>该url来源于其他jsapi返回的路径。如通过chooseFile得到文件路径 "ksoxz://temp/e1f7c67d89ef4da69337ce35e66e2e04" |
| ∟ fileType | `string` | 是 | 文件类型<br>可选值：doc、docx、xls、xlsx、ppt、pptx、pdf、txt、pps、dot、xla、xlt、jpg、png、gif、webp、heif、jpeg<br>注意：5.26版本后支持eml、msg格式的本地预览 |
| ∟ openMode | `string` | 否 | 打开文件方式<br>可选值：<br>• local：应用内预览<br>• external：使用其他应用打开<br>默认值为local<br>注意：文件类型fileType参数包含在可选值范围内local才生效，其他类型文件通过系统面板选择其他应用打开 |
| ∟ showMenu | `boolean` | 否 | 是否显示右上角【更多】菜单<br>默认为true，点击【更多】，显示 选择其他应用-打开文件的弹窗 |
## 输出
- 无返回值
## 示例代码
```ts
const params = {
  filePath: 'ksoxz://temp/e1f7c67d89ef4da69337ce35e66e2e04'
}
window.ksoxz_sdk.previewFile({params,onSuccess,onError})
```
     

## 错误码

| errno   | msg                       | 含义               |
| ------- | ------------------------- | ------------------ |
| 1042001 | No such file or directory | 找不到文件或目录。 |

除以上错误外，还可能存在公共错误，参考：[公共错误码](/app-integration-dev/wps365/client/web-jsapi/publicError)
