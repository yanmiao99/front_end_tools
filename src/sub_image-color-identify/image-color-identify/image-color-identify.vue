<template>
  <view class="wrapper">
    <upload-image-box :value.sync="uploadInfo"/>
    <view class="result-box" v-if="resultList.length > 0">
      <u-grid :border="false" col="4">
        <u-grid-item
            v-for="(item,index) in resultList"
            :key="index"
            @click="handleGridClick(item)">
          <view class="grid-box" :style="{background:item}"/>
          <text class="grid-text">{{ item }}</text>
        </u-grid-item>
      </u-grid>
    </view>
  </view>
</template>

<script>
import share from "@/mixins/share";
import copyText from "@/utils/copyText";
import rgb2hex from "@/utils/rgb2hex";

export default {
  mixins: [share],
  name: "image_color_identify",
  data() {
    return {
      uploadInfo: {},
      resultList: []
    }
  },
  watch: {
    'uploadInfo.url': {
      async handler() {
        await this.identifyImageFn(this.uploadInfo.url)
      },
      deep: true
    }
  },
  methods: {

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
        let tempArr = data.rgb_all.split(";").splice(0, 8)
        tempArr.forEach(item => {
          this.resultList.push(rgb2hex(item))
        })
      }
    },
    handleGridClick(item) {
      copyText(item)
    }
  }
}
</script>

<style scoped lang="scss">
.wrapper {
  .result-box {
    width: 630rpx;
    margin: 0 auto;
  }

  .grid-box {
    width: 140rpx;
    height: 140rpx;
  }

}
</style>
