import React from 'react'
import { Form, Input, Button, Select } from 'antd'
import './index.less'
import { connect } from 'dva'
const FormItem = Form.Item

const Phone = ({phone, dispatch, form: {getFieldDecorator, validateFieldsAndScroll}}) => {
  const handleSubmit = (e) => {
    e.preventDefault()
    validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values)
        dispatch({type: 'phone/update', payload: values})
        console.log(window.localStorage.getItem('id'))
      }
    })
  }
  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 6 }
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 14 }
    }
  }
  const tailFormItemLayout = {
    wrapperCol: {
      xs: {
        span: 24,
        offset: 0
      },
      sm: {
        span: 14,
        offset: 6
      }
    }
  }
  const prefixSelector = getFieldDecorator('prefix', {
    initialValue: '86'
  })(
    <Select style={{ width: 60 }}>
      <Option value='86'>+86</Option>
      <Option value='87'>+87</Option>
    </Select>
    )
  return (
    <div className='form'>
      <Form onSubmit={handleSubmit}>
        <FormItem
          {...formItemLayout}
          label='新手机号'
          >
          {getFieldDecorator('phone', {
            rules: [{ required: true, message: 'Please input your phone number!' }]
          })(
            <Input addonBefore={prefixSelector} style={{ width: '100%' }} />
            )}
        </FormItem>
        <FormItem {...tailFormItemLayout}>
          <Button type='primary' htmlType='submit'>确认修改</Button>
        </FormItem>
      </Form>
    </div>
  )
}

export default connect(({app, phone}) => ({app, phone}))(Form.create()(Phone))
