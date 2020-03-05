import { getMultiData, getGoodsData } from '../../service/home.js'
import { POP, NEW, SELL, SCROLL_TOP} from '../../common/common.js'

Page({
  data: {
    banners:[],
    recommends:[],
    title: ['流行', '新款', '精选'],
    goods:{
      pop: { page: 0, list: [] },
      new: { page: 0, list: [] },
      sell:{ page: 0, list: [] },
    },
    currentType:POP,
    isShow:false,
    isFixed:false,
    controlTop:0
  },
  onLoad: function (options) {
    this._getMultiData();
    this._getGoodsData(POP);
    this._getGoodsData(NEW);
    this._getGoodsData(SELL);
  },
  onShow(){
    // console.log(this.data.goods)
  },
  //-------------请求网络数据-------------
  _getGoodsData(type){
    let page = this.data.goods[type].page+1;
    getGoodsData(type,page).then(res =>{
      //获取列表
      let list = res.data.data.list;
      let oldlist = this.data.goods[type].list;
      //push到临时数组中，再替换data中的数组
      oldlist.push(...list);
      //使用es6动态更改type
      let typeKey = `goods.${type}.list`;
      let pageKey = `goods.${type}.page`;
      this.setData({
        //注意这里要加中括号，因为直接修改是再修改定义的const
        [typeKey]:oldlist,
        [pageKey]: page
      })
    })
  },
  _getMultiData(){
    getMultiData().then(res => {
      const banners = res.data.data.banner.list;
      const recommends = res.data.data.recommend.list;
      this.setData({
        banners,
        recommends
      })
    })
  },
  //-------------请求下标----------------
  tabclick(e){
    let index = e.detail.index;
    //把goods中type保存到数组中
    let arr =[]
    for(let i in this.data.goods){
      arr.push(i)
    }
    //通过index修改type来获取data
    this.setData({
      currentType:arr[index]
    })
    //点击跳转高度
    wx.pageScrollTo({
      scrollTop: this.data.controlTop,
      duration:300
    })
  },
  //下来刷新
  onPullDownRefresh(){
    wx.stopPullDownRefresh();
  },
  imgload(){
    wx.createSelectorQuery().select("#control-bar").boundingClientRect().exec(res => {
      this.data.controlTop = res[0].top;
    })
  },
  //上拉请求数据
  onReachBottom(){  
    this._getGoodsData(this.data.currentType);
  },
  //返回顶部
  onPageScroll(e){
    let scrollY = e.scrollTop;
    let isTrue = scrollY > SCROLL_TOP;
    //isTrue =  false   !=   false
    //isTrue =  true   !=  false=>true  
    if(isTrue != this.data.isShow){
      this.setData({
        isShow: isTrue
      })
    }
    const isTopTrue = scrollY > this.data.controlTop;
    if (isTopTrue != this.data.isFixed){
      this.setData({
        isFixed: isTopTrue
      })
    }
  }
})