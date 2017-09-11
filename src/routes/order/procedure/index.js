import React from 'react'
import {Table, Form, Button, Modal} from 'antd'
import {Link, routerRedux} from 'dva/router'
import moment from 'moment'
import DropOption from '../../../components/DropOption/'
import FormItemRender from '../../../components/FormItemRender/'
import {commonConfig} from './config'
import {connect} from 'dva'
import {color, urlEncode} from '../../../utils'
import './index.less'

const Procedure = ({location, procedure, dispatch, form: {getFieldDecorator, validateFieldsAndScroll}}) => {
  const {table = [], tablePage, modal = false, modalContent = {}} = procedure
  const {query} = location
  const {order_code} = query
  console.log(table)
  const formItemLayout = {
    labelCol: {
      xs: {span: 24},
      sm: {span: 6}
    },
    wrapperCol: {
      xs: {span: 24},
      sm: {span: 16}
    }
  }
  const status = [
    {
      color: color.green,
      value: '自动'
    }, {
      color: color.red,
      value: '关闭'
    }, {
      color: color.blue,
      value: '开启'
    }]
  const onCreateClick = e => {
    e.preventDefault()
    dispatch({type: 'procedure/updateModalContent', payload: {modalTitle: '添加工序'}})
    dispatch({type: 'procedure/showModal', payload: 'create'})
  }
  const onModalOk = () => {
    validateFieldsAndScroll((errors, values) => {
      if (errors) {
        return
      }
      const {
        name = '', orderId = order_code, standard = '', workGroupId = '', totalCount = '', time = '', weight = ''
      } = values
      let payload = {}
      if (modal === 'create' || modal === 'update') {
        payload = {
          name,
          orderId,
          totalCount,
          standard,
          workGroupId,
          weight,
          startTime: time[0].format('YYYY-MM-DD HH:00:00'),
          endTime: time[1].format('YYYY-MM-DD HH:00:00')
        }
      }
      dispatch({type: `procedure/${modal}`, payload: payload})
    })
  }
  // const pagination = {
  //   pageSize: +tableSize,
  //   procedure: +tablePage,
  //   total: +tableCount,
  //   pageSizeOptions: ['20', '50', '100'],
  //   showSizeChanger: true,
  //   onShowSizeChange: (procedure, pageSize) => {
  //     dispatch(
  //       routerRedux.push(`/order/procedure?page=${procedure}&size=${pageSize}`))
  //   },
  //   onChange: (procedure) => {
  //     dispatch(routerRedux.push(`/order/procedure?page=${procedure}&size=${tableSize}`))
  //   }
  // }
  const columns = [
    {title: '序号', dataIndex: 'id', key: 'id', width: 50},
    {title: '工序名称', dataIndex: 'name', key: 'name'},
    {
      title: '生产力',
      key: 'capacity',
      render: (record) => {
        return (<span>{record.successCount / record.totalCount}</span>)
      }
    },
    {title: '已经生产项目', key: 'successCount', dataIndex: 'successCount'},
    {title: '总量', key: 'totalCount', dataIndex: 'totalCount'},
    {title: '工作组名称', key: 'workGroupName', dataIndex: 'workGroupName'},
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
        <Button type='primary' onClick={onCreateClick}>添加工序</Button>
      </div>
      <Table
        columns={columns} bordered
        dataSource={table} scroll={{x: 1600}}
        rowKey={record => record.id}
      />
      <Modal
        title={modalContent.modalTitle}
        visible={!!modal}
        onCancel={() => dispatch({type: 'procedure/hideModal'})}
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

export default connect(({app, procedure}) => ({app, procedure}))(
  Form.create()(Procedure))
