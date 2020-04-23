import React from 'react';
import moment from 'moment';
import slice from 'lodash/slice';
import { Card, List, Typography, Avatar } from 'antd';

const { Text } = Typography;

const WeeklyAlbumsTab = ({ albums, attr }) => (
  <List
    itemLayout="horizontal"
    dataSource={slice(albums, 0, 10)}
    renderItem={(item) => (
      <List.Item>
        <List.Item.Meta
          title={(
            <a href={item.url}>
              {item['@attr'].rank}. {item.name} - {item.artist.name || item.artist['#text']}
            </a>
          )}
          avatar={item.image
            ? (
              <Avatar shape="square" src={item.image.reverse()[0]['#text']} />
            ) : null}
          description={<>Played {item.playcount} times. </>}
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

const AlbumsCard = ({ weeklyAlbums, topAlbums }) => {
  const [tabKey, setTabKey] = React.useState('weekly');

  const tabList = [
    {
      key: 'weekly',
      tab: 'This Week',
      component: <WeeklyAlbumsTab albums={weeklyAlbums.album} attr={weeklyAlbums['@attr']} />
    },
    {
      key: 'overall',
      tab: 'Overall',
      component: <WeeklyAlbumsTab albums={topAlbums.album} attr={topAlbums['@attr']} />
    },
  ];

  const currentTab = tabList.find((i) => i.key === tabKey);

  return (
    <Card
      title="Top Albums"
      style={{ marginBottom: '2em' }}
      tabList={tabList}
      activeTabKey={tabKey}
      onTabChange={setTabKey}
    >
      {currentTab.component}
    </Card>
  );
};

// style={{ width: '100%' }}


export default AlbumsCard;
