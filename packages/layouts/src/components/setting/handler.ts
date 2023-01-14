import {HandlerSettingEnum} from '@vben/constants';
import {ProjectConfig} from '@vben/types';
// import { updateHeaderBgColor, updateSidebarBgColor } from '/@/logics/theme/updateBackground';
// import { updateColorWeak } from '/@/logics/theme/updateColorWeak';
// import { updateGrayMode } from '/@/logics/theme/updateGrayMode';
//
// import { useAppStore } from '/@/store/modules/app';
// import { changeTheme } from '/@/logics/theme';
// import { updateDarkTheme } from '/@/logics/theme/dark';
// import { useRootSetting } from '/@/hooks/setting/useRootSetting';
import {context} from "../../../bridge";
import {updateColorWeak} from "../../logics/updateColorWeak";
import {updateGrayMode} from "../../logics/updateGrayMode";

export function baseHandler(event: HandlerSettingEnum, value: any) {
  const {useConfigStore} = context

  const configStore = useConfigStore();
  const config = handler(event, value);
  // @ts-ignore
  configStore.setProjectConfig(config);
  // if (event === HandlerSettingEnum.CHANGE_THEME) {
  //   updateHeaderBgColor();
  //   updateSidebarBgColor();
  // }
}

export function handler(event: HandlerSettingEnum, value: any): DeepPartial<ProjectConfig> {
  const {
    useAppStore,
    useRootSetting
  } = context
  const appStore = useAppStore()
  // @ts-ignore
  const {getThemeColor, getDarkMode} = useRootSetting()
  switch (event) {
    case HandlerSettingEnum.CHANGE_LAYOUT:
      const {mode, type, split} = value;
      const splitOpt = split === undefined ? {split} : {};

      return {
        menuSetting: {
          mode,
          type,
          collapsed: false,
          show: true,
          hidden: false,
          ...splitOpt,
        },
      };

    case HandlerSettingEnum.CHANGE_THEME_COLOR:
      if (getThemeColor.value === value) {
        return {};
      }
      // changeTheme(value);

      return {themeColor: value};

    case HandlerSettingEnum.CHANGE_THEME:
      if (getDarkMode.value === value) {
        return {};
      }
      // updateDarkTheme(value);

      return {};

    case HandlerSettingEnum.MENU_HAS_DRAG:
      return {menuSetting: {canDrag: value}};

    case HandlerSettingEnum.MENU_ACCORDION:
      return {menuSetting: {accordion: value}};

    case HandlerSettingEnum.MENU_TRIGGER:
      return {menuSetting: {trigger: value}};

    case HandlerSettingEnum.MENU_TOP_ALIGN:
      return {menuSetting: {topMenuAlign: value}};

    case HandlerSettingEnum.MENU_COLLAPSED:
      return {menuSetting: {collapsed: value}};

    case HandlerSettingEnum.MENU_WIDTH:
      return {menuSetting: {menuWidth: value}};

    case HandlerSettingEnum.MENU_SHOW_SIDEBAR:
      return {menuSetting: {show: value}};

    case HandlerSettingEnum.MENU_COLLAPSED_SHOW_TITLE:
      return {menuSetting: {collapsedShowTitle: value}};

    case HandlerSettingEnum.MENU_THEME:
      // updateSidebarBgColor(value);
      return {menuSetting: {bgColor: value}};

    case HandlerSettingEnum.MENU_SPLIT:
      return {menuSetting: {split: value}};

    case HandlerSettingEnum.MENU_CLOSE_MIX_SIDEBAR_ON_CHANGE:
      return {menuSetting: {closeMixSidebarOnChange: value}};

    case HandlerSettingEnum.MENU_FIXED:
      return {menuSetting: {fixed: value}};

    case HandlerSettingEnum.MENU_TRIGGER_MIX_SIDEBAR:
      return {menuSetting: {mixSideTrigger: value}};

    case HandlerSettingEnum.MENU_FIXED_MIX_SIDEBAR:
      return {menuSetting: {mixSideFixed: value}};

    // ============transition==================
    case HandlerSettingEnum.OPEN_PAGE_LOADING:
      // @ts-ignore
      appStore.setPageLoading(false);
      return {transitionSetting: {openPageLoading: value}};

    case HandlerSettingEnum.ROUTER_TRANSITION:
      return {transitionSetting: {basicTransition: value}};

    case HandlerSettingEnum.OPEN_ROUTE_TRANSITION:
      return {transitionSetting: {enable: value}};

    case HandlerSettingEnum.OPEN_PROGRESS:
      return {transitionSetting: {openNProgress: value}};
    // ============root==================

    case HandlerSettingEnum.LOCK_TIME:
      return {lockTime: value};

    case HandlerSettingEnum.FULL_CONTENT:
      return {fullContent: value};

    case HandlerSettingEnum.CONTENT_MODE:
      return {contentMode: value};

    case HandlerSettingEnum.SHOW_BREADCRUMB:
      return {showBreadCrumb: value};

    case HandlerSettingEnum.SHOW_BREADCRUMB_ICON:
      return {showBreadCrumbIcon: value};

    case HandlerSettingEnum.GRAY_MODE:
      updateGrayMode(value);
      return {grayMode: value};

    case HandlerSettingEnum.SHOW_FOOTER:
      return {showFooter: value};

    case HandlerSettingEnum.COLOR_WEAK:
      updateColorWeak(value);
      return {colorWeak: value};

    case HandlerSettingEnum.SHOW_LOGO:
      return {showLogo: value};

    // ============tabs==================
    case HandlerSettingEnum.TABS_SHOW_QUICK:
      return {multiTabsSetting: {showQuick: value}};

    case HandlerSettingEnum.TABS_SHOW:
      return {multiTabsSetting: {show: value}};

    case HandlerSettingEnum.TABS_SHOW_REDO:
      return {multiTabsSetting: {showRedo: value}};

    case HandlerSettingEnum.TABS_SHOW_FOLD:
      return {multiTabsSetting: {showFold: value}};

    // ============header==================
    case HandlerSettingEnum.HEADER_THEME:
      // updateHeaderBgColor(value);
      return {headerSetting: {bgColor: value}};

    case HandlerSettingEnum.HEADER_SEARCH:
      return {headerSetting: {showSearch: value}};

    case HandlerSettingEnum.HEADER_FIXED:
      return {headerSetting: {fixed: value}};

    case HandlerSettingEnum.HEADER_SHOW:
      return {headerSetting: {show: value}};
    default:
      return {};
  }
}
