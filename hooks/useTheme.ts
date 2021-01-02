import { useContext } from 'react';
import { ThemeContext } from 'react-native-elements';

function useTheme() {
  const context = useContext(ThemeContext);

  return context.theme;
}

export default useTheme;
