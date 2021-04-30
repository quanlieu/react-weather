import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import weatherReducer from '../features/weather/weather-slice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    weather: weatherReducer,
  },
});
