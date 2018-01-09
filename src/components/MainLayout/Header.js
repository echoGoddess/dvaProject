import React from 'react';
import {Menu,Icon} from 'antd'
import {Link} from 'dva/router'
import styles from './Header.css';

function Header({location}){
  return (<Menu
    selectedKeys={[location.pathname]}
    mode="horizontal"
    theme="dark">
    <Menu.Item key="/users">
      <Link to="/users"><Icon type="bars">Users</Icon></Link>
    </Menu.Item>
    <Menu.Item key="/">
      <Link to="/"><Icon type="home">Home</Icon></Link>
    </Menu.Item>
    <Menu.Item key="/404">
      <Link to="/404"><Icon type="frown-circle">404</Icon></Link>
    </Menu.Item>
    <Menu.Item key="/antd">
      <a href="https://github.com/dvajs/dva" target="_blank"></a>
    </Menu.Item>
    <Menu.Item key="/search">
      <Link to="/search"><Icon type="search">Search</Icon></Link>
    </Menu.Item>
  </Menu>)

}
export default Header;
