import { render, screen } from '@testing-library/react'
import { WeatherDetail } from './weather-detail';
import dateHelpers from '../../helpers/date-helpers';

jest.mock('antd', () => ({
  Card: ({ title }) => <div>Card {title}</div>,
  Typography: {
    Title: ({ children }) => <div>{children}</div>,
  },
}))

describe('WeatherDetail component', () => {
  test('Should render today', () => {
    dateHelpers.isToday = () => true;
    dateHelpers.isTomorrow = () => false;
    const wrapper = render(<WeatherDetail date="2021-05-01" minTemp={30.9} maxTemp={35.3} />)
    expect(wrapper).toMatchSnapshot();
    expect(screen.getByText('Today')).toBeInTheDocument();
  })
  test('Should render tomorrow', () => {
    dateHelpers.isToday = () => false;
    dateHelpers.isTomorrow = () => true;
    const wrapper = render(<WeatherDetail date="2021-05-01" minTemp={30.9} maxTemp={35.3} />)
    expect(wrapper).toMatchSnapshot();
    expect(screen.getByText('Tomorrow')).toBeInTheDocument();
  })
});
