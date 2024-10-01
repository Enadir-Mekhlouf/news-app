import * as React from 'react';
import {TextInput} from 'react-native';

const SearchBar = ({searchQuery, setSearchQuery}) => {
  return (
    <TextInput
      placeholder="Search..."
      value={searchQuery}
      onChangeText={setSearchQuery}
      style={{
        height: 40,
        width: '90%', // Changed width to percentage
        marginBottom: 10,
        marginTop: 10,
        padding: 10,
        borderRadius: 10,
        backgroundColor: '#eeeeee',
      }}
    />
  );
};

export default SearchBar;
