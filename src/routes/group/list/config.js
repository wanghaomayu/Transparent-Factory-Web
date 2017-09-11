const createConfig = [
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
    value: 'mobile',
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
const updateConfig = [
  {
    value: 'leader_id',
    label: '班组长ID',
    formType: 0,
    contentType: 'string',
    rules: {
      required: true,
      requiredMessage: '请输入班组长ID'
    }
  },
  {
    value: 'description',
    label: '钳工组修改',
    formType: 0,
    contentType: 'string',
    rules: {
      required: true,
      requiredMessage: '请输入钳工组修改'
    }
  },
  {
    value: 'name',
    label: '钳工组',
    formType: 0,
    contentType: 'string',
    rules: {
      required: true,
      requiredMessage: '请输入钳工组名称'
    }
  }
]

export { createConfig,updateConfig }
