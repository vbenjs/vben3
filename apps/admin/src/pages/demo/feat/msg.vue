<script lang="ts" setup>
import { useMsg, useDialog, useNotice } from '@vben/vbencomponents'

const msg = useMsg()
const dialog = useDialog()
const notification = useNotice()

const diologOptions = {
  title: 'Tip',
  content: 'content message...',
  positiveText: '确定',
  negativeText: '取消',
  onPositiveClick: () => {
    msg.success('确定')
  },
  onNegativeClick: () => {
    msg.error('取消')
  },
}

const modalOptions = {
  title: 'Tip',
  content: 'content message...',
  positiveText: '确认',
}

const notificationOptions = {
  content: '说点啥呢',
  meta: '想不出来',
  duration: 2500,
  keepAliveOnHover: true,
}
</script>

<template>
  <VbenCard title="消息示例">
    <VbenCard class="w-full h-32 bg-white rounded-md" title="Message">
      <VbenButton @click="msg.info('Info message')" class="mr-2">
        Info
      </VbenButton>
      <VbenButton
        @click="msg.success('Success message')"
        class="mr-2"
        type="success"
      >
        Success
      </VbenButton>
      <VbenButton
        @click="msg.warning('Warning message')"
        class="mr-2"
        type="warning"
      >
        Warning
      </VbenButton>
      <VbenButton @click="msg.error('Error message')" class="mr-2" type="error">
        Error
      </VbenButton>
      <VbenButton
        @click="msg.loading('Loading...')"
        class="mr-2"
        type="primary"
      >
        Loading
      </VbenButton>
    </VbenCard>

    <VbenCard class="w-full h-32 mt-5 bg-white rounded-md" title="Comfirm">
      <VbenButton @click="dialog.info(diologOptions)" class="mr-2">
        Info
      </VbenButton>
      <VbenButton
        @click="dialog.warning(diologOptions)"
        type="warning"
        class="mr-2"
      >
        Warning
      </VbenButton>
      <VbenButton
        @click="dialog.success(diologOptions)"
        type="success"
        class="mr-2"
      >
        Success
      </VbenButton>
      <VbenButton
        @click="dialog.error(diologOptions)"
        type="error"
        class="mr-2"
      >
        Error
      </VbenButton>
    </VbenCard>

    <VbenCard class="w-full h-32 mt-5 bg-white rounded-md" title="Modal">
      <VbenButton @click="dialog.info(modalOptions)" class="mr-2">
        Info
      </VbenButton>
      <VbenButton
        @click="dialog.success(modalOptions)"
        type="success"
        class="mr-2"
      >
        Success
      </VbenButton>
      <VbenButton @click="dialog.error(modalOptions)" type="error" class="mr-2">
        Error
      </VbenButton>
      <VbenButton
        @click="dialog.warning(modalOptions)"
        type="warning"
        class="mr-2"
      >
        Warning
      </VbenButton>
    </VbenCard>

    <VbenCard class="w-full h-32 mt-5 bg-white rounded-md" title="Notification">
      <VbenButton @click="notification.info(notificationOptions)" class="mr-2">
        Info
      </VbenButton>
      <VbenButton
        @click="notification.success(notificationOptions)"
        type="success"
        class="mr-2"
      >
        Success
      </VbenButton>
      <VbenButton
        @click="notification.error(notificationOptions)"
        type="error"
        class="mr-2"
      >
        Error
      </VbenButton>
      <VbenButton
        @click="notification.warning(notificationOptions)"
        type="warning"
        class="mr-2"
      >
        Warning
      </VbenButton>
    </VbenCard>
  </VbenCard>
</template>
