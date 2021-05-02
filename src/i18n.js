import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      weatherSearch: 'Search',
      weatherLocationSelect: 'Please select a location',
      today: 'Today',
      min: 'Min',
      max: 'Max',
    },
  },
  vi: {
    translation: {
      search: 'Tìm kiếm',
      weatherLocationSelect: 'Vui lòng chọn nơi cần xem',
      today: 'Hôm nay',
      min: 'Thấp nhất',
      max: 'Cao nhất',
    },
  },
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en',
    keySeparator: false,
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
