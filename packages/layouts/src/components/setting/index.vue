<script lang="ts" setup>
import {ref, unref} from 'vue'
import NavigationBarPicker from '../settingItem/NavigationBarPicker.vue'
import ThemeColorPicker from '../settingItem/ThemeColorPicker.vue'
import SwitchItem from '../settingItem/SwitchItem.vue'
import SelectItem from '../settingItem/SelectItem.vue'
import InputNumberItem from '../settingItem/InputNumberItem.vue'
import {context} from '../../../bridge'
import {
  navigationBarTypeList,
  mixSidebarTriggerOptions,
  topMenuAlignOptions,
  getMenuTriggerOptions,
  contentModeOptions,
  routerTransitionOptions
} from './constant';
import {
  APP_PRESET_COLOR_LIST,
  HEADER_PRESET_BG_COLOR_LIST,
  SIDE_BAR_BG_COLOR_LIST
} from '@vben/constants'

const {useAppStore, useMultipleTabStore, useUserStore, useMenuSetting} = context
const settingDrawerShow = ref(false)
const appStore = useAppStore()
const tabStore = useMultipleTabStore()
const userStore = useUserStore()


const {
  getIsHorizontal,
  getShowMenu,
  getMenuType,
  getTrigger,
  getCollapsedShowTitle,
  getMenuFixed,
  getCollapsed,
  getCanDrag,
  getTopMenuAlign,
  getAccordion,
  getMenuWidth,
  getMenuBgColor,
  getIsTopMenu,
  getSplit,
  getIsMixSidebar,
  getCloseMixSidebarOnChange,
  getMixSideTrigger,
  getMixSideFixed,
} = useMenuSetting();


console.log('getMenuType', useMenuSetting().getMenuType.value)

const handleClearAndRedo = () => {
  localStorage.clear()
  appStore.resetAllState()
  // permissionStore.resetState()
  tabStore.resetState()
  userStore.resetState()
  location.reload()
}

const def = ref(1)
const menuExpansionWidth = ref(100)

const triggerOptions = getMenuTriggerOptions(true);


</script>

<template>
  <div class="flex items-center">
    <VbenIconify
      icon="ion:settings-outline"
      hoverPointer
      @click="settingDrawerShow = true"
    />
    <VbenDrawer v-model:show="settingDrawerShow" :width="330">
      <VbenDrawerContent closable>
        <template #header>项目配置</template>
        <!--<VbenDivider title-placement="left">主题</VbenDivider>
        <VbenSpace vertical>
          <SwitchItem v-model:value="def"/>
        </VbenSpace>-->
        <VbenDivider title-placement="left">导航栏模式</VbenDivider>
        <NavigationBarPicker :def="getMenuType" :type-list="navigationBarTypeList"/>
        <VbenDivider title-placement="left">系统主题</VbenDivider>
        <ThemeColorPicker :color-list="APP_PRESET_COLOR_LIST"/>
        <VbenDivider title-placement="left">顶栏主题</VbenDivider>
        <ThemeColorPicker :color-list="HEADER_PRESET_BG_COLOR_LIST"/>
        <VbenDivider title-placement="left">菜单主题</VbenDivider>
        <ThemeColorPicker :color-list="SIDE_BAR_BG_COLOR_LIST"/>
        <VbenDivider title-placement="left">界面功能</VbenDivider>
        <VbenSpace vertical>
          <SwitchItem title="分割菜单" v-model:value="def"/>
          <SwitchItem title="固定展开菜单" v-model:value="def"/>
          <SwitchItem title="切换页面关闭菜单" v-model:value="def"/>
          <SwitchItem title="折叠菜单" v-model:value="def"/>
          <SwitchItem title="侧边栏拖拽" v-model:value="def"/>
          <SwitchItem title="菜单搜索" v-model:value="def"/>
          <SwitchItem title="侧边栏手风琴模式" v-model:value="def"/>
          <SwitchItem title="折叠菜单显示名称" v-model:value="def"/>
          <SwitchItem title="固定Header" v-model:value="def"/>
          <SwitchItem title="固定Sidedar" v-model:value="def"/>
          <SelectItem title="混合菜单触发模式" :options="mixSidebarTriggerOptions"
                      v-model:value="def"/>
          <SelectItem title="顶部菜单布局" :options="topMenuAlignOptions" v-model:value="def"/>
          <SelectItem title="菜单折叠按钮" :options="triggerOptions" v-model:value="def"/>
          <SelectItem title="内容区域宽度" :options="contentModeOptions" v-model:value="def"/>
          <InputNumberItem title="自动锁屏" :min="0" v-model:value="def"
                           :suffix=" def === 0 ? '不锁屏' : '分钟'"/>
          <InputNumberItem title="菜单展开宽度" :min="100" :max="600" :step="10"
                           v-model:value="menuExpansionWidth" suffix="px"/>
        </VbenSpace>
        <VbenDivider title-placement="left">界面显示</VbenDivider>
        <VbenSpace vertical>
          <SwitchItem title="面包屑" v-model:value="def"/>
          <SwitchItem title="面包屑图标" v-model:value="def"/>
          <SwitchItem title="标签页" v-model:value="def"/>
          <SwitchItem title="标签页刷新按钮" v-model:value="def"/>
          <SwitchItem title="标签页快捷按钮" v-model:value="def"/>
          <SwitchItem title="标签页快捷折叠" v-model:value="def"/>
          <SwitchItem title="左侧菜单" v-model:value="def"/>
          <SwitchItem title="顶栏" v-model:value="def"/>
          <SwitchItem title="Logo" v-model:value="def"/>
          <SwitchItem title="页脚" v-model:value="def"/>
          <SwitchItem title="全屏内容" v-model:value="def"/>
          <SwitchItem title="灰色模式" v-model:value="def"/>
          <SwitchItem title="色弱模式" v-model:value="def"/>
        </VbenSpace>
        <VbenDivider title-placement="left">动画</VbenDivider>
        <VbenSpace vertical>
          <SwitchItem title="顶部进度条" v-model:value="def"/>
          <SwitchItem title="切换loding" v-model:value="def"/>
          <SwitchItem title="切换动画" v-model:value="def"/>
          <SelectItem title="动画类型" :options="routerTransitionOptions" v-model:value="def"/>
        </VbenSpace>
        <VbenDivider/>
        <VbenSpace vertical>
          <VbenButton type="info" block>
            <template #icon>
              <VbenIconify icon="ant-design:snippets-twotone"/>
            </template>
            拷贝
          </VbenButton>
          <VbenButton type="warning" @click="handleClearAndRedo" block>
            <template #icon>
              <VbenIconify icon="ant-design:reload-outlined"/>
            </template>
            重置
          </VbenButton>
          <VbenButton type="error" block>
            <template #icon>
              <VbenIconify icon="ant-design:redo-outlined"/>
            </template>
            清空缓存返回登录页
          </VbenButton>
        </VbenSpace>
      </VbenDrawerContent>
    </VbenDrawer>
  </div>
</template>
