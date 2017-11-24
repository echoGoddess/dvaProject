import React,{Component} from 'react';
import {connect} from 'dva';
import LoginForm from './LoginForm';
import styles from './Login.css';

class Login extends React.Component{
  constructor(props){
    super(props)
  }


  render(){
    return(<div className={styles.normal}>
      <LoginForm/>
    </div>)
  }
}
/*
function mapStatesToProps(state){
  const {name,password}=state.login
  return {name,password}
}*/

export default connect()(Login);
