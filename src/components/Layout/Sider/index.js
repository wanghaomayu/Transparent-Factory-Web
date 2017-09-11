import React from 'react'
import { Icon, Menu } from 'antd'
import { Link } from 'dva/router'
import { urlEncode, windowScroll } from '../../../utils'

const {SubMenu} = Menu
const Sider = ({menuConfig, location, query = {}}) => {
  const {menus = [], openKeys = [], defaultSelectedKeys} = menuConfig
  const renderMenus = menus => (
    menus.map(item => {
      const {subMenus = []} = item
      if (subMenus.length > 0) {
        return (
          <SubMenu key={item.key}
                   title={<span><Icon type={item.icon} /> {item.value}</span>}>
            {renderMenus(subMenus)}
          </SubMenu>
        )
      }
      const queryString = item.route
        ? '?' + urlEncode(query[item.route] || {})
        : ''
      return (
        //   URL路由重复的原因：这边跳转的是item.key,所得menu.json里面的key一定要设绝对路径，如：'/group/list'
        <Menu.Item key={item.key}>
          <Link to={item.key + queryString}><Icon type={item.icon} />{item.value}</Link>
        </Menu.Item>
      )
    })
  )
  return (
    <div style={{marginTop: 10}}>
      <Menu
        mode='inline'
        defaultSelectedKeys={[menus[0].key + '']}
        selectedKeys={[location.pathname]}
        style={{height: '100%', borderRight: 0}}
        onClick={() => windowScroll('nav-header')}
      >
        {renderMenus(menus)}
      </Menu>
    </div>
  )
}

Sider.propTypes = {}
Sider.defaultProps = {}

export default Sider
