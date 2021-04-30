import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import weathersApi from './weather-api'

const initialState = {
  locations: [],
  locationsFetchStatus: 'idle',
  locationsFetchId: 0,
};

export const searchLocationsByName = createAsyncThunk(
  'weather/fetchLocations',
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
    }
  }
);

export const locationsSlice = createSlice({
  name: 'weather',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(searchLocationsByName.pending, (state) => {
        state.locationsFetchId += 1;
        state.locationsFetchStatus = 'loading';
      })
      .addCase(searchLocationsByName.fulfilled, (state, action) => {
        state.locationsFetchStatus = 'idle';
        state.locations = action.payload || state.locations;
      });
  },
});

// Selectors
export const selectLocations = (state) => state.weather.locations;
export const selectLocationsFetchId = (state) => state.weather.locationsFetchId;

export default locationsSlice.reducer;
