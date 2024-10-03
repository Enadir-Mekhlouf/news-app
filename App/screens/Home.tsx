import {FlatList, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import CardNews from '../components/CardNews';
import axios from 'axios';
import SearchBar from '../components/SearchBar';
import {socket} from '../../socket';
import AsyncStorage from '@react-native-async-storage/async-storage';
const Home = () => {
  const [datanews, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setpage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [seenNewsGuid, setSeenNewsGuid] = useState(null);

  const HandleSeeNews = async item => {
    const guid = item.guid;
    //console.log('see news', guid);

    try {
      // Fetch the user token from AsyncStorage
      const Token = await AsyncStorage.getItem('userToken');
      console.log('Fetched userToken:', Token);

      if (Token) {
        const response = await axios.put(
          `http://10.0.2.2:5000/api/news/${guid}`,
          {}, // Pass an empty object as the body if you don't need to send anything
          {
            headers: {
              Authorization: `Bearer ${Token}`, // Include the token in the headers
            },
          },
        );

        console.log('see data');
        setSeenNewsGuid(guid);

        try {
          const response = await axios.get(
            `http://10.0.2.2:5000/user/newsSeen`,

            {
              headers: {
                Authorization: `Bearer ${Token}`,
              },
            },
          );

          setColorBackground('green');
        } catch (error) {
          console.error('Error fetching news seen:', error);
        }
      } else {
        console.error('no user log in');
      }
    } catch (error) {
      console.error('Error ', error);
    }
  };

  const HandleLoadMore = () => {
    if (!loading) {
      console.log('Load more');
      setpage(page => page + 1);
      fetchData();
    }
  };
  const fetchData = async () => {
    console.log('fetching');

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
  }, []);

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
          <TouchableOpacity onPress={() => HandleSeeNews(item)}>
            <CardNews
              key={item._id}
              title={item.title}
              name={item.source.name}
              date={item.pubDate}
              backgroundcolorcard={
                item.guid === seenNewsGuid ? 'green' : 'gray'
              }
            />
          </TouchableOpacity>
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
              <Text style={{color: '#ffffff'}}>
                {loading ? 'loading' : 'load more'}
              </Text>
            </TouchableOpacity>
          )
        }
      />
    </View>
  );
};
export default Home;
