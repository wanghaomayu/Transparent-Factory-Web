import React from 'react'
import { Table, Form, Button, Modal, Alert } from 'antd'
import { routerRedux } from 'dva/router'
import DropOption from '../../../components/DropOption/'
import FormItemRender from '../../../components/FormItemRender/'
import { commonConfig } from './config'
import { connect } from 'dva'
import { urlEncode } from '../../../utils'
import moment from 'moment'
import './index.less'

const {confirm} = Modal

const UnStart = ({unStart, dispatch, form: {getFieldDecorator, validateFieldsAndScroll}}) => {
  const {table = {}, tableSize, tableCount, tablePage, modal = false, modalContent = {}} = unStart
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
          type: '' + record.value,
          totalCount: record.totalCount,
          customerInfo: record.customerInfo,
          addOn: record.addOn,
          startTime: moment(startTime, 'YYYY-MM-DD'),
          endTime: moment(endTime, 'YYYY-MM-DD'),
        }
        dispatch({type: 'unStart/updateModalContent', payload: payload})
        dispatch({type: 'unStart/showModal', payload: 'update'})
        break
      case 'procedures':
        confirm({
          title: `跳转确认`,
          content: `你确定要跳转到 ${record.title} 题目列表吗？`,
          onOk () {
            dispatch(routerRedux.push(`/order/procedure?` +
              urlEncode({order_id: record.id})))
          },
          onCancel () {},
        })
        break
    }
  }
  const onCreateClick = e => {
    e.preventDefault()
    dispatch(
      {type: 'unStart/updateModalContent', payload: {modalTitle: '创建订单'}})
    dispatch({type: 'unStart/showModal', payload: 'create'})
  }
  //   模态框确定按钮
  const onModalOk = () => {
    validateFieldsAndScroll((errors, values) => {
      if (errors) {
        return
      }
      const {
        title = '', description = '', startTime = '', endTime = '', totalCount = '', customerInfo = '', type = '', addOn = '',
      } = values
      let payload = {}
      if (modal === 'create' || modal === 'update') {
        payload = {
          title,
          description,
          totalCount,
          customerInfo,
          type,
          addOn,
          startTime: startTime.format('YYYY-MM-DD HH:00:00'),
          endTime: endTime.format('YYYY-MM-DD HH:00:00'),
        }
      }
      dispatch({type: `unStart/${modal}`, payload: payload})
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
        routerRedux.push(`/order/unStart?page=${current}&size=${pageSize}`))
    },
    onChange: (current) => {
      dispatch(
        routerRedux.push(`/order/unStart?page=${current}&size=${tableSize}`))
    },
  }
  const columns = [
    {title: '序号', dataIndex: 'fakeId', key: 'id', width: 50},
    {title: '订单号', dataIndex: 'orderCode', key: 'orderCode'},
    {title: '订单名', key: 'title', dataIndex: 'title'},
    {title: '创建者序号', key: 'creatorId', dataIndex: 'creatorId', width: 70},
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
                key: 'update', name: '修改订单',
              }, {
                key: 'procedures', name: '工序操作',
              }]}
            buttonStyle={{border: 'solid 1px #eee'}}
            onMenuClick={({key}) => onMenuClick(key, record)}
          />
        )
      },
      fixed: 'right',
      width: 80,
      key: 'edit',
    },
  ]
  return (
    <div className='contest'>
      <div className='contest-header'>
        <span>未开始的订单</span>
        <Button type='primary' onClick={onCreateClick}>创建订单</Button>
      </div>
      {
        table.length > 0 ? (
          <Table
            columns={columns} bordered
            dataSource={table} scroll={{x: 1600}}
            pagination={pagination} rowKey={record => record.orderCode}
          />
        ) : (
          <Alert
            message={(<span>暂无进行中的订单列表，请先行创建订单</span>)}
            description={(<span>点击右上角蓝色"创建订单"按钮</span>)}
            type='info'
            showIcon
          />
        )
      }
      <Modal
        title={modalContent.modalTitle}
        visible={!!modal}
        onCancel={() => dispatch({type: 'unStart/hideModal'})}
        onOk={onModalOk}
        key={'' + modal}
      >
        <Form className='form-content'>
          {
            (modal === 'update' || modal === 'create') && commonConfig.map(
              config => FormItemRender(config, getFieldDecorator,
                {initialValue: modalContent[config.value]}))
          }
        </Form>
      </Modal>
    </div>
  )
}

export default connect(({app, unStart}) => ({app, unStart}))(
  Form.create()(UnStart))
