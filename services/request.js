import {baseURL} from './config.js'
export default function(option){
 return new Promise((resolve,reject)=>{
   wx.request({
     url: baseURL+ option.url,
     method: option.method || 'get',
     data: option.data || {},
     success:resolve,
       fail:reject
   })
 })
}