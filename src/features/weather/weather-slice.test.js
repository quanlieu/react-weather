import weatherReducer, {
  searchLocationsByName,
  fetchWeatherData,
  initialState,
} from './weather-slice';
import weathersApi from './weather-api'

describe('weatherReducer', () => {
  test('should handle initial state', () => {
    expect(weatherReducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });
  test('should handle searchLocationsByName.pending', () => {
    expect(weatherReducer(initialState, { type: 'weather/searchLocationsByName/pending' })).toEqual({
      ...initialState,
      locationsFetchId: 1,
      locationsFetchStatus: 'loading',
    });
  });
  test('should handle searchLocationsByName.fulfilled', () => {
    expect(weatherReducer(initialState, {
      type: 'weather/searchLocationsByName/fulfilled',
      payload: ['array of locations'],
    })).toEqual({
      ...initialState,
      locations: ['array of locations'],
    });
  });
  test('should handle fetchWeatherData.pending', () => {
    expect(weatherReducer(initialState, { type: 'weather/fetchWeatherData/pending' })).toEqual({
      ...initialState,
      weatherDataFetchStatus: 'loading',
    });
  });
  test('should handle fetchWeatherData.fulfilled', () => {
    expect(weatherReducer(initialState, {
      type: 'weather/fetchWeatherData/fulfilled',
      payload: ['array of weather data'],
    })).toEqual({
      ...initialState,
      weatherData: ['array of weather data'],
    });
  });
});

describe('searchLocationsByName', () => {
  let dispatch, getState;
  beforeEach(() => {
    dispatch = jest.fn();
    getState = jest.fn(() => ({
      weather: {
        locationsFetchId: 0,
      },
    }));
    weathersApi.searchLocationsByName = jest.fn(() => Promise.resolve([{
      woeid: 123, title: 'Birmingham',
    }, {
      woeid: 456, title: 'Wilmington',
    }]));
  })
  test('should call api successfully', async () => {
    const action = searchLocationsByName('wil');
    const result = await action(dispatch, getState);
    expect(weathersApi.searchLocationsByName).toHaveBeenCalledWith({ name: 'wil' });
    expect(result.payload).toEqual([{
      value: 123, label: 'Birmingham',
    }, {
      value: 456, label: 'Wilmington',
    }]);
  });
  test('should call api return nothing if currentFetchId does not match', async () => {
    const action = searchLocationsByName('wil');
    getState.mockReturnValueOnce({
      weather: {
        locationsFetchId: 0,
      },
    });
    getState.mockReturnValueOnce({
      weather: {
        locationsFetchId: 1,
      },
    });
    const result = await action(dispatch, getState);
    expect(result.payload).toBe(undefined);
  });
  test('should call api failingly', async () => {
    weathersApi.searchLocationsByName = jest.fn(() => Promise.reject(Error('error')));
    const action = searchLocationsByName('wil');
    const result = await action(dispatch, getState);
    expect(result.error).toBeDefined();
  });
})

describe('fetchWeatherData', () => {
  let dispatch;
  beforeEach(() => {
    dispatch = jest.fn();
  })
  test('should call api successfully', async () => {
    weathersApi.fetchWeatherDataByWoeId = jest.fn(() => Promise.resolve({
      consolidated_weather: [
        { id: 1, applicable_date: '2021-04-01', min_temp: 30, max_temp: 35 },
        { id: 2, applicable_date: '2021-04-02', min_temp: 30, max_temp: 35 },
        { id: 3, applicable_date: '2021-04-03', min_temp: 30, max_temp: 35 },
        { id: 4, applicable_date: '2021-04-04', min_temp: 30, max_temp: 35 },
        { id: 5, applicable_date: '2021-04-05', min_temp: 30, max_temp: 35 },
        { id: 6, applicable_date: '2021-04-06', min_temp: 30, max_temp: 35 },
      ],
    }));

    const action = fetchWeatherData('id');
    const result = await action(dispatch);
    expect(weathersApi.fetchWeatherDataByWoeId).toHaveBeenCalledWith({ woeId: 'id' });
    expect(result.payload).toEqual([
      { id: 1, date: '2021-04-01', minTemp: 30, maxTemp: 35 },
      { id: 2, date: '2021-04-02', minTemp: 30, maxTemp: 35 },
      { id: 3, date: '2021-04-03', minTemp: 30, maxTemp: 35 },
      { id: 4, date: '2021-04-04', minTemp: 30, maxTemp: 35 },
      { id: 5, date: '2021-04-05', minTemp: 30, maxTemp: 35 },
      { id: 6, date: '2021-04-06', minTemp: 30, maxTemp: 35 },
    ]);
  });

  test('should call api failingly', async () => {
    weathersApi.fetchWeatherDataByWoeId = jest.fn(() => Promise.reject(Error('error')));
    const action = fetchWeatherData('id');
    const result = await action(dispatch);
    expect(result.error).toBeDefined();
  });
})