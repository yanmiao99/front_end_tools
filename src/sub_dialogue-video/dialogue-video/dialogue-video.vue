<template>
  <view class="wrapper">
    <view class="video-box">
      <video controls class="video" autoplay :src="videoUrl"/>
    </view>
    <view class="btn-group">
      <u-button text="下载" icon="download" iconColor="#fff" @tap="handleDownLoadVideo"/>
      <u-button text="下一个" icon="reload" iconColor="#fff" @tap="handleNextOneVideo"/>
    </view>
  </view>
</template>

<script>
import downloadVideo from "@/utils/downloadVideo";

export default {
  name: "dialogue-video",
  data() {
    return {
      videoUrl: "",
    }
  },
  onLoad() {
    this.getVideoData()
  },
  methods: {
    async getVideoData() {
      const {data} = await this.$http.get('https://v.api.aa1.cn/api/api-video-qinglvduihua/index.php?aa1=json')
      this.videoUrl = encodeURI('https:' + data.mp4)
      console.log(this.videoUrl);
    },

    handleNextOneVideo() {
      this.getVideoData()
    },

    handleDownLoadVideo() {
      downloadVideo(this.videoUrl)
    },
  }
}
</script>

<style scoped lang="scss">
.wrapper {
  .video-box {
    height: 85vh;
    width: 100%;

    .video {
      width: 100%;
      height: 100%;
    }
  }

  .btn-group {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 5%;
    box-sizing: border-box;

    ::v-deep .u-button {
      margin-right: 20rpx;

      &:last-child {
        margin-right: 0;
      }
    }

  }
}

</style>
