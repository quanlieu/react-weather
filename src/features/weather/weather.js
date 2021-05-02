import { Fragment, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Row, Col, Divider, Skeleton, Typography, Switch,
} from 'antd';
import i18n from 'i18next';
import { useTranslation } from 'react-i18next';

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
  const { t } = useTranslation();
  const locations = useSelector(selectLocations);
  const weatherData = useSelector(selectWeatherData);
  const isFetchingWeatherData = useSelector(selectIsFetchingWeatherData);
  const dispatch = useDispatch();
  const handleSearch = useCallback(
    value => dispatch(searchLocationsByName(value)),
    [dispatch],
  );
  const handleChangeLocation = useCallback(
    location => dispatch(fetchWeatherData(location.value)),
    [dispatch],
  );
  const handleChangeLanguage = useCallback(
    checked => i18n.changeLanguage(checked ? 'en' : 'vi'),
    [],
  );

  return (
    <Fragment>
      <Row>
        <Col xs={24} sm={12} md={8} lg={6} xl={5}>
          <DebounceSelect
            placeholder={t('search')}
            onSearch={handleSearch}
            onChange={handleChangeLocation}
            options={locations}
            dropdownMatchSelectWidth={false}
            style={{
              width: '80%',
            }}
          />
          <div
            style={{
              width: '20%',
              textAlign: 'right',
              display: 'inline-block',
            }}
          >
            <Switch
              checkedChildren="En"
              unCheckedChildren="Vi"
              defaultChecked
              onChange={handleChangeLanguage}
            />
          </div>
        </Col>
      </Row>
      <Divider orientation="left" />
      <Skeleton loading={isFetchingWeatherData}>
        <Row
          gutter={[
            { xs: 8, sm: 8, md: 12, lg: 12, xl: 16},
            { xs: 8, sm: 8, md: 12, lg: 12, xl: 16},
          ]}
        >
          {!weatherData.length && (
            <Col>
              <Typography.Title level={3}>
                {t('weatherLocationSelect')}
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
