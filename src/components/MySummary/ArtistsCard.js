import React from 'react';
import moment from 'moment';
import slice from 'lodash/slice';
import { Card, List, Typography, Avatar } from 'antd';

const { Text } = Typography;

const WeeklyArtistsTab = ({ artist, attr }) => (
  <List
    itemLayout="horizontal"
    dataSource={slice(artist, 0, 10)}
    renderItem={(item) => (
      <List.Item>
        <List.Item.Meta
          title={(
            <a href={item.url}>
              {item['@attr'].rank}. {item.name}
            </a>
          )}
          avatar={item.image
            ? (<Avatar shape="circle" src={item.image.reverse()[0]['#text']} />)
            : null}
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

const ArtistsCard = ({
  weeklyArtists, topArtists,
}) => {
  const [tabKey, setTabKey] = React.useState('weekly');

  const tabList = [
    {
      key: 'weekly',
      tab: 'This Week',
      component: <WeeklyArtistsTab artist={weeklyArtists.artist} attr={weeklyArtists['@attr']} />
    },
    {
      key: 'overall',
      tab: 'Overall',
      component: <WeeklyArtistsTab artist={topArtists.artist} attr={topArtists['@attr']} />
    },
  ];

  const currentTab = tabList.find((i) => i.key === tabKey);

  return (
    <Card
      title="Top Artists"
      style={{ marginBottom: '2em' }}
      tabList={tabList}
      activeTabKey={tabKey}
      onTabChange={setTabKey}
    >
      {currentTab.component}
    </Card>
  );
};

export default ArtistsCard;
