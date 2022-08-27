// Lock screen information
import {MenuModeEnum, MenuTypeEnum} from "../../enums/menuEnum";

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

export interface BeforeMiniState {
  menuCollapsed?: boolean;
  menuSplit?: boolean;
  menuMode?: MenuModeEnum;
  menuType?: MenuTypeEnum;
}
