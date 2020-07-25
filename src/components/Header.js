import React, {useState} from 'react';
import {Text, View, Pressable, TextInput, StyleSheet} from 'react-native';
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useDispatch} from 'react-redux';
import {fetchBooks, resetBooks} from '../redux/actions/fetchBooks';

const Header = ({title, navigation}) => {
  const [search, setSearch] = useState('');
  const [searchError, setSearchError] = useState(false);
  const [searchModal, setSearchModal] = useState(false);
  const dispatch = useDispatch();

  const toggleModal = () => {
    setSearch('');
    setSearchModal(!searchModal);
  };

  const handleBookSearch = () => {
    if (!search) {
      setSearchError(true);
    } else {
      setSearchError(false);
      dispatch(resetBooks());
      dispatch(fetchBooks(search, 1));
      toggleModal();
      navigation.navigate('books');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Pressable onPress={toggleModal}>
        <Icon name="book-search-outline" size={30} color="#000bad" />
      </Pressable>

      <Modal isVisible={searchModal}>
        <View style={styles.modal}>
          <Text style={styles.label}>Search for a book</Text>
          <TextInput
            value={search}
            onChangeText={setSearch}
            style={
              !searchError
                ? styles.input
                : {...styles.input, ...styles.searchError}
            }
          />

          <View style={styles.modalActionBtn}>
            <Pressable
              onPress={handleBookSearch}
              style={{...styles.button, ...styles.buttonViolet}}>
              <Text style={styles.buttonText}>Search</Text>
            </Pressable>

            <Pressable
              onPress={toggleModal}
              style={{...styles.button, ...styles.buttonGray}}>
              <Text style={styles.buttonText}>Cancel</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    color: '#000bad',
    fontWeight: 'bold',
    fontStyle: 'italic',
  },
  modal: {
    paddingVertical: 20,
    paddingHorizontal: 40,
    height: 180,
    backgroundColor: '#ffffff',
  },
  close: {
    fontSize: 30,
    color: '#000000',
    alignSelf: 'flex-end',
  },
  label: {
    marginTop: 10,
    fontWeight: 'bold',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
  },
  modalActionBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    flex: 1,
    alignItems: 'center',
    padding: 10,
    borderRadius: 10,
  },
  buttonViolet: {
    backgroundColor: '#000bad',
    marginRight: 10,
  },
  buttonGray: {
    backgroundColor: '#343a40',
    marginLeft: 10,
  },
  buttonText: {
    color: '#ffffff',
  },
  searchError: {
    borderWidth: 2,
    borderColor: '#ff0000',
  },
});

export default Header;
