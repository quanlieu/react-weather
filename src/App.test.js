import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from './app/store';
import App from './app';

jest.mock('./features/weather/weather', () => ({ Weather: () => <div>Weather</div> }))

test('App', () => {
  const wrapper = render(
    <Provider store={store}>
      <App />
    </Provider>
  )

  expect(wrapper).toMatchSnapshot();
  expect(screen.getByText('Weather')).toBeInTheDocument();
});
