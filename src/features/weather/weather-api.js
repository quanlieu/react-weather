const locationSearchApi = {
  searchLocationsByName: async ({ name }) => {
    try {
      const response = await fetch(`http://localhost:4000/location/search/?query=${name}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      const locations = await response.json();
      return locations
    } catch (error) {
      
    }
  },
}

export default locationSearchApi
