import {
  MenuModeEnum,
  NavBarModeEnum,
  ContentLayoutEnum,
  TopMenuAlignEnum,
  TriggerEnum,
  RouterTransitionEnum,
  MixSidebarTriggerEnum
} from '@vben/constants'
import { useI18n} from '@vben/locale'

const { t } = useI18n();

export const navigationBarTypeList = [
  {
    title: t('layout.setting.menuTypeSidebar'),
    mode: MenuModeEnum.INLINE,
    type: NavBarModeEnum.SIDEBAR,
  },
  {
    title: t('layout.setting.menuTypeMix'),
    mode: MenuModeEnum.INLINE,
    type: NavBarModeEnum.MIX,
  },

  {
    title: t('layout.setting.menuTypeTopMenu'),
    mode: MenuModeEnum.HORIZONTAL,
    type: NavBarModeEnum.TOP_MENU,
  },
  {
    title: t('layout.setting.menuTypeMixSidebar'),
    mode: MenuModeEnum.INLINE,
    type: NavBarModeEnum.MIX_SIDEBAR,
  },
];

export const contentModeOptions = [
  {
    value: ContentLayoutEnum.FULL,
    label: t('layout.setting.contentModeFull'),
  },
  {
    value: ContentLayoutEnum.FIXED,
    label: t('layout.setting.contentModeFixed'),
  },
];

export const topMenuAlignOptions = [
  {
    value: TopMenuAlignEnum.CENTER,
    label: t('layout.setting.topMenuAlignRight'),
  },
  {
    value: TopMenuAlignEnum.START,
    label: t('layout.setting.topMenuAlignLeft'),
  },
  {
    value: TopMenuAlignEnum.END,
    label: t('layout.setting.topMenuAlignCenter'),
  },
];

export const getMenuTriggerOptions = (hideTop: boolean) => {
  return [
    {
      value: TriggerEnum.NONE,
      label: t('layout.setting.menuTriggerNone'),
    },
    {
      value: TriggerEnum.CENTER,
      label: t('layout.setting.menuTriggerCenter'),
    },
    {
      value: TriggerEnum.FOOTER,
      label: t('layout.setting.menuTriggerBottom'),
    },
    ...(hideTop
      ? []
      : [
        {
          value: TriggerEnum.HEADER,
          label: t('layout.setting.menuTriggerTop'),
        },
      ]),
  ];
};

export const routerTransitionOptions = [
  RouterTransitionEnum.ZOOM_FADE,
  RouterTransitionEnum.FADE,
  RouterTransitionEnum.ZOOM_OUT,
  RouterTransitionEnum.FADE_SIDE,
  RouterTransitionEnum.FADE_BOTTOM,
  RouterTransitionEnum.FADE_SCALE,
].map((item) => {
  return {
    label: item,
    value: item,
  };
});

export const mixSidebarTriggerOptions = [
  {
    value: MixSidebarTriggerEnum.HOVER,
    label: t('layout.setting.triggerHover'),
  },
  {
    value: MixSidebarTriggerEnum.CLICK,
    label: t('layout.setting.triggerClick'),
  },
];
