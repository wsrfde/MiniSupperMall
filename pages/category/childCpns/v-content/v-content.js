// pages/category/childCpns/v-content/v-content.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    subcategories:{
      type:Array,
      value:[]
    },
    categoryDetail:{
      type:Array,
      value:[]
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
    tabClick(e){
      const index = e.detail.index;
      this.triggerEvent('tabclick',index,{})
    }
  }
})
