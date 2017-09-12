import React from 'react'
import { Form, Input, Button, message } from 'antd'
import './index.less'
import { connect } from 'dva'
const FormItem = Form.Item

class Correct extends React.Component {
  state = {
    confirmDirty: false,
    autoCompleteResult: []
  };
  handleSubmit = (e) => {
    const {dispatch, form: {validateFieldsAndScroll}} = this.props
    e.preventDefault()
    validateFieldsAndScroll((err, values) => {
      if (!err) {
        if (values['password'].length < 6) {
          message.warning('密码长度必须大于等于六位')
        } else {
          console.log('Received values of form: ', values)
          dispatch({type: 'correct/update', payload: values})
        }
      }
    })
  }
  handleConfirmBlur = (e) => {
    const value = e.target.value
    this.setState({ confirmDirty: this.state.confirmDirty || !!value })
  }
  checkPassword = (rule, value, callback) => {
    const {form: {getFieldValue}} = this.props
    if (value && value !== getFieldValue('password')) {
      callback('输入的两次密码不一致')
    } else {
      callback()
    }
  }

  render () {
    const { form: {getFieldDecorator}} = this.props
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
                required: true, message: '请输入你的密码'
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
                required: true, message: '请确认你的密码'
              }, {
                validator: this.checkPassword
              }]
            })(
              <Input type='password' onBlur={this.handleConfirmBlur} />
            )}
          </FormItem>
          <FormItem {...tailFormItemLayout}>
            <Button type='primary' htmlType='submit'>确认修改</Button>
          </FormItem>
        </Form>
      </div>
    )
  }
}

export default connect(({app, correct}) => ({app, correct}))(Form.create()(Correct))
