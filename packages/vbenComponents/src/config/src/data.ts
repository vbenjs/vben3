// import { useAppStoreWithOut } from '/@/store/modules/app'
// import { computed } from 'vue'
import {ref} from "vue";

export enum ThemeEnum {
  Light = 'light',
  Dark = 'dark',
}
export const theme =ref(ThemeEnum.Dark)
// const appStore = useAppStoreWithOut()
// export const theme = computed(() => appStore.getDarkMode)
export const locale = {
  date: null,
  locale: null,
}
