<template>
  <view class="toolbox">
    <u-search
        placeholder="请输入名称进行搜索"
        v-model="keyword"
        :showAction="false"
        borderColor="#dadbde"
        shape="square"
        clearabled/>
    <card-box title="常用工具" :grid-list="gridList"/>
  </view>
</template>

<script>

import share from "@/mixins/share"

export default {
  mixins: [share],
  name: "toolbox",
  components: {},
  data() {
    return {
      gridList: [
        {
          icon: require("@/static/toolbox/calculator.png"),
          name: '商户费率计算器',
          desc: '用于计算商户在客人扫码付款后, 最终能够拿到多少钱',
          path: '/rate-calculator',
          isOnline: true,
        },
        {
          icon: require("@/static/toolbox/interest.png"),
          name: '利息计算器',
          desc: '用于每份钱的投资收益',
          path: '/interest-calculator',
          isOnline: true
        },
      ],
      keyword: ''
    }
  },
  methods: {}
}
</script>

<style scoped lang="scss">
.toolbox {
  padding: 20rpx;
  box-sizing: border-box;
}
</style>
