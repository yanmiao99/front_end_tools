<template>
  <view class="content">
    <image src="@/static/avatar-generate/background.jpg" class="all-back"></image>
    <view class="top-content">
      <view class="top-title">
        <view class="title-unit"
              :class="{ 'title-select': item.selected }"
              v-for="item in imageList"
              :key="item.key"
              @click="itemClick(item)">
          {{ item.title }}
        </view>
      </view>
      <scroll-view scroll-x :show-scrollbar="false" class="scroll-view">
        <view class="image-div">
          <image
              :class="{ 'image-margin': index !== 0 }"
              @click="imageClick(item, index)"
              v-for="(item, index) in getImageList()"
              :src="item.src"
              :key="index"
          ></image>
        </view>
      </scroll-view>
    </view>
    <view class="image-card">
      <view class="photo-main-view">
        <view class="avatar-div " id="avatar-container">
          <image class="img" id="avatar-img" :src="avatarImage"></image>

          <view class="empty-view " v-if="!avatarImage">
            <image class="empty"
                   src="@/static/avatar-generate/avatar_empty.svg"></image>
          </view>

          <image class="avatar-default " :src="currentFrame" v-if="currentFrame"></image>
        </view>
        <view class="btn-group">
          <view class="icon-div btn-margin">
            <view class="icon-zuo iconfont" v-if="showSwitch(-1)" @click="switchAvatar(-1)"></view>
            <view class="icon-you iconfont" v-if="showSwitch(1)" @click="switchAvatar(1)"></view>
          </view>

          <button class="action-btn btn-margin">分享程序</button>

          <button
              class="action-btn btn-margin"
              open-type="chooseAvatar"
              @chooseavatar="getChooseAvatar">
            获取头像
          </button>

          <button class="action-btn btn-primary" @click="saveAvatar">保存头像</button>

        </view>
      </view>
    </view>
    <canvas
        class="hideCanvas"
        id="default_PosterCanvasId"
        canvas-id="default_PosterCanvasId"
        :style="{ width: (poster.width || 10) + 'px', height: (poster.height || 10) + 'px' }"
    ></canvas>
  </view>
</template>

<script>
import _app from '@/utils/QS-SharePoster/app.js';
import {getSharePoster} from '@/utils/QS-SharePoster/QS-SharePoster.js';


import saveAlbum from "@/utils/saveAlbum";
import share from "@/mixins/share"
import avatar_imageList from "@/config/avatar_imageList";

export default {
  mixins: [share],
  data() {
    return {
      poster: {},
      canvasId: 'default_PosterCanvasId',
      wxCode: '',
      avatarImage: '',
      currentFrame: require('@/static/avatar-generate/new/NA.png'),
      currentIndex: 0,
      imageList: avatar_imageList
    };
  },
  onLoad() {
    // #ifdef MP-WEIXIN
    uni.login({
      provider: 'weixin',
      success: (loginRes) => {
        this.wxCode = loginRes.code;
      },
    });
    // #endif
  },
  methods: {
    // 切换头像
    switchAvatar(num) {
      if ((num > 0 && this.currentIndex < this.getImageList().length - 1) || (num < 0 && this.currentIndex > 0)) {
        this.currentIndex += num;
        this.currentFrame = this.getImageList()[this.currentIndex].src;
      } else {
        let currentType = this.imageList.findIndex(data => data.selected);
        currentType += num;
        if (currentType >= 0 && currentType < this.imageList.length) {
          this.itemClick(this.imageList[currentType]);
          this.currentIndex = num < 0 ? this.getImageList().length - 1 : 0;
          this.currentFrame = this.getImageList()[0].src;
        }
      }
    },

    // 显示切换
    showSwitch(val) {
      let currentType = this.imageList.findIndex(data => data.selected);
      let res =
          (val < 0 && currentType <= 0 && this.currentIndex <= 0) ||
          (val > 0 && currentType >= this.imageList.length - 1 && this.currentIndex >= this.getImageList().length - 1);
      return !res;
    },

    // 保存头像
    async saveAvatar() {
      if (!this.avatarImage) {
        uni.showToast({
          title: '请先获取头像',
          icon: 'none'
        });
        return;
      }
      try {
        uni.showLoading({
          title: '加载中'
        });

        _app.log('准备生成:' + new Date());
        const d = await getSharePoster({
          _this: this, //若在组件中使用 必传
          type: 'testShareType',
          formData: {
            //访问接口获取背景图携带自定义数据
          },
          backgroundImage: this.avatarImage,
          posterCanvasId: this.canvasId, //canvasId
          delayTimeScale: 20, //延时系数
          drawArray: ({bgObj, type, bgScale}) => {
            //可直接return数组，也可以return一个promise对象, 但最终resolve一个数组, 这样就可以方便实现后台可控绘制海报
            return new Promise((rs, rj) => {
              rs([
                {
                  type: 'image',
                  url: this.currentFrame,
                  dx: 0,
                  dy: 0,
                  infoCallBack(imageInfo) {
                    return {
                      dWidth: bgObj.width, // 因为设置了圆形图片 所以要乘以2
                      dHeight: bgObj.height
                    };
                  }
                }
              ]);
            });
          },
          setCanvasWH: ({bgObj, type, bgScale}) => {
            // 为动态设置画布宽高的方法，
            this.poster = bgObj;
          }
        });
        _app.log('海报生成成功, 时间:' + new Date() + '， 临时路径: ' + d.poster.tempFilePath);
        // 临时路径
        let posterImage = d.poster.tempFilePath;
        // 保存图片到本地相册
        saveAlbum(posterImage)
      } catch (e) {
        uni.hideLoading();
        _app.hideLoading();
        _app.showToast(JSON.stringify(e));
      }
    },

    // 点击每个头像
    imageClick(item, index) {
      this.currentIndex = index;
      this.currentFrame = item.src;
    },

    // 头像滚动图
    getImageList() {
      let item = this.imageList.filter(data => {
        return data.selected;
      });
      return item[0].imageList;
    },

    // tab栏切换
    itemClick(item) {
      this.currentIndex = 0;
      this.imageList.forEach(data => {
        data.selected = false;
      });
      item.selected = true;
    },

    // 新版获取用户头像
    getChooseAvatar(e) {
      console.log(e);
      let {avatarUrl} = e.detail;
      uni.uploadFile({
        url: 'https://tucdn.wpon.cn/api/upload',
        filePath: avatarUrl,
        name: 'image',
        success: uploadFileRes => {
          // 注意：这里返回的uploadFileRes.data 为JSON 需要自己去转换
          let res = JSON.parse(uploadFileRes.data);

          if (res.code === 200) {
            let data = res.data
            this.avatarImage = data.url
          } else {
            uni.showToast({
              title: res.msg,
              icon: 'error',
              duration: 2000
            });
          }
        },
        fail: (error) => {
          uni.showToast({
            title: error,
            icon: 'error',
            duration: 2000
          });
        },
        complete: () => {
          uni.hideLoading();
        }
      });
    },
  }
};
</script>

<style lang="scss">
.content {
  background-size: 100% 100%;
  padding-top: 200rpx;

  .all-back {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    min-height: 100vh;
    width: 100%;
  }

  .top-content {
    width: 610rpx;
    background-color: #ffffff;
    margin: 30rpx;
    border-radius: 50rpx;
    padding: 0 40rpx 30rpx;
    position: relative;

    .top-title {
      display: flex;
      align-items: center;

      .title-unit {
        padding: 40rpx 20rpx;
        font-size: 30rpx;
      }

      .title-select {
        font-size: 30rpx;
        font-weight: bold;
        color: #ff4500;
      }
    }

    .image-div {
      display: flex;
      align-items: center;
      padding-left: 20rpx;
      padding-bottom: 20rpx;
      background-color: #ffffff;

      image {
        width: 120rpx;
        height: 120rpx;
        border: 1rpx solid #f8f8f8;
        box-shadow: 0px -5px 15px 0px rgba(224, 224, 224, 0.4);
        flex-shrink: 0;
      }

      .image-margin {
        margin: 0 20rpx;
      }
    }
  }

  .image-card {
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;

    .image-center {
      width: 300rpx;
      height: 300rpx;
      border-radius: 50rpx;
      margin: 0 70rpx;
    }

    .iconfont {
      color: #f7f8fa;
      font-size: 80rpx;
      font-weight: bold;
    }
  }

  .btn-div {
    padding: 50rpx;
    display: flex;
    justify-content: space-between;

    .btn-left {
      background-color: #f7f8fa;
      box-shadow: 0px 4px 54px 0px rgba(108, 108, 108, 0.14);
      padding: 0 70rpx;
      height: 100rpx;
      line-height: 100rpx;
      border-radius: 80rpx;
      color: #646566;
      font-weight: bold;
    }

    .btn-right {
      background-image: linear-gradient(90deg, #ff8c00, #ff4500);
      padding: 0 100rpx;
      height: 100rpx;
      line-height: 100rpx;
      border-radius: 80rpx;
      color: #ffffff;
      font-weight: bold;
    }
  }
}

.title {
  font-size: 36rpx;
  color: #8f8f94;
}

.avatar-div {
  height: 380rpx;
  margin-right: 40rpx;
  position: relative;
  width: 380rpx;
}

.avatar-div,
.empty-view {
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -webkit-box-pack: center;
  -webkit-box-align: center;
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  z-index: 1;
}

.empty {
  height: 100px;
  margin-bottom: 24px;
  width: 100px;
}

.img {
  background-color: #fff;
  border-radius: 48rpx;
  height: 360rpx;
  position: absolute;
  width: 360rpx;
  z-index: 0;
}

.avatar-default {
  border-radius: 48rpx;
  height: 100%;
  left: 0;
  position: absolute;
  top: 0;
  width: 100%;
  z-index: 10;
}

.container {
  background-color: #fbebe1;
  min-height: 100vh;
  overflow: hidden;
}

.photo-main-view {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 690rpx;
  margin: 30rpx 30rpx 0;
}

.icon-div {
  position: relative;
  height: 80rpx;

  .icon-zuo {
    position: absolute;
    left: 0;
  }

  .icon-you {
    position: absolute;
    right: 0;
  }
}

.action-btn {
  background: #fff;
  border: 1rpx solid #efefef;
  border-radius: 48rpx;
  box-shadow: 0 12rpx 16rpx -8rpx rgba(0, 0, 0, 0.1);
  color: #4d4d4d;
  font-weight: bolder;
  height: 90rpx;
  line-height: 90rpx;
  font-size: 30rpx;
  padding: 0 60rpx;
}

.btn-margin {
  margin-bottom: 50rpx;
}

.btn-primary {
  background: linear-gradient(97.71deg, #ffa462, #ff4d42 88.36%);
  border: 1rpx solid #ff7852;
  border-radius: 48rpx;
  box-shadow: 0 12rpx 16rpx -8rpx rgba(255, 88, 35, 0.6);
  color: #fff;
}

.hideCanvas {
  position: fixed;
  top: -99999upx;
  left: -99999upx;
  z-index: -99999;
}
</style>
