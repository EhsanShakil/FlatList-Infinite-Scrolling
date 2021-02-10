import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';

const App = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [start, setStart] = useState(0);

  useEffect(() => {
    setLoading(true);
    getData(start);
  }, []);

  const getData = (count) => {
    const url = `https://jsonplaceholder.typicode.com/photos?_limit=10&_start=${count}`;
    console.log(start);
    fetch(url)
      .then((res) => res.json())
      .then((resJson) => {
        console.log('resJson', resJson);
        let _data = [...data, ...resJson];
        setData(_data);
        if (_data != '') {
          setLoading(false);
        }
      });
  };

  const Item = ({title, image, id}) => (
    <View style={style.container}>
      <Image style={style.image} source={{uri: image}} />
      <Text>{title}</Text>
      <Text>{id}</Text>
    </View>
  );

  const RenderItem = ({item}) => (
    <Item title={item.title} image={item.url} id={item.id} />
  );

  const renderFooter = () => {
    return loading ? (
      <View style={style.loading}>
        <ActivityIndicator size="large" color="black" animating={true} />
      </View>
    ) : null;
  };
  const loadMore = () => {
    console.log('Loadmore');
    let nextCount = start + 10;
    setStart(nextCount);
    console.log(start);
    setLoading(true);
    console.log('count', nextCount);
    getData(nextCount);
  };

  return (
    <FlatList
      style={style.header}
      data={data}
      renderItem={RenderItem}
      keyExtractor={(item, index) => index.toString()}
      ListFooterComponent={renderFooter}
      onEndReached={loadMore}
      onEndReachedThreshold={1}
    />
  );
};

export default App;

const style = StyleSheet.create({
  header: {
    backgroundColor: 'lightgrey',
  },
  container: {
    borderWidth: 2,
    margin: 10,
  },
  image: {
    width: '100%',
    height: 100,
  },
  loading: {
    marginTop: 20,
    alignItems: 'center',
  },
});
