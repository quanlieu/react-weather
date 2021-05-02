import { Card, Typography } from 'antd';
import i18n from 'i18next';
import { useTranslation } from 'react-i18next';

import dateHelpers from '../../helpers/date-helpers'

export const WeatherDetail = ({ date, minTemp, maxTemp }) => {
  const { t } = useTranslation();
  let dateString = new Intl.DateTimeFormat(i18n.language, { weekday: 'long' })
    .format(Date.parse(date));
  if (dateHelpers.isToday(date)) {
    dateString = t('today');
  }
  return (
    <Card
      title={(
        <Typography.Title level={5}>
          {dateString}
        </Typography.Title>
      )}
    >
      <p>{t('min')}: {Math.round(minTemp * 10) / 10}&deg;C</p>
      <p>{t('max')}: {Math.round(maxTemp * 10) / 10}&deg;C</p>
    </Card>
  );
};
