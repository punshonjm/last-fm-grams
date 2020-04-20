import React from 'react';
import {
  Form, Input, Button, Card, Row, Col, Layout,
} from 'antd';

import { getUserInfo } from './api';
import './App.css';
import MainApp from './components/MainApp';
import { AppContextProvider, useAppContext } from './components/MainApp/appContext';

function App() {
  const [setupUser, setSetupUser] = React.useState('');
  const { user, setUser } = useAppContext();

  const getUserDetails = async () => {
    try  {
      const {
        data: { user: foundUser },
      } = await getUserInfo(setupUser);

      const {
        playcount, name, url, country,
      } = foundUser;

      setUser({
        playcount, name, url, country,
      });
    } catch (error) {
      const { response } = error;
      if (response) {
        const { data } = response;
        if (data.message) {
          console.log(data.message);
          return;
        }
      }
      console.log(error);
    }
  };

  if (user) {
    return (<MainApp />);
  }

  return (
    <Layout>
      <Row
        gutter={24}
        style={{ height: '100vh' }}
        justify="center"
      >
        <Col span={12}>
          <Card className="App" title="Last FM Grams" style={{ marginTop: '2em' }}>
            <Form.Item label="Last.FM Username">
              <Input
                value={setupUser}
                onChange={({ target }) => setSetupUser(target.value)}
              />
            </Form.Item>
            <Form.Item>
              <Button onClick={getUserDetails} type="primary">
                Setup
              </Button>
            </Form.Item>
          </Card>
        </Col>
      </Row>
    </Layout>
  );
}

export default () => (
  <AppContextProvider>
    <Row gutter={24}>
      <Col span={24}>
        <App />
      </Col>
    </Row>
  </AppContextProvider>
);
