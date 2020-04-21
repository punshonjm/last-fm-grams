import React from 'react';
import { Switch, Link, Route } from 'react-router-dom';

import {
  Layout, Row, Col, Avatar, Tag, Menu,
} from 'antd';

import {
  UserOutlined,
  PicCenterOutlined,
} from '@ant-design/icons';

import Feed from '../Feed';
import { useAppContext } from './appContext';
import MySummary from '../MySummary';

const MainApp = () => {
  const { user } = useAppContext();

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Layout.Header
        style={{
          padding: '0 1em',
          position: 'fixed',
          zIndex: 1,
          width: '100%',
        }}
      >
        <Menu
          mode="horizontal"
          theme="dark"
          defaultSelectedKeys={['1']}
        >
          <Menu.Item key="0">
            <span style={{ color: '#fff' }}>Last.fm Grams</span>
          </Menu.Item>
          <Menu.Item key="1">
            <Link to="/">
              <PicCenterOutlined />
              <span>Timeline</span>
            </Link>
          </Menu.Item>
          <Menu.Item key="2">
            <Link to="/my-summary">
              <UserOutlined />
              <span>My Summary</span>
            </Link>
          </Menu.Item>
          <Menu.Item key="3" style={{ float: 'right' }}>
            <Avatar size="large" icon={<UserOutlined />} />
            <span style={{ margin: '0 .5em', color: '#fff' }}>
              {user.name}
            </span>
            <Tag color="geekblue">{user.playcount} plays</Tag>
          </Menu.Item>
        </Menu>
      </Layout.Header>
      <Layout>
        <Layout.Content style={{ marginTop: '64px' }}>
          <Row gutter={24} style={{ marginTop: '2em' }}>
            <Col span={24}>
              <Switch>
                <Route path="/my-summary" component={MySummary} />
                <Route path="/" exact component={Feed} />
              </Switch>
            </Col>
          </Row>
        </Layout.Content>
      </Layout>
    </Layout>
  );
};

export default MainApp;
