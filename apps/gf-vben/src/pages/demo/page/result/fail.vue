<script lang="ts" setup>
import { CloseCircleOutlined } from '@ant-design/icons-vue'
</script>

<template>
  <div class="m-5 result-error">
    <VbenResult
      status="error"
      title="提交失败"
      description="请核对并修改以下信息后，再重新提交。"
    >
      <template #footer>
        <VbenButton key="console" type="primary"> 返回修改 </VbenButton>
      </template>
    </VbenResult>
    <div class="result-error__content">
      <div class="result-error__content-title">您提交的内容有如下错误：</div>
      <div class="mb-4">
        <CloseCircleOutlined class="mr-2 result-error__content-icon" />
        您的账户已被冻结
        <VbenButton text tag="a" class="ml-4" type="primary">
          立即解冻 >
        </VbenButton>
      </div>
      <div class="mb-4">
        <CloseCircleOutlined class="mr-2 result-error__content-icon" />
        您的账户还不具备申请资格
        <VbenButton text tag="a" class="ml-4" type="primary">
          立即解冻 >
        </VbenButton>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.result-error {
  padding: 48px 32px;

  &__content {
    margin-top: 24px;
    padding: 24px 40px;
    background-color: #fafafa;

    &-title {
      margin-bottom: 16px;
      font-size: 16px;
      font-weight: 500;
    }

    &-icon {
      color: #ff4d4f;
    }
  }
}
</style>
