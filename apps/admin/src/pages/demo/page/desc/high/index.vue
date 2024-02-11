<script lang="ts" setup>
import { useTable } from '@vben/vbencomponents'
import { refundTimeTableSchema, refundTimeTableData } from './data'

const [registerTimeTable] = useTable({
  title: '退货进度',
  columns: refundTimeTableSchema,
  pagination: false,
  data: refundTimeTableData,
  align: 'center',
})
</script>

<template>
  <VbenCard title="单号：234231029431">
    <template #header-extra>
      <vben-space>
        <vben-button> 操作一 </vben-button>
        <vben-button> 操作二 </vben-button>
        <vben-button type="primary"> 主操作 </vben-button>
      </vben-space>
    </template>

    <vben-tabs type="line" animated>
      <vben-tab-pane name="详情" tab="详情"> </vben-tab-pane>
      <vben-tab-pane name="规则" tab="规则"> </vben-tab-pane>
    </vben-tabs>

    <VbenDesc size="small" :column="2" labelPlacement="left">
      <VbenDescItem label="创建人"> 曲丽丽 </VbenDescItem>
      <VbenDescItem label="订购产品"> XX 服务 </VbenDescItem>
      <VbenDescItem label="创建时间"> 2017-01-10 </VbenDescItem>
      <VbenDescItem label="关联单据">
        <a>12421</a>
      </VbenDescItem>
      <VbenDescItem label="生效日期"> 2017-07-07 ~ 2017-08-08 </VbenDescItem>
      <VbenDescItem label="备注"> 请于两个工作日内确认 </VbenDescItem>
    </VbenDesc>
    <VbenCard title="流程进度" :bordered="false">
      <VbenSteps :current="2" size="small">
        <VbenStep
          title="创建项目"
          description="Vben agreed at 2016-12-12 12:32"
        />
        <VbenStep title="部门初审" description="Chad" />
        <VbenStep title="财务复核" />
        <VbenStep title="完成" />
      </VbenSteps>
    </VbenCard>

    <VbenCard title="用户信息">
      <VbenDesc :column="3" labelPlacement="left">
        <VbenDescItem label="用户姓名"> 付小小 </VbenDescItem>
        <VbenDescItem label="会员卡号"> XX 32943898021309809423 </VbenDescItem>
        <VbenDescItem label="身份证"> 3321944288191034921 </VbenDescItem>
        <VbenDescItem label="联系方式"> 18112345678 </VbenDescItem>
        <VbenDescItem label="联系地址" :span="2">
          曲丽丽 18100000000 浙江省杭州市西湖区黄姑山路工专路交叉路口
        </VbenDescItem>
      </VbenDesc>
    </VbenCard>
    <VbenCard title="信息组">
      <VbenDesc :column="3" labelPlacement="left">
        <VbenDescItem label="某某数据"> 111 </VbenDescItem>
        <VbenDescItem label="该数据更新时间"> 2017-08-08 </VbenDescItem>
        <VbenDescItem label="某某数据"> 725 </VbenDescItem>
        <VbenDescItem label="该数据更新时间"> 2017-08-08 </VbenDescItem>
      </VbenDesc>
    </VbenCard>

    <VbenCard title="多层级信息组">
      <VbenDesc title="组名称" :column="3" labelPlacement="left">
        <VbenDescItem label="负责人"> 林东东 </VbenDescItem>
        <VbenDescItem label="角色码"> 1234567 </VbenDescItem>
        <VbenDescItem label="所属部门"> XX公司 - YY部 </VbenDescItem>
        <VbenDescItem label="过期时间"> 2017-08-08 </VbenDescItem>
        <VbenDescItem label="描述" :span="2">
          这段描述很长很长很长很长很长很长很长很长很长很长很长很长很长很长...
        </VbenDescItem>
      </VbenDesc>
      <VbenDivider />
      <VbenDesc title="组名称" :column="1" labelPlacement="left">
        <VbenDescItem label="学名">
          Citrullus lanatus (Thunb.) Matsum. et
          Nakai一年生蔓生藤本；茎、枝粗壮，具明显的棱。卷须较粗..
        </VbenDescItem>
      </VbenDesc>
      <VbenDivider />
      <VbenDesc title="组名称" :column="1" labelPlacement="left">
        <VbenDescItem label="负责人"> 付小小 </VbenDescItem>
        <VbenDescItem label="角色码"> 1234568 </VbenDescItem>
      </VbenDesc>
    </VbenCard>
    <VbenCard title="用户近半年来电记录" class="my-5">
      <VbenEmpty />
    </VbenCard>

    <VbenTable @register="registerTimeTable">
      <template #t3_default="{ row }">
        <VbenBadge type="success" dot />
        <span class="ml-2">{{ row.t3 }}</span>
      </template>
    </VbenTable>
  </VbenCard>
</template>
