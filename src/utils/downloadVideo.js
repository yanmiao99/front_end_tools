// 下载视频
const downloadVideo = (url) => {
    // 提醒用户下载中
    uni.showToast({title: "下载中", icon: "loading"})
    // 1 将远程文件下载到小程序的内存中
    uni.downloadFile({
        url: url,
        success: (res) => {
            // 2 成功下载后而且状态码为200时将视频保存到本地系统
            if (res.statusCode === 200) {
                uni.saveVideoToPhotosAlbum({
                    filePath: res.tempFilePath
                })
                uni.hideLoading();
                // 提示用户下载成功
                uni.showToast({title: "下载成功", icon: "success"});
            }
            // 如果该资源不可下载或文件格式出错则提示用户
            else {
                uni.showToast({title: "资源格式错误，请联系管理员"});
            }
        },
        fail: (err) => {
            console.log(err);
            // 下载失败提醒
            uni.hideLoading();
            uni.showToast({title: "下载失败"})
        }
    })
}

export default downloadVideo
