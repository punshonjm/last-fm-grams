import React from 'react';
import uniqueId from 'lodash/uniqueId';

import {
  Card, Skeleton, Row, Col, Statistic,
} from 'antd';

import { useAppContext } from '../MainApp/appContext';
import * as api from '../../api';
import AlbumsCard from './AlbumsCard';
import ArtistsCard from './ArtistsCard';
import TracksCard from './TracksCard';

const MySummary = () => {
  const [loading, setLoading] = React.useState(true);
  const [refreshing, setRefreshing] = React.useState(false);
  const [data, setData] = React.useState({});
  const { user } = useAppContext();

  const loadUserData = async () => {
    setLoading(true);

    const dataPieces = await Promise.all([
      api.getUserRecentTracks(user.name),
      api.getUserTopAlbums(user.name),
      api.getUserTopArtists(user.name),
      api.getUserTopTracks(user.name),
      api.getUserWeeklyAlbums(user.name),
      api.getUserWeeklyArtists(user.name),
      api.getUserWeeklyTracks(user.name),
      api.getUserFriends(user.name),
    ]);

    const [
      { recenttracks: recentTracks },
      { topalbums: topAlbums },
      { topartists: topArtists },
      { toptracks: topTracks },
      { weeklyalbumchart: weeklyAlbums },
      { weeklyartistchart: weeklyArtists },
      { weeklytrackchart: weeklyTracks },
      { friends },
    ] = dataPieces
      .map(({ data }) => data);

    setData({
      recentTracks,
      topAlbums,
      topArtists,
      topTracks,
      weeklyAlbums,
      weeklyArtists,
      weeklyTracks,
      friends,
    });

    setLoading(false);
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

  const refreshData = async () => {
    setRefreshing(true);
    await loadUserData();
    setRefreshing(false);
  };

  return (
    <>
      <Row gutter={24} style={{ marginBottom: '2em' }}>
        <Col span={24}>
          <Card title="The Basics">
            <Statistic title="Scrobbled Plays" value={user.playcount} />
          </Card>
        </Col>
      </Row>
      <Row gutter={24}>
        <Col span={24} lg={24}>
          <ArtistsCard
            weeklyArtists={data.weeklyArtists}
            topArtists={data.topArtists}
          />
        </Col>
        <Col span={24} lg={24}>
          <AlbumsCard
            weeklyAlbums={data.weeklyAlbums}
            topAlbums={data.topAlbums}
          />
        </Col>
      </Row>
      <Row gutter={24}>
        <Col span={24} lg={12}>
          <TracksCard
            recentTracks={data.recentTracks}
            weeklyTracks={data.weeklyTracks}
            topTracks={data.topTracks}
          />
        </Col>
      </Row>
    </>
  );
};

export default MySummary;
