<script lang="ts" setup>
import { reactive, ref, unref, computed } from 'vue'
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
    <a-form
      class="p-4 enter-x"
      :model="formData"
      :rules="getFormRules"
      ref="formRef"
    >
      <a-form-item name="account" class="enter-x">
        <a-input
          class="fix-auto-fill"
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
      <a-form-item name="password" class="enter-x">
        <a-input-password
          size="large"
          visibilityToggle
          v-model:value="formData.password"
          :placeholder="t('sys.login.password')"
        />
      </a-form-item>
      <a-form-item name="confirmPassword" class="enter-x">
        <a-input-password
          size="large"
          visibilityToggle
          v-model:value="formData.confirmPassword"
          :placeholder="t('sys.login.confirmPassword')"
        />
      </a-form-item>

      <a-form-item class="enter-x" name="policy">
        <!-- No logic, you need to deal with it yourself -->
        <a-checkbox v-model:checked="formData.policy" size="small">
          {{ t('sys.login.policy') }}
        </a-checkbox>
      </a-form-item>

      <a-button
        type="primary"
        class="enter-x"
        size="large"
        block
        @click="handleRegister"
        :loading="loading"
      >
        {{ t('sys.login.registerButton') }}
      </a-button>
      <a-button
        size="large"
        block
        class="mt-4 enter-x"
        @click="handleBackLogin"
      >
        {{ t('sys.login.backSignIn') }}
      </a-button>
    </a-form>
  </template>
</template>
