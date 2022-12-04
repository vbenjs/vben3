<script lang="ts" setup>
import {defineProps, computed, reactive, ref} from "vue";
import { useI18n } from '@vben/locale'
import { context } from '../../../bridge'
import headerImg from '@/assets/images/header.jpg'
const { t } = useI18n();

const props = defineProps({
  show: {
    type: Boolean
  }
})

const { useUserStore, useLockStore } = context
const userStore = useUserStore()
const lockStore = useLockStore()
const getUserInfo = computed(() => {
  const { realName = 'Vben Admin', avatar, desc } = userStore.getUserInfo || {}

  return { realName, avatar: avatar || headerImg, desc }
})
const emits = defineEmits(['update:show'])

const showModal =  computed({
  get: () => props.show,
  set: (val) => {
    emits('update:show', val)
  }
})

const formRef = ref<any>(null)
const formModel = reactive({
  password: ''
})

const handleLock = (e: MouseEvent) =>{
  e.preventDefault()
  console.log(formRef)
  formRef.value?.validate((errors) => {
    if (!errors) {
      console.log('验证通过')
    } else {
      console.log(errors)
    }
  })
  console.log(formModel)
}

// async function handleLock() {
//   const values = (await validateFields()) as any;
//   const password: string | undefined = values.password;
//   closeModal();
//
//   lockStore.setLockInfo({
//     isLock: true,
//     pwd: password,
//   });
//   await resetFields();
// }


</script>

<template>
<VbenModal v-model:show="showModal"  :title="t('layout.header.lockScreen')" preset="card">
  <VbenSpace vertical align="center" >
    <VbenAvatar
      round
      :size="64"
      :src="getUserInfo.avatar"
    />
    <VbenH5>{{ getUserInfo.realName }}</VbenH5>
  </VbenSpace>
  <VbenForm ref="formRef" :model="formModel" label-placement="left">
    <VbenFormItem path="password" :label="t('layout.header.lockScreenPassword')"  :rule="{
        required: true,
        message: t('layout.header.lockScreenPassword'),
        trigger: ['input', 'blur']
      }">
      <VbenInput type="password" v-model:value="formModel.password" show-password-on="mousedown"/>
    </VbenFormItem>
    <VbenFormItem>
      <VbenButton type="info" attr-type="button" block @click="handleLock">{{ t('layout.header.lockScreenBtn') }}</VbenButton>
    </VbenFormItem>
  </VbenForm>
</VbenModal>
</template>

<style lang="less" scoped>

</style>
