import React from 'react'
import Routers from './src/routes'
import { Dimensions } from 'react-native'
import RNRestart from 'react-native-restart'
import { NativeBaseProvider } from 'native-base'
import { NavigationContainer } from '@react-navigation/native'
import reducers from './src/reducers/index';
import { createStore } from 'redux';
import { Provider } from 'react-redux'
import Toast from 'react-native-toast-message'
const store = createStore(reducers);

const config = {
  dependencies: {
    'linear-gradient': require('react-native-linear-gradient').default,
  },
};

const App = () => {
  Dimensions.addEventListener('change', () => {
    RNRestart.Restart()
  })

  return (
    <Provider store={store}>
      <NavigationContainer>
        <NativeBaseProvider config={config}>
          <Routers />
          <Toast/>
        </NativeBaseProvider>
      </NavigationContainer>
    </Provider>
  )
}

export default App