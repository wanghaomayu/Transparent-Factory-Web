import { verify } from '../../../utils'

const commonConfig = [
  {
    value: 'title',
    label: '班组名',
    formType: 0,
    contentType: 'string',
    rules: {
      required: true,
      requiredMessage: '请输入班组名'
    },
    hasFeedback: false
  },
  {
    value: 'name',
    label: '姓名',
    formType: 0,
    contentType: 'string',
    rules: {
      required: true,
      requiredMessage: '请输入姓名'
    }
  }, {
    value: 'phone',
    label: '手机号',
    formType: 0,
    contentType: 'number',
    rules: {
      required: true,
      requiredMessage: '请输入手机号'
    }
  }, {
    value: 'password',
    label: '密码',
    formType: 0,
    contentType: 'password',
    rules: {
      required: true,
      requiredMessage: '请输入密码'
    }
  }
]

export { commonConfig }
