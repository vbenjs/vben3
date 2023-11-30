<template>
  <VbenCard title="打印示例">
    <VbenCard title="json打印表格">
      <VbenButton type="primary" @click="jsonPrint">打印</VbenButton>
    </VbenCard>
    <VbenCard title="图片打印">
      <VbenButton type="primary" @click="imagePrint">Image Print</VbenButton>
    </VbenCard>
    <VbenCard title="二维码打印">
      <qr-code id="print-content" value="Hello World" :width="200" />
      <VbenButton type="primary" @click="qrcodePrint">Qrcode Print</VbenButton>
    </VbenCard>
  </VbenCard>
</template>
<script lang="ts" setup>
import { QrCode } from '@vben/components'
import printJS from 'print-js'

const jsonPrint = () => {
  printJS({
    printable: [
      { name: 'll', email: '123@gmail.com', phone: '123' },
      { name: 'qq', email: '456@gmail.com', phone: '456' },
    ],
    properties: ['name', 'email', 'phone'],
    type: 'json',
  })
}

const imagePrint = () => {
  printJS({
    printable: [
      'https://anncwb.github.io/anncwb/images/preview1.png',
      'https://anncwb.github.io/anncwb/images/preview2.png',
    ],
    type: 'image',
    header: 'Multiple Images',
    imageStyle: 'width:100%;',
  })
}

const qrcodePrint = () => {
  const element = document.getElementById('print-content') as HTMLElement
  const targetElement = element.children[0] as HTMLCanvasElement
  // 获取Canvas元素转为url
  const url = targetElement.toDataURL()
  printJS({
    printable: url, //如果是图片资源可以直接使用 targetElement.src
    type: 'image',
    header: 'qrcode',
    imageStyle: 'width:100%;',
  })
}
</script>
