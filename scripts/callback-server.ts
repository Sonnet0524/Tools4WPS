#!/usr/bin/env bun
/**
 * 简单的回调服务器，用于接收授权code
 * 
 * 使用方法:
 * bun run scripts/callback-server.ts
 * 
 * 然后访问授权URL，授权后会自动显示code
 */

const PORT = 3000;

const server = Bun.serve({
  port: PORT,
  fetch(req) {
    const url = new URL(req.url);
    
    if (url.pathname === "/callback") {
      const code = url.searchParams.get("code");
      const state = url.searchParams.get("state");
      const error = url.searchParams.get("error");
      
      if (error) {
        return new Response(`
<!DOCTYPE html>
<html>
<head>
  <title>授权失败</title>
  <style>
    body { font-family: Arial, sans-serif; max-width: 600px; margin: 50px auto; padding: 20px; }
    .error { background: #fee; color: #c33; padding: 20px; border-radius: 8px; }
  </style>
</head>
<body>
  <div class="error">
    <h1>❌ 授权失败</h1>
    <p>错误: ${error}</p>
  </div>
</body>
</html>
        `, {
          headers: { "Content-Type": "text/html" },
        });
      }
      
      if (code) {
        console.log("\n" + "=".repeat(70));
        console.log("🎉 收到授权Code!");
        console.log("=".repeat(70));
        console.log(`\nCode: ${code}`);
        console.log(`State: ${state}`);
        console.log("\n下一步:");
        console.log(`  bun run scripts/test-user-auth.ts exchange "${code}"`);
        console.log("=".repeat(70) + "\n");
        
        return new Response(`
<!DOCTYPE html>
<html>
<head>
  <title>授权成功</title>
  <style>
    body { font-family: Arial, sans-serif; max-width: 600px; margin: 50px auto; padding: 20px; }
    .success { background: #efe; color: #3c3; padding: 20px; border-radius: 8px; }
    .code { background: #f5f5f5; padding: 15px; border-radius: 5px; font-family: monospace; margin: 10px 0; }
    .next { background: #e3f2fd; padding: 15px; border-radius: 5px; margin-top: 20px; }
  </style>
</head>
<body>
  <div class="success">
    <h1>✅ 授权成功!</h1>
    <p>授权码已生成，请查看终端或复制下方命令继续。</p>
  </div>
  
  <h3>授权码:</h3>
  <div class="code">${code}</div>
  
  <div class="next">
    <h3>下一步:</h3>
    <p>在终端运行以下命令换取Access Token:</p>
    <div class="code">bun run scripts/test-user-auth.ts exchange "${code}"</div>
  </div>
</body>
</html>
        `, {
          headers: { "Content-Type": "text/html" },
        });
      }
    }
    
    return new Response("回调服务器运行中...\n\n请访问授权URL进行授权。", {
      headers: { "Content-Type": "text/plain" },
    });
  },
});

console.log("=".repeat(70));
console.log("🚀 回调服务器已启动");
console.log("=".repeat(70));
console.log(`\n回调地址: http://localhost:${PORT}/callback`);
console.log("\n现在可以:");
console.log("1. 运行: bun run scripts/test-user-auth.ts generate");
console.log("2. 复制生成的URL到浏览器");
console.log("3. 登录并授权");
console.log("4. 授权后会自动跳转到此服务器并显示code");
console.log("\n按 Ctrl+C 停止服务器");
console.log("=".repeat(70));
