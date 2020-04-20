import React from 'react';
import { UserOutlined } from '@ant-design/icons';
import {
  Card, Skeleton, Avatar, Typography, Row, Col,
} from 'antd';

import { useAppContext } from '../MainApp/appContext';
import * as api from '../../api';

const { Title, Text } = Typography;

const Feed = () => {
  const [loading, setLoading] = React.useState(false);
  const [data, setData] = React.useState({});
  const [timeline, setTimeline] = React.useState([]);
  const { user } = useAppContext();

  // console.log(user, data)

  const loadUserData = async () => {
    setLoading(true);

    const dataPieces = await Promise.all([
      api.getPlayTimeline(user.name),
      api.getUserRecentTracks(user.name),
      api.getUserTopAlbums(user.name),
      api.getUserTopArtists(user.name),
      api.getUserTopTracks(user.name),
      api.getUserWeeklyAlbums(user.name),
      api.getUserWeeklyArtists(user.name),
      api.getUserWeeklyTracks(user.name),
    ]);

    const [
      playTimeline,
      { recenttracks: recentTracks },
      { topalbums: topAlbums },
      { topartists: topArtists },
      { toptracks: topTracks },
      { weeklyalbumchart: weeklyAlbums },
      { weeklyartistchart: weeklyArtists },
      { weeklytrackchart: weeklyTracks },
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
    });

    setTimeline(playTimeline);

    setLoading(false);
  };

  React.useEffect(() => {
    loadUserData();
  }, [null]);

  if (loading) {
    return (
      <>
        {Array(3).fill(null).map(() => (
          <Card style={{ marginTop: '1em', maxWidth: '50%' }}>
            <Skeleton avatar paragraph={{ rows: 4 }} />
          </Card>
        ))}
      </>
    );
  }

  const [first] = timeline
  console.log(first || null);

  return (
    <>
      {timeline.map((track) => (
        <Card
          key={`${track.user}.${track.mbid}`}
          style={{ maxWidth: '50%', marginBottom: '1em' }}
          cover={
            <img
              alt={`${track.artist} - ${track.album} - ${track.name}`}
              src={track.image}
            />
          }
        >
          <Card.Meta
            title={(
              <>
                <Title
                  level={4}
                  style={{ display: 'block', marginBottom: '0' }}
                >
                  {track.key || track.name}
                </Title>
                {track.key
                  ? <Text style={{ display: 'block' }} strong>{track.artist}</Text>
                  : (
                    <>
                      <Text style={{ display: 'block' }} type="secondary">{track.album}</Text>
                      <Text style={{ display: 'block' }} strong>{track.artist}</Text>
                    </>
                  )}
              </>
            )}
          />
          <div style={{ marginTop: '1em' }}>
            <Row>
              <Col span={12}>
                <Text strong>
                  {track.user}
                </Text>
              </Col>
              <Col span={12} style={{ textAlign: 'right' }}>
                <Text type="secondary">
                  Played at {track.date}
                </Text>
              </Col>
            </Row>
          </div>
        </Card>
      ))}
    </>
  );
};

export default Feed;
