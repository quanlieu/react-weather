const weatherApi = {
  searchLocationsByName: async ({ name }) => {
    try {
      const response = await fetch(`http://localhost:4000/location/search/?query=${name}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      const locations = await response.json();
      return locations;
    } catch (error) {
      throw error;
    }
  },

  fetchWeatherDataByWoeId: async ({ woeId }) => {
    try {
      const response = await fetch(`http://localhost:4000/location/${woeId}/`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      const weatherData = await response.json();
      return weatherData;
    } catch (error) {
      throw error;
    }
  },
};

export default weatherApi;
