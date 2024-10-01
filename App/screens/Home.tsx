import {View} from 'react-native';
import React, {useEffect, useState} from 'react';
import CardNews from '../components/CardNews';
import axios from 'axios';
import SearchBar from '../components/SearchBar';
const Home = () => {
  const [datanews, setdata] = useState([]);
  const [searchQuery, setSearchQuery] = React.useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://10.0.2.2:5000/api/news');
        const datanewsapi = response.data.data;
        setdata(datanewsapi);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);
  const filteredNews = datanews.filter(
    newsItem =>
      newsItem.title.toLowerCase().includes(searchQuery.toLowerCase()), // Case-insensitive filter
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
    </View>
  );
};

export default Home;
