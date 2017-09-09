import config from './app.json'

const {baseURL} = config

const apiMaker = path => `${baseURL}/${path}`

export default {

  host: apiMaker(''),
  //  order
  myOrderCurrent: apiMaker('myOrder/current')
}
