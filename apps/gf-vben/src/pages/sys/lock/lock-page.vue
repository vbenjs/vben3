<script lang="ts" setup>
import { ref, computed, unref } from 'vue'
import { useUserStore } from '@/store/user'
import { useLockStore } from '@/store/lock'
import { useI18n } from '@vben/locale'
import { useNow } from './use-now'
import { createNamespace } from '@vben/utils'
import headerImg from '@/assets/images/header.jpg'
import { router } from '@/router'
import { UserInfo } from '@vben/types'

const password = ref('')
const loading = ref(false)
const errMsg = ref(false)
const showDate = ref(true)

const { bem } = createNamespace('lock-page')

const lockStore = useLockStore()
const userStore = useUserStore()

const { hour, month, minute, meridiem, year, day, week } = useNow(true)

const { t } = useI18n()

const userInfo = computed<UserInfo | null>(() => userStore.getUserInfo)

/**
 * @description: unLock
 */
async function unLock () {
  console.log('getUserInfoAction', userStore.getUserInfoAction())
  if (!password.value) {
    return
  }
  try {
    loading.value = true
    const res = await lockStore.unLock(password.value)
    errMsg.value = !res
    if (res) {
      const redirect = unref(router.currentRoute).query?.redirect as string || '/'
      await router.replace({ path: redirect })
    }
  } finally {
    loading.value = false
  }
}

function goLogin () {
  userStore.logout(true)
  lockStore.resetLockInfo()
}

function handleShowForm (show = false) {
  showDate.value = show
}
</script>

<template>
  <div
      :class="bem()"
      class="fixed inset-0 flex items-center justify-center w-screen h-screen bg-black"
  >
    <div
        :class="bem('unlock')"
        class="absolute top-0 flex flex-col items-center justify-center h-16 pt-5 text-white transform translate-x-1/2 cursor-pointer left-1/2 sm:text-md xl:text-xl"
        @click="handleShowForm(false)"
        v-show="showDate"
    >
      <VbenIconify icon="ant-design:lock-outlined"/>
      <span>{{ t('sys.lock.unlock') }}</span>
    </div>
    
    <div class="flex items-center justify-center w-screen h-screen">
      <div
          :class="bem('hour')"
          class="relative w-2/5 mr-5 md:mr-20 h-2/5 md:h-4/5"
      >
        <span class="text-44px sm:text-90px md:text-160px lg:text-220px xl:text-260px 2xl:text-320px">{{ hour }}</span>
        <span
            class="absolute left-5 top-5 text-md"
            v-show="showDate"
        >
          {{ meridiem }}
        </span>
      </div>
      <div :class="`${bem('minute')} w-2/5 h-2/5 md:h-4/5 `">
        <span class="text-44px sm:text-90px md:text-160px lg:text-220px xl:text-260px 2xl:text-320px"> {{
            minute
          }}</span>
      </div>
    </div>
    <transition name="fade-slide">
      <div :class="bem('entry')" v-show="!showDate">
        <div :class="bem('entry-content')">
          <div :class="`${bem('entry-header')} enter-x`">
            <img
                :src="userInfo?.avatar || headerImg"
                :class="`${bem('entry-header-img')}`"
            />
            <p :class="`${bem('entry-header-name')}`">
              {{ userInfo?.realName??'' }}
            </p>
          </div>
          <VbenInput
              type="password"
              show-password-on="mousedown"
              :placeholder="t('sys.lock.placeholder')"
              class="enter-x"
              v-model:value="password"
          />
          <span :class="`${bem('err-msg')} enter-x`" v-if="errMsg">
            {{ t('sys.lock.alert') }}
          </span>
          <div :class="`${bem('footer')} enter-x`">
            <VbenButton
                quaternary
                type="info"
                size="small"
                class="mt-2 mr-2 enter-x text-gray-300"
                :disabled="loading"
                @click="handleShowForm(true)"
            >
              {{ t('common.back') }}
            </VbenButton>
            <VbenButton
                quaternary
                type="info"
                size="small"
                class="mt-2 mr-2 enter-x text-gray-300"
                :disabled="loading"
                @click="goLogin"
            >
              {{ t('sys.lock.backToLogin') }}
            </VbenButton>
            <VbenButton
                class="mt-2 text-gray-300"
                quaternary
                type="info"
                size="small"
                @click="unLock()"
                :loading="loading"
            >
              {{ t('sys.lock.entry') }}
            </VbenButton>
          </div>
        </div>
      </div>
    </transition>
    
    <div
        class="absolute w-full text-center text-gray-300 bottom-5 xl:text-xl 2xl:text-3xl enter-y"
    >
      <div class="mb-4 text-5xl enter-x" v-show="!showDate">
        {{ hour }}:{{ minute }} <span class="text-3xl">{{ meridiem }}</span>
      </div>
      <div class="text-2xl">{{ year }}/{{ month }}/{{ day }} {{ week }}</div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.lock-page {
  z-index: 9999;
  
  &__unlock {
    transform: translate(-50%, 0);
  }
  
  &__hour,
  &__minute {
    display: flex;
    font-weight: 700;
    color: #bababa;
    background-color: #141313;
    border-radius: 30px;
    justify-content: center;
    align-items: center;
  }
  
  &__entry {
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    width: 100%;
    height: 100%;
    background-color: rgb(0 0 0 / 50%);
    backdrop-filter: blur(8px);
    justify-content: center;
    align-items: center;
    
    &-content {
      width: 260px;
    }
    
    &-header {
      text-align: center;
      
      &-img {
        width: 70px;
        margin: 0 auto;
        border-radius: 50%;
      }
      
      &-name {
        margin-top: 5px;
        font-weight: 500;
        color: #bababa;
      }
    }
  }
  
  &__err-msg {
    display: inline-block;
    margin-top: 10px;
    color: var(--error-color);
  }
  
  &__footer {
    display: flex;
    justify-content: space-between;
  }
}
</style>
