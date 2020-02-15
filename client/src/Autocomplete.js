import React, { Fragment, useState, useEffect } from "react";
import { TextField, InputAdornment, IconButton } from '@material-ui/core';
import { Close as CloseIcon } from '@material-ui/icons';
import './Autocomplete.css';
import fetch from 'cross-fetch';
export default function Autocomplete(props) {
  const [suggestions, setSuggestions] = useState([]);
  const [activeSuggestion, setActiveSuggestion] = useState(0);
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [userInput, setUserInput] = useState('');
  const [error, setError] = useState(null);
  const getData = async query => {
    try {
      const apiCall = await fetch(`${process.env.REACT_APP_APIURL}/${query}`);
      if (apiCall.status >= 400) setError('Bad response from server');
      const response = await apiCall.json();
      setSuggestions(response.data);
    } catch (err) {
      setError('Bad response from server (catch)');
      console.error(err);
    }
  }
  useEffect(() => {
    console.log('API:', process.env.REACT_APP_APIURL);
    getData();
    //eslint-disable-next-line
  }, []);
  const onChangeHandler = e => {
    const userInput = e.currentTarget.value;
    setActiveSuggestion(0);
    setFilteredSuggestions(suggestions.filter(suggestion => suggestion.toLowerCase().indexOf(userInput.toLowerCase()) > -1).slice(0, 10)); // max 10 suggestions
    setShowSuggestions(true);
    setUserInput(e.currentTarget.value);
  };
  const onClickHandler = e => {
    setActiveSuggestion(0);
    setFilteredSuggestions([]);
    setShowSuggestions(false);
    setUserInput(e.currentTarget.innerText);
  };
  const onKeyDownHandler = e => {
    if (e.keyCode === 13) { // ENTER key
      setActiveSuggestion(0);
      setShowSuggestions(false);
      setUserInput(filteredSuggestions[activeSuggestion])
    } else if (e.keyCode === 38) { // UP key
      if (activeSuggestion === 0) return;
      setActiveSuggestion(activeSuggestion - 1);
    } else if (e.keyCode === 40) { // DOWN key
      if (activeSuggestion - 1 === filteredSuggestions.length) return;
      setActiveSuggestion(activeSuggestion + 1);
    }
  };
  let suggestionsListComponent;
  if (showSuggestions && userInput) {
    if (filteredSuggestions.length) {
      suggestionsListComponent = <ul className="suggestions">
        {filteredSuggestions.map((suggestion, index) => <li className={index === activeSuggestion ? 'suggestion-active' : null} key={suggestion} onClick={onClickHandler}>{suggestion}</li>)}
      </ul>;
    } else {
      suggestionsListComponent = <div className="no-suggestions"><em>No suggestions available.</em></div>;
    }
  }
  return <Fragment>
    <TextField
      label="Country"
      value={userInput}
      onChange={onChangeHandler}
      onKeyDown={onKeyDownHandler}
      margin="normal"
      variant="outlined"
      style={{ width: 300 }}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            {userInput && <IconButton
              edge="end"
              aria-label="Clear"
              onClick={() => setUserInput('')}
            >
              <CloseIcon />
            </IconButton>}
          </InputAdornment>
        ),
      }}
    />
    {suggestionsListComponent}
    {error && <div className="error">{error}</div>}
  </Fragment>
}
