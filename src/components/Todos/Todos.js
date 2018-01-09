import React, { Component } from 'react';
import { Table, Input, Pagination, Icon, Button, Popconfirm } from 'antd';
import { connect } from 'dva';
import styles from './Todos.css';
import TodosModal from './TodosModal';

class Todos extends Component {
  constructor(props) {
    super(props);
    this.props = props;
  }
  handleChangeVal = (e) => {
    const { page, pageSize } = this.props;
    this.props.dispatch({ type: 'todos/fetch', payload: { page, pageSize, keyword: e.target.value } });
  }

  handleChangePage = (page) => {
    const { pageSize, keyword } = this.props;
    this.props.dispatch({ type: 'todos/fetch', payload: { page, pageSize, keyword } });
  }
  emitEmpty = () => {
    this.todsInput.focus();
    const { page, pageSize } = this.props;
    this.props.dispatch({ type: 'todos/fetch', payload: { page, pageSize, keyword: '' } });
  }
  create = (params = {}) => {
    this.todosInput.focus();
    this.props.dispatch({ type: 'todos/create', payload: params });
  }
  edite = (id, params) => {
    this.props.dispatch({ type: 'todos/edite', payload: { id, ...params } });
  }
  remove = (id) => {
    this.props.dispatch({ type: 'todos/remove', payload: { id } });
  }
  render() {
    const { list, total, page, pageSize, loading, keyword } = this.props;
    const style = { display: 'inline-block', marginLeft: '10px' };
    const columns = [
      {
        title: '公司',
        dataIndex: 'company',
        key: 'company',
      },
      {
        title: '股票代码',
        dataIndex: 'code',
        key: 'code',
      },
      {
        title: 'website',
        dataIndex: 'website',
        key: 'website',
      }, {
        title: 'Action',
        key: 'action',
        render: (text, record) => (
          <div>
            <TodosModal record={record} onOK={this.edite.bind(null, record.id)}><a href="###">edite</a></TodosModal>
            <Popconfirm title="确定删除?" onConfirm={this.remove.bind(null, record.id)} okText="Yes" cancelText="No">
              <a style={style}>remove</a>
            </Popconfirm>
          </div >
        ),
      }];

    const suffix = keyword ? <Icon type="close-circle" onClick={this.emitEmpty} /> : null;
    return (<div className={styles.normal}>
      <Input
        className={styles.enter}
        placeholder="enter"
        prefix={<Icon type="smile" />}
        suffix={suffix}
        value={keyword}
        onChange={this.handleChangeVal}
        ref={(node) => { this.todosInput = node; return this.todosInput; }}
      />
      <TodosModal onOK={this.create}>
        <Button type="primary">ADD</Button>
      </TodosModal>
      <Table
        columns={columns}
        loading={loading}
        dataSource={list}
        rowKey={(record) => { return record.id; }}
        pagination={false}
      />
      <Pagination
        className={styles.pagination}
        total={total}
        current={page}
        pageSize={pageSize}
        defaultCurrent={1}
        onChange={this.handleChangePage} />
    </div >);
  }
}

const mapStateToProps = (state) => {
  const { list, total, page, pageSize, keyword } = state.todos;
  return { list, total, page, pageSize, loading: state.loading.models.todos, keyword };
};

export default connect(mapStateToProps)(Todos);
