<template>
  <view class="wrapper">
    <u--form labelPosition="top" :model="model" :rules="rules" ref="uForm" labelWidth="200rpx">

      <u-form-item label="存入金额 (元) " prop="amount" border>
        <u--input clearable v-model="model.amount" placeholder="请输入金额" prefixIcon="rmb-circle"/>
      </u-form-item>

      <u-form-item label="每天收益 (元)" prop="profit" border>
        <u--input clearable v-model="model.profit" placeholder="请输入每天得到的收益" prefixIcon="rmb-circle"/>
      </u-form-item>

      <u-form-item label="日利率 (%) " prop="daily" border>
        <u--input v-model="model.daily" :disabled="true" placeholder="自动计算得出"
                  prefixIcon="rmb-circle-fill"/>
      </u-form-item>

      <u-form-item label="月利率 (%) " prop="month" border>
        <u--input v-model="model.month" :disabled="true" placeholder="自动计算得出"
                  prefixIcon="rmb-circle-fill"/>
      </u-form-item>

      <u-form-item label="年利率 (%) " prop="year" border>
        <u--input v-model="model.year" :disabled="true" placeholder="自动计算得出"
                  prefixIcon="rmb-circle-fill"/>
      </u-form-item>

      <u-form-item>
        <u-button class="btn" type="primary" text="计 算" @tap="submit"/>
      </u-form-item>
    </u--form>
    <!-- 规则 -->
    <view class="tips">
      <text>Tips:</text>
      <view>
        注意 : 银行业统一规定计算利息或利率一个月按照三十天计算，一年按照三百六十天计算。
      </view>
      <view>
        日利率是1/10000=0.01% <br/>
        月利率就是30*1/10000=0.3% <br/>
        年利率就是1/10000*360=3.60%。<br/>
      </view>
    </view>
  </view>
</template>


<script>
import share from "@/mixins/share"

export default {
  mixins: [share],
  data() {
    return {
      model: {
        amount: '', // 金额
        profit: '', // 每日收益
        daily: '', // 日利率
        month: '', // 月利率
        year: '', // 年利率
      },
      rules: {
        'amount': {
          type: 'number',
          required: true,
          message: '请填写数字',
          trigger: ['blur', 'change']
        },
        'profit': {
          type: 'number',
          required: true,
          message: '请填写数字',
          trigger: ['blur', 'change']
        },
      },
    }
  },
  methods: {
    // 提交事件
    submit() {
      this.$refs.uForm.validate().then(() => {
        const {amount, profit} = this.model

        // 公式计算
        const daily = ((profit / amount) * 100).toFixed(4)
        const month = ((30 * profit / amount) * 100).toFixed(4)
        const year = ((profit / amount * 360) * 100).toFixed(4)

        this.model = {amount, profit, daily, month, year}

      }).catch(errors => {
        uni.$u.toast('校验失败')
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.wrapper {
  padding: 40rpx;
  box-sizing: border-box;

  .btn {
    margin: 30rpx 0;
  }
}
</style>
