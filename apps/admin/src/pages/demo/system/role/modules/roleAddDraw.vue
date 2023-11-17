<!--
 * @Author       : ya2glu@163.com
 * @Date         : 2023-11-16 17:36:51
 * @LastEditTime : 2023-11-16 23:29:50
 * @LastEditors  : ya2glu
 * @Description  : role add Draw
 * @FilePath     : \vben3\apps\admin\src\pages\demo\system\role\modules\roleAddDraw.vue
-->
<script lang="ts" setup>
import { ref, defineExpose } from 'vue'
import { useForm } from '@vben/vbencomponents'
import { roleAddFormSchema } from "./schemas";
const roleDrawerFlag = ref(false)

function open() {
  return (roleDrawerFlag.value = true)
}
defineExpose({
  open,
})

const [roleFormReg, { getFieldValue, validate }] = useForm({
  inline: true,
  actions: true,
  schemas: roleAddFormSchema,
})
const model = ref({})
</script>
<template>
  <VbenDrawer
    v-model:show="roleDrawerFlag"
    :width="500"
    placement="right"
    :mask-closable="false"
  >
    <VbenDrawerContent closable>
      <template #header>新增角色</template>
      <VbenForm
        ref="roleFormRef"
        class="w-full"
        @register="roleFormReg"
        v-model:model="model"
      />
      <template #footer>
        <VbenSpace>
          <VbenButton type="primary">新增</VbenButton>
          <VbenButton type="tertiary">取消</VbenButton>
        </VbenSpace>
      </template>
    </VbenDrawerContent>
  </VbenDrawer>
</template>

<style lang="less" scoped></style>
