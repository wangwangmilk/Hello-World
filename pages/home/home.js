// pages/home/home.js
import { getMultidata, getGoodsData} from '../../services/home.js'
const type =['pop','new','sell']

Page({

  
  data: {
      banners:[],
      recommends:[],
    titles: ['流行','新款','精品'],
    goods:{
      pop:{page:0,list:[]},
      new:{page:0,list:[]},
      sell:{page:0,list:[]}
    },
    currentType:'pop',
    showBackTop:false,
    isTabFixed:false,
    isShowHeight:0
  },

  onLoad: function (options) {
   this._getMultidata()
   this._getGoodsData('pop')
   this._getGoodsData('new')
   this._getGoodsData('sell')
  },
  // --------------------------------网络请求函数-----------------------
  _getMultidata(){
    getMultidata().then(res => {
      //  console.log(res)
      const banners = res.data.data.banner.list
      const recommends = res.data.data.recommend.list
      this.setData({
        //  特别注意！！在setData中修改data数据左边是直接取值即可
        banners,
        recommends

      })

    })
  },
  _getGoodsData(type){
    const page = this.data.goods[type].page+1
    getGoodsData(type,page).then(res=>{
      const oldList = this.data.goods[type].list
        const list = res.data.data.list
        // oldList.push(...lish)
        for(let item of list ){
          oldList.push(item)
        }
        const listKey = `goods.${type}.list`
        const  pageKey =`goods.${type}.page`
         this.setData({
            [listKey]:oldList,
            [pageKey]:page
         })  
      
    })
  },
  // ----------------------------事件监听函数--------------------------
  handleTabClick(event){
    const index = event.detail.index
  //  console.log(event)
     this.setData({
       currentType:type[index]
     })
  },
  onReachBottom(){
    this._getGoodsData(this.data.currentType)
  },
  onPageScroll(options){
    const scrollTop = options.scrollTop
    // console.log(options)
     const flag = scrollTop >= 1000
     if(flag !== this.data.showBackTop){
       this.setData({
         showBackTop: flag
       })
     }
      const count  = scrollTop >= this.data.isShowHeight
       if(count!==this.data.isShowHeight){
          this.setData({
            isTabFixed:count
          })
       }
  },
  handleImageLoad(){
    wx.createSelectorQuery().select('#tab-control').boundingClientRect(rect=>{
                    //  console.log(rect)
         this.data.isShowHeight = rect.top
    }).exec()
  }
})