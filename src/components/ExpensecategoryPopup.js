import React, { useState, useEffect } from 'react';
import {
    View,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity
} from 'react-native';
import Modal from 'react-native-modal';
import LinearGradient from 'react-native-linear-gradient';
import { AppColors, Colors, gredientColors } from '../theme/Colors';
import { Dimention } from '../theme/Dimention';

const ExpenseCategoryPopup = (props) => {
    const { visibility, closePopup, onSubmit } = props;
    const [category, setCategory] = useState('');

    useEffect(() => {
        setCategory('')
    }, [props.visibility])

    return (
        <Modal
            isVisible={visibility}
        >
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <Text style={styles.Category}>Category Name</Text>
                    <TextInput
                        style={[styles.textInput, styles.modalTextInput]}
                        onChangeText={(text) => setCategory(text)}
                        value={category}
                    />
                    <View style={{ marginBottom: 10 }} />
                    <TouchableOpacity
                        onPress={() => onSubmit(category)}
                    >
                        <LinearGradient colors={gredientColors} style={styles.okButton}>
                            <Text style={styles.textStyle}>OK</Text>
                        </LinearGradient>
                    </TouchableOpacity>
                    <Text
                        onPress={() => closePopup()}
                        style={styles.cancel}>Cancel</Text>
                </View>
            </View>
        </Modal>
    );
};

export default ExpenseCategoryPopup;

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: Dimention.windowHeight / 31,
    },
    modalView: {
        borderWidth: 1,
        borderColor: Colors.silver,
        backgroundColor: Colors.white,
        margin: 20,
        borderRadius: 5,
        padding: 35,
        alignItems: "center",
        shadowColor: Colors.white,
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    Category: {
        color: AppColors.appPrimaryColor,
        fontWeight: 'bold',
        fontSize: 20,
        paddingBottom: 10
    },
    textInput: {
        height: Dimention.windowHeight / 13,
        width: Dimention.windowHeight - 70,
        backgroundColor: Colors.white,
        borderRadius: 5,
        paddingLeft: Dimention.windowWidth / 20,
        fontSize: Dimention.windowHeight / 45,
    },
    modalTextInput: {
        width: 225,
        borderWidth: 2,
        borderColor: Colors.silver
    },
    okButton: {
        backgroundColor: AppColors.appSecondaryColor,
        borderRadius: 5,
        padding: 10,
        elevation: 2,
        width: Dimention.windowWidth / 2.5,
        alignItems: 'center',
        justifyContent: 'center'
    },
    textStyle: {
        fontWeight: "bold",
        textAlign: "center",
        fontSize: Dimention.windowHeight / 37,
        color: Colors.white,
    },
    cancel: {
        paddingTop: 15,
        fontSize: 16,
        color: AppColors.appPrimaryColor
    },
})
