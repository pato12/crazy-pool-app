import React from 'react';
import { Switch } from 'react-native';
import { Card, ListItem } from 'react-native-elements';

import { Container, Layout, Title } from '../components/ui';

import { SettingsProps } from '../navigation';
import { useDarkMode } from '../themeManager';

interface ISettingsViewProps extends SettingsProps {}

function SettingsView(props: ISettingsViewProps) {
  const { isDarkMode, setIsDarkMode } = useDarkMode();

  return (
    <Layout>
      <Container>
        <Title>Settings</Title>
      </Container>

      <Card containerStyle={{ padding: 0 }}>
        <ListItem bottomDivider>
          <ListItem.Content>
            <ListItem.Title>Dark mode</ListItem.Title>
          </ListItem.Content>
          <Switch value={isDarkMode} onValueChange={() => setIsDarkMode((v: boolean) => !v)} />
        </ListItem>
      </Card>
    </Layout>
  );
}

export default SettingsView;
