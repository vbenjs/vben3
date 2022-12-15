<script lang="ts" setup>
import { reactive, ref, unref, computed } from 'vue'
import { CountDownInput } from '@vben/components'
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

const formRef = ref()
const loading = ref(false)

const formData = reactive({
  account: '',
  password: '',
  confirmPassword: '',
  mobile: '',
  sms: '',
  policy: false,
})

const { getFormRules } = useFormRules(formData)
const { validForm } = useFormValid(formRef)

const getShow = computed(() => unref(getLoginState) === LoginStateEnum.REGISTER)

async function handleRegister() {
  const data = await validForm()
  if (!data) return
  console.log(data)
}
</script>

<template>
  <template v-if="getShow">
    <login-form-title class="enter-x" />
    <vben-form :model="formData" :rules="getFormRules" ref="formRef">
      <vben-form-item name="account" class="enter-x" inline :show-label="false">
        <vben-input
          class="fix-auto-fill"
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
          class="fix-auto-fill"
        />
      </vben-form-item>
      <vben-form-item name="sms" class="enter-x" inline :show-label="false">
        <count-down-input
          size="large"
          class="fix-auto-fill"
          v-model:value="formData.sms"
          :placeholder="t('sys.login.smsCode')"
        />
      </vben-form-item>
      <vben-form-item
        name="password"
        class="enter-x"
        inline
        :show-label="false"
      >
        <vben-input
          size="large"
          visibilityToggle
          v-model:value="formData.password"
          :placeholder="t('sys.login.password')"
        />
      </vben-form-item>
      <vben-form-item
        name="confirmPassword"
        class="enter-x"
        inline
        :show-label="false"
      >
        <vben-input
          size="large"
          type="password"
          visibilityToggle
          v-model:value="formData.confirmPassword"
          :placeholder="t('sys.login.confirmPassword')"
        />
      </vben-form-item>

      <vben-form-item class="enter-x" name="policy" inline :show-label="false">
        <!-- No logic, you need to deal with it yourself -->
        <vben-checkbox v-model:checked="formData.policy" size="small">
          {{ t('sys.login.policy') }}
        </vben-checkbox>
      </vben-form-item>

      <vben-button
        type="primary"
        class="enter-x"
        size="large"
        block
        @click="handleRegister"
        :loading="loading"
      >
        {{ t('sys.login.registerButton') }}
      </vben-button>
      <vben-button
        size="large"
        block
        class="mt-4 enter-x"
        @click="handleBackLogin"
      >
        {{ t('sys.login.backSignIn') }}
      </vben-button>
    </vben-form>
  </template>
</template>
