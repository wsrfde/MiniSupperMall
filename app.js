App({

  /**
   * 当小程序初始化完成时，会触发 onLaunch（全局只触发一次）
   */
  onLaunch: function () {
    
  },
  addToCart(obj){
    //判断是否添加
    const oldInfo = this.globalData.cartList.find( (item) => item.iid === obj.iid )
    if(oldInfo){
      oldInfo.count += 1
    }else{
      obj.count = 1;
      obj.checked = true;
      this.globalData.cartList.push(obj);
    }
    //购物车回调
    if(this.addCartCallback){
      this.addCartCallback()
    }
  },
  globalData:{
    cartList:[]
  }
})
