<template>
  <view class="upload-box">
    <u-upload
        :fileList="fileList"
        @afterRead="handleAfterRead"
        @delete="handleDeletePic"
        multiple
        accept="image"
        :maxCount="1"
        :capture="['album', 'camera']"
        width="312"
        height="312"
        :uploadText="text"
    />
  </view>
</template>

<script>
import uploadImage from "@/utils/uploadImage";

export default {
  name: "upload-image-box",
  props: {
    value: {
      type: Object,
      request: true
    },
    text: {
      type: String,
      default: '请上传图片'
    }
  },
  options: {
    styleIsolation: 'shared'
  },
  data() {
    return {
      fileList: [], // 所上传的视频的列表
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

      this.$emit("update:value", result)
    },
  }
}
</script>

<style scoped lang="scss">
.upload-box {
  width: 600rpx;
  height: 600rpx;
  margin: 100rpx auto 50rpx auto;
  border: 4rpx dashed $uni-color-primary;
  background: #F4F5F7;
  border-radius: 20rpx;
  overflow: hidden;

  ::v-deep .uicon-camera-fill {
    font-size: 200rpx !important;
    margin-bottom: 100rpx !important;
  }

  ::v-deep .u-upload__button__text{
    font-size: 26rpx;
  }

  ::v-deep .u-upload__deletable {
    background-color: rgba(55, 55, 55, 0.8) !important;
    height: 80rpx !important;
    width: 80rpx !important;

    .uicon-close {
      font-size: 60rpx !important;
      line-height: normal !important;
    }
  }
}
</style>
