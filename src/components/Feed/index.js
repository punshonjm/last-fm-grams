import React from 'react';
import uniqueId from 'lodash/uniqueId';

import {
  Card, Skeleton, Row, Col,
} from 'antd';
import { SyncOutlined } from '@ant-design/icons';
import { PullToRefresh } from 'antd-mobile';

import { useAppContext } from '../MainApp/appContext';
import * as api from '../../api';
import TimelineEntry from './TimelineEntry';

const Feed = () => {
  const [loading, setLoading] = React.useState(false);
  const [refreshing, setRefreshing] = React.useState(false);
  const [timeline, setTimeline] = React.useState([]);
  const { user } = useAppContext();

  const loadUserData = async () => {
    setLoading(true);
    const { data: playTimeline } = await api.getPlayTimeline(user.name);
    setTimeline(playTimeline);
    setLoading(false);
  };

  const refreshData = async () => {
    setRefreshing(true);
    await loadUserData();
    setRefreshing(false);
  };

  React.useEffect(() => {
    loadUserData();
  }, [null]);

  if (loading && !refreshing) {
    return (
      <Row justify="center">
        <Col span={24} lg={12}>
          {Array(3).fill(null).map(() => (
            <Card key={uniqueId('skeleton')} style={{ marginBottom: '1em' }}>
              <Skeleton avatar paragraph={{ rows: 4 }} />
            </Card>
          ))}
        </Col>
      </Row>
    );
  }

  return (
    <PullToRefresh
      refreshing={refreshing}
      onRefresh={refreshData}
      indicator={{
        activate: "Pull to refresh",
        deactivate: 'Release to cancel',
        release: <SyncOutlined spin />,
        finish: 'Done!',
      }}
      style={{
        height: document.documentElement.clientHeight,
        overflow: 'auto',
      }}
    >
      {timeline.map((track) => (<TimelineEntry track={track} />))}
    </PullToRefresh>
  );
};

export default Feed;
