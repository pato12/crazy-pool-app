import { createStackNavigator, StackScreenProps } from '@react-navigation/stack';

type RootStackParamList = {
  Main: undefined;
  WalletStats: { wallet: string };
  Settings: undefined;
};

export const Stack = createStackNavigator<RootStackParamList>();

export type MainProps = StackScreenProps<RootStackParamList, 'Main'>;

export type WalletStatsProps = StackScreenProps<RootStackParamList, 'WalletStats'>;

export type SettingsProps = StackScreenProps<RootStackParamList, 'Settings'>;
