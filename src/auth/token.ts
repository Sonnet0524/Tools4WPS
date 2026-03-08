interface TokenResponse {
  access_token: string;
  expires_in: number;
  token_type: string;
}

interface TokenInfo {
  token: string;
  expiresAt: number;
}

export interface TokenManagerConfig {
  appId: string;
  appKey: string;
  baseUrl?: string;
  refreshBeforeExpiry?: number;
}

export class TokenManager {
  private appId: string;
  private appKey: string;
  private baseUrl: string;
  private refreshBeforeExpiry: number;
  private tokenInfo: TokenInfo | null = null;
  private refreshPromise: Promise<string> | null = null;
  private static instance: TokenManager | null = null;

  private constructor(config: TokenManagerConfig) {
    this.appId = config.appId;
    this.appKey = config.appKey;
    this.baseUrl = config.baseUrl || "https://openapi.wps.cn";
    this.refreshBeforeExpiry = config.refreshBeforeExpiry || 5 * 60 * 1000;
  }

  static getInstance(config?: TokenManagerConfig): TokenManager {
    if (!TokenManager.instance) {
      if (!config) {
        throw new Error("TokenManager requires config on first instantiation");
      }
      TokenManager.instance = new TokenManager(config);
    }
    return TokenManager.instance;
  }

  static resetInstance(): void {
    TokenManager.instance = null;
  }

  async getToken(): Promise<string> {
    if (this.tokenInfo && !this.isTokenExpiringSoon()) {
      return this.tokenInfo.token;
    }

    return this.refreshToken();
  }

  async refreshToken(): Promise<string> {
    if (this.refreshPromise) {
      return this.refreshPromise;
    }

    this.refreshPromise = this.fetchNewToken();

    try {
      const token = await this.refreshPromise;
      return token;
    } finally {
      this.refreshPromise = null;
    }
  }

  getTokenInfo(): TokenInfo | null {
    return this.tokenInfo ? { ...this.tokenInfo } : null;
  }

  private async fetchNewToken(): Promise<string> {
    const url = `${this.baseUrl}/oauth2/token`;
    const body = new URLSearchParams({
      grant_type: "client_credentials",
      client_id: this.appId,
      client_secret: this.appKey,
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
      throw new Error(`Failed to fetch token: ${response.status} - ${text}`);
    }

    const data = (await response.json()) as TokenResponse;

    if (!data.access_token || !data.expires_in || !data.token_type) {
      throw new Error(`Invalid token response: ${JSON.stringify(data)}`);
    }

    const expiresAt = Date.now() + data.expires_in * 1000;
    this.tokenInfo = {
      token: data.access_token,
      expiresAt,
    };

    return data.access_token;
  }

  private isTokenExpiringSoon(): boolean {
    if (!this.tokenInfo) {
      return true;
    }

    const now = Date.now();
    const timeUntilExpiry = this.tokenInfo.expiresAt - now;
    return timeUntilExpiry < this.refreshBeforeExpiry;
  }
}
