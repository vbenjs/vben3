import { defineStore } from '@vben/pinia'
import { MenuSetting } from '@vben/types'
import {
  MenuModeEnum,
  MenuTypeEnum,
  MixSidebarTriggerEnum,
  SIDE_BAR_BG_COLOR_LIST,
  ThemeEnum,
  TriggerEnum,
} from '@vben/constants'

export const useMenuSettingStore = defineStore({
  id: 'LAYOUT_MENU_SETTING',
  // persist: true,
  state: (): MenuSetting => ({
    // sidebar menu bg color
    bgColor: SIDE_BAR_BG_COLOR_LIST[0],
    //  Whether to fix the left menu
    fixed: true,
    // Menu collapse
    collapsed: false,
    // Whether to display the menu name when folding the menu
    collapsedShowTitle: false,
    // Whether it can be dragged
    // Only limited to the opening of the left menu, the mouse has a drag bar on the right side of the menu
    canDrag: false,
    // Whether to show no dom
    show: true,
    // Whether to show dom
    hidden: false,
    // Menu width
    menuWidth: 210,
    // Menu mode
    mode: MenuModeEnum.INLINE,
    // Menu type
    type: MenuTypeEnum.SIDEBAR,
    // Menu theme
    theme: ThemeEnum.DARK,
    // Split menu
    split: false,
    // Top menu layout
    topMenuAlign: 'center',
    // Fold trigger position
    trigger: TriggerEnum.CENTER,
    // Turn on accordion mode, only show a menu
    accordion: true,
    // Switch page to close menu
    closeMixSidebarOnChange: false,
    // Module opening method ‘click’ |'hover'
    mixSideTrigger: MixSidebarTriggerEnum.CLICK,
    // Fixed expanded menu
    mixSideFixed: false,
    width: 210,
    mixSidebarWidth: 80,
    collapsedWidth: 48,
  }),
  getters: {
    isSidebar: (state) => state.type === MenuTypeEnum.SIDEBAR,
    isTopMenu: (state) => state.type === MenuTypeEnum.TOP_MENU,
    isMixSidebar: (state) => state.type === MenuTypeEnum.MIX_SIDEBAR,
    isMixMode: (state) =>
      state.mode === MenuModeEnum.INLINE && state.type === MenuTypeEnum.MIX,
    showMenuLogo: (state) => state.type === MenuTypeEnum.SIDEBAR,
    showTopMenu: (state) => {
      return state.mode === MenuModeEnum.HORIZONTAL || state.split
    },
    showHeaderTrigger: (state) => {
      if (state.type === MenuTypeEnum.TOP_MENU || !state.show || state.hidden)
        return false
      return state.trigger === TriggerEnum.HEADER
    },
    showFooterTrigger: (state) => state.trigger === TriggerEnum.FOOTER,
    isHorizontal: (state) => state.mode === MenuModeEnum.HORIZONTAL,
    // TODO
    ShowSidebar: (state) => {
      const fullContent = false
      return (
        state.split ||
        (state.show && state.mode !== MenuModeEnum.HORIZONTAL && !fullContent)
      )
    },
    // TODO
    getRealWidth: (state) => {
      return 0
    },
    // TODO
    getMiniWidthNumber: (state) => {
      return 0
    },
    // TODO
    getCalcContentWidth: (state) => {
      return 0
    },
  },
  actions: {
    setBgColor(value: string) {
      this.bgColor = value
    },
    setFixed(value: boolean) {
      this.fixed = value
    },
    setCollapsed(value: boolean) {
      this.collapsed = value
    },
    setCollapsedShowTitle(value: boolean) {
      this.collapsedShowTitle = value
    },
    setCanDrag(value: boolean) {
      this.canDrag = value
    },
    setShow(value: boolean) {
      this.show = value
    },
    setHidden(value: boolean) {
      this.hidden = value
    },
    setMenuWidth(value: number) {
      this.menuWidth = value
    },
    setMode(value: MenuModeEnum) {
      this.mode = value
    },
    setType(value: MenuTypeEnum) {
      this.setHidden(value === MenuTypeEnum.TOP_MENU)
      this.type = value
    },
    setTheme(value: ThemeEnum) {
      this.theme = value
    },
    setSplit(value: boolean) {
      this.split = value
    },
    setTopMenuAlign(value: 'start' | 'center' | 'end') {
      this.topMenuAlign = value
    },
    setTrigger(value: TriggerEnum) {
      this.trigger = value
    },
    setAccordion(value: boolean) {
      this.accordion = value
    },
    setCloseMixSidebarOnChange(value: boolean) {
      this.closeMixSidebarOnChange = value
    },
    setMixSideTrigger(value: MixSidebarTriggerEnum) {
      this.mixSideTrigger = value
    },
    setMixSideFixed(value: boolean) {
      this.mixSideFixed = value
    },
    toggleCollapsed() {
      this.setCollapsed(!this.collapsed)
    },
  },
})
