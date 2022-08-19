// Lock screen information
export interface LockInfo {
  // Password required
  pwd?: string | undefined
  // Is it locked?
  isLock?: boolean
}

export interface RoleInfo {
  name: string
  value: string
}

export interface UserInfo {
  userId: string | number
  username: string
  realname: string
  avatar: string
  desc?: string
  homePath?: string
  roles: RoleInfo[]
}
