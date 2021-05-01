import { Card, Typography } from 'antd';

import dateHelpers from '../../helpers/date-helpers'

export const WeatherDetail = ({ date, minTemp, maxTemp }) => {
  let dateString = date
  if (dateHelpers.isToday(date)) {
    dateString = 'Today';
  }
  if (dateHelpers.isTomorrow(date)) {
    dateString = 'Tomorrow';
  }
  return (
    <Card
      title={(
        <Typography.Title level={4}>
          {dateString}
        </Typography.Title>
      )}
    >
      <p>Max: {Math.round(minTemp * 10) / 10}&deg;C</p>
      <p>Min: {Math.round(maxTemp * 10) / 10}&deg;C</p>
    </Card>
  );
};
