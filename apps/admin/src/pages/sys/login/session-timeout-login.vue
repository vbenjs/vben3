<template>
  <transition>
    <div :class="bem()">
      <Login sessionTimeout />
    </div>
  </transition>
</template>
<script lang="ts" setup>
import { onBeforeUnmount, onMounted, ref, unref } from 'vue'
import Login from './login.vue'
import { useAppConfig } from '@vben/hooks'
import { useUserStore } from '@/store/user'
import { PermissionModeEnum } from '@vben/constants'
import { useAuthStore } from '@/store/auth'
import { createNamespace } from '@vben/utils'

const { bem } = createNamespace('st-login')
const userStore = useUserStore()
const permissionStore = useAuthStore()
const userId = ref<number | string | undefined>(0)

const isBackMode = () => {
  return unref(useAppConfig().permissionMode) === PermissionModeEnum.BACK
}

onMounted(() => {
  // 记录当前的UserId
  userId.value = userStore.getUserInfo?.userId
})

onBeforeUnmount(() => {
  if (userId.value && userId.value !== userStore.getUserInfo?.userId) {
    // 登录的不是同一个用户，刷新整个页面以便丢弃之前用户的页面状态
    document.location.reload()
  } else if (isBackMode() && permissionStore.getLastBuildMenuTime === 0) {
    // 后台权限模式下，没有成功加载过菜单，就重新加载整个页面。这通常发生在会话过期后按F5刷新整个页面后载入了本模块这种场景
    document.location.reload()
  }
})
</script>
<style lang="less" scoped>
.st-login {
  position: fixed;
  z-index: 9999999;
  width: 100%;
  height: 100%;
  background: var(--component-background-color);
}
</style>
