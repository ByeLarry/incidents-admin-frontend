import { YConfig } from 'angular-yandex-maps-v3';
import { environment } from '../../environments/environment';

export const DEFAULT_PAGE_NAME = 'Incidents Admin';
export const DEFAULT_TOAST_DURATION = 3000;
export const ACCESS_TOKEN_KEY = 'access_token_admin';
export const SIDEBAR_LOCAL_STORAGE_KEY = 'sidebar';
export const RUS_PHONE_NUMBER_REGULAR = /^(?:\+7|8)\d{10}$/;
export const USERS_PAGINATION_LIMIT = 2;
export const YMAP_CONFIG: YConfig = {
  apikey: environment.ymapsApiKey,
  lang: 'ru_RU',
};
export const SEARCH_DEBOUNCE_TIME = 300;
export const DEFAULT_HTTP_TIMEOUT = 5000;