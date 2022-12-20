<script lang="ts" setup>
import { ref, h, onMounted, unref, nextTick } from 'vue'
import { createNamespace, mapTree } from '@vben/utils'
import { VbenIconify } from '@vben/vbencomponents'
import { context } from '../../../bridge'
const { Logo, getMenus, listenerRouteChange, useMenuSetting } = context
import { MenuTypeEnum } from '@vben/constants'
const { getMenuType } = useMenuSetting()

import {
  RouteLocationNormalizedLoaded,
  RouterLink,
  useRouter,
} from 'vue-router'
import { useI18n } from '@vben/locale'
import { REDIRECT_NAME } from '@vben/constants'
const props = defineProps({
  mode: {
    type: String,
    default: () => 'vertical',
  },
})
const { bem } = createNamespace('layout-mix-menu')
// const collapsed = ref(false)
const { t } = useI18n()
const { currentRoute } = useRouter()
const { getCollapsed } = useMenuSetting()
const menuRef = ref(null)
const menuList = ref([])
const activeKey = ref()
// 定位菜单选择 与 当前路由匹配
const showOption = () => {
  nextTick(() => {
    if (!menuRef.value) return
    menuRef.value.Ref.showOption()
  })
}
// TODO 静态路由 待实现
onMounted(async () => {
  const menus = await getMenus()
  menuList.value = mapTree(menus, { conversion: (menu) => routerToMenu(menu) })
  showOption()
})

listenerRouteChange((route) => {
  if (route.name === REDIRECT_NAME) return

  const currentActiveMenu = route.meta?.currentActiveMenu as string
  handleMenuChange(route)

  if (currentActiveMenu) {
    activeKey.value = currentActiveMenu
  }
  showOption()
})

async function handleMenuChange(route?: RouteLocationNormalizedLoaded) {
  const menu = route || unref(currentRoute)
  activeKey.value = menu.name
}

// 路由格式化
const routerToMenu = (item: RouteRecordItem) => {
  const { name, children, meta, icon } = item
  const title = t(meta.title as string)
  return {
    label: () => {
      if (children) {
        return title
      }
      return h(
        RouterLink,
        {
          to: {
            name,
          },
        },
        { default: () => title },
      )
    },
    key: name,
    icon: renderIcon(icon),
  }
}
function renderIcon(icon: string) {
  return () => h(VbenIconify, { icon })
}

const activePath = ref('')

console.log('menuList',menuList)
const getItemEvents = (item) => {

}
</script>

<template>
  <div :class="bem()">
    <logo
      :class="bem('logo')"
      v-if="getMenuType === MenuTypeEnum.MIX_SIDEBAR"
      :showTitle="!getCollapsed"
    />

    <VbenScrollbar :class="bem('scrollbar')">
      <ul :class="bem('scrollbar-module')">
        <li
          :class="[bem('scrollbar-module__item'),{[bem('scrollbar-module__item--active')]: item.path === activePath}]"
          v-bind="getItemEvents(item)"
          v-for="item in menuList"
          :key="item.key"
        >

<!--          <SimpleMenuTag :item="item" collapseParent dot />-->
<!--          <Icon-->
<!--            :class="`${prefixCls}-module__icon`"-->
<!--            :size="getCollapsed ? 16 : 20"-->
<!--            :icon="item.icon || (item.meta && item.meta.icon)"-->
<!--          />-->
          <p :class="bem('scrollbar-module__name')">
            {{ t(item.key) }}
          </p>
        </li>
      </ul>
<!--      <VbenMenu-->
<!--        v-model:value="activeKey"-->
<!--        :options="menuList"-->
<!--        :collapsed="getCollapsed"-->
<!--        :collapsed-width="48"-->
<!--        :collapsed-icon-size="22"-->
<!--        :indent="18"-->
<!--        :root-indent="18"-->
<!--        ref="menuRef"-->
<!--        :mode="props.mode"-->
<!--      />-->
    </VbenScrollbar>
    <div :class="bem('trigger')">
      <VbenIconify icon="ph:caret-double-right-bold" />
    </div>
  </div>
</template>

<style lang="less" scoped>
.layout-mix-menu {
  display: flex;
  flex-direction: column;
  height: 100%;

  &__logo {
    flex-shrink: 0;
  }

  &__scrollbar {
    flex: 1;
    flex-basis: auto;
    &-module{
      position: relative;
      padding-top: 1px;
      &__item{
        position: relative;
        padding: 12px 0;
        color: rgb(255 255 255 / 65%);
        text-align: center;
        cursor: pointer;
        transition: all 0.3s ease;

        &:hover {
          //color: @white;
        }
        // &:hover,
        &--active {
          font-weight: 700;
          //color: @white;
          //background-color: @sider-dark-darken-bg-color;

          &::before {
            position: absolute;
            top: 0;
            left: 0;
            width: 3px;
            height: 100%;
            //background-color: @primary-color;
            content: '';
          }
        }
      }
    }
  }
  &__trigger{
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    font-size: 14px;
    color: rgb(255 255 255 / 65%);
    text-align: center;
    cursor: pointer;
    background-color: rgba(59, 59, 59, 1);
    height: 36px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>

