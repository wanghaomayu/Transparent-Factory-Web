import React, { Component } from 'react'
import { Form, Input, Row, Col, Button } from 'antd'
import './index.less'
const FormItem = Form.Item

class Correct extends Component {
  state = {
    confirmDirty: false,
    autoCompleteResult: []
  };
  handleSubmit = (e) => {
    e.preventDefault()
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values)
      }
    })
  }
  handleConfirmBlur = (e) => {
    const value = e.target.value
    this.setState({ confirmDirty: this.state.confirmDirty || !!value })
  }
  checkPassword = (rule, value, callback) => {
    const form = this.props.form
    if (value && value !== form.getFieldValue('password')) {
      callback('Two passwords that you enter is inconsistent!')
    } else {
      callback()
    }
  }
  checkConfirm = (rule, value, callback) => {
    const form = this.props.form
    if (value && this.state.confirmDirty) {
      form.validateFields(['confirm'], { force: true })
    }
    callback()
  }

  handleWebsiteChange = (value) => {
    let autoCompleteResult
    if (!value) {
      autoCompleteResult = []
    } else {
      autoCompleteResult = ['.com', '.org', '.net'].map(domain => `${value}${domain}`)
    }
    this.setState({ autoCompleteResult })
  }
  render () {
    const { getFieldDecorator } = this.props.form

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

    return (
      <div className='form'>
        <Form onSubmit={this.handleSubmit}>
          <FormItem
            {...formItemLayout}
            label='新密码'
            hasFeedback
        >
            {getFieldDecorator('password', {
              rules: [{
                required: true, message: 'Please input your password!'
              }, {
                validator: this.checkConfirm
              }]
            })(
              <Input type='password' />
          )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label='确认新密码'
            hasFeedback
        >
            {getFieldDecorator('confirm', {
              rules: [{
                required: true, message: 'Please confirm your password!'
              }, {
                validator: this.checkPassword
              }]
            })(
              <Input type='password' onBlur={this.handleConfirmBlur} />
          )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label='手机验证码'
        >
            <Row gutter={8}>
              <Col span={12}>
                {getFieldDecorator('captcha', {
                  rules: [{ required: true, message: 'Please input the captcha you got!' }]
                })(
                  <Input size='large' />
              )}
              </Col>
              <Col span={12}>
                <Button size='large'>获取验证码</Button>
              </Col>
            </Row>
          </FormItem>
          <FormItem {...tailFormItemLayout}>
            <Button type='primary' htmlType='submit'>确认修改</Button>
          </FormItem>
        </Form>
      </div>
    )
  }
}

export default Form.create()(Correct)
