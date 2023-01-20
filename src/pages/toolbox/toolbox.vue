<template>
  <view class="toolbox">
    <card-box title="常用工具" :grid-list="gridList"/>
  </view>
</template>

<script>

import CardBox from "@/components/card-box.vue";

export default {
  name: "toolbox",
  components: {CardBox},
  data() {
    return {
      gridList: [
        {
          icon: require("@/static/toolbox/calculator.png"),
          name: '商户费率计算器',
          desc: '用于计算商户在客人扫码付款后, 最终能够拿到多少钱',
          path: '/rate-calculator'
        }
      ]
    }
  },
}
</script>

<style scoped lang="scss">
.toolbox {
  padding: 20rpx;
  box-sizing: border-box;
}
</style>
