import React from 'react';
import moment from 'moment';
import slice from 'lodash/slice';
import { Card, List, Typography, Avatar } from 'antd';

const { Text } = Typography;

const WeeklyTracksTab = ({ track, attr }) => (
  <List
    itemLayout="horizontal"
    dataSource={slice(track, 0, 5)}
    renderItem={(item) => (
      <List.Item>
        <List.Item.Meta
          title={(
            <a href={item.url}>
              {item['@attr'] && item['@attr'].rank ? `${item['@attr'].rank}. ` : ''}
              {item.name} - {item.artist.name || item.artist['#text']}
            </a>
          )}
          avatar={item.image
            ? (
              <Avatar shape="square" src={item.image.reverse()[0]['#text']} />
            ) : null}
          description={item.playcount
            ? (<>Played {item.playcount} times. </>)
            : (<>{item.album['#text']} - {item.artist['#text']}</>)}
        />
      </List.Item>
    )}
    footer={
      (attr.from && attr.to)
        ? (
          <Text>
            {moment.unix(parseInt(attr.from, 10)).format('Do MMM, YYYY')}
            {' to '}
            {moment.unix(parseInt(attr.to, 10)).format('Do MMM, YYYY')}
          </Text>
        ) : null}
  />
);

const TracksCard = ({
  recentTracks, weeklyTracks, topTracks,
}) => {
  const [tabKey, setTabKey] = React.useState('recent');

  const tabList = [
    {
      key: 'recent',
      tab: 'Recent',
      component: <WeeklyTracksTab track={recentTracks.track} attr={recentTracks['@attr']} />
    },
    {
      key: 'weekly',
      tab: 'This Week',
      component: <WeeklyTracksTab track={weeklyTracks.track} attr={weeklyTracks['@attr']} />
    },
    {
      key: 'overall',
      tab: 'Overall',
      component: <WeeklyTracksTab track={topTracks.track} attr={topTracks['@attr']} />
    },
  ];

  const currentTab = tabList.find((i) => i.key === tabKey);

  return (
    <Card
      title="Tracks"
      style={{ marginBottom: '2em' }}
      tabList={tabList}
      activeTabKey={tabKey}
      onTabChange={setTabKey}
    >
      {currentTab.component}
    </Card>
  );
};

export default TracksCard;
