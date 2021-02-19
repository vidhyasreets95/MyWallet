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
import { useSelector, useDispatch } from 'react-redux';
import SegmentedControlTab from "react-native-segmented-control-tab";
import { useNavigation } from '@react-navigation/native';
import { AppColors, Colors, gredientColors } from '../theme/Colors';
import Header from '../components/Header';
import { Dimention } from '../theme/Dimention';
import { SET_BUDGET, SET_CREDIT } from '../redux/Types';
import { _storeData } from '../components/AsyncStorage';

const Report = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const today = moment(new Date()).format('MMMM DD, yyyy')
  const [budget, setBudget] = useState('');
  const [credit, setCredit] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const currentBudget = useSelector(state => state.monthBudget);
  const currentCredit = useSelector(state => state.credits);

  const submitData = async (index) => {
    if (index === 0 && budget) {
      let monthBudget = parseFloat(budget)
      await _storeData('monthBudget', monthBudget.toString());
      await dispatch({ type: SET_BUDGET, data: monthBudget })
      navigation.navigate("Home")
      setBudget('')
    }
    else if (index === 1 && credit) {
      let newCredit = currentCredit + parseFloat(credit)
      let updatedbudget = currentBudget + parseFloat(credit)
      await _storeData('monthBudget', updatedbudget.toString());
      await _storeData('credits', newCredit.toString());
      await dispatch({ type: SET_BUDGET, data: updatedbudget })
      await dispatch({ type: SET_CREDIT, data: newCredit })
      navigation.navigate("Home")
      setCredit('')
    }
  }

  const handleIndexChange = (index) => {
    setSelectedIndex(index)
  };

  return (
    <View style={styles.container}>
      <Header
        title={'Profile'} />
      <View style={styles.subContainer2}>
        <SegmentedControlTab
          values={["Monthly Budget", "Credited Amount"]}
          borderRadius={0}
          selectedIndex={selectedIndex}
          onTabPress={(index) => handleIndexChange(index)}
          tabsContainerStyle={{ height: 50, marginTop: 20 }}
          tabTextStyle={{ color: Colors.silver, fontSize: 16, fontWeight: 'bold' }}
          activeTabStyle={{ backgroundColor: AppColors.appSecondaryColor }}
          tabStyle={{ backgroundColor: 'transparent', borderColor: AppColors.appSecondaryColor }}
        />
        <View style={{ marginTop: 20 }}>
          {selectedIndex === 0 ?
            <View>
              <Text style={styles.inputText}>Budget</Text>
              <TextInput
                style={styles.textInput}
                keyboardType={'numeric'}
                value={budget}
                onChangeText={(text) => setBudget(text)}
              />
              <View style={{ marginBottom: 10 }} />
              <Text style={styles.inputText}>Date</Text>
              <TextInput
                style={styles.textInput}
                value={today}
                editable={false}
              />
            </View>
            :
            <View>
              <Text style={styles.inputText}>Amount</Text>
              <TextInput
                style={styles.textInput}
                keyboardType={'numeric'}
                value={credit}
                onChangeText={(text) => setCredit(text)}
              />
            </View>
          }
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              onPress={() => submitData(selectedIndex)}
            >
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

export default Report;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppColors.appPrimaryColor
  },
  subContainer1: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10
  },
  label: {
    fontWeight: 'bold',
    fontSize: 16,
    paddingLeft: 10,
    color: Colors.white
  },
  amount: {
    fontWeight: 'bold',
    fontSize: 16,
    paddingRight: 10,
    color: Colors.white
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
    marginTop: 30,
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
  },
  heading: {
    color: AppColors.appPrimaryColor,
    fontWeight: 'bold',
    paddingVertical: 5,
    textAlign: 'center',
    fontSize: Dimention.windowHeight / 34,
    paddingLeft: Dimention.windowWidth / 41,
    marginTop: 10
  },
  expenseContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 50,
    width: '100%',
    elevation: 1,
    borderLeftWidth: 5,
    borderWidth: 1,
    borderColor: Colors.silver,
    borderLeftColor: Colors.silver
  }

})