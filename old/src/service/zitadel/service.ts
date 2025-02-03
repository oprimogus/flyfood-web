import { env } from "@/config/env"
import { fetchApi } from "../http"
import { Session } from "next-auth"
import { ZitadelUserInfo } from "./types"

export class ZitadelApi {
  private static instance: ZitadelApi
  private readonly baseURL = env.zitadel.issuer

  private constructor() {}

  public static getInstance(): ZitadelApi {
    if (!ZitadelApi.instance) {
      ZitadelApi.instance = new ZitadelApi()
    }

    return ZitadelApi.instance
  }

  async getUserInfoV1(accessToken: string) {
    return await fetchApi<ZitadelUserInfo, any>(
      this.baseURL,
      '/oidc/v1/userinfo',
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`
        }
      }
    )
  }
}