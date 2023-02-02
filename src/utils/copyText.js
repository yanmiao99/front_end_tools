const copyText = (url) => {
    uni.setClipboardData({
        data: url,//要被复制的内容
        success: () => {//复制成功的回调函数
            uni.showToast({//提示
                title: `复制成功`,
                icon: 'success'
            })
        }
    }, true);
}
export default copyText
