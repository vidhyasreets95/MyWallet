import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';
import { AppColors, Colors } from '../theme/Colors';
import Home from '../screens/Home';
import Expense from '../screens/Expense';
import Report from '../screens/Report';

const Tab = createBottomTabNavigator();

const TabStackScreens = () => {
    return (
        <Tab.Navigator
        screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
                let iconName;
                if (route.name === 'Home') {
                    iconName = 'home';
                } else if (route.name === 'Expense') {
                    iconName = 'money';
                }
                else {
                    iconName = 'list';
                }
                return <Icon name={iconName} size={size} color={color} />;
            },
        })}
        tabBarOptions={{
            activeTintColor: Colors.white,
            inactiveTintColor: AppColors.appSecondaryColor,
            style: {
                backgroundColor: AppColors.appPrimaryColor,
                height: 60
            },
            labelStyle: {
                fontSize: 12
              },
        }}
         >
            <Tab.Screen name="Home" component={Home} />
            <Tab.Screen name="Expense" component={Expense} />
            <Tab.Screen name="Budget" component={Report} />
        </Tab.Navigator>
    )
}

export default TabStackScreens;



