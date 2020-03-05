// components/v-goods-item/v-goods-item.js
Component({
  properties: {
    item: {
      type: Object,
      value: {}
    }
  },
  data: {
    // iid: ""
  },
  methods: {
    jumpDetail() {
      wx.navigateTo({
        url: '/pages/detail/detail',
        success: (res)=> {
          // 通过eventChannel向被打开页面传送数据
          res.eventChannel.emit('emitIid', {
            iid: this.data.item.iid
          })
        }
      })
    }
  }
})