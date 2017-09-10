import React, { Component } from 'react'
import './index.less'

class Message extends Component {
  render () {
    return (
      <div className='content'>
        <div>
          <img className='img' src='http://ooerhngjn.bkt.clouddn.com/user.png' />
          <div className='name'>姓名：奥特曼</div>
          <div className='number'>帐号：130888888</div>
        </div>
      </div>
    )
  }
}

export default Message
