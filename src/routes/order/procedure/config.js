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
    value: 'successCount',
    label: '已生产件数',
    formType: 0,
    contentType: 'string',
    rules: {
      required: true,
      requiredMessage: '请输入已经生产的件数'
    }
  }, {
    value: 'totalCount',
    label: '总量',
    formType: 0,
    contentType: 'string',
    rules: {
      required: true,
      requiredMessage: '请输入工序总量'
    }
  }, {
    value: 'weight',
    label: '权重',
    formType: 0,
    contentType: 'string',
    rules: {
      required: true,
      requiredMessage: '请输入工序权重'
    }
  }, {
    value: 'standard',
    label: '单位',
    formType: 0,
    contentType: 'string',
    rules: {
      required: true,
      requiredMessage: '请输入工序规格'
    }
  }, {
    value: 'startTime',
    label: '开始时间',
    formType: 4,
    extra: '时间具体到小时',
    contentType: 'array',
    rules: {
      required: true,
      requiredMessage: '请选择开始时间'
    }
  }, {
    value: 'endTime',
    label: '结束时间',
    formType: 4,
    extra: '时间具体到小时',
    contentType: 'array',
    rules: {
      required: true,
      requiredMessage: '请选择结束时间'
    }
  }, {
    value: 'description',
    label: '备注',
    formType: 0,
    contentType: 'string',
    rules: {
      required: false,
      requiredMessage: '请输入备注'
    }
  }
]

export {commonConfig}
