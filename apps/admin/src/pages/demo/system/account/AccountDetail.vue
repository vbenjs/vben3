<template>
<!--  <PageWrapper-->
<!--    :title="`用户` + userId + `的资料`"-->
<!--    content="这是用户资料详情页面。本页面仅用于演示相同路由在tab中打开多个页面并且显示不同的数据"-->
<!--    contentBackground-->
<!--    @back="goBack"-->
<!--  >-->
  <div>
    <div class="pt-4 m-4">
        <div v-for="i in 10" :key="i">这是用户{{ userId }}资料Tab</div>
    </div>
<!--  </PageWrapper>-->
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { useRoute } from 'vue-router';
// import { PageWrapper } from '@vben/components/Page';
import { useTabs } from '@vben/hooks';
// import { useGo } from "@vben/hooks";
// import { Tabs } from 'ant-design-vue';

// defineOptions({ name: 'AccountDetail' });

// const ATabs = Tabs;
// const ATabPane = Tabs.TabPane;

const route = useRoute();
// const go = useGo();
// 此处可以得到用户ID
const userId = ref(route.params?.id);
console.log(route.params)
console.log(userId.value)
// const currentKey = ref('detail');
const { setTitle } = useTabs();
// TODO
// 本页代码仅作演示，实际应当通过userId从接口获得用户的相关资料

// 设置Tab的标题（不会影响页面标题）
setTitle('详情：用户' + userId.value);

// 页面左侧点击返回链接时的操作
// function goBack() {
//   // 本例的效果时点击返回始终跳转到账号列表页，实际应用时可返回上一页
//   go('/system/account');
// }
</script>

<style></style>
