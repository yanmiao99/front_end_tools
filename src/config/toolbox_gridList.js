const gridList = [
    {
        icon: require("@/static/toolbox/rate-calculator.png"),
        name: '商户费率计算器',
        desc: '用于计算商户在客人扫码付款后, 最终能够拿到多少钱',
        path: '/rate-calculator',
        isOnline: true,
    },
    {
        icon: require("@/static/toolbox/interest-calculator.png"),
        name: '利息计算器',
        desc: '用于每份钱的投资收益',
        path: '/interest-calculator',
        isOnline: true
    },
    {
        icon: require("@/static/toolbox/avatar-generate.png"),
        name: '头像框生成器',
        desc: '用于生成各种类型的头像框',
        path: '/avatar-generate',
        isOnline: true
    },
]
export default gridList
