import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  TextInput,
  SafeAreaView,
  Linking,
} from 'react-native';
import React, {useState} from 'react';
import {JW} from '../../assets/icon';
import Modal from 'react-native-modal';
import {Gap, Button} from '../atoms';
import AntDesign from 'react-native-vector-icons/AntDesign';
import IonIcons from 'react-native-vector-icons/Ionicons';

const List = ({title, location, status, min, max, number}) => {
  const [modal, setModal] = useState(false);

  showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  handleConfirm = date => {
    setSelectedDate(date);
    hideDatePicker();
  };

  return (
    <View>
      <TouchableOpacity onPress={() => setModal(true)}>
        <View style={styles.container}>
          <AntDesign
            name="user"
            style={{flex: 0.2, marginLeft: 10}}
            size={30}
            color="#2196F3"
          />
          <View style={{flex: 1}}>
            <Text style={styles.item}>{title}</Text>
            <Text style={styles.titleText}>
              Rp.{min} - Rp.{max}
            </Text>
            <Text style={styles.value}>{status}</Text>
          </View>
          <Text style={styles.item}>{location}</Text>
        </View>
      </TouchableOpacity>
      <Modal isVisible={modal} onBackdropPress={() => setModal(false)}>
        <View style={styles.modalBox}>
          <View style={styles.imageWrapper}>
            <Image
              source={require('../../assets/icon/logojkb.png')}
              style={styles.modalImg}
            />
          </View>
          <Text style={styles.modalText}>Gunakan Jasa</Text>
          <Gap height={16} />
          <View style={styles.modalContent}>
            <TouchableOpacity
              onPress={() => {
                Linking.openURL('https://wa.me/' + number);
              }}>
              <IonIcons name="logo-whatsapp" size={40} color="#2196F3" />
            </TouchableOpacity>
            <Gap height={10} />
            <Text>Hubungi Via Whatsapp</Text>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default List;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingVertical: 10,
    paddingHorizontal: 12,
    justifyContent: 'space-between',
    borderRadius: 3,
    shadowColor: '#2196F3',
    shadowOffset: {
      width: 0,
      height: 0.5,
    },
    shadowOpacity: 0.1,
    shadowRadius: 0.1,
    elevation: 1,
    alignItems: 'center',
  },
  titleText: {
    fontFamily: 'Poppins-Bold',
    fontSize: 16,
    color: '#8D92A3',
  },
  item: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: '#020202',
  },
  value: {
    fontFamily: 'Poppins-Bold',
    fontSize: 14,
    color: '#1ABC9C',
  },
  modalBox: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 6,
    opacity: 0.95,
  },
  modalText: {
    textAlign: 'center',
    fontSize: 18,
    fontFamily: 'Poppins-SemiBold',
    marginTop: 10,
    color: 'black',
  },
  modalImg: {
    width: 50,
    height: 50,
  },
  imageWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#020202',
    borderRadius: 8,
    paddingLeft: 10,
    paddingHorizontal: 10,
  },
  text: {
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
    marginBottom: 6,
    color: 'black',
  },
  modalContent: {
    padding: 20,
    alignItems: 'center',
  },
  safeView: {
    alignItems: 'center',
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#2196F3',
    borderRadius: 10,
    backgroundColor: '#E8F6FF',
  },
});
