import React, { Component } from 'react';
import { Form, Input, Modal } from 'antd';
import styles from './TodosModal.css';

const FormItem = Form.Item;

class TodosModal extends Component {
  constructor(props) {
    super(props);
    this.state = { visible: false };
  }
  ok = () => {
    this.submit();
    this.setState({ visible: false });
  }
  cancel = () => {
    this.setState({ visible: false });
  }
  submit = (e) => {
    if (e) { e.preventDefault(); }
    this.props.form.validateFields((err, values) => {
      if (!err) {
        if (this.props.onOK) {
          this.props.onOK(values);
        }
        console.log('values', values);
      }
    });
  }
  show = () => {
    this.setState({ visible: true });
  }
  render() {
    const { children, form, record } = this.props;// record onOK
    const { visible } = this.state;
    const { getFieldDecorator } = form;
    const formItemLayout = {
      labelCol: {
        xs: { span: 12 },
        sm: { span: 6 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    };
    const initCompany = record && record.company ? record.company : '';
    const initCode = record && record.code ? record.code : '';
    const initWebsite = record && record.website ? record.website : '';

    return (
      <div className={styles.normal}>
        <span onClick={this.show}>{children}</span>
        <Modal
          title="编辑"
          visible={visible}
          onOk={this.ok}
          onCancel={this.cancel}
        >
          <Form onSubmit={this.submit}>
            <FormItem
              {...formItemLayout}
              label="Company"
            >
              {getFieldDecorator('company', {
                initialValue: initCompany,
                rules: [{
                  required: true, message: 'Please enter company name',
                }],
              })(<Input />)}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="Code"
            >
              {getFieldDecorator('code', {
                initialValue: initCode,
                rules: [{
                  required: true, message: 'please enter code',
                }],
              })(<Input />)}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="Website"
            >
              {getFieldDecorator('website', {
                initialValue: initWebsite,
                rules: [{
                  message: 'please enter website',
                }],
              })(<Input />)}
            </FormItem>
          </Form>
        </Modal>
      </div>
    );
  }
}
const FormTodosModal = Form.create()(TodosModal);
export default FormTodosModal;
