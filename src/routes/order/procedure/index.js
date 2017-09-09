import React from 'react'
import {Table, Form, Button, Modal} from 'antd'
import {Link, routerRedux} from 'dva/router'
import DropOption from '../../../components/DropOption/'
import FormItemRender from '../../../components/FormItemRender/'
import {commonConfig} from './config'
import {connect} from 'dva'
import {color, urlEncode} from '../../../utils'
import './index.less'

const Current = ({location, proceduce, dispatch, form: {getFieldDecorator, validateFieldsAndScroll}}) => {
  const {table = {}, tableSize, tableCount, tablePage, modal = false, modalContent = {}} = proceduce
  const {query} = location
  // const formItemLayout = {
  //   labelCol: {
  //     xs: {span: 24},
  //     sm: {span: 6},
  //   },
  //   wrapperCol: {
  //     xs: {span: 24},
  //     sm: {span: 16},
  //   },
  // }
  // const status = [
  //   {
  //     color: color.green,
  //     value: '自动',
  //   }, {
  //     color: color.red,
  //     value: '关闭',
  //   }, {
  //     color: color.blue,
  //     value: '开启',
  //   }]
  const onCreateClick = e => {
    e.preventDefault()
    dispatch({type: 'current/updateModalContent', payload: {modalTitle: '创建订单'}})
    dispatch({type: 'current/showModal', payload: 'create'})
  }
  const onModalOk = () => {
    validateFieldsAndScroll((errors, values) => {
      if (errors) {
        return
      }
      const {
        title = '', description = '', startTime = '', endTime = '', totalCount = '', customerInfo = ''
      } = values
      let payload = {}
      if (modal === 'create' || modal === 'update') {
        payload = {
          title,
          description,
          totalCount,
          startTime: startTime.format('YYYY-MM-DD HH:00:00'),
          endTime: endTime.format('YYYY-MM-DD HH:00:00')
        }
      }
    })
  }
  const pagination = {
    pageSize: +tableSize,
    current: +tablePage,
    total: +tableCount,
    pageSizeOptions: ['20', '50', '100'],
    showSizeChanger: true,
    onShowSizeChange: (current, pageSize) => {
      dispatch(
        routerRedux.push(`/order/current?page=${current}&size=${pageSize}`))
    },
    onChange: (current) => {
      dispatch(routerRedux.push(`/order/current?page=${current}&size=${tableSize}`))
    }
  }
  const columns = [
    {title: '序号', dataIndex: 'fakeId', key: 'id', width: 50},
    {title: '订单号', dataIndex: 'orderCode', key: 'orderCode'},
    {title: '订单名', key: 'title', dataIndex: 'title'},
    {title: '创建者序号', key: 'creatorId', dataIndex: 'creatorId', width: '70'},
    {title: '全部数量', key: 'totalCount', dataIndex: 'totalCount'},
    {title: '生产公司', key: 'customerInfo', dataIndex: 'customerInfo'},
    {title: '生产力', key: 'capacity', dataIndex: 'capacity'},
    {title: '创建时间', key: 'createdAt', dataIndex: 'createdAt'},
    {title: '更新时间', key: 'updatedAt', dataIndex: 'updatedAt'},
    {title: '开始时间', key: 'startTime', dataIndex: 'startTime'},
    {title: '结束时间', key: 'endTime', dataIndex: 'endTime'},
    {
      title: '操作',
      render: (record) => {
        return (
          <DropOption
            menuOptions={[
              {
                key: 'update', name: '修改订单'
              }, {
                key: 'procedures', name: '工序操作'
              }]}
            buttonStyle={{border: 'solid 1px #eee'}}
          />
        )
      },
      fixed: 'right',
      width: 80,
      key: 'edit'
    }
  ]
  return (
    <div className='contest'>
      <div className='contest-header'>
        <span>进行中的订单</span>
        <Button type='primary' onClick={onCreateClick}>创建订单</Button>
      </div>
      <Table
        columns={columns} bordered
        dataSource={table} scroll={{x: 1600}}
        pagination={pagination} rowKey={record => record.id}
      />
      {/*<Modal*/}
        {/*title={modalContent.modalTitle}*/}
        {/*visible={modal}*/}
        {/*onCancel={() => dispatch({type: 'current/hideModal'})}*/}
        {/*onOk={onModalOk}*/}
        {/*key={'' + modal}*/}
      {/*>*/}
        {/*<Form className='form-content'>*/}
          {/*{*/}
            {/*(modal === 'update' || modal === 'create') && commonConfig.map(*/}
              {/*config => FormItemRender(config, getFieldDecorator,*/}
                {/*{initialValue: modalContent[config.value]}))*/}
          {/*}*/}
        {/*</Form>*/}
      {/*</Modal>*/}
    </div>
  )
}

export default connect(({app, current}) => ({app, current}))(
  Form.create()(Current))
