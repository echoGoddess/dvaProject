import React from 'react';
import {connect} from 'dva';
import {routerRedux} from 'dva/router'
import styles from './Users.css';
import {Table, Pagination, Popconfirm,Button} from 'antd';
import {PAGE_SIZE} from '../../constants'
import UserModal from './UserModal'

function Users({dispatch,list:dataSource,loading,total,page:current}) {
  function handleDelete(id){
    dispatch({type:'users/remove',payload:id})
  }
  function editeHandler(id,values){
    dispatch({type:'users/patch',payload:{id,values}})
  }
  function createHandler(values){
    dispatch({type:'users/create',payload:values})
  }
  function requestMock(){
    console.log('requestMock');
  }
  const columns=[
    {
      title:'Name',
      dataIndex:'name',
      key:'name',
      render:text=><a href="###">{text}</a>
    },{
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Website',
      dataIndex: 'website',
      key: 'website',
    },
    {
      title: 'Operation',
      key: 'operation',
      render: (text, record) => (
        <span className={styles.operation}>
          <UserModal record="record" onOK={editeHandler.bind(null,record.id)}>
           <a>Edit</a>
          </UserModal>
           <Popconfirm title="Confirm to delete?" onConfirm={handleDelete.bind(null, record.id)}>
             <a href="###">Delete</a>
           </Popconfirm>
         </span>
      )
    }
  ];

  function handlePageSize(page){
    dispatch(routerRedux.push({
      pathname:'/users',
      query:{page}
    }))
  }

  return (
    <div className={styles.normal}>
      <div>
        <div className={styles.create}>
          <UserModal record={{}} onOK={createHandler}>
            <Button type="primary">Create User</Button>
          </UserModal>
        </div>
        <Button type="primary" onClick={requestMock}>request mock data</Button>
        <Table
          loading={loading}
          columns={columns}
          dataSource={dataSource}
          rowKey={record=>record.id}
          pagination={false}
        />
      </div>
      <Pagination
        className="ant-table-pagination"
        total={total}
        current={current}
        pageSize={PAGE_SIZE}
      onChange={handlePageSize}/>
    </div>
  );
}

function mapStateToProps(state){
  const {list,total,page}=state.users
  return {list,total,page,loading: state.loading.models.users,}
}

export default connect(mapStateToProps)(Users);
