import React from 'react';
import './assets/localization/i18n';
import {Provider} from 'react-redux';
import store from './store/store';

function App(): React.JSX.Element {
  return (
    <Provider store={store}>
      <></>
    </Provider>
  );
}

export default App;
