import React from 'react';
import { TabBar, NavBar } from 'antd-mobile';

import {
  ExperimentOutlined,
  ExperimentFilled,
  CustomerServiceOutlined,
  CustomerServiceFilled,
  UserOutlined,
} from '@ant-design/icons';

import Feed from '../Feed';
import MySummary from '../MySummary';
import { useAppContext } from './appContext';
import { Avatar } from 'antd';

const NavigationBar = ({ user }) => {
  return (
    <NavBar
      mode="light"
      rightContent={[
        <Avatar icon={<UserOutlined />} />,
      ]}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
      }}
    >
      Last.fm Gram
    </NavBar>
  );
};

const MainApp = () => {
  const { user } = useAppContext();
  const [selectedTab, setSelectedTab] = React.useState('feed');

  return (
    <div style={{ height: '100vh' }}>
      <TabBar
        unselectedTintColor="#949494"
        tintColor="#33A3F4"
        barTintColor="white"
      >
        <TabBar.Item
          title="Timeline"
          key="feed"
          icon={<CustomerServiceOutlined />}
          selectedIcon={<CustomerServiceFilled />}
          selected={selectedTab === 'feed'}
          onPress={() => setSelectedTab('feed')}
        >
          <NavigationBar user={user} />
          <div style={{ marginTop: '61px' }}>
            <Feed />
          </div>
        </TabBar.Item>
        <TabBar.Item
          title="My Summary"
          key="summary"
          icon={<ExperimentOutlined />}
          selectedIcon={<ExperimentFilled />}
          selected={selectedTab === 'summary'}
          onPress={() => setSelectedTab('summary')}
        >
          <NavigationBar user={user} />
          <div style={{ marginTop: '61px' }}>
            <MySummary />
          </div>
        </TabBar.Item>
      </TabBar>
    </div>
  );
};

export default MainApp;
