#!/usr/bin/env bun
/**
 * WPS API 完整连接测试
 * 
 * 测试流程：
 * 1. 获取 tenant_access_token
 * 2. 生成 KSO-1 签名
 * 3. 调用通讯录 API
 */

import { createHmac, createHash } from "crypto";

const APP_ID = "AK20260308LGOUTU";
const APP_KEY = "743c057b97227a473d404c1eb7fcebda";
const BASE_URL = "https://openapi.wps.cn";

// ========== Token 相关 ==========

interface TokenResponse {
  access_token: string;
  expires_in: number;
  token_type: string;
}

async function getTenantAccessToken(): Promise<string> {
  console.log("📝 获取 tenant_access_token...");
  
  const response = await fetch(`${BASE_URL}/oauth2/token`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: `grant_type=client_credentials&client_id=${APP_ID}&client_secret=${APP_KEY}`,
  });

  const data = (await response.json()) as TokenResponse;
  
  if (!data.access_token) {
    throw new Error(`获取 token 失败: ${JSON.stringify(data)}`);
  }

  console.log(`✅ Token 获取成功，有效期: ${data.expires_in} 秒\n`);
  return data.access_token;
}

// ========== 签名相关 ==========

function generateSignature(
  method: string,
  uri: string,
  contentType: string,
  requestBody: string = ""
): { date: string; authorization: string } {
  const date = new Date().toUTCString();
  
  // 计算 SHA256
  const sha256Hex = requestBody 
    ? createHash("sha256").update(requestBody).digest("hex") 
    : "";

  // 计算签名
  const dataToSign = "KSO-1" + method + uri + contentType + date + sha256Hex;
  const signature = createHmac("sha256", APP_KEY).update(dataToSign).digest("hex");
  const authorization = `KSO-1 ${APP_ID}:${signature}`;

  return { date, authorization };
}

// ========== API 调用 ==========

interface ApiResult {
  success: boolean;
  code?: number;
  msg?: string;
  data?: unknown;
  raw?: string;
}

async function callApi(
  token: string,
  method: string,
  uri: string,
  body?: object
): Promise<ApiResult> {
  const contentType = "application/json";
  const requestBody = body ? JSON.stringify(body) : "";
  const { date, authorization } = generateSignature(method, uri, contentType, requestBody);

  const url = `${BASE_URL}${uri}`;
  
  console.log(`📡 ${method} ${uri}`);
  
  try {
    const response = await fetch(url, {
      method,
      headers: {
        "Content-Type": contentType,
        "X-Kso-Date": date,
        "X-Kso-Authorization": authorization,
        "Authorization": `Bearer ${token}`,
      },
      body: requestBody || undefined,
    });

    const text = await response.text();
    
    try {
      const data = JSON.parse(text);
      return {
        success: data.code === 0,
        code: data.code,
        msg: data.msg,
        data: data.data,
      };
    } catch {
      return { success: false, raw: text.substring(0, 200) };
    }
  } catch (error) {
    return { success: false, msg: String(error) };
  }
}

// ========== 测试用例 ==========

async function runTests(token: string) {
  const tests: Array<{ name: string; method: string; uri: string; body?: object }> = [
    { name: "获取根部门", method: "GET", uri: "/v7/depts/root" },
    { name: "查询所有用户(正常)", method: "GET", uri: "/v7/users?status=active&page_size=5" },
    { name: "查询所有用户(未激活)", method: "GET", uri: "/v7/users?status=notactive&page_size=5" },
    { name: "批量查询部门", method: "POST", uri: "/v7/depts/batch_read", body: { dept_ids: ["0"] } },
  ];

  console.log("📋 测试 API 调用\n");
  console.log("=".repeat(60));

  for (const test of tests) {
    console.log(`\n🔍 ${test.name}`);
    const result = await callApi(token, test.method, test.uri, test.body);
    
    if (result.success) {
      console.log(`✅ 成功`);
      console.log(`   数据: ${JSON.stringify(result.data).substring(0, 150)}...`);
    } else {
      console.log(`❌ 失败: code=${result.code}, msg=${result.msg || result.raw}`);
    }
  }
}

// ========== 主函数 ==========

async function main() {
  console.log("🚀 WPS API 完整连接测试\n");
  console.log("=".repeat(60));

  // Step 1: 获取 token
  const token = await getTenantAccessToken();

  // Step 2: 测试 API
  console.log("=".repeat(60));
  await runTests(token);

  console.log("\n" + "=".repeat(60));
  console.log("🏁 测试完成\n");
}

main().catch(console.error);
