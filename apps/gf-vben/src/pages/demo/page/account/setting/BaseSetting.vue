<script lang="ts" setup>
import { computed, ref } from 'vue'
import { useForm } from '@vben/vbencomponents'
import headerImg from '@/assets/images/header.jpg'
import { CloudUploadOutlined } from '@ant-design/icons-vue'
import { baseSetschemas } from './data'
import { useUserStore } from '@/store/user'
import { msg } from '@vben/vbencomponents'

const userStore = useUserStore()

const [register, { validate, getFieldValue }] = useForm({
  schemas: baseSetschemas,
})
const data = userStore.getUserInfo
const model = ref({ ...data })

const avatar = computed(() => {
  const { avatar } = userStore.getUserInfo
  return avatar || headerImg
})

// 更新头像 todo
const updateAvatar = ({ src }) => {
  const userInfo = userStore.getUserInfo
  userInfo.avatar = src
  userStore.setUserInfo(userInfo)
}

const handleSubmit = async () => {
  const _validate = await validate()
  if (_validate) return
  const res = await getFieldValue()
  userStore.setUserInfo(res)
  msg.success('更新成功！')
}
</script>
<template>
  <VbenCard title="基本设置">
    <VbenGrid x-gap="12" :cols="2">
      <VbenGridItem>
        <VbenForm
          ref="FormRef"
          labelPlacement="left"
          :labelWidth="120"
          @register="register"
          v-model:model="model"
        />
      </VbenGridItem>
      <VbenGridItem>
        <div class="change-avatar">
          <div class="avatar-title">头像</div>
          <div class="avatar-box">
            <div class="avatar">
              <VbenImage width="150" :src="avatar" objectFit="cover" />
            </div>
            <div class="change-btn">
              <VbenButton type="default" @click="handleSubmit">
                <VbenIcon>
                  <CloudUploadOutlined />
                </VbenIcon>
                更换头像
              </VbenButton>
            </div>
          </div>
        </div>
      </VbenGridItem>
    </VbenGrid>
    <template #footer>
      <VbenButton type="primary" @click="handleSubmit">
        更新基本信息
      </VbenButton>
    </template>
  </VbenCard>
</template>

<style lang="less" scoped>
.change-avatar {
  display: flex;
  align-content: center;
  justify-content: center;
  .avatar-box {
    display: flex;
    align-content: center;
    flex-direction: column;
    align-items: center;
    .avatar {
      width: 150px;
      height: 150px;
      overflow: hidden;
      border-radius: 50%;
    }
    .change-btn {
      margin-top: 15px;
    }
  }
}
</style>
