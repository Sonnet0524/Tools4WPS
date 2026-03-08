import { createHmac, createHash } from "crypto";

export interface SignatureParams {
  method: string;
  uri: string;
  contentType: string;
  body?: string;
}

export interface SignatureResult {
  date: string;
  authorization: string;
}

export class Signature {
  private appId: string;
  private appKey: string;

  constructor(appId: string, appKey: string) {
    this.appId = appId;
    this.appKey = appKey;
  }

  generateSignature(params: SignatureParams): SignatureResult {
    const { method, uri, contentType, body } = params;

    if (!method || method.length === 0) {
      throw new Error("method is required and cannot be empty");
    }
    if (!uri || uri.length === 0) {
      throw new Error("uri is required and cannot be empty");
    }
    if (!contentType || contentType.length === 0) {
      throw new Error("contentType is required and cannot be empty");
    }

    const date = new Date().toUTCString();

    const sha256Hex = body
      ? createHash("sha256").update(body).digest("hex")
      : "";

    const dataToSign = "KSO-1" + method + uri + contentType + date + sha256Hex;
    const signature = createHmac("sha256", this.appKey)
      .update(dataToSign)
      .digest("hex");

    const authorization = `KSO-1 ${this.appId}:${signature}`;

    return { date, authorization };
  }
}
