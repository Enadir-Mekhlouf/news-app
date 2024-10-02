import {Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import CardNews from '../components/CardNews';
import axios from 'axios';
import SearchBar from '../components/SearchBar';
const Home = () => {
  const [datanews, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setpage] = useState(1);
  const HandleLoadMore = () => {
    console.log('Load more');
    setpage(page => page + 1);
  };
  console.log(page);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://10.0.2.2:5000/api/news?page=${page}`,
        );
        const datanewsapi = response.data.data;
        const oldDtata = datanews;
        setData([...oldDtata, ...datanewsapi]);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, [page]);

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
      {filteredNews.length > 0 &&
        filteredNews.map(newsItem => {
          return (
            <CardNews
              key={newsItem._id}
              title={newsItem.title}
              name={newsItem.source.name}
              date={newsItem.pubDate}
            />
          );
        })}
      <TouchableOpacity
        style={{backgroundColor: 'red', padding: 10, borderRadius: 13}}
        onPress={HandleLoadMore}>
        <Text style={{color: '#ffffff'}}>Load More Next Page</Text>
      </TouchableOpacity>
    </View>
  );
};
export default Home;
