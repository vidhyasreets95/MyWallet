import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import RootStackScreens from './src/navigation/RootStack';

const App = () => {
  return (
    <NavigationContainer>
      <RootStackScreens/>
    </NavigationContainer>
  );
};

export default App;
