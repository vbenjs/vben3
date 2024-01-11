<script lang="ts" setup>
import { ref } from 'vue'
import { CropperImage, CropperAvatar } from '@vben/components'
import img from '@/assets/images/header.jpg'

const info = ref('')
const cropperImg = ref('')
const circleInfo = ref('')
const circleImg = ref('')
const avatar = ref('')
function handleCropend({ imgBase64, imgInfo }) {
  info.value = imgInfo
  cropperImg.value = imgBase64
}

function handleCircleCropend({ imgBase64, imgInfo }) {
  circleInfo.value = imgInfo
  circleImg.value = imgBase64
}
</script>

<template>
  <VbenCard
    title="图片裁剪示例"
    content="需要开启测试接口服务才能进行上传测试！"
  >
    <VbenCard title="头像裁剪">
      <CropperAvatar :value="avatar" />
    </VbenCard>

    <VbenCard title="矩形裁剪" class="my-4">
      <div class="container p-4">
        <div class="cropper-container mr-10">
          <CropperImage
            ref="refCropper"
            :src="img"
            @cropend="handleCropend"
            style="width: 40vw"
          />
        </div>
        <img :src="cropperImg" class="croppered" v-if="cropperImg" alt="" />
      </div>
      <p v-if="cropperImg">裁剪后图片信息：{{ info }}</p>
    </VbenCard>

    <VbenCard title="圆形裁剪">
      <div class="container p-4">
        <div class="cropper-container mr-10">
          <CropperImage
            ref="refCropper"
            :src="img"
            @cropend="handleCircleCropend"
            style="width: 40vw"
            circled
          />
        </div>
        <img :src="circleImg" class="croppered" v-if="circleImg" />
      </div>
      <p v-if="circleImg">裁剪后图片信息：{{ circleInfo }}</p>
    </VbenCard>
  </VbenCard>
</template>

<style scoped>
.container {
  display: flex;
  align-items: center;
  width: 100vw;
}

.cropper-container {
  width: 40vw;
}

.croppered {
  height: 360px;
}

p {
  margin: 10px;
}
</style>
