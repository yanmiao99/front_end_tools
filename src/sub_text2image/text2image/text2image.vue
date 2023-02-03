<template>
  <view class="wrapper">
    <view class="operation-area">
      <u--input
          placeholder="请输入需要生成文字的内容"
          border="surround"
          v-model="textContent"
      />
      <view class="btn-group">
        <u-button
            type="primary"
            text='生成举牌小人'
            @tap="handleGenerateImage('raise')"/>
        <u-button
            type="primary"
            disabled
            text='生成白底黑字'
            @tap="handleGenerateImage('black')"/>
      </view>
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
import share from "@/mixins/share";

export default {
  mixins: [share],

  name: "text2image",
  data() {
    return {
      textContent: '',
      imgBase64: '',
    }
  },
  methods: {
    async handleGenerateImage(type) {
      if (!this.textContent) {
        uni.showToast({
          icon: 'error',
          title: '请输入文字'
        })
        return
      }

      uni.showLoading({
        title: '生成中...'
      })

      if (type === 'raise') {
        let url = `https://v.api.aa1.cn/api/api-jupai/index.php?msg=${this.textContent}`
        const {data} = await this.$http.get(url, {
          responseType: 'arraybuffer'
        })
        this.imgBase64 = 'data:image/png;base64,' + uni.arrayBufferToBase64(data)
      } else if (type === 'black') {

      }


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

  .operation-area {
    width: 100%;

  }

  .btn-group {
    margin-top: 20rpx;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;

    ::v-deep .u-button {
      width: 48% !important;
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
