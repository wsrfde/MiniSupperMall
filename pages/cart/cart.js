// pages/cart/cart.js
const app = getApp();

Page({

  data: {
    cartList:[],
    isSelectAll:false,
    totalPrice : 0,
    totalCounter : 0
  },
  onLoad: function (options) {
    //1. 第一次加载数据
    this.setData({
      cartList:app.globalData.cartList
    })
    //2. 设置回调
    //为什么设置回调？
    //个人理解：在切换购物车时没有添加商品，所以购物车没有数据。再返回商品添加时页面已经onLoad，不会再执行第二次，商品无法准确显示所以要把参数回调过来进行展示，并计算总价
    app.addCartCallback= ()=>{
      this.setData({
        cartList:app.globalData.cartList
      })
      this.selectState()
      this.changeData() 
    }
    //3. 设置修改某个商品的回调
    app.changeGoodsState = (goods, index) =>{
      //1. 修改某一项的选中状态
      this.setData({
        [`cartList[${index}]`]:goods
      })

      //2. 修改全选的状态
      this.selectState()
      this.changeData()
    }
  },
  onShow(){
    wx.setNavigationBarTitle({
      title:`购物车(${this.data.cartList.length})`
    })
    // this.selectState()
    this.changeData()
  },
  onSelectAll(){
    //判断是否全部选中
    if(this.data.isSelectAll){
      this.data.cartList.forEach(item =>{item.checked = false})
      this.setData({
        cartList:this.data.cartList,
        isSelectAll:false
      })
    }else{//某些没选中
      this.data.cartList.forEach(item =>{item.checked = true})
      this.setData({
        cartList:this.data.cartList,
        isSelectAll:true
      })
    }
  },
  //全选状态判断
  selectState() {
    const selectAll = !!(this.data.cartList.length && this.data.cartList.every(item =>  item.checked ))
    this.setData({
      isSelectAll: selectAll
    })
  },
  changeData(){
    //1. 获取所有选中数据
    let totalPrice = 0;
    let counter = 0;

    for(let item of this.data.cartList){
      if(item.checked){
        counter++
        totalPrice += item.price * item.count
      }
    }
    console.log(totalPrice,counter)

    this.setData({
      totalPrice:totalPrice,
      totalCounter:counter
    })
  }

})