<template>
  <u-tabbar
      :value="currentValue"
      @change="tabbarChange"
      fixed
      safeAreaInsetBottom
      :placeholder="false"
  >
    <u-tabbar-item text="工具箱" icon="grid"></u-tabbar-item>
    <u-tabbar-item text="我的" icon="account"></u-tabbar-item>
  </u-tabbar>
</template>

<script>
export default {
  name: "tabbar-box",

  props: {
    value: {
      type: Number,
      required: true,
      default: 0
    }
  },


  data() {
    return {
      currentValue: this.value,
      routeList: [
        {
          name: '工具箱',
          path: '/pages/home/home'
        },
        {
          name: '我的',
          path: '/pages/mine/mine'
        },
      ]
    }
  },


  methods: {
    tabbarChange(index) {
      uni.$u.route({
        url: this.routeList[index].path,
        type: 'reLaunch',
      })
      this.$emit("input", index)
    }
  }
}
</script>

<style scoped>

</style>
