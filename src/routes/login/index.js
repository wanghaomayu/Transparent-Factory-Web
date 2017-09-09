import React from 'react'
import { Form, Icon, Input, Button } from 'antd'
import { connect } from 'dva'
import { Link, routerRedux } from 'dva/router'
import './index.less'

const FormItem = Form.Item

const Login = ({login, dispatch, form: {getFieldDecorator, validateFieldsAndScroll}}) => {
  const handleSubmit = (e) => {
    e.preventDefault()
    validateFieldsAndScroll((errors, values) => {
      if (errors) {
        return
      }
      dispatch({type: 'login/login', payload: values})
    })
  }
  return (
    <div className='login-page'>
      <div className='admin-login'>
        <div className='login-title'>
          <span>登录</span>
        </div>
        <Form onSubmit={handleSubmit} className='login-form'>
          <FormItem>
            {getFieldDecorator('identifier', {
              rules: [{required: true, message: '请输入手机号码'}]
            })(
              <Input prefix={<Icon type='user' style={{fontSize: 13}} />} placeholder='Username' />
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator('password', {
              rules: [{required: true, message: '请输入密码'}]
            })(
              <Input prefix={<Icon type='lock' style={{fontSize: 13}} />} type='password' placeholder='Password' />
            )}
          </FormItem>
          <FormItem>
            <Button type='primary' htmlType='submit' className='login-button' size='large'>
              登录
            </Button>
          </FormItem>
        </Form>
      </div>
    </div>
  )
}

export default connect(({app, login}) => ({app, login}))(Form.create()(Login))
