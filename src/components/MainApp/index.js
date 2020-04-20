import React from 'react';
import {
  Layout, Row, Col, Avatar, Tag, Typography, Menu, Statistic,
} from 'antd';

import {
  UserOutlined,
  PicCenterOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined
} from '@ant-design/icons';

import Feed from '../Feed/Feed';
import { useAppContext } from './appContext';

const { Text } = Typography;

const MainApp = () => {
  const [collapsed, setCollapsed] = React.useState(true);
  const { user } = useAppContext();

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Layout.Sider
        breakpoint="lg"
        collapsedWidth="0"
        collapsible
        collapsed={collapsed}
        trigger={null}
      >
        <div className="logo" style={{ height: '64px' }} />
        <Menu
          mode="inline"
          theme="dark"
          style={{ height: '100%', borderRight: 0 }}
          defaultSelectedKeys={['1']}
        >
          <Menu.Item key="1">
            <PicCenterOutlined />
            <span>Timeline</span>
          </Menu.Item>
        </Menu>
      </Layout.Sider>
      <Layout>
        <Layout.Header style={{ background: '#fff', padding: 0 }}>
          <span
            onClick={() => setCollapsed(!collapsed)}
            className="trigger"
            style={{ marginLeft: '16px' }}
          >
            {collapsed
              ? <MenuUnfoldOutlined style={{ fontSize: '2em' }} />
              : <MenuFoldOutlined style={{ fontSize: '2em' }} />}
          </span>
          <span style={{ float: 'right' }}>
            <Text strong style={{ margin: '0 .5em' }}>{user.name}</Text>
            <Tag color="geekblue">{user.playcount} plays</Tag>
            <Avatar size="large" icon={<UserOutlined />} />
          </span>
        </Layout.Header>
        <Layout.Content style={{ margin: '2em' }}>
          <Row gutter={24}>
            <Col span={24}>
              <Feed />
            </Col>
          </Row>
        </Layout.Content>
      </Layout>
    </Layout>
  );
};

export default MainApp;
