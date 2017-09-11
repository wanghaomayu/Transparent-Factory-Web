import React from 'react'
import {Table, Form, Button, Modal, Tag} from 'antd'
import {Link, routerRedux} from 'dva/router'
import moment from 'moment'
import DropOption from '../../../components/DropOption/'
import FormItemRender from '../../../components/FormItemRender/'
import {commonConfig} from './config'
import {connect} from 'dva'
import {color, urlEncode} from '../../../utils'
import './index.less'

const {confirm} = Modal
const Procedure = ({location, procedure, dispatch, form: {getFieldDecorator, validateFieldsAndScroll}}) => {
  const {table = [], tablePage, modal = false, modalContent = {}} = procedure
  const {query} = location
  const {order_code} = query

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
  const onCreateClick = e => {
    e.preventDefault()
    dispatch({type: 'procedure/updateModalContent', payload: {modalTitle: '添加工序'}})
    dispatch({type: 'procedure/showModal', payload: 'create'})
  }

  const onMenuClick = (key, record) => {
    let payload = {}
    switch (key) {
      case 'update':
        const {id = '', name = '', orderId = order_code, successCount = '', standard = '', workGroupId, totalCount = '', startTime = '', endTime = '', weight = '', description = ''} = record
        payload = {
          id: id,
          orderId: orderId,
          standard: standard,
          workGroupId: '' + workGroupId,
          weight: '' + weight,
          modalTitle: '修改工序----' + name,
          name: name,
          description: description,
          successCount: '' + successCount,
          totalCount: '' + totalCount,
          startTime: moment(startTime, 'YYYY-MM-DD'),
          endTime: moment(endTime, 'YYYY-MM-DD')
        }

        dispatch({type: 'procedure/updateModalContent', payload})
        dispatch({type: 'procedure/showModal', payload: 'update'})
        break
      case 'delete':
        payload = {
          id: id
        }
        confirm({
          title: '删除确认',
          content: '是否删除？删除不可取消',
          onOk() {
            dispatch({type: 'procedure/delete', payload: record.id})
          },
          onCancel() {
          }
        })
        break
    }
  }
  const onModalOk = () => {
    validateFieldsAndScroll((errors, values) => {
      if (errors) {
        return
      }
      const {
        name = '', orderId = order_code, description = '', successCount = '', standard = '', workGroupId = '', totalCount = '', startTime = '', endTime = '', weight = ''
      } = values
      let originWeight = weight
      let weights = table.map((item) => {
        let {id, weight} = item
        weight = weight * (1 - originWeight)
        return (Object.assign({}, {id}, {weight}))
      })
      let payload = {}
      const {modalContent: {id}} = procedure
      if (modal === 'create' || modal === 'update') {
        payload = {
          id,
          name,
          orderId,
          totalCount,
          standard,
          successCount,
          workGroupId,
          weight,
          weights,
          description,
          startTime: startTime.format('YYYY-MM-DD HH:00:00'),
          endTime: endTime.format('YYYY-MM-DD HH:00:00')
        }
      }
      dispatch({type: `procedure/${modal}`, payload: payload})
    })
  }
  const toggleStatus = (record) => {
    dispatch({type: 'procedure/toggleStatus', payload: record})
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
  const procedureStatus = [
    '停产',
    '生产'
  ]
  const colorArr = {
    0: color.gray,
    1: color.green,
    2: color.red
  }
  const columns = [
    {title: '序号', dataIndex: 'id', key: 'id', width: 50},
    {title: '工序名称', dataIndex: 'name', key: 'name'},
    // {
    //   title: '生产力',
    //   key: 'capacity',
    //   render: (record) => {
    //     return (<span>{record.successCount / record.totalCount}</span>)
    //   }
    // },
    {
      title: '状态',
      key: 'status',
      render: record => <Tag color={colorArr[record.status]}>{procedureStatus[record.status]}</Tag>,
      onCellClick: toggleStatus,
      width: 50
    },
    {title: '已经生产项目', key: 'successCount', dataIndex: 'successCount'},
    {title: '总量', key: 'totalCount', dataIndex: 'totalCount'},
    {title: '权重', key: 'weight', dataIndex: 'weight'},
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
                key: 'update', name: '修改工序'
              }, {
                key: 'delete', name: '删除工序'
              }
            ]}
            buttonStyle={{border: 'solid 1px #eee'}}
            onMenuClick={({key}) => onMenuClick(key, record)}
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
        <span>工序列表</span>
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
