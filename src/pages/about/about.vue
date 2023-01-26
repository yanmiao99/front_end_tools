<template>
  <view class="about">
    <view class="header">
      <view class="header-info u-line-2">
        {{ headerInfo}}
      </view>
      <view class="water">
        <view class="water-c">
          <view class="water-1"></view>
          <view class="water-2"></view>
        </view>
      </view>
    </view>
    <view class="wrapper">
      <u-cell-group :border="false">
        <u-cell
            :border="false"
            v-for="item in cellList"
            :key="item.title"
            :icon="item.icon"
            :title="item.title"
            :isLink="item.isLink"
            arrow-direction="right"
            :url="item.url"
            @click="handleCellClick"
            :name="item.title"
        />
      </u-cell-group>
    </view>
    <u-modal
        :show="addAuthor.show"
        :closeOnClickOverlay="true"
        @close="addAuthor.show = false"
    >
      <view slot="default">
        <image
            class='addAuthorCode'
            :src="addAuthor.wx_code"
            mode="aspectFit"
        />
      </view>
      <view slot="confirmButton">
        <u-button text="保存到相册" shape="circle" @click="handleSaveToAlbum"/>
      </view>
    </u-modal>
  </view>
</template>

<script>
import saveAlbum from "@/utils/saveAlbum";

export default {
  name: "about",
  data() {
    return {
      headerInfo: '你的压力来源于无法自律，只是假装努力。',
      cellList: [
        {
          icon: require("@/static/about/log.png"),
          title: '更新日志',
          url: 'pages/toolbox/toolbox',
          isLink: true,
        },
        {
          icon: require("@/static/about/disclaimer.png"),
          title: '免责声明',
          url: 'pages/toolbox/toolbox',
          isLink: true,
        },
        {
          icon: require("@/static/about/author_vx.png"),
          title: '联系作者',
          url: 'pages/toolbox/toolbox',
          isLink: false
        },
        {
          icon: require("@/static/about/version.png"),
          title: '关于',
          url: 'pages/toolbox/toolbox',
          isLink: true
        },
      ],
      addAuthor: {
        show: false,
        wx_code: require("@/static/about/wx-code.png")
      }
    }
  },
  watch: {
    // 'addAuthor.show'(newValue) {
    //   newValue ? uni.hideTabBar() : uni.showTabBar()
    // }
  },
  methods: {
    // 每一行点击
    handleCellClick({name}) {
      console.log(name);
      switch (name) {
        case '联系作者':
          this.addAuthor.show = true
          break
      }
    },
    // 保存二维码
    handleSaveToAlbum() {
      const url = this.addAuthor.wx_code
      saveAlbum(url)
      uni.$u.sleep(500).then(() => {
        this.addAuthor.show = false
      })
    },
  }
}
</script>

<style scoped lang="scss">
.about {
  .header {
    width: 100%;
    height: 20vh;
    background: $uni-color-primary;
    display: flex;
    align-items: center;
    padding: 40rpx;
    box-sizing: border-box;
    position: relative;

    .header-info {
      color: #fff;
      font-size: 36rpx;
      font-weight: bold;
    }

    .water {
      position: absolute;
      left: 0;
      bottom: 0rpx;
      height: 20rpx;
      width: 100%;
      z-index: 1;
      background: $uni-color-primary;

      .water-c {
        position: relative;

        .water-1 {
          background: url("data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+Cjxzdmcgd2lkdGg9IjYwMHB4IiBoZWlnaHQ9IjYwcHgiIHZpZXdCb3g9IjAgMCA2MDAgNjAiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgeG1sbnM6c2tldGNoPSJodHRwOi8vd3d3LmJvaGVtaWFuY29kaW5nLmNvbS9za2V0Y2gvbnMiPgogICAgPCEtLSBHZW5lcmF0b3I6IFNrZXRjaCAzLjQgKDE1NTc1KSAtIGh0dHA6Ly93d3cuYm9oZW1pYW5jb2RpbmcuY29tL3NrZXRjaCAtLT4KICAgIDx0aXRsZT53YXRlci0xPC90aXRsZT4KICAgIDxkZXNjPkNyZWF0ZWQgd2l0aCBTa2V0Y2guPC9kZXNjPgogICAgPGRlZnM+PC9kZWZzPgogICAgPGcgaWQ9IuaIkSIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCIgc2tldGNoOnR5cGU9Ik1TUGFnZSI+CiAgICAgICAgPGcgaWQ9Ii0iIHNrZXRjaDp0eXBlPSJNU0FydGJvYXJkR3JvdXAiIHRyYW5zZm9ybT0idHJhbnNsYXRlKC0xMjEuMDAwMDAwLCAtMTMzLjAwMDAwMCkiIGZpbGwtb3BhY2l0eT0iMC4zIiBmaWxsPSIjRkZGRkZGIj4KICAgICAgICAgICAgPGcgaWQ9IndhdGVyLTEiIHNrZXRjaDp0eXBlPSJNU0xheWVyR3JvdXAiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDEyMS4wMDAwMDAsIDEzMy4wMDAwMDApIj4KICAgICAgICAgICAgICAgIDxwYXRoIGQ9Ik0wLDcuNjk4NTczOTUgTDQuNjcwNzE5NjJlLTE1LDYwIEw2MDAsNjAgTDYwMCw3LjM1MjMwNDYxIEM2MDAsNy4zNTIzMDQ2MSA0MzIuNzIxMDUyLDI0LjEwNjUxMzggMjkwLjQ4NDA0LDcuMzU2NzQxODcgQzE0OC4yNDcwMjcsLTkuMzkzMDMwMDggMCw3LjY5ODU3Mzk1IDAsNy42OTg1NzM5NSBaIiBpZD0iUGF0aC0xIiBza2V0Y2g6dHlwZT0iTVNTaGFwZUdyb3VwIj48L3BhdGg+CiAgICAgICAgICAgIDwvZz4KICAgICAgICA8L2c+CiAgICA8L2c+Cjwvc3ZnPg==") repeat-x;
          animation: wave-animation-1 4.5s infinite linear;
        }

        .water-2 {
          top: 5rpx;
          background: url("data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+Cjxzdmcgd2lkdGg9IjYwMHB4IiBoZWlnaHQ9IjYwcHgiIHZpZXdCb3g9IjAgMCA2MDAgNjAiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgeG1sbnM6c2tldGNoPSJodHRwOi8vd3d3LmJvaGVtaWFuY29kaW5nLmNvbS9za2V0Y2gvbnMiPgogICAgPCEtLSBHZW5lcmF0b3I6IFNrZXRjaCAzLjQgKDE1NTc1KSAtIGh0dHA6Ly93d3cuYm9oZW1pYW5jb2RpbmcuY29tL3NrZXRjaCAtLT4KICAgIDx0aXRsZT53YXRlci0yPC90aXRsZT4KICAgIDxkZXNjPkNyZWF0ZWQgd2l0aCBTa2V0Y2guPC9kZXNjPgogICAgPGRlZnM+PC9kZWZzPgogICAgPGcgaWQ9IuaIkSIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCIgc2tldGNoOnR5cGU9Ik1TUGFnZSI+CiAgICAgICAgPGcgaWQ9Ii0iIHNrZXRjaDp0eXBlPSJNU0FydGJvYXJkR3JvdXAiIHRyYW5zZm9ybT0idHJhbnNsYXRlKC0xMjEuMDAwMDAwLCAtMjQ2LjAwMDAwMCkiIGZpbGw9IiNGNUY1RkEiPgogICAgICAgICAgICA8ZyBpZD0id2F0ZXItMiIgc2tldGNoOnR5cGU9Ik1TTGF5ZXJHcm91cCIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMTIxLjAwMDAwMCwgMjQ2LjAwMDAwMCkiPgogICAgICAgICAgICAgICAgPHBhdGggZD0iTTAsNy42OTg1NzM5NSBMNC42NzA3MTk2MmUtMTUsNjAgTDYwMCw2MCBMNjAwLDcuMzUyMzA0NjEgQzYwMCw3LjM1MjMwNDYxIDQzMi43MjEwNTIsMjQuMTA2NTEzOCAyOTAuNDg0MDQsNy4zNTY3NDE4NyBDMTQ4LjI0NzAyNywtOS4zOTMwMzAwOCAwLDcuNjk4NTczOTUgMCw3LjY5ODU3Mzk1IFoiIGlkPSJQYXRoLTIiIHNrZXRjaDp0eXBlPSJNU1NoYXBlR3JvdXAiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDMwMC4wMDAwMDAsIDMwLjAwMDAwMCkgc2NhbGUoLTEsIDEpIHRyYW5zbGF0ZSgtMzAwLjAwMDAwMCwgLTMwLjAwMDAwMCkgIj48L3BhdGg+CiAgICAgICAgICAgIDwvZz4KICAgICAgICA8L2c+CiAgICA8L2c+Cjwvc3ZnPg==") repeat-x;
          animation: wave-animation-2 8s infinite linear;
        }

        .water-1,
        .water-2 {
          position: absolute;
          width: 100%;
          height: 40rpx;
          background-size: cover;
        }

        @keyframes wave-animation-1 {
          0% {
            background-position: 0 top;
          }

          100% {
            background-position: 600rpx top;
          }
        }

        @keyframes wave-animation-2 {
          0% {
            background-position: 0 top;
          }

          100% {
            background-position: 600px top;
          }
        }
      }
    }
  }

  .wrapper {
    padding: 20rpx 0;
    box-sizing: border-box;
    border-radius: 20rpx;
    background: #fff;
    width: 94%;
    margin: 40rpx auto;

    ::v-deep .u-icon__img {
      width: 50rpx !important;
      height: 50rpx !important;
    }
  }

}
</style>
