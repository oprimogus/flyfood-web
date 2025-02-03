export type ZitadelUserInfo = {
  email: string
  email_verified: boolean
  family_name: string
  gender: 'male' | 'female' | 'other'
  given_name: string
  locale: string
  name: string
  phone_number: string
  preferred_username: string
  sub: string
  updated_at: number
  'urn:zitadel:iam:org:project:roles'?: {
    [role: string]: {
      [key: string]: string
    }
  }
  'urn:zitadel:iam:org:project:295106177753153543:roles'?: {
    [role: string]: {
      [key: string]: string
    }
  }
  'urn:zitadel:iam:user:metadata'?: Record<string, string>
}

export enum ZitadelRole {
  ADMIN = 'admin',
  OWNER = 'owner'
}

export function isValidRole(role: string): boolean {
  return Object.values(ZitadelRole).includes(role as ZitadelRole)
}
