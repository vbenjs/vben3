<script lang="ts" setup>
import { reactive, ref, computed, unref } from 'vue'
import { CountDownInput } from '@components/antd-extend'
import { useI18n } from '@vben/locale'
import {
  useLoginState,
  useFormRules,
  useFormValid,
  LoginStateEnum,
} from './use-login'
import LoginFormTitle from './login-form-title.vue'

const { t } = useI18n()
const { handleBackLogin, getLoginState } = useLoginState()
const { getFormRules } = useFormRules()

const formRef = ref()
const loading = ref(false)

const formData = reactive({
  mobile: '',
  sms: '',
})

const { validForm } = useFormValid(formRef)

const show = computed(() => unref(getLoginState) === LoginStateEnum.MOBILE)

async function handleLogin() {
  const data = await validForm()
  if (!data) return
  console.log(data)
}
</script>
<template>
  <template v-if="show">
    <login-form-title class="enter-x" />
    <a-form
      class="p-4 enter-x"
      :model="formData"
      :rules="getFormRules"
      ref="formRef"
    >
      <a-form-item name="mobile" class="enter-x">
        <a-input
          size="large"
          v-model:value="formData.mobile"
          :placeholder="t('sys.login.mobile')"
          class="fix-auto-fill"
        />
      </a-form-item>
      <a-form-item name="sms" class="enter-x">
        <count-down-input
          size="large"
          class="fix-auto-fill"
          v-model:value="formData.sms"
          :placeholder="t('sys.login.smsCode')"
        />
      </a-form-item>

      <a-form-item class="enter-x">
        <a-button
          type="primary"
          size="large"
          block
          @click="handleLogin"
          :loading="loading"
        >
          {{ t('sys.login.loginButton') }}
        </a-button>
        <a-button size="large" block class="mt-4" @click="handleBackLogin">
          {{ t('sys.login.backSignIn') }}
        </a-button>
      </a-form-item>
    </a-form>
  </template>
</template>
