<template>
  <view class="wrapper">
    <upload-image-box :value.sync="uploadInfo"/>
    <view class="operation-area" v-if="JSON.stringify(uploadInfo) !== '{}'">
      <u-button text="点击复制链接" @tap="handleBtnCopyText"/>
    </view>
    <view class="tips">
      <text>Tips:</text>
      <view>
        1. 禁止上传色情、反动、暴力等违法违规图片！造成的
        一切恶果由图片上传者承担！
      </view>
      <view>
        2. 图床仅支持JPG/PNG/GIF格式的图片的上传。
      </view>
      <view>
        3. 不同图床图片格式限制不一，尺寸太小或者太大的
        图片无法上传。
      </view>
      <view>
        4. 目前本源码直接的上传接口不收集/记录你的上传图片。
      </view>
    </view>
  </view>
</template>

<script>

import share from "@/mixins/share";
import copyText from "@/utils/copyText";


export default {
  mixins: [share],

  name: "image-bed",
  data() {
    return {
      uploadInfo: {}, // 上传视频后的信息
    }
  },
  methods: {
    // 复制链接
    handleBtnCopyText() {
      copyText(this.uploadInfo.url)
    },
  }
}
</script>

<style scoped lang="scss">
.wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  .operation-area {
    width: 80% !important;
    margin: 0 auto;

    ::v-deep .u-button {
      margin-top: 50rpx;
    }
  }

  .effect-preview {
    width: 400rpx;
    height: 400rpx;

    ::v-deep .album__row__wrapper {
      image {
        width: 100% !important;
        height: 100% !important;
      }
    }
  }

  .tips{
    width: 90%;
  }
}
</style>
