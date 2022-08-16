<script lang="ts" setup>
import { computed, reactive, ref, unref } from 'vue'
import { useI18n } from '@vben/locale'
import { useUserStore } from '@/store/user'
import { useLockStore } from '@/store/lock'
import { createNamespace } from '@vben/utils'
import headerImg from '@/assets/images/header.jpg'

const props = defineProps({
  value: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['update:value'])

const { bem } = createNamespace('lock-modal')

const formRef = ref()
const formData = reactive({
  password: '',
})

const userStore = useUserStore()
const lockStore = useLockStore()
const { t } = useI18n()

const getRealName = computed(() => userStore.getUserInfo?.realname)

const visible = computed<boolean>({
  get() {
    return props.value
  },
  set(val) {
    emit('update:value', val)
  },
})

async function handleLock() {
  const form = unref(formRef)
  if (!form) {
    return
  }
  const { password } = await form.validate()

  visible.value = false
  lockStore.setLockInfo({
    isLock: true,
    pwd: password,
  })
  await form.resetFields()
}

const avatar = computed(() => userStore?.getUserInfo?.avatar ?? headerImg)
</script>

<template>
  <a-modal
    :footer="null"
    :visible="visible"
    :title="t('layout.header.lockScreen')"
    @cancel="visible = false"
  >
    <div :class="bem('entry')">
      <div :class="bem('header')">
        <img :src="avatar" :class="bem('header-img')" />
        <p :class="bem('header-name')">
          {{ getRealName }}
        </p>
      </div>

      <a-form :model="formData" ref="formRef" @keypress.enter="handleLock">
        <a-form-item
          name="password"
          class="enter-x"
          :rules="[{ required: true }]"
        >
          <a-input-password
            visibilityToggle
            v-model:value="formData.password"
            :placeholder="t('layout.header.lockScreenPassword')"
          />
        </a-form-item>
      </a-form>
      <div :class="bem('footer')">
        <a-button type="primary" block class="mt-2" @click="handleLock">
          {{ t('layout.header.lockScreenBtn') }}
        </a-button>
      </div>
    </div>
  </a-modal>
</template>

<style lang="less">
.lock-modal {
  &__entry {
    position: relative;
    padding: 130px 30px 30px;
    border-radius: 10px;
  }

  &__header {
    position: absolute;
    top: 0;
    left: calc(50% - 45px);
    width: auto;
    text-align: center;

    &-img {
      width: 70px;
      border-radius: 50%;
    }

    &-name {
      margin-top: 5px;
    }
  }

  &__footer {
    text-align: center;
  }
}
</style>
