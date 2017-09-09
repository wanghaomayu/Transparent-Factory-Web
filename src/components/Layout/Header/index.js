import React from 'react'
import { Link } from 'dva/router'
import TweenOne from 'rc-tween-one'
import { config, enquireScreen, goto } from '../../../utils/'
import './index.less'
import navConfig from './header.json'
import { Dropdown, Icon, Menu, Modal } from 'antd'

class Header extends React.Component {
  static defaultProps = {
    className: 'order-header'
  }

  constructor (props) {
    super(props)
    this.state = {
      isMode: false,
      openAnim: null,
      phoneOpen: false,
      barAnim: []
    }
  }

  componentDidMount () {
    enquireScreen((bool) => {
      this.setState({
        isMode: bool
      })
    })
  }

  getAnimData = phoneOpen => (phoneOpen ? {
    phoneOpen: false,
    openAnim: {opacity: 0, delay: 300, duration: 400},
    barAnim: [
      {rotate: 0, y: 0, duration: 300},
      {opacity: 1, duration: 300},
      {rotate: 0, y: 0, duration: 300}
    ]
  } : {
    phoneOpen: true,
    openAnim: {opacity: 1, duration: 400},
    barAnim: [
      {rotate: 45, y: 6, duration: 300},
      {opacity: 0, duration: 300},
      {rotate: -45, y: -6, duration: 300}
    ]
  })

  phoneClick = (e, phoneOpen, href, isLogo) => {
    if (!this.state.isMode || isLogo && !phoneOpen) {
      return
    }
    if (href) {
      e.preventDefault()
      setTimeout(goto(href), 850)
    }
    this.setState(this.getAnimData(phoneOpen))
  }
  //   退出登录用的模态框
  onClickLogout = (e) => {
    e.preventDefault()
    const {dispatch} = this.props
    Modal.confirm({
      title: '退出确认',
      content: '是否退出？退出后下次进入需要重新登录。',
      onOk () {
        dispatch({type: 'app/logout'})
        window.localStorage.removeItem('userToken')
        window.localStorage.removeItem('userName')
      },
      onCancel () {}
    })
  }

  render () {
    const {location, app} = this.props
    const {navItem = []} = navConfig
    const token = window.localStorage.getItem('userToken')
    const userName = window.localStorage.getItem('userName')
    const navToRender = navItem.map((item) => {
      const className = this.props.activeKey === item.key ? 'active' : ''
      return (
        <li key={item.key}>
          <Link
            to={item.href}
            className={className}
            onClick={(e) => {
              this.phoneClick(e, this.state.phoneOpen, item.href)
            }}
          >
            {item.name}
          </Link>
        </li>
      )
    })
    return (
      <header
        id='nav-header'
        className={`${this.props.className}-wrapper${this.state.phoneOpen ? ' open' : ''}`}
      >
        <div className={this.props.className}>
          <TweenOne
            className={`${this.props.className}-logo`}
            animation={{opacity: 0, type: 'from'}}
          >
            {/*<Link to='/' key='logo' onClick={(e) => { this.phoneClick(e, this.state.phoneOpen, '/', true) }}>*/}
            {/*<span style={{fontSize: 20, color: '#fff'}}>*/}
            {/*{this.state.isMode ? (*/}
            {/*'全国大学生电子设计竞赛'*/}
            {/*) : config.name}*/}
            {/*</span>*/}
            {/*</Link>*/}
            <span style={{fontSize: 20, color: '#fff'}}>
              logo
            </span>
          </TweenOne>
          {
            this.state.isMode ? (
              <div className='phone-nav'>
                <div className='phone-nav-bar' onClick={(e) => { this.phoneClick(e, this.state.phoneOpen) }}>
                  <TweenOne component='em' animation={this.state.barAnim[0]} />
                  <TweenOne component='em' animation={this.state.barAnim[1]} />
                  <TweenOne component='em' animation={this.state.barAnim[2]} />
                </div>
                <TweenOne
                  className='phone-nav-text-wrapper'
                  animation={this.state.openAnim}
                  style={{pointerEvents: this.state.phoneOpen ? 'auto' : 'none'}}
                >
                  {this.state.phoneOpen && (
                    <ul>
                      {navToRender}
                      {app.user.id && (
                        <li key='logout'>
                          <Link onClick={this.onClickLogout}> 退出登录 </Link>
                        </li>
                      )}
                    </ul>
                  )}

                </TweenOne>
              </div>
            ) : (
              <TweenOne
                component='nav'
                className='web-nav'
                animation={{opacity: 0, type: 'from'}}
              >
                {token ? (
                  <ul>
                    {navToRender}
                    <li key='login'>
                      <Dropdown overlay={(
                        <Menu theme='dark' style={{width: 90, float: 'right'}}>
                          <Menu.Item key='2'>
                            <Link onClick={this.onClickLogout}> 退出登录 </Link>
                          </Menu.Item>
                          <Menu.Divider />
                        </Menu>
                      )}>
                        <a>
                          <Icon type='user' /> {userName || '未命名用户'} <Icon type='down' />
                        </a>
                      </Dropdown>
                    </li>
                  </ul>
                ) : (
                  <ul>
                    <li key='login'>
                      <Link
                        to={`/login?from=${location.pathname}`}
                      >
                        登录
                      </Link>
                    </li>
                  </ul>
                )}
              </TweenOne>
            )
          }
        </div>
      </header>
    )
  }
}

export default Header
