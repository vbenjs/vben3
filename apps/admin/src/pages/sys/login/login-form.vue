<script lang="ts" setup>
import { reactive, ref, unref, computed } from 'vue';
import {
  GithubFilled,
  WechatFilled,
  AlipayCircleFilled,
  GoogleCircleFilled,
  TwitterCircleFilled
} from '@ant-design/icons-vue';
import { useI18n } from '@vben/locale';
import { notice } from '@vben/vbencomponents'
import { useUserStore } from '@/store/user';
import {
  LoginStateEnum,
  useLoginState,
  useFormRules,
  useFormValid
} from './use-login';
import LoginFormTitle from './login-form-title.vue';

const formRef = ref();
const loading = ref(false);
const rememberMe = ref(false);

const { t } = useI18n();
const userStore = useUserStore();
const { setLoginState, getLoginState } = useLoginState();
const { getFormRules } = useFormRules();

const formData = reactive({
  account: 'vben',
  password: '123456'
});

const { validForm } = useFormValid(formRef);
//onKeyStroke('Enter', handleLogin);

const show = computed(() => unref(getLoginState) === LoginStateEnum.LOGIN);

async function handleLogin() {
  // 暂时不做校验
  // const data = await validForm()
  // if (!data) return
  try {
    loading.value = true;
    const userInfo = await userStore.login({
      password: formData.password,
      username: formData.account,
      mode: 'none' //不要默认的错误提示
    });

    if (userInfo) {
      notice.success({
        content: t('sys.login.loginSuccessTitle'),
        meta: `${t('sys.login.loginSuccessDesc')}: ${userInfo.realname}`,
        duration: 3000
      });
    }
  } catch (error) {
    // dialog.error({
    //   title: t('sys.api.errorTip'),
    //   content:
    //     (error as unknown as Error).message || t('sys.api.networkExceptionMsg')
    // });
  } finally {
    loading.value = false;
  }
}
</script>
<template>
  <login-form-title v-show="show" class="enter-x" />
  <vben-form
    :model="formData"
    :rules="getFormRules"
    ref="formRef"
    v-show="show"
    @keypress.enter="handleLogin"
  >
    <vben-form-item class="enter-x" inline :show-label="false" >
      <vben-input
        size="large"
        v-model:value="formData.account"
        :placeholder="t('sys.login.userName')"
        class="fix-auto-fill"
      />
    </vben-form-item>
    <vben-form-item class="enter-x" inline :show-label="false">
      <vben-input
        type="password"
        show-password-on="click"
        size="large"
        v-model:value="formData.password"
        :placeholder="t('sys.login.password')"
      />
    </vben-form-item>

    <vben-grid class="enter-x">
      <vben-grid-item :span="12">
        <vben-form-item inline :show-label="false">
          <!-- No logic, you need to deal with it yourself -->
          <vben-checkbox v-model:checked="rememberMe" size="small">
            {{t('sys.login.rememberMe')}}
          </vben-checkbox>
        </vben-form-item>
      </vben-grid-item>
      <vben-grid-item :span="12" >
        <vben-form-item inline :show-label="false" class="justify-items-end" >
          <!-- No logic, you need to deal with it yourself -->
          <vben-button
            text
            tag="a"
            type="primary"
            size="small"
            @click="setLoginState(LoginStateEnum.RESET_PASSWORD)"
          >
            {{t('sys.login.forgetPassword')}}
          </vben-button>
        </vben-form-item>
      </vben-grid-item>
    </vben-grid>

    <vben-form-item class="enter-x" inline :show-label="false" >
      <vben-button
        type="primary"
        size="large"
        block
        @click="handleLogin"
        :loading="loading"
      >
        {{t('sys.login.loginButton')}}
      </vben-button>
    </vben-form-item>

    <vben-grid class="enter-x" :cols="3">
      <vben-grid-item :md="8" :xs="24">
        <vben-button block @click="setLoginState(LoginStateEnum.MOBILE)">
          {{t('sys.login.mobileSignInFormTitle')}}
        </vben-button>
      </vben-grid-item>
      <vben-grid-item :md="8" :xs="24" class="md:!my-0 xs:mx-0 md:mx-2">
        <vben-button block @click="setLoginState(LoginStateEnum.QR_CODE)">
          {{t('sys.login.qrSignInFormTitle')}}
        </vben-button>
      </vben-grid-item>
      <vben-grid-item :md="7" :xs="24">
        <vben-button block @click="setLoginState(LoginStateEnum.REGISTER)">
          {{t('sys.login.registerButton')}}
        </vben-button>
      </vben-grid-item>
    </vben-grid>

    <vben-divider class="enter-x">{{t('sys.login.otherSignIn')}}</vben-divider>

    <div class="flex justify-evenly enter-x" :class="`sign-in-way`">
      <github-filled />
      <wechat-filled />
      <alipay-circle-filled />
      <google-circle-filled />
      <twitter-circle-filled />
    </div>
  </vben-form>
</template>
