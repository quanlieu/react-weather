import { Card, Typography } from 'antd';

import dateHelpers from '../../helpers/date-helpers'

export const WeatherDetail = ({ date, minTemp, maxTemp }) => {
  let dateString = new Intl.DateTimeFormat('en-US', { weekday: 'long' })
    .format(Date.parse(date));
  if (dateHelpers.isToday(date)) {
    dateString = 'Today';
  }
  return (
    <Card
      title={(
        <Typography.Title level={5}>
          {dateString}
        </Typography.Title>
      )}
    >
      <p>Min: {Math.round(minTemp * 10) / 10}&deg;C</p>
      <p>Max: {Math.round(maxTemp * 10) / 10}&deg;C</p>
    </Card>
  );
};
