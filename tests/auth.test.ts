import { describe, test, expect, beforeEach, afterEach } from "bun:test";
import { Signature, TokenManager } from "../src/auth";

describe("Signature", () => {
  const appId = "AK20260308LGOUTU";
  const appKey = "743c057b97227a473d404c1eb7fcebda";
  let signature: Signature;

  beforeEach(() => {
    signature = new Signature(appId, appKey);
  });

  test("should generate signature for GET request without body", () => {
    const result = signature.generateSignature({
      method: "GET",
      uri: "/v7/depts/root",
      contentType: "application/json",
    });

    expect(result.date).toBeDefined();
    expect(result.authorization).toMatch(/^KSO-1 AK20260308LGOUTU:[a-f0-9]+$/);
    expect(result.authorization).toContain(appId);
  });

  test("should generate signature for POST request with body", () => {
    const body = JSON.stringify({ dept_ids: ["0"] });
    const result = signature.generateSignature({
      method: "POST",
      uri: "/v7/depts/batch_read",
      contentType: "application/json",
      body,
    });

    expect(result.date).toBeDefined();
    expect(result.authorization).toMatch(/^KSO-1 AK20260308LGOUTU:[a-f0-9]+$/);
  });

  test("should generate different signatures for different methods", () => {
    const result1 = signature.generateSignature({
      method: "GET",
      uri: "/v7/users",
      contentType: "application/json",
    });

    const result2 = signature.generateSignature({
      method: "POST",
      uri: "/v7/users",
      contentType: "application/json",
    });

    expect(result1.authorization).not.toBe(result2.authorization);
  });

  test("should generate different signatures for different URIs", () => {
    const result1 = signature.generateSignature({
      method: "GET",
      uri: "/v7/users",
      contentType: "application/json",
    });

    const result2 = signature.generateSignature({
      method: "GET",
      uri: "/v7/depts",
      contentType: "application/json",
    });

    expect(result1.authorization).not.toBe(result2.authorization);
  });

  test("should validate method parameter", () => {
    expect(() => {
      signature.generateSignature({
        method: "",
        uri: "/v7/users",
        contentType: "application/json",
      });
    }).toThrow();
  });

  test("should validate uri parameter", () => {
    expect(() => {
      signature.generateSignature({
        method: "GET",
        uri: "",
        contentType: "application/json",
      });
    }).toThrow();
  });

  test("should validate contentType parameter", () => {
    expect(() => {
      signature.generateSignature({
        method: "GET",
        uri: "/v7/users",
        contentType: "",
      });
    }).toThrow();
  });
});

describe("TokenManager", () => {
  const appId = "AK20260308LGOUTU";
  const appKey = "743c057b97227a473d404c1eb7fcebda";
  const baseUrl = "https://openapi.wps.cn";

  beforeEach(() => {
    TokenManager.resetInstance();
  });

  afterEach(() => {
    TokenManager.resetInstance();
  });

  test("should create singleton instance", () => {
    const instance1 = TokenManager.getInstance({ appId, appKey });
    const instance2 = TokenManager.getInstance();

    expect(instance1).toBe(instance2);
  });

  test("should throw error when creating instance without config", () => {
    expect(() => {
      TokenManager.getInstance();
    }).toThrow("TokenManager requires config on first instantiation");
  });

  test("should fetch token from API", async () => {
    const manager = TokenManager.getInstance({ appId, appKey, baseUrl });
    const token = await manager.getToken();

    expect(token).toBeDefined();
    expect(typeof token).toBe("string");
    expect(token.length).toBeGreaterThan(0);
  });

  test("should cache token", async () => {
    const manager = TokenManager.getInstance({ appId, appKey, baseUrl });
    
    const token1 = await manager.getToken();
    const tokenInfo = manager.getTokenInfo();
    
    expect(tokenInfo).toBeDefined();
    expect(tokenInfo?.token).toBe(token1);
    expect(tokenInfo?.expiresAt).toBeGreaterThan(Date.now());
  });

  test("should return cached token on subsequent calls", async () => {
    const manager = TokenManager.getInstance({ appId, appKey, baseUrl });
    
    const token1 = await manager.getToken();
    const token2 = await manager.getToken();
    
    expect(token1).toBe(token2);
  });

  test("should refresh token manually", async () => {
    const manager = TokenManager.getInstance({ appId, appKey, baseUrl });
    
    const token1 = await manager.getToken();
    const token2 = await manager.refreshToken();
    
    expect(token1).toBeDefined();
    expect(token2).toBeDefined();
  });

  test("should handle concurrent refresh requests", async () => {
    const manager = TokenManager.getInstance({ appId, appKey, baseUrl });
    
    const [token1, token2, token3] = await Promise.all([
      manager.getToken(),
      manager.getToken(),
      manager.getToken(),
    ]);
    
    expect(token1).toBe(token2);
    expect(token2).toBe(token3);
  });

  test("should auto-refresh token when expiring soon", async () => {
    const manager = TokenManager.getInstance({ 
      appId, 
      appKey, 
      baseUrl,
      refreshBeforeExpiry: 7200 * 1000 + 1000,
    });
    
    const token1 = await manager.getToken();
    const tokenInfo = manager.getTokenInfo();
    expect(tokenInfo?.token).toBe(token1);
  });
});
