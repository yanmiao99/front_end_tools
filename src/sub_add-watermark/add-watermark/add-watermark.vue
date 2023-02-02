<template>
  <view class="wrapper">
    <upload-image-box :value.sync="uploadInfo" text="请上传需要处理的图片"/>
    <view class="operation-area">
      <u--input
          placeholder="请输入水印文字"
          border="surround"
          v-model="watermarkValue"
      ></u--input>
      <u-button text="生成水印并下载到相册" :disabled="btnDisabled" @tap="handleBtnDownload"/>
    </view>
  </view>
</template>

<script>

import saveAlbum from "@/utils/saveAlbum";
import base64ToSrc from "@/utils/base64ToSrc";
import share from "@/mixins/share";

export default {
  mixins: [share],

  name: "add-watermark",
  data() {
    return {
      watermarkValue: '',// 水印内容
      fileList: [], // 所上传的视频的列表
      uploadInfo: {},
      showImgUrl: '',
      btnDisabled: false
    }
  },
  methods: {

    // 生成并下载按钮
    async handleBtnDownload() {
      if (!this.watermarkValue) {
        uni.showToast({
          title: '文字未输入',
          icon: 'error',
          duration: 2000
        });
        return
      }
      if (!this.uploadInfo.url) {
        uni.showToast({
          title: '图片未上传',
          icon: 'error',
          duration: 2000
        });
        return
      }

      uni.showLoading({
        title: '正在处理图片...'
      });
      this.btnDisabled = true

      const uri = `https://zj.v.api.aa1.cn/api/sy-01/?msg=${this.watermarkValue}&type=2&img=${this.uploadInfo.url}`
      const {data} = await this.$http.get(uri, {
        responseType: 'arraybuffer'
      })
      this.showImgUrl = 'data:image/png;base64,' + uni.arrayBufferToBase64(data)

      let imgUrl = base64ToSrc(this.showImgUrl, 'watermark')

      await saveAlbum(imgUrl)

      setTimeout(() => {
        this.btnDisabled = false
      }, 1000)
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
}
</style>
