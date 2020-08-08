import React, {useEffect} from 'react';
import {View, Text, StyleSheet, Image, FlatList} from 'react-native';
import Spinner from '../components/Spinner';
import ApiError from '../components/ApiError';
import {useDispatch, useSelector} from 'react-redux';
import {fetchBookDetail, resetBookDetail} from '../features/books/booksSlice';

const BookInfo = (info, infoIndex) => {
  const isEvenRow = infoIndex % 2 === 0;
  const tableStyle = isEvenRow
    ? {...styles.tableRow, ...styles.tableRowEven}
    : styles.tableRow;

  return info.content ? (
    <View style={tableStyle}>
      <Text style={styles.tableHeader}>{info.header}:</Text>
      <Text style={styles.tableData}>{info.content}</Text>
    </View>
  ) : null;
};

const BookDetail = ({route}) => {
  const {bookIsbn13} = route.params;
  const {bookDetail, bookDetail_loading, bookDetail_error} = useSelector(
    (state) => state.books,
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchBookDetail(bookIsbn13));

    return () => {
      dispatch(resetBookDetail());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (bookDetail_loading) {
    return <Spinner />;
  }

  if (bookDetail_error) {
    return <ApiError />;
  }

  const {
    title,
    image,
    subtitle,
    authors,
    publisher,
    year,
    pages,
    language,
    rating,
    isbn10,
    isbn13,
    desc,
  } = bookDetail;

  let bookdata = [
    {header: 'Title', content: title},
    {header: 'Authors', content: authors},
    {header: 'Publisher', content: publisher},
    {header: 'Year', content: year},
    {header: 'Pages', content: pages},
    {header: 'Language', content: language},
    {header: 'Rating', content: rating},
    {header: 'ISBN-10', content: isbn10},
    {header: 'ISBN-13', content: isbn13},
    {header: 'Description', content: desc},
  ];

  // adding subtitle as the second element of the book info if it's not null
  if (subtitle) {
    bookdata = [
      bookdata[0],
      {header: 'Subtitle', content: subtitle},
      ...bookdata.slice(1),
    ];
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Image
        source={{uri: image}}
        style={styles.image}
        loadingIndicatorSource={require('../assets/img/loading.gif')}
      />

      <View style={styles.table}>
        <FlatList
          data={bookdata}
          keyExtractor={(item) => item.content}
          renderItem={({item, index}) => BookInfo(item, index)}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#ffffff',
  },
  title: {
    textAlign: 'center',
    marginTop: 0,
    marginBottom: 10,
    fontWeight: 'bold',
    fontSize: 18,
    color: '#000bad',
  },
  image: {
    alignSelf: 'center',
    width: 300,
    height: 340,
    marginBottom: 10,
    borderWidth: 2,
    backgroundColor: '#f2f2f2',
  },
  table: {
    flex: 1,
    marginTop: 10,
    marginBottom: 15,
    marginHorizontal: 35,
  },
  tableRow: {
    flex: 1,
    flexDirection: 'row',
    paddingHorizontal: 5,
    paddingVertical: 10,
    backgroundColor: '#ffffff',
  },
  tableRowEven: {
    backgroundColor: '#f2f2f2',
  },
  tableHeader: {
    flex: 1,
    color: '#000bad',
    fontWeight: 'bold',
  },
  tableData: {
    flex: 2,
  },
});

export default BookDetail;
