<script lang="ts" setup>
import { ref } from 'vue'
import { ArrowLeftOutlined, ArrowRightOutlined } from '@ant-design/icons-vue'

const currentStatus = ref('process')
const current = ref<number | null>(1)
const next = () => {
  if (current.value === null) current.value = 1
  else if (current.value >= 4) current.value = null
  else current.value++
}
const prev = () => {
  if (current.value === 0) current.value = null
  else if (current.value === null) current.value = 4
  else current.value--
}
</script>

<template>
  <div class="m-5 result-success">
    <VbenResult
      status="success"
      title="提交成功"
      description="提交结果页用于反馈一系列操作任务的处理结果， 如果仅是简单操作，使用 Message 全局提示反馈即可。 本文字区域可以展示简单的补充说明，如果有类似展示 “单据”的需求，下面这个灰色区域可以呈现比较复杂的内容。"
    >
      <template #footer>
        <VbenSpace justify="center">
          <VbenButton key="console" type="primary"> 返回列表 </VbenButton>
          <VbenButton key="buy"> 查看项目 </VbenButton>
          <VbenButton key="buy"> 打印 </VbenButton>
        </VbenSpace>
      </template>
    </VbenResult>
    <div class="result-success__content">
      <VbenSpace vertical>
        <VbenDescriptions label-placement="left" title="项目名称">
          <VbenDescriptionsItem label="项目 ID"> 111222 </VbenDescriptionsItem>
          <VbenDescriptionsItem label="负责人"> Vben </VbenDescriptionsItem>
          <VbenDescriptionsItem label="生效时间">
            2016-12-12 ~ 2017-12-12
          </VbenDescriptionsItem>
        </VbenDescriptions>
        <VbenSteps :current="current" :status="currentStatus">
          <VbenStep title="创建项目">
            <template #default>
              <div>Vben</div>
              <p>2016-12-12 12:32</p>
            </template>
          </VbenStep>
          <VbenStep title="部门初审" description="Chad" />
          <VbenStep title="财务复核" />
          <VbenStep title="完成" />
        </VbenSteps>
        <VbenSpace>
          <VbenButtonGroup>
            <VbenButton @click="prev">
              <template #icon>
                <VbenIcon>
                  <ArrowLeftOutlined />
                </VbenIcon>
              </template>
            </VbenButton>
            <VbenButton @click="next">
              <template #icon>
                <VbenIcon>
                  <ArrowRightOutlined />
                </VbenIcon>
              </template>
            </VbenButton>
          </VbenButtonGroup>
          <VbenRadioGroup v-model:value="currentStatus" name="basic">
            <VbenRadioButton class="status-radio-btn" value="error">
              Error
            </VbenRadioButton>
            <VbenRadioButton class="status-radio-btn" value="process">
              Process
            </VbenRadioButton>
            <VbenRadioButton class="status-radio-btn" value="wait">
              Wait
            </VbenRadioButton>
            <VbenRadioButton class="status-radio-btn" value="finish">
              Finish
            </VbenRadioButton>
          </VbenRadioGroup>
        </VbenSpace>
      </VbenSpace>
    </div>
  </div>
</template>
<style lang="less" scoped>
.result-success {
  padding: 48px 32px;

  &__content {
    margin-top: 24px;
    padding: 24px 40px;
    background-color: #fafafa;
  }
}

.status-radio-btn {
  height: 34px;
  line-height: 34px;
}
</style>
