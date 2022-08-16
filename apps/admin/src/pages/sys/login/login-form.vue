<script lang="ts" setup>
import { reactive, ref, unref, computed } from 'vue'
import {
  GithubFilled,
  WechatFilled,
  AlipayCircleFilled,
  GoogleCircleFilled,
  TwitterCircleFilled,
} from '@ant-design/icons-vue'
import { useI18n } from '@vben/locale'
import { Modal, notification } from 'ant-design-vue'
import { useUserStore } from '@/store/user'
import {
  LoginStateEnum,
  useLoginState,
  useFormRules,
  useFormValid,
} from './use-login'
import LoginFormTitle from './login-form-title.vue'

const formRef = ref()
const loading = ref(false)
const rememberMe = ref(false)

const { t } = useI18n()
const userStore = useUserStore()
const { setLoginState, getLoginState } = useLoginState()
const { getFormRules } = useFormRules()

const formData = reactive({
  account: 'vben',
  password: '123456',
})

const { validForm } = useFormValid(formRef)

//onKeyStroke('Enter', handleLogin);

const show = computed(() => unref(getLoginState) === LoginStateEnum.LOGIN)

async function handleLogin() {
  const data = await validForm()
  if (!data) return
  try {
    loading.value = true
    const userInfo = await userStore.login({
      password: data.password,
      username: data.account,
      mode: 'none', //不要默认的错误提示
    })
    if (userInfo) {
      notification.success({
        message: t('sys.login.loginSuccessTitle'),
        description: `${t('sys.login.loginSuccessDesc')}: ${userInfo.realname}`,
        duration: 3,
      })
    }
  } catch (error) {
    Modal.error({
      title: t('sys.api.errorTip'),
      content:
        (error as unknown as Error).message || t('sys.api.networkExceptionMsg'),
    })
  } finally {
    loading.value = false
  }
}
</script>
<template>
  <login-form-title v-show="show" class="enter-x" />
  <a-form
    class="p-4 enter-x"
    :model="formData"
    :rules="getFormRules"
    ref="formRef"
    v-show="show"
    @keypress.enter="handleLogin"
  >
    <a-form-item name="account" class="enter-x">
      <a-input
        size="large"
        v-model:value="formData.account"
        :placeholder="t('sys.login.userName')"
        class="fix-auto-fill"
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

    <a-row class="enter-x">
      <a-col :span="12">
        <a-form-item>
          <!-- No logic, you need to deal with it yourself -->
          <a-checkbox v-model:checked="rememberMe" size="small">
            {{ t('sys.login.rememberMe') }}
          </a-checkbox>
        </a-form-item>
      </a-col>
      <a-col :span="12">
        <a-form-item :style="{ 'text-align': 'right' }">
          <!-- No logic, you need to deal with it yourself -->
          <a-button
            type="link"
            size="small"
            @click="setLoginState(LoginStateEnum.RESET_PASSWORD)"
          >
            {{ t('sys.login.forgetPassword') }}
          </a-button>
        </a-form-item>
      </a-col>
    </a-row>

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
    </a-form-item>
    <a-row class="enter-x">
      <a-col :md="8" :xs="24">
        <a-button block @click="setLoginState(LoginStateEnum.MOBILE)">
          {{ t('sys.login.mobileSignInFormTitle') }}
        </a-button>
      </a-col>
      <a-col :md="8" :xs="24" class="!my-2 md:!my-0 xs:mx-0 md:mx-2">
        <a-button block @click="setLoginState(LoginStateEnum.QR_CODE)">
          {{ t('sys.login.qrSignInFormTitle') }}
        </a-button>
      </a-col>
      <a-col :md="7" :xs="24">
        <a-button block @click="setLoginState(LoginStateEnum.REGISTER)">
          {{ t('sys.login.registerButton') }}
        </a-button>
      </a-col>
    </a-row>

    <a-divider class="enter-x">{{ t('sys.login.otherSignIn') }}</a-divider>

    <div class="flex justify-evenly enter-x" :class="`sign-in-way`">
      <github-filled />
      <wechat-filled />
      <alipay-circle-filled />
      <google-circle-filled />
      <twitter-circle-filled />
    </div>
  </a-form>
</template>
