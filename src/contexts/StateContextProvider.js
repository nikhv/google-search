import { type } from '@testing-library/user-event/dist/type';
import React, { createContext, useContext, useState } from 'react';

const StateContext = createContext();
const baseUrl = 'https://google-search3.p.rapidapi.com/api/v1';

export const StateContextProvider = ({ children }) => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const getResults = async (url) => {
    setLoading(true);

    const res = await fetch(`${baseUrl}${url}`, {
      method: 'GET',
      headers: {
        // 'x-rapidapi-host': 'google-search3.p.rapidapi.com',
        'x-rapidapi-key': '7d4518da34msh6575093a6f4cf13p1ca0fajsnf12a91036333',
      },
    });

    const data = await res.json();
    // if(url.includes('/news')){
    //   setResults(data.entries);
    // }else if(type.includes('/images')){
    //   setResults(data.image_results);
    // }else{
    //   setResults(data.results);
    // }
    setResults(data);
    setLoading(false);
  };

  return (
    <StateContext.Provider value={{ getResults, results, searchTerm, setSearchTerm, loading }}>
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);