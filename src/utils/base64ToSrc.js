const base64ToSrc = (base64data,name) => {
    const base64 = base64data; //base64格式图片
    const time = new Date().getTime();
    const imgPath = wx.env.USER_DATA_PATH + `/${name}` + time + ".png";
    //如果图片字符串不含要清空的前缀,可以不执行下行代码.
    const imageData = base64.replace(/^data:image\/\w+;base64,/, "");
    const file = uni.getFileSystemManager();
    file.writeFileSync(imgPath, imageData, "base64");
    return imgPath
}

export default base64ToSrc
