import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    Platform
} from 'react-native';
import FingerprintScanner from 'react-native-fingerprint-scanner';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-community/async-storage'
import { useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { AppColors, Colors, gredientColors } from '../theme/Colors';
import { ADD_EXPENSE, SET_BUDGET, SET_CREDIT } from '../redux/Types';
import { _storeData } from '../components/AsyncStorage';
import { Dimention } from '../theme/Dimention';

const Landing = (props) => {
    const navigation = useNavigation();
    const dispatch = useDispatch()
    const [pin, setPin] = useState();
    const [pin1, setPin1] = useState('');
    const [pin2, setPin2] = useState('');
    const [loginUser, setLoginUser] = useState(false);

    useEffect(() => {
        AsyncStorage.multiGet(['pin', 'expenseList', 'monthBudget', 'credits']).then(values => {
            if (values[0][1]) {
                setPin(parseInt(values[0][1]))
                setLoginUser(true)
            }
            dispatch({ type: ADD_EXPENSE, data: JSON.parse(values[1][1]) });
            dispatch({ type: SET_BUDGET, data: parseFloat(values[2][1]) });
            dispatch({ type: SET_CREDIT, data: parseFloat(values[3][1]) });
        })
    }, [])

    const authCurrent = () => {
        FingerprintScanner
            .authenticate({ title: '' })
            .then(() => {
                navigation.navigate('HomePage');
            }).
            catch(err => {
                // console.log(err);
            })
    }


    const submit = () => {
        if (loginUser && pin && pin1 && pin == pin1) {
            navigation.navigate('HomePage');
        }
        else if (pin1 && pin2 && pin1 === pin2) {
            _storeData('pin', pin2.toString());
            navigation.navigate('HomePage');
        }
    }

    const useClick = () => {
        if (Platform.Version < 23) {
            // console.log('yes');
            // this.authLegacy();
        } else {
            // console.log('no');
            authCurrent();
        }
    }

    return (
        <View style={styles.container}>
            <View style={{ flexDirection: 'row', margin: 18 }}>
                {(loginUser ? Array.from('pin') : Array.from('createpin')).map((item, index) =>
                    <Icon
                        key={index.toString()}
                        name={"alpha-" + (item.toLowerCase())}
                        size={40}
                        color={AppColors.appSecondaryColor}
                        style={{ marginLeft: -10 }} />
                )}
            </View>
            <View style={{ marginTop: 10 }} />
            {!loginUser ?
                <View style={styles.center}>
                    <TextInput
                        style={styles.textInput}
                        keyboardType={'numeric'}
                        placeholder={'Pin'}
                        placeholderTextColor={Colors.silver}
                        value={pin1}
                        onChangeText={(text) => setPin1(text)}
                    />
                    <View style={{ marginTop: 10 }} />
                    <TextInput
                        style={styles.textInput}
                        keyboardType={'numeric'}
                        placeholder={'Confirm Pin'}
                        placeholderTextColor={Colors.silver}
                        value={pin2}
                        onChangeText={(text) => setPin2(text)}
                    />
                </View>
                :
                <View>
                    <TextInput
                        style={styles.textInput}
                        keyboardType={'numeric'}
                        placeholder={'Pin'}
                        placeholderTextColor={Colors.silver}
                        value={pin1}
                        onChangeText={(text) => setPin1(text)}
                    />
                </View>
            }
            <View style={{ marginTop: 15 }} />
            <TouchableOpacity
                onPress={() => submit()}
            >
                <LinearGradient colors={gredientColors} style={styles.button}>
                    <Text style={styles.textStyle}>SUBMIT</Text>
                </LinearGradient>
            </TouchableOpacity>
            <Text onPress={() => useClick()}
                style={styles.finger}
            >
                Use FingerPrint
            </Text>
        </View>
    );
};

export default Landing;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: AppColors.appPrimaryColor,
        justifyContent: 'center',
        alignItems: 'center'
    },
    center: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    heading: {
        padding: 20,
        fontSize: 25,
        fontWeight: 'bold',
        color: Colors.white,
        textAlign: 'center'
    },
    finger: {
        color: Colors.silver,
        fontSize: 15,
        paddingVertical: 30
    },
    textInput: {
        borderWidth: 1,
        borderRadius: 25,
        borderColor: Colors.silver,
        color: Colors.white,
        width: 230,
        textAlign: 'center'
    },
    button: {
        width: 230,
        height: 50,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center'
    },
    textStyle: {
        fontWeight: "bold",
        textAlign: "center",
        fontSize: Dimention.windowHeight / 40,
        color: Colors.white,
    }

});
