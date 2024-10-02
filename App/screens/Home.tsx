import {FlatList, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import CardNews from '../components/CardNews';
import axios from 'axios';
import SearchBar from '../components/SearchBar';
import {socket} from '../../socket';
const Home = () => {
  const [datanews, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setpage] = useState(1);
  const [loading, setLoading] = useState(false);

  const HandleLoadMore = () => {
    if (!loading) {
      console.log('Load more');
      setpage(page => page + 1);
      fetchData();
    }
  };
  console.log(page);
  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `http://10.0.2.2:5000/api/news?page=${page}`,
      );
      const datanewsapi = response.data.data;
      const oldDtata = datanews;
      setData([...oldDtata, ...datanewsapi]);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [page]);

  useEffect(() => {
    if (searchQuery == '') {
      const handleMessage = data => {
        console.log(data);
      };

      const handleNews = d => {
        console.log(d);
        setData(prevData => [d, ...prevData]); // Use functional update for prev state
      };

      // Register event listeners
      socket.on('message', handleMessage);
      socket.on('news', handleNews);

      // Clean up the listeners
      return () => {
        socket.off('message', handleMessage);
        socket.off('news', handleNews);
      };
    }
  }, [socket]);

  const filteredNews = datanews.filter(newsItem =>
    newsItem.title.toLowerCase().includes(searchQuery.toLowerCase()),
  );
  return (
    <View
      style={{
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%',
      }}>
      <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

      <FlatList
        data={filteredNews}
        renderItem={({item}) => (
          <CardNews
            key={item._id}
            title={item.title}
            name={item.source.name}
            date={item.pubDate}
          />
        )}
        keyExtractor={(item, index) => String(index)}
        onEndReachedThreshold={0.1}
        onEndReached={HandleLoadMore}
        contentContainerStyle={{paddingBottom: 30}}
        ListFooterComponent={() =>
          loading ? (
            <Text style={{color: '#ffffff'}}>Loading...</Text>
          ) : (
            <TouchableOpacity
              style={{backgroundColor: 'red', padding: 10, borderRadius: 13}}
              onPress={HandleLoadMore}>
              <Text style={{color: '#ffffff'}}>Load More Next Page</Text>
            </TouchableOpacity>
          )
        }
      />
    </View>
  );
};
export default Home;
