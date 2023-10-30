// Lock screen information

export interface LockInfo {
  // Password required
  pwd?: string | undefined
  // Is it locked?
  isLock?: boolean
}
export interface RoleInfo {
  roleName: string
  value: string
}
export interface UserInfo {
  userId: string | number
  username: string
  realName: string
  avatar: string
  desc?: string
  homePath?: string
  roles: RoleInfo[]
}

export interface UserState {
  userInfo: Nullable<UserInfo>
  accessToken?: string
  roles: RoleInfo[]
  sessionTimeout?: boolean
  lastUpdateTime: number
}
