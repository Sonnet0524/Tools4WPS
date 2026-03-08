import { MessageTool } from "../src/tools/message";

async function main() {
  const messageTool = new MessageTool({
    appId: "AK20260308LGOUTU",
    appKey: "743c057b97227a473d404c1eb7fcebda",
  });

  try {
    console.log("=== 获取会话列表 ===");
    const chats = await messageTool.getChats({ pageSize: 10 });
    console.log(`找到 ${chats.items.length} 个会话`);
    
    if (chats.items.length > 0) {
      const chat = chats.items[0];
      console.log("第一个会话:", {
        id: chat.id,
        name: chat.name,
        type: chat.type,
        status: chat.status,
      });

      console.log("\n=== 获取会话详情 ===");
      const chatDetail = await messageTool.getChat(chat.id);
      console.log("会话详情:", chatDetail);
    }

    console.log("\n=== 发送消息示例 ===");
    console.log("注意：以下示例需要有效的 userId 和 chatId");
    console.log("发送消息给用户: messageTool.sendToUser({ userId: '...', content: '...' })");
    console.log("发送消息到会话: messageTool.sendToChat({ chatId: '...', content: '...' })");

  } catch (error) {
    console.error("错误:", error);
  }
}

main();
