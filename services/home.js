import request from './request.js'
export function getMultidata(){
  return request({
    url:'/home/multidata'
    
  })
}
export function getGoodsData(type,page){
  return request({
    url:'/home/data',
    data:{
      type,
      page
    }
  })
}