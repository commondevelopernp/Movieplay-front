import React from 'react';
import './assets/localization/i18n';
import {Provider} from 'react-redux';
import store from './store/store';
import {Button, PaperProvider} from 'react-native-paper';

function App(): React.JSX.Element {
  return (
    <Provider store={store}>
      <PaperProvider>
        <Button>Press Here!</Button>
      </PaperProvider>
    </Provider>
  );
}

export default App;
