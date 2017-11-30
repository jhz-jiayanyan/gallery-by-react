import React,{Component} from 'react';

class ImgFigture extends Component {
  constructor(props){
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e){

    if(this.props.arrange.isCenter){
      this.props.inverse();
    }else{
      this.props.center();
    }


    e.stopPropagation();
    e.preventDefault();
  }

  render(){

    let styleObj ={};
    //如果props属性中指定了这张图片的位置，则使用
    if(this.props.arrange.pos){
      styleObj = this.props.arrange.pos;
    }

    //如果旋转角度存在且不为0
    if(this.props.arrange.rotate){
      (['MozTransform','msTransform','WebkitTransform','transform']).forEach(function(value){
        styleObj[value] = 'rotate('+this.props.arrange.rotate+'deg)';
      }.bind(this));
    }

    //是否居中 改变层级

    if(this.props.arrange.isCenter){
      styleObj.zIndex = 9;
    }

    let imgFigureClassName = 'img-figure';
    imgFigureClassName += this.props.arrange.isInverse ? ' is-inverse' : '';

    return (
      <figure className={imgFigureClassName} style={styleObj} onClick={this.handleClick}>
        <div className="wrap-position">
          <div className="img-content">
            <div className="img-wrap"><img src={this.props.data.imageUrl} alt={this.props.data.title}/></div>
            <figcaption>
              <h2 className="img-title">{this.props.data.title}</h2>
            </figcaption>
          </div>
          <div className="img-back" onClick={this.handleClick}>
            <p>{this.props.data.desc}</p>
          </div>
        </div>
      </figure>
    )

  }
}

export default ImgFigture;
