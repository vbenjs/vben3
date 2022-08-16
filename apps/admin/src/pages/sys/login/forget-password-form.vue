<script lang="ts" setup>
import { reactive, ref, computed, unref } from 'vue'
import { useLoginState, useFormRules, LoginStateEnum } from './use-login'
import { CountDownInput } from '@components/antd-extend'
import { useI18n } from '@vben/locale'
import LoginFormTitle from './login-form-title.vue'

const { t } = useI18n()
const { handleBackLogin, getLoginState } = useLoginState()
const { getFormRules } = useFormRules()

const formRef = ref()
const loading = ref(false)

const formData = reactive({
  account: '',
  mobile: '',
  sms: '',
})

const show = computed(
  () => unref(getLoginState) === LoginStateEnum.RESET_PASSWORD,
)

async function handleReset() {
  const form = unref(formRef)
  if (!form) return
  await form.resetFields()
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
      <a-form-item name="account" class="enter-x">
        <a-input
          size="large"
          v-model:value="formData.account"
          :placeholder="t('sys.login.userName')"
        />
      </a-form-item>

      <a-form-item name="mobile" class="enter-x">
        <a-input
          size="large"
          v-model:value="formData.mobile"
          :placeholder="t('sys.login.mobile')"
        />
      </a-form-item>
      <a-form-item name="sms" class="enter-x">
        <count-down-input
          size="large"
          v-model:value="formData.sms"
          :placeholder="t('sys.login.smsCode')"
        />
      </a-form-item>

      <a-form-item class="enter-x">
        <a-button
          type="primary"
          size="large"
          block
          @click="handleReset"
          :loading="loading"
        >
          {{ t('common.resetText') }}
        </a-button>
        <a-button size="large" block class="mt-4" @click="handleBackLogin">
          {{ t('sys.login.backSignIn') }}
        </a-button>
      </a-form-item>
    </a-form>
  </template>
</template>
