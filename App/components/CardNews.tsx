import {View, Image, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import imagepic from '../../assets/news.png';

const CardNews = ({title, name, date, backgroundcolorcard}: any) => {
  return (
    <View
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        backgroundColor: backgroundcolorcard,
        width: '90%',
        borderRadius: 20,
        margin: 5,
      }}>
      <Image
        source={imagepic}
        style={{width: '50%', height: 120, borderRadius: 20}}
      />
      <Text style={{color: '#ffffff', padding: 10}}>{title}</Text>
      <TouchableOpacity>
        <Text
          style={{
            backgroundColor: 'white',
            color: '#050505',
            fontSize: 20,
            padding: 5,
            borderRadius: 10,
          }}>
          {name}
        </Text>
      </TouchableOpacity>
      <Text style={{padding: 10}}>{date}</Text>
    </View>
  );
};

export default CardNews;
