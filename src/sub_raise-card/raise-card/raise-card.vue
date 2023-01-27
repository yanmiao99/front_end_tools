<template>
  <view class="wrapper">
    <view class="btn-group">
      <u--input
          placeholder="请输入需要生成文字的内容"
          border="surround"
          v-model="textContent"
      />
      <u-button
          type="primary"
          text='点击生成'
          @tap="handleGenerateImage"/>
    </view>

    <view class="image-box" v-if="imgBase64">
      <image :src="imgBase64" mode="aspectFit"/>
      <u-button
          type="primary"
          text='保存图片'
          @tap="handleSaveImage"/>
    </view>
  </view>
</template>

<script>
import saveAlbum from "@/utils/saveAlbum";
import base64ToSrc from "@/utils/base64ToSrc";

export default {
  name: "raise-card",
  data() {
    return {
      textContent: '',
      imgBase64: '',
    }
  },
  methods: {
    async handleGenerateImage() {
      uni.showLoading({
        title: '生成中...'
      })
      const {data} = await this.$http.get(`https://v.api.aa1.cn/api/api-jupai/index.php?msg=${this.textContent}`, {
        responseType: 'arraybuffer'
      })
      this.imgBase64 = 'data:image/png;base64,' + uni.arrayBufferToBase64(data)
      uni.hideLoading()
    },
    handleSaveImage() {
      const imgUrl = base64ToSrc(this.imgBase64, 'raiseCard')
      saveAlbum(imgUrl)
    }
  }
}
</script>

<style scoped lang="scss">
.wrapper {
  padding: 20rpx;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  .btn-group {
    width: 100%;

    ::v-deep .u-button {
      margin: 30rpx 0;
    }
  }

  .image-box {
    width: 100%;

    image {
      width: 100%;
      height: 300rpx;
      margin: 40rpx;
    }
  }
}

</style>
