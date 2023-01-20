<template>
  <div class="mine">
    我的
    <tabbar-box v-model="currentValue"/>
  </div>
</template>

<script>
import TabbarBox from "@/components/tabbar-box.vue";

export default {
  name: "mine",
  components: {TabbarBox},
  data() {
    return {
      currentValue: 1
    }
  }
}
</script>

<style scoped lang="scss">

</style>
