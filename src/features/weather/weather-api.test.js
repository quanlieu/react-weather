import weathersApi from './weather-api'
import { url } from './url'

describe('searchLocationsByName', () => {
  test('success', async () => {
    global.fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve('a list of location'),
    }));
    const result = await weathersApi.searchLocationsByName({ name: 'wil' });
    expect(fetch).toHaveBeenCalledWith(`${url.LOCATION_SEARCH_QUERY}wil`, {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'GET',
    });
    expect(result).toBe('a list of location');
  })
  test('fail', async () => {
    global.fetch = jest.fn(() => Promise.reject('Error'));
    try {
      await weathersApi.searchLocationsByName({ name: 'wil' });
    } catch (error) {
      expect(error).toBe('Error');
    }
  })
})

describe('fetchWeatherDataByWoeId', () => {
  test('success', async () => {
    global.fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve('weather data'),
    }));
    const result = await weathersApi.fetchWeatherDataByWoeId({ woeId: 'woeId' });
    expect(fetch).toHaveBeenCalledWith(`${url.LOCATION}woeId/`, {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'GET',
    });
    expect(result).toBe('weather data');
  })
  test('fail', async () => {
    global.fetch = jest.fn(() => Promise.reject('Error'));
    try {
      await weathersApi.fetchWeatherDataByWoeId({ woeId: 'woeId' });
    } catch (error) {
      expect(error).toBe('Error');
    }
  })
})
