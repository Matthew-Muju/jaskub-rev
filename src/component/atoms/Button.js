import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import React from 'react';

const Button = ({title, color = 'white', textColor = '#2196F3', onPress}) => {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
      <SafeAreaView style={styles.button}>
        {/* <View style={styles.container(color)}>
          <Text style={styles.text(textColor)}>{title}</Text>
        </View> */}
        <View>
          <Text style={styles.text(textColor)}>{title}</Text>
        </View>
      </SafeAreaView>
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  container: color => ({
    height: 45,
    backgroundColor: color,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    borderColor: '#2196F3',
  }),
  text: textColor => ({
    fontSize: 16,
    fontFamily: 'Poppins-Medium',
    color: textColor,
  }),
  button: {
    flex: 1,
    height: 45,
    alignItems: 'center',
    flexDirection: 'row',
    borderWidth: 2,
    borderColor: '#2196F3',
    borderRadius: 10,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
