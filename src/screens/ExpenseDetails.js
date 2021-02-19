import React, { useState } from 'react';
import {
    View,
    StyleSheet,
    TextInput,
    Text,
    TouchableOpacity
} from 'react-native';
import moment from 'moment';
import LinearGradient from 'react-native-linear-gradient';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useSelector, useDispatch } from 'react-redux';
import { useRoute, useNavigation } from '@react-navigation/native';
import { AppColors, Colors, gredientColors } from '../theme/Colors';
import Header from '../components/Header';
import { ADD_EXPENSE } from '../redux/Types';
import { _storeData } from '../components/AsyncStorage';

const ExpenseDetails = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const expense = route.params.expense;
    const dispatch = useDispatch();
    const list = useSelector(state => state.expenseList)
    const [expenseList, setExpenseList] = useState(list);
    const [amount, setAmount] = useState('');
    const [date, setDate] = useState(new Date());
    const [show, setShow] = useState(false);

    const submitData = () => {
        let lists = expenseList ? [...expenseList] : [];
        if (amount && date) {
            let index = lists.findIndex((data) => data.category === expense.category);
            let prevExpense = lists[index].prevExpense;
            list[index].prevExpense = parseFloat(prevExpense) + parseFloat(amount);
            list[index].lastUpdate = moment(new Date()).format('MMMM DD, yyyy');
            _storeData('expenseList', JSON.stringify(lists));
            dispatch({ type: ADD_EXPENSE, data: lists });
            setExpenseList(lists);
            navigation.goBack();
        }
    }

    const onDateClicked = () => {
        setShow(true);
    }

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(Platform.OS === 'ios');
        setDate(currentDate);
    };

    return (
        <View style={styles.container}>
            <Header
                title={expense.category} />
            <View style={styles.subContainer2}>
                <View style={{ marginTop: 20 }}>
                    <Text style={styles.inputText}>Amount</Text>
                    <TextInput
                        style={styles.textInput}
                        keyboardType={'numeric'}
                        value={amount}
                        onChangeText={(text) => setAmount(text)}
                    />
                    <View style={{ marginBottom: 10 }} />
                    <Text style={styles.inputText}>Date</Text>
                    <TouchableOpacity onPress={() => onDateClicked()}>
                        <TextInput
                            style={styles.textInput}
                            value={moment(date).format('MMMM DD, yyyy')}
                            editable={false}
                        />
                    </TouchableOpacity>
                    {show &&
                        <DateTimePicker
                            style={{ width: 200 }}
                            value={date}
                            mode="date"
                            showIcon={false}
                            hideText={true}
                            is24Hour={true}
                            display="default"
                            onChange={onChange}
                        />}
                    <View style={{ marginTop: 25 }} />
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity
                            onPress={() => submitData()}>
                            <LinearGradient colors={gredientColors} style={styles.button}>
                                <Text style={styles.buttonText}>Submit</Text>
                            </LinearGradient>
                        </TouchableOpacity>
                    </View>

                </View>
            </View>
        </View>
    );
};

export default ExpenseDetails;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: AppColors.appPrimaryColor
    },
    header: {
        backgroundColor: AppColors.appPrimaryColor,
        alignItems: 'center',
        justifyContent: 'center'
    },
    subContainer1: {
        flex: 2,
        justifyContent: 'center',
        alignItems: 'center'
    },
    inputText: {
        paddingLeft: 20,
        fontWeight: 'bold',
        color: Colors.white
    },
    textInput: {
        borderBottomWidth: 1,
        borderRadius: 25,
        borderColor: Colors.silver,
        paddingLeft: 25,
        color: Colors.white
    },
    buttonContainer: {
        // marginTop: 30,
        marginHorizontal: 20
    },
    button: {
        height: 50,
        width: "100%",
        backgroundColor: AppColors.appSecondaryColor,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttonText: {
        color: Colors.white,
        fontSize: 20,
        textShadowColor: Colors.black
    }

})