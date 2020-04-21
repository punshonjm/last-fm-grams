import React from 'react';
import uniqueId from 'lodash/uniqueId';
import slice from 'lodash/slice';

import {
  Card, Skeleton, Row, Col, Statistic, List, Typography, Avatar,
} from 'antd';

import { useAppContext } from '../MainApp/appContext';
import * as api from '../../api';
import moment from 'moment';

const { Text } = Typography;

const MySummary = () => {
  const [loading, setLoading] = React.useState(true);
  const [data, setData] = React.useState({});
  const { user } = useAppContext();

  console.log(user)

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

  if (loading) {
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

  console.log(data)

  return (
    <div style={{ margin: '2em' }}>
      <Row gutter={24} style={{ marginBottom: '2em' }}>
        <Col span={24}>
          <Card title="The Basics">
            <Statistic title="Scrobbled Plays" value={user.playcount} />
          </Card>
        </Col>
      </Row>
      <Row gutter={24}>
        <Col span={24} lg={24}>
          <Card
            title="Top Artists (This Week)"
            style={{ marginBottom: '2em' }}
          >
            <List
              itemLayout="horizontal"
              dataSource={slice(data.weeklyArtists.artist, 0, 5)}
              renderItem={(item) => (
                <List.Item>
                  <List.Item.Meta
                    title={<a href={item.url}>{item['@attr'].rank}. {item.name}</a>}
                    description={<>Played {item.playcount} times. </>}
                  />
                </List.Item>
              )}
              footer={
                <Text>
                  {moment.unix(parseInt(data.weeklyArtists['@attr'].from, 10)).format('Do MMM, YYYY')}
                  {' to '}
                  {moment.unix(parseInt(data.weeklyArtists['@attr'].to, 10)).format('Do MMM, YYYY')}
                </Text>
              }
            />
          </Card>
        </Col>
        <Col span={24} lg={24}>
          <Card
            title="Top Artists (This Week)"
            style={{ marginBottom: '2em' }}
          >
            <List
              itemLayout="horizontal"
              dataSource={slice(data.weeklyAlbums.album, 0, 5)}
              renderItem={(item) => (
                <List.Item>
                  <List.Item.Meta
                    title={<a href={item.url}>{item['@attr'].rank}. {item.name} - {item.artist['#text']}</a>}
                    description={<>Played {item.playcount} times. </>}
                  />
                </List.Item>
              )}
              footer={
                <Text>
                  {moment.unix(parseInt(data.weeklyAlbums['@attr'].from, 10)).format('Do MMM, YYYY')}
                  {' to '}
                  {moment.unix(parseInt(data.weeklyAlbums['@attr'].to, 10)).format('Do MMM, YYYY')}
                </Text>
              }
            />
          </Card>
        </Col>
      </Row>
      <Row gutter={24}>
        <Col span={24} lg={12}>
          <Card
            title="Top Tracks (This Week)"
            style={{ marginBottom: '2em' }}
          >
            <List
              itemLayout="horizontal"
              dataSource={slice(data.weeklyTracks.track, 0, 5)}
              renderItem={(item) => (
                <List.Item>
                  <List.Item.Meta
                    avatar={<Avatar shape="square" src={item.image.reverse()[0]['#text']} />}
                    title={<a href={item.url}>{item['@attr'].rank}. {item.name} - {item.artist['#text']}</a>}
                    description={<>Played {item.playcount} times.</>}
                  />
                </List.Item>
              )}
              footer={
                <Text>
                  {moment.unix(parseInt(data.weeklyTracks['@attr'].from, 10)).format('Do MMM, YYYY')}
                  {' to '}
                  {moment.unix(parseInt(data.weeklyTracks['@attr'].to, 10)).format('Do MMM, YYYY')}
                </Text>
              }

            />
          </Card>
        </Col>
        <Col span={24} lg={12}>
          <Card
            title="Recent Tracks"
            style={{ marginBottom: '2em' }}
          >
            <List
              itemLayout="horizontal"
              dataSource={slice(data.recentTracks.track, 0, 5)}
              renderItem={(item) => (
                <List.Item>
                  <List.Item.Meta
                    avatar={<Avatar shape="square" src={item.image.reverse()[0]['#text']} />}
                    title={<a href={item.url}>{item.name}</a>}
                    description={<>{item.album['#text']} - {item.artist['#text']}</>}
                  />
                </List.Item>
              )}
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default MySummary;
