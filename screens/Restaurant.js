import React, { useState, useEffect } from 'react';
import { Text, View, SafeAreaView, StyleSheet, TouchableOpacity, Image, Animated } from 'react-native';
import { isIphoneX } from 'react-native-iphone-x-helper';
import { icons, COLORS, SIZES, FONTS } from '../constants';

const Restaurant = ({ route, navigation }) => {

    const scrollX = new Animated.Value(0);
    const [restaurant, setRestaurant] = useState(null);
    const [currentLocation, setCurrentLocation] = useState(null);
    const [orderItems, setOrderItems] = useState([]);

    useEffect(() => {
        let { item, currentLocation } = route.params;

        setRestaurant(item)
        //console.log(' restaurant inside the React.useEffect ', restaurant);
        setCurrentLocation(currentLocation)
    })

    const renderHeader = () => {
        return (
            <View style={{ flexDirection: 'row' }}>
                <TouchableOpacity
                    style={{
                        width: 50,
                        paddingLeft: SIZES.padding * 2,
                        justifyContent: 'center'
                    }}
                    onPress={() => navigation.goBack()}
                >
                    <Image
                        source={icons.back}
                        resizeMode='contain'
                        style={{
                            width: 30,
                            height: 30
                        }}
                    />
                </TouchableOpacity>
                <View
                    style={{
                        alignItems: 'center',
                        justifyContent: 'center',
                        paddingHorizontal: SIZES.padding * 3,
                        borderRadius: SIZES.radius,
                        height: 50,
                        backgroundColor: COLORS.lightGray3
                    }}>
                    <Text style={{ ...FONTS.h3 }}>{restaurant?.name}</Text>
                </View>
                <TouchableOpacity
                    style={{
                        justifyContent: 'center',
                        width: 50,
                        paddingRight: SIZES.padding * 2
                    }}
                >
                    <Image
                        source={icons.list}
                        resizeMode='contain'
                        style={{
                            height: 30,
                            width: 30
                        }}
                    />
                </TouchableOpacity>
            </View>
        )
    }

    const renderFoodInfo = () => {

        const editOrder = (action, menuId, price) => {
            let orderList = orderItems.slice();
            console.log(' orderList inside the editorder ', orderList);
            let item = orderList.filter(a => a.menuId == menuId);

            console.log(' item inside the editOrder ', item);

            if (action == '+') {
                if (item.length > 0) {
                    let newQty = item[0].qty + 1;
                    item[0].qty = newQty;
                    item[0].total = newQty * price;
                } else {
                    const newItem = {
                        menuId,
                        qty: 1,
                        price,
                        total: price
                    }

                    orderList.push(newItem)
                }

                setOrderItems(orderList);

            } else {
                console.log(' Entered inside the subtract action ', item);
                if (item.length > 0) {
                    if (item[0]?.qty > 0) {
                        let newQty = item[0].qty - 1;
                        item[0].qty = newQty;
                        item[0].total = newQty * price;

                    }
                }

                setOrderItems(orderList);
            }
        }

        const getOrderQty = (menuId) => {
            let orderItem = orderItems.filter(a => a.menuId == menuId)

            if (orderItem.length > 0)
                return orderItem[0].qty

            return 0
        }

        return (
            <Animated.ScrollView
                horizontal
                pagingEnabled
                scrollEventThrottle={20}
                snapToAlignment='center'
                showsHorizontalScrollIndicator={false}
                onScroll={Animated.event([{
                    nativeEvent: { contentOffset: { x: scrollX } }
                }
                ], { useNativeDriver: false })}
            >
                {
                    restaurant?.menu.map((item, index) => {
                        console.log(' item inside the renderFoodInfo ', item);
                        console.log(' index inside the renderFoodInfo ', index);
                        return (
                            <View
                                key={`menu-${index}`}
                                style={{
                                    alignItems: 'center',
                                }}
                            >
                                <View
                                    style={{
                                        height: SIZES.height * 0.35
                                    }}
                                >
                                    {/* {Food Image} */}
                                    <Image
                                        source={item.photo}
                                        resizeMode='cover'
                                        style={{
                                            width: SIZES.width,
                                            height: '100%'
                                        }}
                                    />
                                    {/* {Quantity} */}
                                    <View
                                        style={{
                                            position: 'absolute',
                                            width: SIZES.width,
                                            height: 50,
                                            bottom: -20,
                                            justifyContent: 'center',
                                            flexDirection: 'row'
                                        }}
                                    >
                                        <TouchableOpacity
                                            style={{
                                                backgroundColor: COLORS.white,
                                                width: 50,
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                                borderBottomLeftRadius: 25,
                                                borderTopLeftRadius: 25
                                            }}
                                            onPress={() => editOrder('-', item.menuId, item.price)}
                                        >
                                            <Text style={{ ...FONTS.body1 }}>-</Text>
                                        </TouchableOpacity>
                                        <View
                                            style={{
                                                width: 50,
                                                backgroundColor: COLORS.white,
                                                justifyContent: 'center',
                                                alignItems: 'center'
                                            }}
                                        >
                                            <Text style={{ ...FONTS.h2 }}>{getOrderQty(item.menuId)}</Text>
                                        </View>
                                        <TouchableOpacity
                                            style={{
                                                width: 50,
                                                justifyContent: 'center',
                                                backgroundColor: COLORS.white,
                                                borderTopRightRadius: 25,
                                                borderBottomRightRadius: 25,
                                                alignItems: 'center'
                                            }}
                                            onPress={() => editOrder('+', item.menuId, item.price)}
                                        >
                                            <Text style={{ ...FONTS.body1 }}>+</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>

                                {/* {Name & Description} */}
                                <View
                                    style={{
                                        width: SIZES.width,
                                        alignItems: 'center',
                                        marginTop: 15
                                    }}
                                >
                                    <Text style={{ marginVertical: 10, textAlign: 'center', ...FONTS.h2 }}>{item.name}-{item.price.toFixed(2)}</Text>
                                    <Text style={{ ...FONTS.body3 }}>{item.description}</Text>
                                </View>
                                {/* {Calories} */}
                                <View
                                    style={{
                                        flexDirection: 'row',
                                        marginTop: 10
                                    }}
                                >
                                    <Image
                                        source={icons.fire}
                                        style={{
                                            width: 20,
                                            height: 20,
                                            marginRight: 10
                                        }}
                                    />
                                    <Text style={{ ...FONTS.body3, color: COLORS.darkgray }}>{item.calories.toFixed(2)}cal</Text>
                                </View>
                            </View>
                        )
                    }
                    )
                }
            </Animated.ScrollView>
        )
    }

    const renderOrder = () => {

        const getBasketItemCount = () => {
            let itemCount = orderItems.reduce((a, b) => a + (b.qty || 0), 0)

            return itemCount;
        }

        const sumOrder = () => {
            let total = orderItems.reduce((a, b) => a + (b.total || 0), 0);
            return total;
        }

        const renderDots = () => {
            const dotPosition = Animated.divide(scrollX, SIZES.width);
            //console.log(' dotPosition inside the renderOrder ', dotPosition);
            return (
                <View style={{ height: 30 }}>
                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'center',
                        height: SIZES.padding
                    }}>
                        {restaurant?.menu.map((item, index) => {

                            const opacity = dotPosition.interpolate({
                                inputRange: [index - 1, index, index + 1],
                                outputRange: [0.3, 1, 0.3],
                                extrapolate: 'clamp'
                            })

                            const dotSize = dotPosition.interpolate({
                                inputRange: [index - 1, index, index + 1],
                                outputRange: [SIZES.base * 0.8, 10, SIZES.base * 0.8],
                                extrapolate: 'clamp'
                            })

                            const dotColor = dotPosition.interpolate({
                                inputRange: [index - 1, index, index + 1],
                                outputRange: [COLORS.darkgray, COLORS.primary, COLORS.darkgray],
                                extrapolate: 'clamp'
                            })

                            return (
                                <Animated.View
                                    key={`dot-${index}`}
                                    opacity={opacity}
                                    style={{
                                        borderRadius: SIZES.radius,
                                        backgroundColor: dotColor,
                                        width: dotSize,
                                        height: dotSize,
                                        marginHorizontal: 6
                                    }}
                                />
                            )
                        })}
                    </View>
                </View>
            )
        }
        return (
            <View>
                {
                    renderDots()
                }
                <View
                    style={{
                        backgroundColor: COLORS.white,
                        borderTopLeftRadius: 40,
                        borderTopRightRadius: 40
                    }}
                >
                    <View
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            paddingVertical: SIZES.padding * 2,
                            paddingHorizontal: SIZES.padding * 3,
                            borderBottomColor: COLORS.lightGray2,
                            borderBottomWidth: 1
                        }}
                    >
                        <Text style={{ ...FONTS.h3 }}>{getBasketItemCount()} items in Cart</Text>
                        <Text style={{ ...FONTS.h3 }}>${sumOrder()}</Text>
                    </View>
                    <View
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            paddingHorizontal: SIZES.padding * 3,
                            paddingVertical: SIZES.padding * 2
                        }}
                    >
                        <View
                            style={{ flexDirection: 'row' }}
                        >
                            <Image
                                source={icons.pin}
                                resizeMode='contain'
                                style={{
                                    width: 20,
                                    height: 20,
                                    tintColor: COLORS.darkgray
                                }}
                            />
                            <Text style={{ marginLeft: SIZES.padding, ...FONTS.h4 }}>location</Text>
                        </View>
                        <View style={{
                            flexDirection: 'row'
                        }}>
                            <Image
                                source={icons.master_card}
                                resizeMode='contain'
                                style={{
                                    width: 20,
                                    height: 20,
                                    tintColor: COLORS.darkgray
                                }}
                            />
                            <Text style={{ marginLeft: SIZES.padding, ...FONTS.h4 }}>8888</Text>
                        </View>
                    </View>
                    {/* {Order Button} */}
                    <View
                        style={{
                            padding: SIZES.padding * 2,
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}
                    >
                        <TouchableOpacity
                            style={{
                                backgroundColor: COLORS.primary,
                                width: SIZES.width * 0.9,
                                borderRadius: SIZES.radius,
                                alignItems: 'center',
                                padding: SIZES.padding
                            }}
                            onPress={() => navigation.navigate('OrderDelivery', {
                                restaurant,
                                currentLocation
                            })}
                        >
                            <Text style={{ color: COLORS.white, ...FONTS.h2 }}>Order</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                {isIphoneX() &&
                    <View
                        style={{
                            position: 'absolute',
                            bottom: -34,
                            backgroundColor: COLORS.white,
                            left: 0,
                            right: 0,
                            height: 34
                        }}
                    />
                }
            </View>
        )
    }

    return (
        <SafeAreaView style={styles.container}>
            {renderHeader()}
            {renderFoodInfo()}
            {renderOrder()}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.lightGray2
    }
})

export default Restaurant;