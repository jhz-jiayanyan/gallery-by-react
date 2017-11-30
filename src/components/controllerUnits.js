import React,{Component} from 'react';
//控制组件
export default class ControllerUnit extends Component {

  constructor(props){
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick(e){
    //如果点击是在选中态的则旋转图片，否则居中
    if(this.props.arrange.isCenter){
      this.props.inverse();
    }else{
      this.props.center();
    }
    e.stopPropagation();
    e.preventDefault();
  }
  render(){
    let controllerUnitClassName = 'controller-unit';
    //如果对应的是居中图片，显示按钮居中状态
    if(this.props.arrange.isCenter){
      controllerUnitClassName += ' is-center';
      //如果同时是翻转图片，则显示按钮的翻转状态
      if(this.props.arrange.isInverse){
        controllerUnitClassName +=' is-inverse';
      }
    }
    return (
      <span className={controllerUnitClassName} onClick={this.handleClick}></span>
    );
  }
}
