// pages/cart/childCpns/cart-list-item/cart-list-item.js
const app = getApp();
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    goods:{
      type:Object,
      value:{}
    },
    index:{
      type:Number
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    onCheckClick(e){
      //获取当前商品
      const goods = app.globalData.cartList.find((item) => item.iid === this.properties.goods.iid )
      //选中取反
      goods.checked = !goods.checked;

      const index = e.currentTarget.dataset.index;
      app.changeGoodsState(goods,index)
    }
  }
})
