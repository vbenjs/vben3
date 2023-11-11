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
import { onKeyStroke } from '@vueuse/core';
import {
  LoginStateEnum,
  useLoginState,
  useFormRules,
  useFormValid
} from './use-login';
import LoginFormTitle from './login-form-title.vue';
import md5 from 'crypto-js/md5';
const formRef = ref(null);
const loading = ref(false);
const rememberMe = ref(false);

const { t } = useI18n();
const userStore = useUserStore();
const { setLoginState, getLoginState } = useLoginState();
const { getFormRules } = useFormRules();
const formData = reactive({
  account: 'shixia',
  password: '123456'
});

const { validForm } = useFormValid(formRef);
const show = computed(() => unref(getLoginState) === LoginStateEnum.LOGIN);
onKeyStroke('Enter', handleLogin);
let login_time = 0;
async function handleLogin() {
  if (Date.now() - login_time < 100) return;
  login_time = Date.now();
  // 暂时不做校验
  // const data = await validForm()
  // if (!data) return
  try {
    loading.value = true;
    const userInfo = await userStore.login({
      password: md5(formData.password).toString(),
      account: formData.account,
      mode: 'none' //不要默认的错误提示
    });
    if (userInfo) {
      notice.success({
        content: t('sys.login.loginSuccessTitle'),
        meta: `${t('sys.login.loginSuccessDesc')}: ${userInfo.name=="新用户" ? '尊贵的起飞用户':userInfo.name}`,
        duration: 3000
      });
      // setTimeout(() => {
      //   const GetTS = function () {
      //     const nge_Hour = new Date().getHours();
      //     const nge_warmprompt = [
      //       '现在已经过凌晨了，身体是无价的资本喔，早点休息吧！',
      //       '凌晨1点多了，工作是永远都做不完的，别熬坏身子！',
      //       '该休息了，身体可是革命的本钱啊！',
      //       '夜深了，熬夜很容易导致身体内分泌失调，长痘痘的！',
      //       '四点过了，你明天不上班？？？',
      //       '你知道吗，此时是国内网络速度最快的时候！',
      //       '清晨好，这麽早就上班啦，昨晚做的梦好吗？ ',
      //       '新的一天又开始了，祝你过得快乐!',
      //       '早上好，一天之际在于晨，又是美好的一天！',
      //       '上午好！今天你看上去好精神哦！',
      //       '上午好！今天你看上去好精神哦！',
      //       '该吃午饭啦！有什么好吃的？您有中午休息的好习惯吗？',
      //       '该吃午饭啦！有什么好吃的？您有中午休息的好习惯吗？',
      //       '下午好！外面的天气好吗？记得朵朵白云曾捎来朋友殷殷的祝福。',
      //       '下午好！外面的天气好吗？记得朵朵白云曾捎来朋友殷殷的祝福。',
      //       '下午好！外面的天气好吗？记得朵朵白云曾捎来朋友殷殷的祝福。',
      //       '下午好！外面的天气好吗？记得朵朵白云曾捎来朋友殷殷的祝福。',
      //       '太阳落山了！快看看夕阳吧！如果外面下雨，就不必了 ^_^',
      //       '太阳落山了！快看看夕阳吧！如果外面下雨，就不必了 ^_^',
      //       '晚上好，今天的心情怎么样?',
      //       '忙碌了一天，累了吧？快去嫖一下，放松下吧！',
      //       '忙碌了一天，累了吧？快去嫖一下，放松下吧！',
      //       '忙碌了一天，累了吧？快去嫖一下，放松下吧！',
      //       '这么晚了，还在上网？早点洗洗睡吧，睡前记得洗洗脸喔！',
      //       '这么晚了，还在上网？早点洗洗睡吧，睡前记得洗洗脸喔！',
      //     ];
      //     const msg = ' 温馨提示';
      //     return {
      //       message: msg,
      //       description: nge_warmprompt[nge_Hour],
      //       icon: '🚀',
      //     };
      //   };
      //   notice.info(GetTS());
      // }, 1000);
    }
  } catch (error) {
    // dialog.error({
    //   title: t('sys.api.errorTip'),
    //   content:
    //     (error as unknown as Error).message || t('sys.api.networkExceptionMsg')
    // });
    console.log(error)
  } finally {
    loading.value = false;
  }
}
</script>
<template>
  <login-form-title v-show="show" class="enter-x" />
  <vben-form
    ref="formRef"
    :model="formData"
    :rules="getFormRules"
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
