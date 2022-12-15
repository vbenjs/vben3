<script lang="ts" setup>
import { reactive, ref, computed, unref } from 'vue'
import { useLoginState, useFormRules, LoginStateEnum } from './use-login'
import { CountDownInput } from '@vben/components'
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
    <vben-form :model="formData" :rules="getFormRules" ref="formRef">
      <vben-form-item name="account" class="enter-x" inline :show-label="false">
        <vben-input
          size="large"
          v-model:value="formData.account"
          :placeholder="t('sys.login.userName')"
        />
      </vben-form-item>

      <vben-form-item name="mobile" class="enter-x" inline :show-label="false">
        <vben-input
          size="large"
          v-model:value="formData.mobile"
          :placeholder="t('sys.login.mobile')"
        />
      </vben-form-item>
      <vben-form-item name="sms" class="enter-x" inline :show-label="false">
        <count-down-input
          size="large"
          v-model:value="formData.sms"
          :placeholder="t('sys.login.smsCode')"
        />
      </vben-form-item>

      <div class="enter-x">
        <vben-button
          type="primary"
          size="large"
          block
          @click="handleReset"
          :loading="loading"
        >
          {{ t('common.resetText') }}
        </vben-button>
        <vben-button size="large" block class="mt-4" @click="handleBackLogin">
          {{ t('sys.login.backSignIn') }}
        </vben-button>
      </div>
    </vben-form>
  </template>
</template>
