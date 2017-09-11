import React, { Component } from 'react'
import './index.less'

class Message extends Component {
  render () {
    const name = window.localStorage.getItem('userName')
    const phone = window.localStorage.getItem('mobile')
    return (
      <div className='content'>
        <div>
          <img className='img' src='http://ooerhngjn.bkt.clouddn.com/user.png' />
          <div className='name'>姓名：{name}</div>
          <div className='number'>帐号：{phone}</div>
        </div>
      </div>
    )
  }
}

export default Message
