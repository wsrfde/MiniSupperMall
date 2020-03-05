// components/v-control-bar/v-control-bar.js
Component({
  properties: {
    title:{
      type:Array,
      value:[]
    }
  },
  data: {
    currentIndex:0
  },
  methods: {
    controlClick(event){
      let index = event.currentTarget.dataset.index;
      this.setData({
        currentIndex:index
      }) 
      //把index封装成对象发送
      let data ={index:index};
      this.triggerEvent('tabclick',data,{})
    }
  }
})
