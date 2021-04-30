const weatherDetailApi = {
  getWeatherDataByWoeId: async ({ woeId }) => {
    try {
      const response = await fetch(`http://localhost:4000/location/${woeId}/`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      console.log(response)
    } catch (error) {
      
    }
  },
}

export default weatherDetailApi;
