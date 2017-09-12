import React, {Component} from 'react'
import {Table, Form, Button, Modal, Tag, Radio} from 'antd'
import {LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts'
import moment from 'moment'
import DropOption from '../../../components/DropOption/'
import FormItemRender from '../../../components/FormItemRender/'
import {commonConfig} from './config'
import {connect} from 'dva'
import {color, urlEncode} from '../../../utils'
import './index.less'

const {confirm} = Modal

class Procedure extends Component {
  constructor(props) {
    super(props)
    this.state = {
      logIndex: ''
    }
  }

  render() {
    const {location, procedure, dispatch, form: {getFieldDecorator, validateFieldsAndScroll}} = this.props
    const {table = [], groupList, modal = false, modalContent = {}, logs = []} = procedure
    const {query} = location
    const {order_id} = query
    const GroupOptions = groupList.map(config => {
      return {
        value: config.id + '',
        label: config.name
      }
    })
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
          const {id = '', name = '', orderId = order_id, successCount = '', standard = '', workGroupId, totalCount = '', startTime = '', endTime = '', weight = '', description = ''} = record
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
        case 'show': {
          const {id} = record
          console.log(id)
          if (id) {
            dispatch({type: 'procedure/getLogs', payload: id})
            this.setState({
              logIndex: id
            })
            console.log(id)
          }
        }
      }
    }
    const onModalOk = () => {
      validateFieldsAndScroll((errors, values) => {
        if (errors) {
          return
        }
        const {
          name = '', orderId = order_id, description = '', successCount = '', standard = '', workGroupId = '', totalCount = '', startTime = '', endTime = '', weight = ''
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
      const {id, status} = record
      if (status === 1) {
        confirm({
          title: '状态修改确认',
          content: '确定修改状态为已完成?',
          onOk() {
            dispatch({
              type: 'procedure/toggleStatus', payload: {status: 2, id}
            })
          },
          onCancel() {
          }
        })
      } else if (status === 0) {
        dispatch({type: 'procedure/toggleStatus', payload: {status: 1, id}})
      } else {
        dispatch({type: 'procedure/toggleStatus', payload: {status: 0, id}})
      }
    }
    const procedureStatus = [
      '未开始',
      '进行中',
      '已完成'
    ]
    const colorArr = {
      0: color.gray,
      1: color.blue,
      2: color.green
    }
    const columns = [
      {title: '序号', dataIndex: 'id', key: 'id', width: 50},
      {title: '工序名称', dataIndex: 'name', key: 'name'},
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
                }, {
                  key: 'show', name: '显示图表'
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
    const {logIndex} = this.state
    return (
      <div className='procedure'>
        <div className='procedure-header'>
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
              FormItemRender({
                value: 'workGroupId',
                label: '班组',
                formType: 2,
                contentType: 'string',
                rules: {
                  required: true,
                  requiredMessage: '请选择您所在的班组'
                },
                options: GroupOptions
              }, getFieldDecorator)}
            {
              (modal === 'update' || modal === 'create') && commonConfig.map(
                config => FormItemRender(config, getFieldDecorator,
                  {initialValue: modalContent[config.value]}))
            }
          </Form>
        </Modal>


        {logIndex && logs.length > 0 ? (
          <div>
            <div className='procedure-header' style={{'margin': '10px'}}>
              <span>{logIndex ? `工序${logIndex}图表` : ''}</span>
            </div>
            <LineChart style={{'width': '100%'}} width={1300} height={400} data={logs}>
              <XAxis dataKey="leaderName"/>
              <YAxis/>
              <CartesianGrid strokeDasharray="3 3"/>
              <Tooltip/>
              <Legend/>
              <Line type="monotone" dataKey="successCount" stroke="#82ca9d" activeDot={{r: 8}}/>
            </LineChart>
          </div>
        ) : (
          <h1 className='no-message'>暂无生产信息</h1>
        )}
      </div>
    )
  }
}

export default connect(({app, procedure}) => ({app, procedure}))(
  Form.create()(Procedure))
