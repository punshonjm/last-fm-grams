import React from 'react';
import {
  Layout, Row, Col, Avatar, Tag, Typography,
} from 'antd';
import {
  UserOutlined,
} from '@ant-design/icons';
import Feed from '../Feed/Feed';
import { useAppContext } from './appContext';

const { Text } = Typography;

const MainApp = () => {
  const { user } = useAppContext();

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Layout>
        <Layout.Header style={{ background: '#fff' }}>
          <Avatar size="large" icon={<UserOutlined />} />
          <Text strong style={{ margin: '0 .5em' }}>{user.name}</Text>
          <Tag color="geekblue">{user.playcount} plays</Tag>
        </Layout.Header>
        <Layout.Content style={{ margin: '2em' }}>
          <Row gutter={24}>
            <Col span={24}>
              <Feed />
            </Col>
          </Row>
        </Layout.Content>
        <Layout.Footer style={{ textAlign: 'center' }}>th1nkful ©2020</Layout.Footer>
      </Layout>
    </Layout>
  );
};

export default MainApp;
