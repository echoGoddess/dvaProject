import React from 'react';
import {connect} from 'dva';
import {Form,Input,Button} from 'antd';
import styles from './LoginForm.css';
const FormItem=Form.Item;


class LoginForm extends React.Component{
  constructor(props){
    super(props)
    /*this.state={
      name:'',
      password:''
    }*/
    this.handleSubmit=this.submit.bind(this)
  }
  submit(e){
    e.preventDefault()
    console.log('submit',e)
    console.log('submit-target',e.target)
    dispatch({type:'login/login',payload:{}})
  }
  render(){
    const {getFieldDecorator}=this.props.form
    /*const {username,password}=this.state*/
    const formItemLayout={
      labelCol:{
        xs:{span:24},
        sm:{span:6}
      },
      wrapperCol:{
        xs:{span:24},
        sm:{span:14}
      }
    }
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0,
        },
        sm: {
          span: 14,
          offset: 6,
        },
      },
    };
    return (<div className={styles.normal}>
      <Form onSubmit={this.handleSubmit}>
        <FormItem
          {...formItemLayout}
          label="用户名"
          hasFeedback>
          {getFieldDecorator('username',{
            rules:[{required:true,message:'请输入您的用户名'}]
          })(
            <Input  placeholder="请输入您的密码"/>
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="密码"
          hasFeedback>
          {getFieldDecorator('password',{
            rules:[{required:true,message:'请输入您的密码'}]
          })(
            <Input type="password" placeholder="请输入您的密码"/>
          )}
        </FormItem>
        <FormItem {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit">Register</Button>
        </FormItem>
      </Form>
    </div>)
  }
}

function mapStatesToProps(state){
  const {name,password}=state
  return {name,password}
}

export default Form.create()(LoginForm)

//const WrappedLoginForm=Form.create()(LoginForm)
//export default connect(mapStatesToProps)(WrappedLoginForm);
