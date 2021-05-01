import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import _get from 'lodash/get'
import weathersApi from './weather-api'

export const initialState = {
  locations: [],
  locationsFetchStatus: 'idle',
  locationsFetchId: 0,
  weatherData: [],
  weatherDataFetchStatus: 'idle',
};

export const searchLocationsByName = createAsyncThunk(
  'weather/searchLocationsByName',
  async (name, thunkAPI) => {
    try {
      const state = thunkAPI.getState()
      const currentFetchId = selectLocationsFetchId(state)
      const response = await weathersApi.searchLocationsByName({ name });
      if (currentFetchId !== selectLocationsFetchId(thunkAPI.getState())) {
        // In case a request is called before another request but resolve after
        return;
      }

      return response.map(location => ({
        value: location.woeid,
        label: location.title,
      }));
    } catch (error) {
      thunkAPI.rejectWithValue('Error');
      throw error;
    }
  }
);

export const fetchWeatherData = createAsyncThunk(
  'weather/fetchWeatherData',
  async (woeId, thunkAPI) => {
    try {
      const response = await weathersApi.fetchWeatherDataByWoeId({ woeId });
      return _get(response, 'consolidated_weather', []).map(data => {
        const id = _get(data, 'id');
        const date = _get(data, 'applicable_date');
        const minTemp = _get(data, 'min_temp');
        const maxTemp = _get(data, 'max_temp');
        return {
          id, date, minTemp, maxTemp,
        }
      });
    } catch (error) {
      thunkAPI.rejectWithValue('Error');
      throw error;
    }
  }
);

export const weatherSlice = createSlice({
  name: 'weather',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(searchLocationsByName.pending, (state) => {
        state.locationsFetchId += 1;
        state.locationsFetchStatus = 'loading';
        state.locations = [];
      })
      .addCase(searchLocationsByName.fulfilled, (state, action) => {
        state.locationsFetchStatus = 'idle';
        state.locations = _get(action, 'payload', state.locations);
      })
      .addCase(fetchWeatherData.pending, (state) => {
        state.weatherDataFetchStatus = 'loading';
        state.weatherData = [];
      })
      .addCase(fetchWeatherData.fulfilled, (state, action) => {
        state.weatherDataFetchStatus = 'idle';
        state.weatherData = _get(action, 'payload');
      });
  },
});

// Selectors
export const selectLocations = (state) => state.weather.locations;
export const selectLocationsFetchId = (state) => state.weather.locationsFetchId;
export const selectWeatherData = (state) => state.weather.weatherData;
export const selectIsFetchingWeatherData = (state) => {
  const { weatherData, weatherDataFetchStatus } = state.weather;
  return weatherData.length === 0 && weatherDataFetchStatus === 'loading';
};

export default weatherSlice.reducer;
