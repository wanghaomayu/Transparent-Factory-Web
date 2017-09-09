import {verify} from '../../../utils'

const commonConfig = [
  {
    value: 'title',
    label: '订单名称',
    formType: 0,
    contentType: 'string',
    rules: {
      required: true,
      requiredMessage: '请输入订单名称'
    },
    hasFeedback: false
  }, {
    value: 'description',
    label: '订单描述',
    formType: 0,
    contentType: 'string',
    type: 'textarea',
    rules: {
      required: true,
      requiredMessage: '请输入订单描述'
    }
  }, {
    value: 'startTime',
    label: '订单开始时间',
    formType: 3,
    extra: '时间具体到小时',
    contentType: 'array',
    rules: {
      required: true,
      requiredMessage: '请选择开始时间'
    }
  },
  {
    value: 'endTime',
    label: '订单结束时间',
    formType: 3,
    extra: '时间具体到小时',
    contentType: 'array',
    rules: {
      required: true,
      requiredMessage: '请选择结束时间'
    }
  }, {
    value: 'type',
    label: '订单类型',
    formType: 0,
    contentType: 'string',
    rules: {
      required: true,
      requiredMessage: '请输入订单类型'
    },
    hasFeedback: false
  }, {
    value: 'totalCount',
    label: '订单总数量',
    formType: 0,
    contentType: 'number',
    rules: {
      required: true,
      requiredMessage: '请输入订单总数量'
    }
  }, {
    value: 'totalCount',
    label: '订单总数量',
    formType: 0,
    contentType: 'number',
    rules: {
      required: true,
      requiredMessage: '请输入订单总数量'
    }
  }
]

export {commonConfig}
