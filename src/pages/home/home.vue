<template>
  <div class="home">
    主页
    <tabbar-box v-model="currentValue"/>
  </div>
</template>

<script>
import TabbarBox from "@/components/tabbar-box.vue";

export default {
  name: "home",
  components: {
    TabbarBox
  },
  data() {
    return {
      currentValue: 0
    }
  },
}
</script>

<style scoped lang="scss">

</style>
