<template>
  <view class="card-box">
    <h2 class="sub-title">{{ title }}</h2>

    <scroll-view style="height: 80vh;" scroll-y="true" class="card-wrapper">
      <template v-for="item in gridList">
        <view
            v-if="item.isShow"
            class="card-item u-border"
            :key="item.name"
            @click="handleGridClick(item)">
          <view class="card-top">
            <image class="image" :src="item.icon"/>
            <h3 class="name u-line-1">{{ item.name }}</h3>
          </view>
          <text class="desc u-line-2">{{ item.desc }}</text>
        </view>
      </template>
    </scroll-view>

    <u-toast ref="uToast"/>
  </view>
</template>

<script>
export default {
  name: "card-box",
  props: {
    title: {
      type: String,
      default: '默认名称',
      required: true
    },
    gridList: {
      type: Array,
      required: true,
    }
  },
  methods: {
    handleGridClick({path, isOnline}) {
      if (isOnline) {
        uni.$u.route({
          url: path,
        })
      } else {
        this.$refs.uToast.show({
          type: 'default',
          message: "应用开发中,敬请期待...",
        })
      }
    },
  }
}
</script>

<style scoped lang="scss">
.sub-title {
  padding-left: 20rpx;
  font-size: 30rpx;
  color: $u-tips-color;
  margin: 20rpx 0;
}

.card-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100%;

  .card-item {
    width: 100%;
    background: #fff;
    border-radius: 20rpx;
    padding: 20rpx;
    box-sizing: border-box;
    margin-bottom: 20rpx;
    max-height: 300px;

    .card-top {
      display: flex;
      align-items: center;

      .image {
        width: 80rpx;
        height: 80rpx;
        border-radius: 50%;
        margin-right: 20rpx;
      }

      .name {
        flex: 1;
        font-size: 30rpx;
        font-weight: bold;
      }
    }

    .desc {
      color: $u-tips-color;
      margin-top: 10rpx;
      font-size: 28rpx;
    }
  }
}

</style>
