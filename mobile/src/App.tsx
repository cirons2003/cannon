import Routing from './pages/Routing';
import { NativeBaseProvider } from 'native-base';
import {Provider} from 'react-redux';
import {customTheme} from './theme';
import {store} from './store';

export default function App() {
  return (
    <NativeBaseProvider theme={customTheme}>
      <Provider store = {store}>
        <Routing/>
      </Provider>
    </NativeBaseProvider>
  );
};
