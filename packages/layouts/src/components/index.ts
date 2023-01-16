import {h} from "vue";
import {VbenIconify} from "@vben/vbencomponents";

export const renderIcon = (icon: string ) => {
  if (!icon) return undefined
  return () => h(VbenIconify, { icon })
}
