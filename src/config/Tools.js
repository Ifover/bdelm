export const computePic = (content) => {
  //计算店铺的真实图标地址
  let link1 = 'https://fuss10.elemecdn.com/';
  let link0 = '?imageMogr2/thumbnail/70x70';
  let page1 = content.substring(0, 1);
  let page2 = content.substring(1, 3);
  let page3 = content.substring(3, 32);
  let realPic = link1 + page1 + '/' + page2 + '/' + page3;
  realPic += content.length > 35 ? 'jpeg.jpeg' : 'png.png';
  //realPic += link0
  //console.log(realPic);
  return realPic
}
