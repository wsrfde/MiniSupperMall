import {
  getDetailData,
  getRecommends,
  GoodsBaseInfo,
  ShopInfo,
  ParamInfo
} from '../../service/detail.js';
import { SCROLL_TOP } from '../../common/common.js';

const app = getApp();

Page({
  data: {
    iid: '',//1jw0sr2
    topImage:[],
    baseInfo:{},
    shopInfo:{},
    detailInfo:{},
    paramInfo:{},
    commentInfo:{},
    recommends:[],
    scrolltop:0,
    isShow:false
  },
  onLoad() {
    //--------------请求iid----------------
    const eventChannel = this.getOpenerEventChannel();
    eventChannel.on('emitIid', res => {
      this.setData({
        iid:res.iid
      })
    });
    //------------请求网络数据-----------------
    this._getDatailData();
    this._getRecommends();
  },
  _getDatailData(){
    getDetailData(this.data.iid).then(res =>{
      const data = res.data.result;
      // console.log(data)
        //1. 取出顶部的图片
        const topImage = data.itemInfo.topImages;
        //2. 创建BaseInfo对象
      const baseInfo = new GoodsBaseInfo(data.itemInfo, data.columns, data.shopInfo.services)
        //3. 创建ShopInfo对象
        const shopInfo = new ShopInfo(data.shopInfo)
        //4. 获取detailInfo信息
        const detailInfo = data.detailInfo
        //5. 创建ParamInfo对象
        const paramInfo = new ParamInfo(data.itemParams.info, data.itemParams.rule)
        //6. 获取评论信息
        let commentInfo = {};
        if(data.rate && data.rate.list.length >0){
          commentInfo = data.rate.list[0]
        }
        this.setData({
          topImage,
          baseInfo,
          shopInfo,
          detailInfo,
          paramInfo,
          commentInfo
        })
    })
  },
  _getRecommends(){
    getRecommends().then(res =>{
      this.setData({
        recommends:res.data.data.list
      })
    })
  },
  //--------------返回顶部-----------------
  topHeight(e){
    let isTop = e.detail.scrollTop > SCROLL_TOP;
    if(isTop != this.data.isShow){
      this.setData({
        isShow:isTop
      })
    }
  },
  backtop() {
    this.setData({
      scrollTop: 0
    })
  },
  //--------------加入购物车----------------
  onAddcart(){
    const obj = {}
    obj.iid = this.data.iid;
    obj.imageURL = this.data.topImage[0];
    obj.title = this.data.baseInfo.title;
    obj.desc = this.data.baseInfo.desc;
    obj.price = this.data.baseInfo.realPrice;

    app.addToCart(obj)

    wx.showToast({
      title:"购物车加入成功"
    })
  }
})