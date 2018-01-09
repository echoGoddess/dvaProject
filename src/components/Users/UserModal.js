import React, { Component } from 'react';
import { Form, Modal, Input } from 'antd'
import styles from './UserModal.css';

const FormItem = Form.Item

class UserEditModal extends Component {
  constructor(props) {
    super(props)

    this._showModalHandler = this.showModalHandler.bind(this)
    this._hideModalHandle = this.hideModalHandle.bind(this)
    this._okHandler = this.okHandler.bind(this)

    this.state = {
      visible: false
    }
  }

  showModalHandler = (e) => {
    if (e) {
      e.stopPropagation()
      e.preventDefault()
      this.setState({ visible: true })
    }
  }

  hideModalHandle = () => {
    this.setState({ visible: false })
  }

  okHandler = () => {
    const { onOK } = this.props
    this.props.form.validateFields((err, values) => {
      if (!err) {
        onOK(values)
        this.hideModalHandle()
      }
    })
  }

  render() {
    const { children } = this.props
    const { getFieldDecorator } = this.props.form
    const { name, email, website } = this.props.record
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 }
    }
    return (<span>
      <span onClick={this._showModalHandler}>
        {children}
      </span>
      <Modal
        title="Edit User"
        visible={this.state.visible}
        onOk={this._okHandler}
        onCancel={this._hideModalHandle}>
        <Form layout="horizontal" onSubmit={this._okHandler}>
          <FormItem {...formItemLayout} label="Name">
            {
              getFieldDecorator('name', {
                initialValue: name
              })(<Input />)
            }
          </FormItem>
          <FormItem {...formItemLayout} label="Email">
            {
              getFieldDecorator('email', {
                initialValue: email
              })(<Input />)
            }
          </FormItem>
          <FormItem {...formItemLayout} label="Website">
            {
              getFieldDecorator('website', {
                initialValue: website
              })(<Input />)
            }
          </FormItem>
        </Form>
      </Modal>
    </span>)

  }
}

export default Form.create()(UserEditModal);
