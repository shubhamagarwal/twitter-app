import React, { useState, useEffect, useCallback } from "react";
import Header from './Header';
import Search from './Search';
import DropDown from './DropDown';
import Tweets from './Tweets';

const TwitterApp = () => {
  const [ userDetails, setUserDetails] = useState({})
  const [ authenticated, setAuthentication] = useState(false);
  const [ tweets, setTweets ] =  useState([]);
  const [ error, setError ] = useState(false);
  const [ searchValue, setSearchValue ] = useState('');
  const [ searchType, setSearchType ] = useState('location');
  const [ searchApplied, setSearchApplied] = useState(false);
  const [ filterTweets, setFilterTweets] = useState([])

  const handleNotAuthenticated = () => {
      setAuthentication(false);
  };

  const getSearchValue = useCallback((e) => {
    setSearchValue(e.target.value);
  },[])

  const handleDropDownChange = useCallback((e) => {
    setSearchType(e.target.value);
  },[])
  
  const handleSearchClick = () => {
    const filterTweets = tweets.filter(tweets => {
        return tweets[searchType].toLowerCase().includes(searchValue.toLowerCase())
    })
    setFilterTweets(filterTweets);
    setSearchApplied(true);
  }

  useEffect(() => {
    const fetchData = async () => {
          fetch(`/auth/login/success`, {
            method: "GET",
            credentials: "include",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              "Access-Control-Allow-Credentials": true
            }
          })
        .then(response => {
          if (response.status === 200) return response.json();
          throw new Error("failed to authenticate user");
        })
        .then(responseJson => {
          setUserDetails(responseJson.user);
          setAuthentication(true);
          setTweets(responseJson.data || []);
        })
      .catch(error => {
        setAuthentication(false);
        setError(true);
      });
    }
    fetchData();
  }, []);

  
  return(
    <div className="twitter-app">
      <Header
        authenticated={authenticated}
        handleNotAuthenticated={handleNotAuthenticated}
      />
      <div>
        {!authenticated ? (
          <h1>Welcome! </h1>
        ) : (
          <div className="search-dropdown">
            <h2>Welcome {userDetails.screenName}!</h2>
            <div className="search-options">
              <DropDown handleDropDownChange={handleDropDownChange} searchType={searchType} />
              <Search getSearchValue={getSearchValue} handleSearchClick={handleSearchClick} />
            </div>
          </div>
        )}
      </div>
      {authenticated && tweets.length ? (
        <div className="tweets-section"><Tweets tweets={!searchApplied ? tweets : filterTweets} /></div>
        ) : (
          <div className="alert-msg">
          <h3>Please login To See Tweets</h3>
        </div>
        )
      }

      {authenticated && !filterTweets.length && searchApplied ? (
        <div className="no-tweets">No Records Found, Please filter the search criteria</div>
        ) : ''
      }

      {error ? (<div className="error-msg"><h3>Failed To Authenticate</h3></div>) : ''} 
    </div>
  )
}

export default React.memo(TwitterApp);