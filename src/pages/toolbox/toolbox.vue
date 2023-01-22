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
import gridList from "@/config/toolbox_gridList"

export default {
  mixins: [share],
  name: "toolbox",
  components: {},
  data() {
    return {
      gridList,
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
