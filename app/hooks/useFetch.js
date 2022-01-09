import { useState } from 'react';

export const useFetch = () => {
  const [userData, setUserData] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const getUserData = async () => {
    const response = await fetch(
      `https://randomuser.me/api?page=${pageNumber}`
    );
    const data = await response.json();
    const newResults = [...userData, ...data.results];
    setUserData(newResults);
    setPageNumber(data.info.page + 1);
  };
  return { userData, getUserData };
};
