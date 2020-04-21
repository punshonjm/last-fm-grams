import React from 'react';

import {
  Card, Typography, Row, Col,
} from 'antd';

const { Title, Text } = Typography;

const TimelineEntry = ({ track }) => (
  <Row justify="center" key={`${track.user}.${track.date}`}>
    <Col span={24} lg={12}>
      <Card
        style={{ marginBottom: '1em' }}
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
    </Col>
  </Row>
);

export default TimelineEntry;
