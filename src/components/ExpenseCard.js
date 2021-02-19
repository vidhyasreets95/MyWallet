import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AppColors, Colors } from '../theme/Colors';
import { Dimention } from '../theme/Dimention';

const ExpenseCard = (props) => {
    const navigation = useNavigation();
    const { expense, percentage, barWidth } = props;

    return (
        <TouchableOpacity
            onPress={() => navigation.navigate('ExpenseDetails', {
                expense: expense
            })}
            style={styles.container}>
            <View
                style={styles.expenseCard}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text style={styles.heading}>{expense.category} {percentage}%</Text>
                    <Text style={styles.amount}>₹{parseFloat(expense.prevExpense).toFixed(2)}</Text>
                </View>
                <View style={styles.barStyle}>
                    <View style={[styles.percentage, {
                        backgroundColor: '#CACFD2',
                        width: barWidth
                    }]} />
                </View>
            </View>
        </TouchableOpacity>
    );
};

export default ExpenseCard;

const styles = StyleSheet.create({
    container: {
        marginBottom: 15
    },
    heading: {
        paddingLeft: 20,
        color: Colors.white,
        fontWeight: 'bold'
    },
    expenseCard: {
        height: 80,
        borderWidth: 2,
        borderColor: AppColors.appSecondaryColor,
        marginHorizontal: 20,
        borderRadius: 5,
        justifyContent: 'space-evenly'
    },
    barStyle: {
        height: 4,
        backgroundColor: Colors.grey3,
        marginHorizontal: 20,
        borderRadius: 5
    },
    percentage: {
        height: 5,
        borderRadius: 5
    },
    amount: {
        fontWeight: 'bold',
        color: Colors.silver,
        paddingRight: Dimention.windowWidth / 20,
        fontSize: Dimention.windowHeight / 40
    },

})
