import React, { useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import styles from './searchBar.module.scss';
import { Autocomplete, TextField } from '@mui/material';
import { useDispatch } from 'react-redux';
import { resetData, setWeather } from '../../features/weather/weatherSlice';

function SearchBar() {
  const [cities, setCities] = useState([]);
  const [unity, setUnity] = useState('metric');
  const [geoLocation, setGeoLocation] = useState(); // Correctly named state variable
  const dispatch = useDispatch();

  // Get geo location
  const getGeolocation = () => {
    if (hasGeolocation()) {
      navigator.geolocation.getCurrentPosition((position) => {
        setGeoLocation({
          lat: position.coords.latitude,
          lon: position.coords.longitude,
        });
      });
    }
  };

  // Check if geolocation is supported
  const hasGeolocation = () => {
    return navigator.geolocation;
  };

  useEffect(() => {
    getGeolocation();
  }, []); // Empty dependency array to only run once

  useEffect(() => {
    getData();
  }, [geoLocation]); // Correctly using geoLocation as a dependency

  const GEO_API_KEY = process.env.REACT_APP_GEO_API_KEY;
  const Weather_api_key = process.env.REACT_APP_WEATHER_API;

  const handleChange = (e) => {
    const value = e.currentTarget.value;

    fetch(`https://api.geoapify.com/v1/geocode/autocomplete?text=${value}&type=city&format=json&apiKey=${GEO_API_KEY}`)
      .then((response) => response.json())
      .then((json) => {
        setCities(
          json.results.map((data) => {
            const { lat, lon, city, country, formatted } = data;
            return { lat, lon, city, country, formatted };
          })
        );
      });
  };

  const getData = () => {
    if (geoLocation) {
      fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${geoLocation.lat}&units=${unity}&lon=${geoLocation.lon}&appid=${Weather_api_key}`)
        .then((response) => response.json())
        .then((json) => {
          const { clouds, main, name, sys, weather, wind } = json;
          dispatch(setWeather({ clouds, main, name, sys, weather, wind }));
        });
    }
  };

  const autoChangeComplete = (e, value) => {
    if (value !== null) {
      const { lon, lat } = value;
      setGeoLocation({
        lat,
        lon,
      });
    } else {
      dispatch(resetData());
    }
  };

  return (
    <>
      <Form>
        <Form.Group className={`d-flex ${styles.searchcontainer}`}>
          <Autocomplete
            renderInput={(params) => <TextField onChange={handleChange} {...params} label='Enter Your Cities' />}
            getOptionLabel={(option) => option.formatted}
            clearOnBlur={false}
            onChange={autoChangeComplete}
            className={styles.SearchInput}
            options={cities}
          />
          <Button onClick={() => getGeolocation()}>My Position</Button>
        </Form.Group>
      </Form>
    </>
  );
}

export default SearchBar;