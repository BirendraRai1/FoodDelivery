import React from 'react';
import { View, Image, TouchableOpacity } from 'react-native';
import { createBottomTabNavigator, BottomTabBar } from '@react-navigation/bottom-tabs';
import Svg, { Path } from 'react-native-svg';
import { isIphoneX } from 'react-native-iphone-x-helper';

import { Home } from '../screens';

import { COLORS, icons } from '../constants';

const Tab = createBottomTabNavigator();

const TabBarCustomButton = ({ accessibilityState, children, onPress }) => {
    console.log('props inside the TabBarCustomButton ', { accessibilityState, children, onPress });
    var isSelected = accessibilityState.selected;
    if (isSelected) {
        return (
            <TouchableOpacity
                style={{
                    top: -22.5,
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: 50,
                    height: 50,
                    borderRadius: 25,
                    backgroundColor: COLORS.white
                }}
                onPress={onPress}
            >
                {children}
            </TouchableOpacity>
        )
    } else {
        return (
            <TouchableOpacity
                style={{
                    flex:1,
                    height: 60,
                    backgroundColor: COLORS.white
                }}
                activeOpacity={1}
                onPress={onPress}
            >
                {children}
            </TouchableOpacity>
        )
    }
}

const CustomTabBar = (props) => {
    console.log(' props inside the CustomBar ', props);
    if (isIphoneX()) {
        return (
            <View>
                <View
                    style={{
                        position: 'absolute',
                        height: 30,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundColor: COLORS.white
                    }}
                ></View>
                <BottomTabBar
                    {...props}
                />
            </View>
        );
    } else {
        return (
            <BottomTabBar
                {...props}
            />
        );
    }
}

const Tabs = () => {
    return (
        <Tab.Navigator
            screenOptions={{
                tabBarShowLabel: false,
                tabBarStyle: {
                    display: 'flex'
                }
            }}
            tabBar={(props) => (
                <CustomTabBar {...props} />
            )}
        >
            <Tab.Screen
                name='Home'
                component={Home}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <Image
                            source={icons.cutlery}
                            resizeMode='contain'
                            style={{
                                width: 25,
                                height: 25,
                                tintColor: focused ? COLORS.primary : COLORS.secondary
                            }}
                        />
                    ),
                    tabBarButton: (props) => (
                        <TabBarCustomButton {...props} />
                    )
                }}
            />
            <Tab.Screen
                name='Search'
                component={Home}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <Image
                            source={icons.search}
                            resizeMode='contain'
                            style={{
                                width: 25,
                                height: 25,
                                tintColor: focused ? COLORS.primary : COLORS.secondary
                            }}
                        />
                    ),
                    tabBarButton: (props) => (
                        <TabBarCustomButton {...props} />
                    )
                }}
            />
            <Tab.Screen
                name='Like'
                component={Home}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <Image
                            source={icons.like}
                            resizeMode='contain'
                            style={{
                                width: 25,
                                height: 25,
                                tintColor: focused ? COLORS.primary : COLORS.secondary
                            }}
                        />
                    ),
                    tabBarButton: (props) => (
                        <TabBarCustomButton {...props} />
                    )
                }}
            />
            <Tab.Screen
                name='User'
                component={Home}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <Image
                            source={icons.user}
                            resizeMode='contain'
                            style={{
                                width: 25,
                                height: 25,
                                tintColor: focused ? COLORS.primary : COLORS.secondary
                            }}
                        />
                    ),
                    tabBarButton: (props) => (
                        <TabBarCustomButton {...props} />
                    )
                }}
            />
        </Tab.Navigator>
    )
}

export default Tabs;
