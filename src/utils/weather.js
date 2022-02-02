const axios = require("axios");
const { isEmpty } = require("lodash");

const map = async (location) => {
  try {
    const response = await axios({
      method: "GET",
      url: `https://api.mapbox.com/geocoding/v5/mapbox.places/${location}.json?access_token=pk.eyJ1IjoiYmVubnlib29tIiwiYSI6ImNreGEwMjFtMDA5OXkydW83NGxlNGJ5dXYifQ.9N-0GuTDuRTE3LtpILfdHw`,
    });

    if (!isEmpty(response.data?.features)) {
      // most relevant result is index [0]
      const features = response.data?.features[0] || {};
      const { center, place_name } = features;
      const latitude = center[0];
      const longitude = center[1];

      return (coordinates = {
        latitude,
        longitude,
        place: place_name,
      });
    } else {
      return { error: "Unable to find Location, try another search..." };
    }
  } catch (e) {
    return console.log("Error................", e.message);
  }
};

const weather = async (address) => {
  try {
    const response = await axios({
      method: "GET",
      url: `http://api.weatherstack.com/current?access_key=c93527b917ce2d60458844f734f02ac0&query=${address}`,
    });
    return response.data.current;
  } catch (e) {
    console.log(e);
  }
};

const sagas = {
  map,
  weather,
};

module.exports = sagas;
