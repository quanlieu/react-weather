import { Fragment, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Row, Col, Divider, Skeleton, Typography } from 'antd';

import {
  searchLocationsByName,
  fetchWeatherData,
  selectLocations,
  selectWeatherData,
  selectIsFetchingWeatherData,
} from './weather-slice';
import { DebounceSelect } from '../../components/debounce-select/debounce-select'
import { WeatherDetail } from './weather-detail'

export const Weather = props => {
  const locations = useSelector(selectLocations);
  const weatherData = useSelector(selectWeatherData);
  const isFetchingWeatherData = useSelector(selectIsFetchingWeatherData);
  const dispatch = useDispatch();
  const handleSearch = useCallback(
    value => dispatch(searchLocationsByName(value)),
    [dispatch],
  );
  const handleChange = useCallback(
    location => dispatch(fetchWeatherData(location.value)),
    [dispatch],
  );

  return (
    <Fragment>
      <Row>
        <Col xs={24} sm={12} md={8} lg={6} xl={4}>
          <DebounceSelect
            placeholder="Select"
            onSearch={handleSearch}
            onChange={handleChange}
            options={locations}
            dropdownMatchSelectWidth={false}
            style={{
              width: '100%',
            }}
          />
        </Col>
      </Row>
      <Divider orientation="left" />
      <Skeleton loading={isFetchingWeatherData}>
        <Row gutter={[{ xs: 8, md: 12, xl: 16}, { xs: 8, md: 12, xl: 16}]}>
          {!weatherData.length && (
            <Col>
              <Typography.Title level={3}>
                Please select a location
              </Typography.Title>
            </Col>
          )}
          {weatherData.map(data => (
            <Col xs={12} md={8} xl={4} key={data.id}>
              <WeatherDetail {...data} />
            </Col>)
          )}
        </Row>
      </Skeleton>
    </Fragment>
  );
}
