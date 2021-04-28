const locationSearchApi = {
  searchLocationWoeIdByName: async ({ name }) => {
    try {
      const response = await fetch(`http://localhost:4000/location/search/?query=${name}`, {
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

export default locationSearchApi
