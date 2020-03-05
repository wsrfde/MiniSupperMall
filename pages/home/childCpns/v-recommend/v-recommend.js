// pages/home/childCpns/v-recommend/v-recommend.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    recommends:{
      type:Array,
      value:[]
    }
  },
  data: {
    isLoad:false
  },
  methods: {
    imgLoad(){
      if (!this.data.isLoad) {
        this.data.isLoad = true
        this.triggerEvent('imgload',{},{});
      }
    }
  }
})
