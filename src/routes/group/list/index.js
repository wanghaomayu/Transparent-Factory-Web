import React from 'react'
import { Table, Form, Button, Modal } from 'antd'
import { routerRedux } from 'dva/router'
import DropOption from '../../../components/DropOption/'
import FormItemRender from '../../../components/FormItemRender/'
import { createConfig, updateConfig } from './config'
import { connect } from 'dva'
import { urlEncode } from '../../../utils'
import moment from 'moment'
import './index.less'

const List = ({list, dispatch, form: {getFieldDecorator, validateFieldsAndScroll}}) => {
  const {table = {}, tableSize, tableCount, tablePage, modal = false, modalContent = {}} = list
  //   操作DropOption按钮操作
  const onMenuClick = (key, record) => {
    let payload = {}
    switch (key) {
      case 'update':
        const {startTime, endTime} = record
        payload = {
          ...record,
          modalTitle: '修改订单-' + record.title,
          title: record.title,
          description: record.description,
          type: record.type,
          totalCount: record.totalCount,
          customerInfo: record.customerInfo,
          addOn: record.addOn,
          startTime: moment(startTime, 'YYYY-MM-DD'),
          endTime: moment(endTime, 'YYYY-MM-DD'),
        }
        dispatch({type: 'current/updateModalContent', payload: payload})
        dispatch({type: 'current/showModal', payload: 'update'})
        break
    }
  }
  const onCreateClick = e => {
    e.preventDefault()
    dispatch({type: 'list/updateModalContent', payload: {modalTitle: '创建班组长账号'}})
    dispatch({type: 'list/showModal', payload: 'create'})
  }
  //   模态框确定按钮
  const onModalOk = () => {
    validateFieldsAndScroll((errors, values) => {
      if (errors) {
        return
      }
      const {
        name = '', mobile = '', password = ''
      } = values
      let payload = {}
      if (modal === 'create') {
        payload = {
          name,
          mobile,
          password
        }
      } else if (modal === 'update') {}
      dispatch({type: `list/${modal}`, payload: payload})
    })
  }
  const pagination = {
    pageSize: +tableSize,
    current: +tablePage,
    total: +tableCount,
    pageSizeOptions: ['20', '50', '100'],
    showSizeChanger: true,
    onShowSizeChange: (current, pageSize) => {
      dispatch(routerRedux.push(`/group/list?page=${current}&size=${pageSize}`))
    },
    onChange: (current) => {
      dispatch(routerRedux.push(`/group/list?page=${current}&size=${tableSize}`))
    }
  }
  const columns = [
    {title: '序号', dataIndex: 'fakeId', key: 'id', width: 50},
    {title: '钳工组', key: 'name', dataIndex: 'name', width: 70},
    {title: '状态', key: 'status', dataIndex: 'status'},
    {title: '描述', key: 'description', dataIndex: 'description'},
    {title: '班组号', key: 'leaderId', dataIndex: 'leaderId'},
    {title: '班组名',key: 'leaderName', dataIndex: 'leaderName'},
    {title: '附加信息', key: 'addOn', dataIndex: 'addOn'},
    {title: '创建时间', key: 'createdAt', dataIndex: 'createdAt'},
    {title: '更新时间', key: 'updatedAt', dataIndex: 'updatedAt'},
    {
      title: '操作',
      render: (record) => {
        return (
          <DropOption
            menuOptions={[
              {
                key: 'update', name: '班组基本信息修改',
              }]}
            buttonStyle={{border: 'solid 1px #eee'}}
            onMenuClick={({key}) => onMenuClick(key, record)}
          />
        )
      },
      fixed: 'right',
      width: 80,
      key: 'edit',
    }
  ]
  return (
    <div className='list'>
      <div className='list-header'>
        <span>班组长信息管理</span>
        <Button type='primary' onClick={onCreateClick}>添加班组长</Button>
      </div>
      <Table
        columns={columns} bordered
        dataSource={table} scroll={{x: 1600}}
        pagination={pagination} rowKey={record => record.id}
      />
      <Modal
        title={modalContent.modalTitle}
        visible={!!modal}
        onCancel={() => dispatch({type: 'list/hideModal'})}
        onOk={onModalOk}
        key={'' + modal}
      >
        <Form className='form-content'>
          {
            (modal === 'create') && createConfig.map(
              config => FormItemRender(config, getFieldDecorator,
                {initialValue: modalContent[config.value]}))
          }
          {
            (modal === 'update') && updateConfig.map(
              config => FormItemRender(config, getFieldDecorator,
                {initialValue: modalContent[config.value]}))
          }
        </Form>
      </Modal>
    </div>
  )
}

export default connect(({app, list}) => ({app, list}))(
  Form.create()(List))
