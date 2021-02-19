import React, { useState } from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { AppColors, Colors } from '../theme/Colors';
import ExpenseCategoryPopup from '../components/ExpensecategoryPopup';
import ExpenseCard from '../components/ExpenseCard';
import Header from '../components/Header';
import { ADD_EXPENSE } from '../redux/Types';
import { _storeData } from '../components/AsyncStorage';

const Expense = (props) => {
  const dispatch = useDispatch();
  const list = useSelector(state => state.expenseList)
  const [expenseList, setExpenseList] = useState(list ? list : []);
  const amount = useSelector(state => state.monthBudget);
  const butget = amount ? amount : 0;
  const [visibility, setVisibility] = useState(false);

  const closePopup = () => {
    setVisibility(false)
  }

  const onSubmit = (category) => {
    setVisibility(false)
    if (category) {
      let list = [...expenseList]
      list.push({
        category: category,
        prevExpense: 0,
        lastUpdate: ''
      })
      _storeData('expenseList', JSON.stringify(list));
      dispatch({ type: ADD_EXPENSE, data: list })
      setExpenseList(list)
    }
  }

  const renderItem = (element, index) => {
    let percentage = parseInt(((element.prevExpense) / butget) * 100)
    let barColor = Colors.green
    if (percentage > 30) barColor = Colors.red
    else if (percentage > 25) barColor = Colors.orange
    let barWidth = (percentage.toString()) + '%'
    return (
      <ExpenseCard
        expense={element}
        percentage={percentage}
        barWidth={barWidth}
      />
    )
  }

  const addCategory = () => {
    if (butget <= 0) {
      Alert.alert(
        "Warning",
        "Please set a Butget",
        [
          { text: "OK", onPress: () => console.log("OK Pressed") }
        ],
        { cancelable: false }
      )
    }
    else {
      setVisibility(true)
    }
  }

  return (
    <View style={styles.container}>
      <ExpenseCategoryPopup
        visibility={visibility}
        onSubmit={onSubmit}
        closePopup={closePopup}
      />
      <Header
        title={"Expenses"} />
      <View style={{ marginBottom: 20 }} />
      <FlatList
        data={expenseList}
        renderItem={({ item, index }) => renderItem(item, index)}
        keyExtractor={(item, index) => index.toString()}
      />
      <View style={styles.imageContainer}>
        <TouchableOpacity onPress={() => addCategory()} >
          <Image
            style={styles.image}
            source={require('../assets/plus.png')}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Expense;

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
  imageContainer: {
    position: 'absolute',
    bottom: 0,
    alignSelf: 'flex-end',
    justifyContent: 'flex-end'
  },
  image: {
    height: 55,
    width: 55,
    marginRight: 20,
    marginBottom: 20
  }
})