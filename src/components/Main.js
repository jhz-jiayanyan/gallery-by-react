require('normalize.css/normalize.css');
require('styles/App.scss');

import React from 'react';
import ReactDom from 'react-dom';

import ImgFigure from './imgFigure';
import ControllerUint from './controllerUnits';

const imagesDatas = require('../data/imageDatas.json');

//获取图片相关的数据，利用自执行函数，将图片信息转成图片URL路径信息
const imageDatas = (function genImageUrl(imagesArr) {
  imagesArr.map((imageItem) => {
    let singleImageData = imageItem;
    singleImageData.imageUrl = require('../images/'+imageItem.fileName);
    imageItem = singleImageData;
  });

  return imagesArr;
})(imagesDatas);

//获取区间内的随机值
function getRangeRandom(low,high) {
  return Math.ceil(Math.random()*(high-low) + low);
}

/**
 * 获取0-30度的任意正值
 */
function get30Rotatedom() {
  return Math.random() > 0.5 ? '' :'-' +Math.ceil(Math.random()*30)
}

class AppComponent extends React.Component {

  constructor(props){
    super(props);
    this.positionConst ={
      centerPos:{
        left:0,
        right:0
      },
      hPosRange:{//水平方向
        leftSecX:[0,0],
        rightSecX:[0,0],
        y:[0,0]
      },
      vPosRange:{
        x:[0,0],
        topY:[0,0]
      }

    };
    this.state = {
      imgsArrRangeArr :[{
        /*pos : {
          left:0,
          top:0
        },
        rotate:0,
        isInverse:false,//正反面
        isCenter:false//是否居中
        *///初始化每一个这样的状态函数，
      }]
    }

  }
  //组件加载以后，为每张图片计算其位置的范围
  componentDidMount(){
    //ref获取dom节点
    //获取舞台的大小
    let stageDom = ReactDom.findDOMNode(this.refs.stage);
    let stageW = stageDom.scrollWidth,
      stageH = stageDom.scrollHeight,
      halfStageW = Math.ceil(stageW / 2),
      halfStageH = Math.ceil(stageH / 2);

    //拿到imgFigureDom的大小
    let imgFigureDom = ReactDom.findDOMNode(this.refs.imgFigure0),
      imgW  = imgFigureDom.scrollWidth,
      imgH = imgFigureDom.scrollHeight,
      halfImgW = Math.ceil(imgW / 2),
      halfImgH = Math.ceil(imgH/2);


    //计算中心点
    this.positionConst.centerPos = {
      left:halfStageW - halfImgW,
      top:halfStageH - halfImgH
    }
    //左侧区域
    this.positionConst.hPosRange.leftSecX[0] = -halfImgW;//左侧区域x轴的最小值
    this.positionConst.hPosRange.leftSecX[1] = halfStageW - halfImgW*3;//左侧区域x轴的最大值

    this.positionConst.hPosRange.rightSecX[0] = halfStageW + halfImgW;//右侧区域x轴最小值
    this.positionConst.hPosRange.rightSecX[1] = stageW - halfImgW;//最大值

    this.positionConst.hPosRange.y[0] = -halfImgH;//最小值
    this.positionConst.hPosRange.y[1] = stageH - halfImgH;//最大值

    //上侧区域
    this.positionConst.vPosRange.topY[0] = -halfImgH;//上侧区域y点的最小值
    this.positionConst.vPosRange.topY[1] = halfStageH - halfImgH*3;//上侧区域y点的最大值

    this.positionConst.vPosRange.x[0] = halfStageW - imgW;//上侧区域
    this.positionConst.vPosRange.x[1] = halfStageW;//最大值

    this.rearRange(0);//第一张居中

  }

  /**
   * 重新布局所有的图片
   * @param centerIndex 指定居中排布哪个图片
   */
  rearRange(centerIndex){
    let imgsArrRangeArr = this.state.imgsArrRangeArr,
      constPosition = this.positionConst,
      centerPos = constPosition.centerPos,
      hPosRange = constPosition.hPosRange,
      vPosRange = constPosition.vPosRange,
      hPosRangeLeftSecX = hPosRange.leftSecX,
      hPosRangeRightSecX = hPosRange.rightSecX,
      hPosRangey = hPosRange.y,
      vPosRangeTopY = vPosRange.topY,
      vPosRangeX = vPosRange.x,

      imgsArrangeTopArr = [],
      topImgNum = Math.floor(Math.random()*2),//0-2左闭右开的一个区间,取一个或者不取

      topImgSpliceIndex = 0,
      imgsArrangeCenterArr = imgsArrRangeArr.splice(centerIndex,1);//取中心图片的位置

    //首先居中centerIndex的图片
    /*imgsArrangeCenterArr[0].pos = centerPos;*/
    //居中图片不需要需要旋转
    /*imgsArrangeCenterArr[0].rotate = 0;
     imgsArrangeCenterArr[0].isCenter = true;*/
    imgsArrangeCenterArr[0] = {
      pos:centerPos,
      rotate:0,
      isCenter:true
    }


    //取布局上侧的图片的状态信息
    topImgSpliceIndex = Math.ceil(Math.random()*(imgsArrRangeArr.length-topImgNum));
    imgsArrangeTopArr = imgsArrRangeArr.splice(topImgSpliceIndex,topImgNum);

    //布局位于上侧的图片

    imgsArrRangeArr.forEach((value,index)=> {
      imgsArrangeTopArr[index] = {
        pos:{
          top:getRangeRandom(vPosRangeTopY[0],vPosRangeTopY[1]),
          left:getRangeRandom(vPosRangeX[0],vPosRangeX[1])
        },
        rotate:get30Rotatedom(),
        isInverse:false,
        isCenter:false

      }
    });

    //布局两侧的图片
    for (let i =0,j = imgsArrRangeArr.length,k = j /2;i <j;i++){
      let hPosRangeLORX = null;//左区域或者右区域的取值范围
      //前半部分布局在左侧，右半部份布局在右侧
      if(i<k){
        hPosRangeLORX = hPosRangeLeftSecX;
      }else {
        hPosRangeLORX = hPosRangeRightSecX;
      }
      imgsArrRangeArr[i] ={
        pos:{
          top : getRangeRandom(hPosRangey[0],hPosRangey[1]),
          left:getRangeRandom(hPosRangeLORX[0],hPosRangeLORX[1])
        },
        rotate:get30Rotatedom(),
        isCenter:false

      }
    }

    if(imgsArrangeTopArr && imgsArrangeTopArr[0]){
      //splice向数组中添加/删除项目，第一个参数：添加/删除的位置，第二个参数：删除的数量，为0则不会删除，第三个参数可选：向数组中添加的新项目
      imgsArrRangeArr.splice(topImgSpliceIndex,0,imgsArrangeTopArr[0]);
    }
    //中心元素
    imgsArrRangeArr.splice(centerIndex,0,imgsArrangeCenterArr[0]);

    this.setState({
      imgsArrRangeArr:imgsArrRangeArr
    })
  }

  /**
   * 利用rearRange函数，居中对应index的图片
   * @param index,呗居中图片的下标
   * @return {Function}
   */

  center(index){
    return ()=>{
      this.rearRange(index);
    };
  }

  /**
   * 反转图片
   * @params index 输入当前被执行inverse操作的图片对应的图片信息数组的index值
   * @return {Function} 这是闭包函数，其内return一个真正执行的函数，闭包函数可以读取其他函数内部变量的函数
   */
  inverse(index){
     return function () {
       let imgsArrangeArr = this.state.imgsArrRangeArr;
       imgsArrangeArr[index].isInverse = !imgsArrangeArr[index].isInverse;
       //更改状态
       this.setState ({
         imgsArrangeArr:imgsArrangeArr
       })
     }.bind(this);
  }

  render() {
    const controllerUnits = [];
    const imgFigures = [];
    imageDatas.forEach(function (item,index) {
      if(!this.state.imgsArrRangeArr[index]){
        this.state.imgsArrRangeArr[index] = {
          pos:{
            left:0,
            top:0
          },
          rotate:0,
          isCenter:false
        }
      }

      //ref方便后面定位不同的imgFigure
      imgFigures.push(<ImgFigure key={index} data={item} ref={'imgFigure'+index} arrange={this.state.imgsArrRangeArr[index]}  inverse={this.inverse(index)} center={this.center(index)}/>);
      controllerUnits.push(<ControllerUint key={index}  arrange={this.state.imgsArrRangeArr[index]}  inverse={this.inverse(index)} center={this.center(index)}/>);
    }.bind(this));




    return (
      <section className="stage" ref="stage">
        <section className="img-src">
          {imgFigures}
        </section>
        <nav className="controller-nav">
          {controllerUnits}
        </nav>
      </section>
    );
  }
}

AppComponent.defaultProps = {
};

export default AppComponent;
