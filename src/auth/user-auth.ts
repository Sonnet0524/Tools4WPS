import { TokenManager, Signature } from "../src/auth";

const appId = process.env.WPS_APP_ID || "AK20260308LGOUTU";
const appKey = process.env.WPS_APP_KEY || "743c057b97227a473d404c1eb7fcebda";
const baseUrl = process.env.WPS_BASE_URL || "https://openapi.wps.cn";

interface UserTokenResponse {
  access_token: string;
  expires_in: number;
  refresh_token: string;
  token_type: string;
}

/**
 * 获取用户授权URL
 * 
 * @param redirectUri 授权回调地址
 * @param scope 授权范围，如 "kso.calendar.read,kso.calendar_events.readwrite"
 * @param state 状态参数（防CSRF）
 * @returns 授权URL
 */
export function getUserAuthUrl(
  redirectUri: string,
  scope: string,
  state?: string
): string {
  const params = new URLSearchParams({
    client_id: appId,
    redirect_uri: redirectUri,
    response_type: "code",
    scope: scope,
  });

  if (state) {
    params.append("state", state);
  }

  return `${baseUrl}/oauth2/authorize?${params.toString()}`;
}

/**
 * 通过code获取用户access_token
 * 
 * @param code 授权码
 * @param redirectUri 授权回调地址（必须与获取code时一致）
 * @returns Token信息
 */
export async function getUserAccessToken(
  code: string,
  redirectUri: string
): Promise<UserTokenResponse> {
  const url = `${baseUrl}/oauth2/token`;
  const body = new URLSearchParams({
    grant_type: "authorization_code",
    client_id: appId,
    client_secret: appKey,
    code: code,
    redirect_uri: redirectUri,
  });

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: body.toString(),
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Failed to get user token: ${response.status} - ${text}`);
  }

  return (await response.json()) as UserTokenResponse;
}

/**
 * 刷新用户access_token
 * 
 * @param refreshToken 刷新token
 * @returns 新的Token信息
 */
export async function refreshUserAccessToken(
  refreshToken: string
): Promise<UserTokenResponse> {
  const url = `${baseUrl}/oauth2/token`;
  const body = new URLSearchParams({
    grant_type: "refresh_token",
    client_id: appId,
    client_secret: appKey,
    refresh_token: refreshToken,
  });

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: body.toString(),
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Failed to refresh token: ${response.status} - ${text}`);
  }

  return (await response.json()) as UserTokenResponse;
}

/**
 * 使用用户Token测试日历API
 * 
 * @param userAccessToken 用户访问token
 */
export async function testCalendarWithUserToken(userAccessToken: string) {
  console.log("=== 使用用户Token测试日历API ===\n");

  // 注意：文档说MCP方式不需要签名，但直接API调用可能仍需要
  // 先尝试不带签名
  console.log("测试1: 不带签名");
  const response1 = await fetch(`${baseUrl}/v7/calendars/primary`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${userAccessToken}`,
      "Content-Type": "application/json",
    },
  });
  console.log(`   状态: ${response1.status}`);
  if (response1.ok) {
    const data = await response1.json();
    console.log(`   成功! 日历: ${data.data?.summary || "N/A"}`);
  } else {
    const text = await response1.text();
    console.log(`   错误: ${text.substring(0, 150)}`);
  }
}

// 使用示例
if (import.meta.main) {
  console.log("=".repeat(60));
  console.log("WPS 用户授权工具");
  console.log("=".repeat(60));
  console.log("\n使用步骤:");
  console.log("1. 生成授权URL");
  console.log("2. 用户访问URL并授权");
  console.log("3. 获取code并换取token");
  console.log("4. 使用token调用API\n");

  // 示例：生成授权URL
  const scope = "kso.calendar.read kso.calendar_events.readwrite";
  const redirectUri = "https://your-app.com/callback"; // 替换为你的回调地址
  const authUrl = getUserAuthUrl(redirectUri, scope, "random_state");

  console.log("授权URL示例:");
  console.log(authUrl);
  console.log("\n用户访问此URL授权后，会跳转到:");
  console.log(`${redirectUri}?code=xxx&state=random_state`);
  console.log("\n从URL中获取code参数，然后调用 getUserAccessToken(code, redirectUri)");
}
