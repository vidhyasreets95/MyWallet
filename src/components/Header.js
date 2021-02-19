import React from 'react';
import {
    View,
    StyleSheet
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { AppColors } from '../theme/Colors';

const Header = (props) => {
    const header = Array.from(props.title);
    const headerName = [];
    header.forEach(item => {
        headerName.push("alpha-" + (item.toLowerCase()))
    })

    return (
        <View style={styles.header}>
            <View style={{ flexDirection: 'row', margin: 18 }}>
                {headerName.map((icon, index) =>
                 icon ? 
                    <Icon
                        key={index.toString()}
                        name={icon}
                        size={35}
                        color={AppColors.appSecondaryColor}
                        style={{ marginLeft: -10 }} />
                    :
                    null
                )}
            </View>
        </View>
    );
};

export default Header;

const styles = StyleSheet.create({
    header: {
        backgroundColor: AppColors.appPrimaryColor,
        alignItems: 'center',
        justifyContent: 'center'
    }
})
