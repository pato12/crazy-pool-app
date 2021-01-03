import React from 'react';
import { ActivityIndicator as NativeActivityIndicator } from 'react-native';
import useTheme from '../../hooks/useTheme';

function ActivityIndicator(
  props: React.PropsWithChildren<React.ComponentProps<typeof NativeActivityIndicator>>,
) {
  const { theme } = useTheme();

  return <NativeActivityIndicator color={theme?.colors?.primary ?? '#EEE'} {...props} />;
}

export default ActivityIndicator;
