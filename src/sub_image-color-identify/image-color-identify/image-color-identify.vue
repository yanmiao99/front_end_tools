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
          width="312"
          height="312"
          uploadText="请上传需要处理的图片"
      />
    </view>
  </view>
</template>

<script>
import share from "@/mixins/share";
import uploadImage from "@/utils/uploadImage";

export default {
  mixins: [share],
  name: "image_color_identify",
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

      await this.identifyImageFn(result.url)
    },

    // 识别图片
    async identifyImageFn(url) {
      uni.showLoading({
        title: '图片识别中'
      })
      const {data} = await this.$http.get(`https://zj.v.api.aa1.cn/api/rgbyes/?url=${url}&type=json`)
      if (data && data.code === 200) {
        uni.hideLoading()
        uni.showToast({
          title: data.msg
        })
        console.log(data);
      }
    },
  }
}
</script>

<style scoped lang="scss">



</style>
