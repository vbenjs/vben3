<script lang="ts" setup>
import { useI18n } from '@vben/locale'
import { createNamespace, getGlobalConfig } from '@vben/utils'
import LoginForm from './login-form.vue'
import ForgetPasswordForm from './forget-password-form.vue'
import RegisterForm from './register-form.vue'
import MobileForm from './mobile-form.vue'
import QrCodeForm from './qrcode-form.vue'
const { bem } = createNamespace('login')

defineProps({
  sessionTimeout: {
    type: Boolean,
  },
})

const { title } = getGlobalConfig(import.meta.env)
const { t } = useI18n()
</script>

<template>
  <div :class="bem()">
    <div :class="bem('slogan')" class="hidden xl:flex">
      <div :class="bem('logo')">
        <img :title="title" :alt="title" src="@/assets/images/logo.png" />
        <div :class="[bem('logo-title'), 'truncate']">{{ title }}</div>
      </div>

      <div class="my-auto">
        <img
          :alt="title"
          src="@/assets/svg/login-box-bg.svg"
          class="w-2/3 -enter-x"
        />
        <div class="mt-10 font-medium text-white -enter-x">
          <span class="inline-block mt-4 text-2xl">
            {{ t('sys.login.signInTitle') }}</span
          >
        </div>
        <div class="mt-4 font-normal text-white text-md -enter-x">
          {{ t('sys.login.signInDesc') }}
        </div>
      </div>
    </div>
    <div :class="[bem('form'), 'enter-x']">
      <!--      <div class="absolute mt-4 right-4"><DarkModeToggle /></div>-->
      <div
        class="sm:w-4/6 xl:w-4/5 w-full mx-auto my-auto p-4 rounded-md shadow-md xl:shadow-none"
      >
        <vben-card>
          <login-form />
          <forget-password-form />
          <register-form />
          <mobile-form />
          <qr-code-form />
        </vben-card>
      </div>
    </div>
  </div>
</template>

<style lang="less">
//@dark-bg: #293146;

.login {
  height: 100%;
  width: 100%;
  min-height: 100%;
  display: flex;

  &__slogan {
    min-height: 100%;
    padding-left: 50px;
    margin-right: 40px;
    flex-direction: column;
  }

  &__slogan,
  &__form {
    flex: 1;
  }

  &__form {
    display: flex;
  }

  &::before {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    margin-left: -48%;
    background-image: url(@/assets/svg/login-bg.svg);
    background-position: 100%;
    background-repeat: no-repeat;
    background-size: auto 100%;
    content: '';
  }

  &__logo {
    display: flex;
    align-items: center;
    padding-left: 7px;
    cursor: pointer;
    transition: all 0.2s ease;
    position: absolute;
    top: 12px;
    height: 80px;
    &-title {
      font-size: 24px;
      color: #fff;
      margin-left: 8px;
    }
    img {
      width: 48px;
    }
  }

  .sign-in-way {
    .anticon {
      font-size: 22px;
      color: #888;
      cursor: pointer;

      &:hover {
        color: var(--primary-color);
      }
    }
  }

  .count-down-input input {
    min-width: unset;
  }
}
</style>
