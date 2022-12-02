import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';

const settingIcon = (
  <Icon name="ellipsis-vertical-sharp" size={30} color="#000003" />
);
const backIcon = <Icon name="chevron-back" size={30} color="#000003" />;

const Header = ({
  title,
  onBack,
  options,
  backgroundColor = '#2196F3',
  color = 'white',
}) => {
  return (
    <View style={styles.container(backgroundColor)}>
      <View>
        {onBack && (
          <TouchableOpacity onPress={onBack} activeOpacity={0.7}>
            {backIcon}
          </TouchableOpacity>
        )}
      </View>
      <View>
        <Text style={styles.text(color)}>{title}</Text>
      </View>
      <View>
        {options && (
          <TouchableOpacity onPress={options} activeOpacity={0.7}>
            {settingIcon}
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: backgroundColor => ({
    flex: 1,
    paddingHorizontal: 10,
    paddingVertical: 24,
    backgroundColor: backgroundColor,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomEndRadius: 30,
    borderBottomStartRadius: 30,
  }),
  text: color => ({
    fontSize: 40,
    fontFamily: 'Poppins-Medium',
    color: color,
    textAlign: 'center',
  }),
});
