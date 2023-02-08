const baseUri = 'https://tucdn.wpon.cn/api/'

const uploadImage = async (url) => {


    // 1. 获取 token
    let {data} = await uni.$u.http.post(baseUri + "token", {
        email: '503084944@qq.com',
        password: 'yanmiao777'
    })

    if (data.code === 200) {
        const token = data.data.token

        // 2. 请求接口上传
        return new Promise((resolve, reject) => {
            uni.uploadFile({
                url: baseUri + 'upload',
                filePath: url,
                name: 'image',
                header: {
                    token
                },
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
    } else {
        uni.showToast('图床Token失效')
    }
}
export default uploadImage
