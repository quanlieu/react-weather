import * as reactRedux from 'react-redux';
import i18n from 'i18next';
import { render, screen, fireEvent } from '../../test-utils'
import { Weather } from './weather';
import * as weatherSlice from './weather-slice';

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: v => v,
  }),
}))

jest.mock('antd', () => ({
  Row: ({ children }) => <div>{children}</div>,
  Col: ({ children }) => <div>{children}</div>,
  Divider: () => 'Divider',
  Skeleton: ({ children }) => <div>{children}</div>,
  Typography: {
    Title: ({ children }) => <div>{children}</div>,
  },
  Switch: ({ onChange }) => <input data-testid='switch-language' onChange={onChange} />,
}))

jest.mock('../../components/debounce-select/debounce-select', () => ({
  DebounceSelect: (props) => (
    <div>
      DebounceSelect
      <input data-testid='on-search' onChange={props.onSearch} />
      <input data-testid='on-change' onChange={props.onChange} />
    </div>
  ),
}))

jest.mock('./weather-detail', () => ({
  WeatherDetail: () => <div>WeatherDetail</div>,
}))

const initialState = {
  weather: weatherSlice.initialState,
}

const initialStateWithWeatherDetail = {
  weather: {
    ...initialState.weather,
    weatherData: [{
      id: '1', date: '2021-05-01', minTemp: 30, maxTemp: 35,
    }, {
      id: '2', date: '2021-05-02', minTemp: 30, maxTemp: 35,
    }, {
      id: '3', date: '2021-05-03', minTemp: 30, maxTemp: 35,
    }, {
      id: '4', date: '2021-05-04', minTemp: 30, maxTemp: 35,
    }, {
      id: '5', date: '2021-05-05', minTemp: 30, maxTemp: 35,
    }, {
      id: '6', date: '2021-05-06', minTemp: 30, maxTemp: 35,
    }],
  },
}
describe('Weather component', () => {
  test('Should render default', () => {
    const wrapper = render(<Weather />, { initialState })
    expect(wrapper).toMatchSnapshot();
    expect(screen.getByText('DebounceSelect')).toBeInTheDocument();
    expect(screen.queryByText('WeatherDetail')).toBe(null);
  })

  test('Should render WeatherDetail', () => {
    const wrapper = render(<Weather />, { initialState: initialStateWithWeatherDetail });
    expect(wrapper).toMatchSnapshot();
    expect(screen.getAllByText('WeatherDetail').length).toBe(6);
  })

  test('Should call searchLocationsByName', () => {
    const dispatch = jest.fn()
    reactRedux.useDispatch = jest.fn(() => dispatch)
    weatherSlice.searchLocationsByName = jest.fn(() => ({
      type: 'ACTION',
    }));
    render(<Weather />, { initialState: initialStateWithWeatherDetail });
    fireEvent.change(screen.getByTestId('on-search'), { target: { value: 'wil' } });
    expect(weatherSlice.searchLocationsByName).toHaveBeenCalled();
    expect(dispatch).toHaveBeenCalledWith({
      type: 'ACTION',
    });
  })

  test('Should call fetchWeatherData', () => {
    const dispatch = jest.fn()
    reactRedux.useDispatch = jest.fn(() => dispatch)
    weatherSlice.fetchWeatherData = jest.fn(() => ({
      type: 'ACTION',
    }));
    render(<Weather />, { initialState: initialStateWithWeatherDetail });
    fireEvent.change(screen.getByTestId('on-change'), { target: { value: 'wil' } });
    expect(weatherSlice.fetchWeatherData).toHaveBeenCalled();
    expect(dispatch).toHaveBeenCalledWith({
      type: 'ACTION',
    });
  })

  test('Should change language', () => {
    i18n.changeLanguage = jest.fn()
    render(<Weather />, { initialState: initialStateWithWeatherDetail });
    fireEvent.change(screen.getByTestId('switch-language'), { target: { value: true } });
    expect(i18n.changeLanguage).toHaveBeenCalled();
  })
});
