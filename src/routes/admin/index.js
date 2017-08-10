/**
 * Created by out_xu on 17/7/7.
 */
import React from 'react'
import { connect } from 'dva'
import Sider from '../../components/Layout/Sider'
const AdminPage = ({children, admin: {menus, adminQuery}}) => (
  <div className='main-wrapper'>
    <sider className='sider light'>
      <Sider menuConfig={menus} location={location} query={adminQuery} />
    </sider>
    <div className='main-container'>
      {children}
    </div>
  </div>
)

export default connect(({admin}) => ({admin}))(AdminPage)
