// pages/category/category.js
import { getCategory, getSubcategory, getCategoryDetail } from '../../service/category.js'

const type = ['pop','new','sell']
Page({
  /**
   * 页面的初始数据
   */
  data: {
    categories:[],
    categoryData:{},
    currentIndex:0,
    currentType:'pop'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //1. 请求分类数据
    this._getCategory()
  },
  _getCategory(){
    getCategory().then(res => {
      //2. 请求列表
      const categories = res.data.data.category.list;
      //3. 初始化每个子数据
      const categoryData = {}
      for(let i=0;i<categories.length;i++){
        categoryData[i] = {
          subcategories : {},
          // categoryDetail : {}
          categoryDetail : {
           'pop':[],
           'new':[],
           'sell':[]
          }
        }
      }
      this.setData({
        categories,
        categoryData
      })
      //4. 请求第一个类别子数据
      this._getSubcategory(0)
      //5. 请求第一个类别子数据详情
      this._getCategoryDetail(0)
    })
  },
  _getSubcategory(currentIndex){
    //获取对应的maitKey
    const maitKey = this.data.categories[currentIndex].maitKey;
    //把数据保存在categoryData中
    getSubcategory(maitKey).then(res =>{
      const tempCategoryData = this.data.categoryData;
      tempCategoryData[currentIndex].subcategories = res.data.data.list;
      this.setData({
        categoryData: tempCategoryData
      })
    })
  },
  //请求子分类详情数据
  _getCategoryDetail(currentIndex,type='pop'){
    console.log(currentIndex,type)
    //1. 
    const miniWallkey = this.data.categories[currentIndex].miniWallkey;
    this._getRealCategoryDetail(currentIndex, miniWallkey, 'pop');
    this._getRealCategoryDetail(currentIndex, miniWallkey, 'new');
    this._getRealCategoryDetail(currentIndex, miniWallkey, 'sell');
  },
  _getRealCategoryDetail(currentIndex, miniWallkey,type){
    getCategoryDetail(miniWallkey, type).then( res =>{
      //1. 获取categoryData
      const categoryData = this.data.categoryData;
      //2. 把数据赋值给categoryData下的catagoryDatail
      categoryData[currentIndex].categoryDetail[type] = res.data;
      //3. 把数据进行保存
      this.setData({
        categoryData
      })
    })
  },
  //接收传过来的index
  menuClick(e){
    const currentIndex=  e.detail.currentIndex;
    this.setData({
      currentIndex
    })

    this._getSubcategory(currentIndex)

    this._getCategoryDetail(currentIndex)
  },
  //接收类型的下标
  tabClick(e){
    //获取当前type
    const index = e.detail;
    const currentType = type[index];
    this.setData({
      currentType
    })
  }
})