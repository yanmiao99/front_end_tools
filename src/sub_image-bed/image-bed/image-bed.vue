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
          uploadText="请上传图片"
      />
    </view>
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

import uploadImage from "@/utils/uploadImage";

export default {
  name: "image-bed",
  data() {
    return {
      fileList: [], // 所上传的视频的列表
      uploadInfo: {}, // 上传视频后的信息
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
      this.uploadInfo = result
    },

    // 复制链接
    handleBtnCopyText() {
      uni.setClipboardData({
        data: this.uploadInfo.url,//要被复制的内容
        success: () => {//复制成功的回调函数
          uni.showToast({//提示
            title: `复制成功`,
            icon: 'success'
          })
        }
      }, true);
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

  .tips {
    color: $u-tips-color;
    width: 90%;
    margin: 0 auto;

    view {
      margin: 20rpx 0;
      font-size: 30rpx;
    }
  }
}
</style>
