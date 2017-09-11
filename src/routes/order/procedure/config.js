import {verify} from '../../../utils'

const commonConfig = [
  {
    value: 'workGroupId',
    label: '班组序号',
    formType: 0,
    contentType: 'number',
    rules: {
      required: true,
      requiredMessage: '请输入班组序号'
    },
    hasFeedback: false
  }, {
    value: 'name',
    label: '工序名称',
    formType: 0,
    contentType: 'string',
    rules: {
      required: true,
      requiredMessage: '请输入工序名称'
    }
  }, {
    value: 'totalCount',
    label: '总量',
    formType: 0,
    contentType: 'number',
    rules: {
      required: true,
      requiredMessage: '请输入工序总量'
    }
  }, {
    value: 'weight',
    label: '权重',
    formType: 0,
    contentType: 'number',
    rules: {
      required: true,
      requiredMessage: '请输入工序权重'
    }
  }, {
    value: 'standard',
    label: '规格',
    formType: 0,
    contentType: 'string',
    rules: {
      required: true,
      requiredMessage: '请输入工序规格'
    }
  }, {
    value: 'time',
    label: '时间间隔',
    formType: 3,
    extra: '时间具体到小时',
    contentType: 'array',
    rules: {
      required: true,
      requiredMessage: '请选择开始时间'
    }
  }
]

export {commonConfig}
