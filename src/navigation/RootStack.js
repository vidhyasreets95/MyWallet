import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Landing from '../screens/Landing';
import TabStackScreens from './TabStack';
import ExpenseDetails from '../screens/ExpenseDetails';

const RootStack = createStackNavigator();

const RootStackScreens = () => {
    return (
        <RootStack.Navigator
            screenOptions={{
                headerShown: false
            }}>
            <RootStack.Screen name="Landing" component={Landing} />
            <RootStack.Screen name="HomePage" children={TabStackScreens}/>
            <RootStack.Screen name="ExpenseDetails" component={ExpenseDetails}/>
        </RootStack.Navigator>
    )
}

export default RootStackScreens;



