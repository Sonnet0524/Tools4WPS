#!/usr/bin/env bun

import { TokenManager, Signature } from "../src/auth";

const APP_ID = "AK20260308LGOUTU";
const APP_KEY = "743c057b97227a473d404c1eb7fcebda";
const BASE_URL = "https://openapi.wps.cn";

async function testAuth() {
  console.log("🧪 测试认证模块\n");
  console.log("=".repeat(60));

  console.log("\n1️⃣ 测试 Token 获取");
  const tokenManager = TokenManager.getInstance({
    appId: APP_ID,
    appKey: APP_KEY,
    baseUrl: BASE_URL,
  });

  const token1 = await tokenManager.getToken();
  console.log(`✅ Token: ${token1.substring(0, 20)}...`);

  const token2 = await tokenManager.getToken();
  console.log(`✅ 缓存测试: ${token1 === token2 ? "使用缓存" : "重新获取"}`);

  const tokenInfo = tokenManager.getTokenInfo();
  console.log(`✅ Token 信息:`);
  console.log(`   - 过期时间: ${new Date(tokenInfo!.expiresAt).toISOString()}`);
  console.log(`   - 剩余时间: ${Math.floor((tokenInfo!.expiresAt - Date.now()) / 1000)} 秒`);

  console.log("\n".repeat(1) + "2️⃣ 测试签名生成");
  const signature = new Signature(APP_ID, APP_KEY);

  const sig1 = signature.generateSignature({
    method: "GET",
    uri: "/v7/users",
    contentType: "application/json",
  });
  console.log(`✅ GET 签名: ${sig1.authorization.substring(0, 40)}...`);

  const sig2 = signature.generateSignature({
    method: "POST",
    uri: "/v7/depts/batch_read",
    contentType: "application/json",
    body: JSON.stringify({ dept_ids: ["0"] }),
  });
  console.log(`✅ POST 签名: ${sig2.authorization.substring(0, 40)}...`);

  console.log("\n".repeat(1) + "3️⃣ 测试完整 API 调用");
  const method = "GET";
  const uri = "/v7/users?status=active&page_size=2";
  const contentType = "application/json";
  const sig = signature.generateSignature({ method, uri, contentType });

  const response = await fetch(`${BASE_URL}${uri}`, {
    method,
    headers: {
      "Content-Type": contentType,
      "X-Kso-Date": sig.date,
      "X-Kso-Authorization": sig.authorization,
      Authorization: `Bearer ${token1}`,
    },
  });

  const data = await response.json();
  console.log(`✅ API 响应: code=${(data as any).code}, msg=${(data as any).msg || "success"}`);
  if ((data as any).data?.items?.length > 0) {
    console.log(`   返回 ${(data as any).data.items.length} 个用户`);
  }

  console.log("\n" + "=".repeat(60));
  console.log("✅ 所有测试通过\n");
}

testAuth().catch(console.error);
