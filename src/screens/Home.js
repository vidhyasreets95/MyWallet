import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Alert
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';
import moment from 'moment';
import { AppColors, Colors, gredientColors } from '../theme/Colors';
import Header from '../components/Header';
import { Dimention } from '../theme/Dimention';
import { useNavigation } from '@react-navigation/native';

const Home = () => {
    const navigation = useNavigation();
    const today = moment(new Date()).format('MMMM DD, yyyy')
    const [balance, setBalance] = useState(0);
    const [expense, setExpense] = useState(0);
    const amount = useSelector(state => state.monthBudget);
    const butget = amount ? amount : 0
    const expenseList = useSelector(state => state.expenseList);
    const abcd = useSelector(state => state);
    const currentCredit = useSelector(state => state.credits);
    const [expenseStatus, setExpenseStatus] = useState({});
    const [expenseToday, setExpenseToday] = useState(0);
    const [mostExp, setmostExp] = useState('');

    useEffect(() => {
        console.log(abcd,"-----abcd")
        let spend = 0
        let lastSpend = 0
        let most = 1500
        let mostExpCat = ''
        expenseList && expenseList.map(data => {
            spend = spend + data.prevExpense;
            if (data.lastUpdate === today) {
                lastSpend = lastSpend + data.prevExpense;
            }
            if (data.prevExpense > most) {
                mostExpCat = mostExpCat + ' ' + data.category
            }
        })
        setmostExp(mostExpCat);
        setExpenseToday(lastSpend);
        setBalance(butget - spend);
        setExpense(spend)
        setExpenseStatus(getPercentage(spend, butget));
    }, [butget, expenseList])

    const getPercentage = (a, b) => {
        let percentage = parseInt((a / b) * 100)
        return {
            percentage: percentage + '%',
        };
    }

    return (
        <View style={styles.container}>
            <Header
                title={'overview'} />
            <View style={styles.accountContainer}>
                <LinearGradient
                    colors={gredientColors}
                    style={styles.gradientView}>
                    <View style={styles.accountDetails}>
                        <View>
                            <Text style={styles.balanceText}>Available Balance</Text>
                            <Text style={styles.date}>{today}</Text>
                        </View>
                        <Text style={styles.balance}>{'₹' + parseFloat(balance).toFixed(2)}</Text>
                    </View>
                    <View style={styles.accBox}>
                        <View style={styles.accInnerBox}>
                            <View style={styles.accInnerBox2}>
                                <Text style={styles.butget}
                                >Budget</Text>
                                <Text style={styles.amount}
                                >{'₹' + parseFloat(butget).toFixed(2)}</Text>
                            </View>
                            <View style={styles.accInnerBox2}>
                                <Text
                                    style={styles.expense}>Expense</Text>
                                <Text style={styles.amount}
                                >{'₹' + parseFloat(expense).toFixed(2)}</Text>
                            </View>
                        </View>
                    </View>
                </LinearGradient>

            </View>
            <View style={styles.detailsContainer}>
                <View style={styles.box}>
                    <Text style={styles.heading}>Today's Status</Text>
                    <View style={[styles.flexDirectionRow, { marginBottom: 10 }]}>
                        <Text style={styles.cashStatus}>Spend</Text>
                        <Text style={styles.gainAmount}>
                            {'₹' + parseFloat(expenseToday).toFixed(2)}
                        </Text>
                    </View>
                </View>

                <View style={styles.box}>
                    <View style={styles.flexDirectionRow}>
                        <Text style={styles.heading}>Expense Rate</Text>
                        <Text style={styles.priority}>{butget ? expenseStatus.percentage : '0%'}</Text>
                    </View>
                    <View style={{ marginTop: 8 }} />
                    <View style={styles.barStyle}>
                        <View style={[styles.percentage, {
                            backgroundColor: Colors.lightSilver,
                            width: butget ? expenseStatus.percentage : 0
                        }]} />
                    </View>
                    <View style={{ marginBottom: 15 }} />
                </View>

                <View style={styles.box}>
                    <View style={[styles.flexDirectionRow, { marginVertical: 5 }]}>
                        <Text style={styles.heading}>Total Credit</Text>
                        <Text style={styles.priority}>{'₹' + parseFloat(currentCredit ? currentCredit : 0).toFixed(2)}</Text>
                    </View>
                </View>

                <View style={styles.box}>
                    <Text style={styles.heading}>Alert</Text>
                    <View style={styles.flexDirectionRow}>
                        <Text style={{ color: Colors.silver, fontWeight: 'bold', paddingLeft: 10 }}>High Priority</Text>
                        <Icon
                            name={'notifications-active'}
                            size={30}
                            color={Colors.white}
                            style={{ marginRight: 20 }}
                            onPress={() => expense >= 2000 && mostExp ?
                                Alert.alert(
                                    "Warning",
                                    `Expense Rate High in ${mostExp}`,
                                    [
                                        { text: "OK", onPress: () => console.log("OK Pressed") }
                                    ],
                                    { cancelable: false }
                                )
                                :
                                Alert.alert(
                                    "Notification",
                                    "Expense Rate is Stable",
                                    [
                                        { text: "OK", onPress: () => console.log("OK Pressed") }
                                    ],
                                    { cancelable: false }
                                )
                            }
                        />
                    </View>
                    <View style={{ marginBottom: 10 }} />
                </View>

            </View>
        </View>
    );
};

export default Home;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: AppColors.appPrimaryColor
    },
    heading: {
        color: Colors.white,
        fontWeight: 'bold',
        paddingVertical: 5,
        fontSize: Dimention.windowHeight / 34,
        paddingLeft: Dimention.windowWidth / 41
    },
    box: {
        borderWidth: 2,
        borderColor: AppColors.appSecondaryColor,
        borderRadius: Dimention.windowWidth / 82
    },
    barStyle: {
        height: 4,
        backgroundColor: Colors.grey3,
        marginHorizontal: Dimention.windowWidth / 41,
        borderRadius: Dimention.windowWidth / 82
    },
    percentage: {
        height: 4,
        borderRadius: 5
    },
    accountContainer: {
        backgroundColor: AppColors.appPrimaryColor,
        flex: 3.5,
        marginHorizontal: Dimention.windowWidth / 27
    },
    detailsContainer: {
        justifyContent: 'space-around',
        flex: 6.5,
        marginHorizontal: Dimention.windowWidth / 27,
    },
    gradientView: {
        flex: 1,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    accountDetails: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        flex: 1,
        width: '100%',
        alignItems: 'center',
    },
    balanceText: {
        color: Colors.white,
        fontSize: 16,
        fontWeight: 'bold',
        paddingLeft: 20
    },
    date: {
        color: Colors.white,
        fontSize: 11,
        paddingLeft: 20
    },
    balance: {
        color: Colors.white,
        fontSize: 25,
        fontWeight: 'bold',
        paddingRight: 20
    },
    accBox: {
        height: '35%',
        width: '90%',
        backgroundColor: Colors.white,
        borderRadius: 10,
        marginBottom: 15
    },
    accInnerBox: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        flex: 1,
    },
    accInnerBox2: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    butget: {
        color: Colors.green,
        fontSize: 11,
        fontWeight: 'bold',
    },
    amount: {
        color: Colors.grey2,
        fontSize: 17,
        fontWeight: 'bold',
    },
    expense: {
        color: Colors.red,
        fontSize: 11,
        fontWeight: 'bold',
    },
    priority: {
        fontWeight: 'bold',
        color: Colors.silver,
        paddingRight: Dimention.windowWidth / 41,
        fontSize: Dimention.windowHeight / 40
    },
    flexDirectionRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    cashStatus: {
        fontWeight: 'bold',
        color: Colors.silver,
        fontSize: Dimention.windowHeight / 42,
        paddingLeft: Dimention.windowWidth / 41,
    },
    gainAmount: {
        fontWeight: 'bold',
        color: Colors.silver,
        fontSize: Dimention.windowHeight / 37,
        paddingRight: Dimention.windowWidth / 41,
    }
})
