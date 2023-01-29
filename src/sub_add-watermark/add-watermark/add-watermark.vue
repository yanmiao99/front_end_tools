<template>
  <view class="wrapper">

    <view class="upload-box">
      <u-upload
          :fileList="fileList"
          @afterRead="handleAfterRead"
          @delete="handleDeletePic"
          multiple
          accept="image"
          :maxCount="1"
          :capture="['album', 'camera']"
          width="208"
          height="208"
          uploadText="请上传需要处理的图片"
      />
    </view>
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

import uploadImage from "@/utils/uploadImage";
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
      uploadUrl: '', // 上传视频后的url
      showImgUrl: '',
      btnDisabled: false
    }
  },
  methods: {
    // 删除图片
    handleDeletePic(event) {
      this.fileList.splice(event.index, 1)
    },

    // 上传图片
    async handleAfterRead(event) {
      this.fileList.push({
        ...event.file,
        status: 'uploading',
        message: '上传中'
      })
      const url = event.file[0].url
      const result = await uploadImage(url)
      this.fileList.splice(0, 1, Object.assign(this.fileList[0], {
        status: 'success',
        message: '上传成功',
        url: result.url
      }))
      this.uploadUrl = result.url
    },

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
      if (!this.uploadUrl) {
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

      const uri = `https://zj.v.api.aa1.cn/api/sy-01/?msg=${this.watermarkValue}&type=2&img=${this.uploadUrl}`
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

  .upload-box {
    width: 400rpx;
    height: 400rpx;
    margin: 100rpx auto;
    border: 4rpx dashed $uni-color-primary;
    background: #F4F5F7;
    border-radius: 20rpx;
    overflow: hidden;

    ::v-deep .uicon-camera-fill {
      font-size: 200rpx !important;
      margin-bottom: 100rpx !important;
    }

    ::v-deep .u-upload__deletable {
      background-color: rgba(55, 55, 55, 0.8);
      height: 80rpx;
      width: 80rpx;

      .uicon-close {
        font-size: 60rpx !important;
        line-height: normal !important;
      }
    }
  }

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
