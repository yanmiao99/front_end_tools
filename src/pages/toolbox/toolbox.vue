<template>
  <view class="toolbox">
    <view class="search-box">
      <u-search
          placeholder="请输入名称进行搜索"
          v-model="keyword"
          :showAction="false"
          borderColor="#dadbde"
          shape="square"
          @change="handleChangeSearch"
          clearabled/>
    </view>
    <view class="card-list">
      <card-box
          v-if="searchGridList.length > 0"
          class="card-box"
          title="常用工具"
          :grid-list="searchGridList"/>
      <u-empty v-else mode="search"/>
    </view>
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
      keyword: '',
      searchGridList: gridList
    }
  },
  methods: {
    handleChangeSearch(e) {
      if (e.length > 0) {
        this.searchGridList = gridList.filter(item => item.name.match(e))
      } else {
        this.searchGridList = gridList
      }
    }
  }
}
</script>

<style scoped lang="scss">
.toolbox {
  .search-box {
    background: $uni-color-primary;
    padding: 30rpx;
    box-sizing: border-box;
    border-bottom-left-radius: 40rpx;
    border-bottom-right-radius: 40rpx;
  }

  .card-list {
    padding: 20rpx;
    box-sizing: border-box;
  }
}
</style>
