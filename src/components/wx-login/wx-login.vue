<template>
  <view>
    <view>
      <view class="header">
        <image :src="avatarUrl" class="u-border"/>
      </view>
      <view class="content">
        <view>申请获取以下权限</view>
        <text>获得你的公开信息(昵称，头像、地区等)</text>
      </view>
      <button class="bottom" type="primary" withCredentials="true" @tap="getUserProfile">授权登录</button>
    </view>
  </view>
</template>

<script>
export default {
  name: 'wx-login',
  data() {
    return {
      avatarUrl: require('@/static/mine/default-acatar.jpeg')
    };
  },
  methods: {
    getUserProfile() {
      uni.getUserProfile({
        desc: '登录',
        success: (info) => {
          console.log(info)
          this.avatarUrl = info.userInfo.avatarUrl
          //这里取到的是用户的信息，自己安排自己的业务
          uni.login({
            provider: 'weixin',
            onlyAuthorize: true, // 微信登录仅请求授权认证
            success: (res) => {
              console.log(res)
              //这里获取的是用户的code，用来换取 openid、unionid、session_key 等信息，再将信息丢给后台自己的登录业务就行了
            }
          })
        },
        fail: (err) => {
          console.log(err);
        }
      })
    }
  },
};
</script>

<style lang="scss" scoped>
.header {
  margin: 90rpx 0 90rpx 50rpx;
  border-bottom: 1px solid #ccc;
  text-align: center;
  width: 650rpx;
  height: 300rpx;
  line-height: 450rpx;

  image {
    width: 200rpx;
    height: 200rpx;
    border-radius: 50%;
  }
}

.content {
  margin-left: 50rpx;
  margin-bottom: 90rpx;

  text {
    display: block;
    color: #9d9d9d;
    margin-top: 40rpx;
  }
}

.bottom {
  border-radius: 80rpx;
  margin: 70rpx 50rpx;
  font-size: 35rpx;
}
</style>
