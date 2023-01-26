const uploadImage = (url) => {
    return new Promise((resolve, reject) => {
        uni.uploadFile({
            url: 'https://tucdn.wpon.cn/api/upload',
            filePath: url,
            name: 'image',
            success: uploadFileRes => {
                // 注意：这里返回的uploadFileRes.data 为JSON 需要自己去转换
                let res = JSON.parse(uploadFileRes.data);
                if (res.code === 200) {
                    let data = res.data
                    resolve(data)
                } else {
                    uni.showToast({
                        title: res.msg,
                        icon: 'error',
                        duration: 2000
                    });
                    reject(res.msg)
                }
            },
            fail: (error) => {
                uni.showToast({
                    title: error,
                    icon: 'error',
                    duration: 2000
                });
                reject(error)
            },
            complete: () => {
                uni.hideLoading();
            }
        });
    })
}
export default uploadImage
