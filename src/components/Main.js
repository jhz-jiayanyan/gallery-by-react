require('normalize.css/normalize.css');
require('styles/App.css');

import React from 'react';

const imagesDatas = require('../data/imageDatas.json');
console.log(imagesDatas)

let yeomanImage = require('../images/yeoman.png');
//获取图片相关的数据，利用自执行函数，将图片信息转成图片URL路径信息
const imageDatas = (function genImageUrl(imagesArr) {
  imagesArr.map((imageItem) => {
    let singleImageData = imageItem;
    singleImageData.imageUrl = require('../images/'+imageItem.fileName);
    imageItem = singleImageData;
  });

  return imagesArr;
})(imagesDatas);

class AppComponent extends React.Component {
  render() {
    return (
      <section className="stage">
        <section className="img-src"></section>
        <nav className="controller-nav"></nav>
      </section>
    );
  }
}

AppComponent.defaultProps = {
};

export default AppComponent;
