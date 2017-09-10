import { verify } from '../../../utils'

const commonConfig = [
  {
    value: 'title',
    label: '订单名称',
    formType: 0,
    contentType: 'string',
    rules: {
      required: true,
      requiredMessage: '请输入订单名称',
    },
    hasFeedback: false,
  }, {
    value: 'description',
    label: '订单描述',
    formType: 0,
    contentType: 'string',
    type: 'textarea',
    rules: {
      required: true,
      requiredMessage: '请输入订单描述',
    },
  }, {
    value: 'startTime',
    label: '开始时间',
    formType: 4,
    contentType: 'array',
    rules: {
      required: true,
      requiredMessage: '请选择开始时间',
    },
  },
  {
    value: 'endTime',
    label: '结束时间',
    formType: 4,
    contentType: 'array',
    rules: {
      required: true,
      requiredMessage: '请选择结束时间',
    },
  }, {
    value: 'type',
    label: '订单类型',
    formType: 2,
    contentType: 'string',
    rules: {
      required: true,
      requiredMessage: '请输入订单类型',
    },
    options: [
      {
        value: '0',
        label: '外部订单',
      }, {
        value: '1',
        label: '内部订单',
      }],
    hasFeedback: false,
  }, {
    value: 'totalCount',
    label: '订单总数',
    formType: 0,
    contentType: 'number',
    rules: {
      required: true,
      requiredMessage: '请输入订单总数',
    },
  }, {
    value: 'customerInfo',
    label: '客户信息',
    formType: 0,
    contentType: 'number',
    rules: {
      required: true,
      requiredMessage: '请输入订单总数量',
    }
  }, {
    value: 'addOn',
    label: '附加字段',
    formType: 0,
    contentType: 'string',
    type: 'textarea',
    rules: {
      required: true,
      requiredMessage: '请输入附加字段',
    }
  }
]

export { commonConfig }