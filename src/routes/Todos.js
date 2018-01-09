import React from 'react';
import { connect } from 'dva';
import styles from './Todos.css';
import MainLayout from '../components/MainLayout/MainLayout';
import TodosComponent from '../components/Todos/Todos';

function Todos(params = {}) {
  return (
    <MainLayout location={params.location}>
      <div className={styles.normal}>
        <TodosComponent />
      </div>
    </MainLayout>
  );
}

function mapStateToProps() {
  return {};
}

export default connect(mapStateToProps)(Todos);
