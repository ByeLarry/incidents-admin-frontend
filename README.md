# Панель администратора

# Описание
Данный репозиторий содержит реализацию клиентской части панели администратора, входящей в состав проекта ***incidents***.
Администратор может выполнять базовые CRUD операции над пользовательскими данными, редактировать инциденты и категории происшествий.

Браузерная часть реализована при помощи фреймворка **Angular 18** (без SSR). Для стилизации использовался CSS фреймворк **Bootstrap** Вместо привычных стейт менеджеров использовалась технология **signals**.
Связь с сервером (API-шлюз) осуществляется по http/https и websocket.

## Установка

### Локально
```bash
# Установка зависимостей
npm install

# Запуск в dev режиме
npm run start
```

### Docker 
```bash
# Создание и запуск docker сервисов
docker-compose up -d
```

## Проектирование

_Диаграммы можно сохранять и редактировать в ***[draw.io](https://app.diagrams.net/)***_

- ### Диаграмма прецедентов
  ![Диаграмма прецедентов админа](https://github.com/user-attachments/assets/13f9c41a-d553-4770-9670-e1946771f413)
  
- ### Компоненты клиентской части администратора
  ![Компоненты клиентской части администратора](https://github.com/user-attachments/assets/03e6c051-a4ec-48d9-beb9-056562658019)

- ### Схема алгоритма защиты панели администратора
  ![Схема алгоритма защиты панели администратора](https://github.com/user-attachments/assets/c3a25dfe-0acd-48b4-ae8a-d493ef886f9f)

- ### Схема алгоритма получения данных пользователя
  ![Схема алгоритма получения данных пользователя](https://github.com/user-attachments/assets/07487116-1372-40a6-96f5-42e9fd2a2684)

- ### Схема алгоритма обновления токена доступа
  ![Схема алгоритма обновления токена доступа на клиенте](https://github.com/user-attachments/assets/b9b093ee-793c-4895-9779-0033179e5ba4)

- ### Схема алгоритма установки заголовка авторизации
  ![Схема алгоритма установки заголовка авторизации](https://github.com/user-attachments/assets/8a8cd4e7-56e6-436f-8f89-bf90fc464c86)

## Прототипы пользовательского интерфейса

_Прототипы в **Figma**: https://www.figma.com/design/iUcVGTvj4N8Cr2hVBZFmd8/Incidents-admin?node-id=0-1&t=lsKnztDDAPkKI6gb-1_

- ### Прототип страницы входа
  ![admin  Страница входа](https://github.com/user-attachments/assets/8cb7525a-a3c0-4fe7-a809-3830340bb080)

- ### Прототип страницы категорий
  ![admin  Страница категорий](https://github.com/user-attachments/assets/2f1ff500-edfd-4229-9d5c-06daa40659b2)

- ### Прототип страницы пользователей
  ![admin  Страница пользоватей](https://github.com/user-attachments/assets/f96ed12a-de11-4b3b-93ae-f786945fee64)

- ### Прототип страницы происшествий
  ![admin  Страница происшествий](https://github.com/user-attachments/assets/eb2552f7-561f-48ff-871e-e049b391f468)


## Ссылки

- #### Клиентская часть:  *https://github.com/ByeLarry/incidents-frontend*  [![incidents-frontend](https://github.com/ByeLarry/incidents-frontend/actions/workflows/incidents-frontend.yml/badge.svg)](https://github.com/ByeLarry/incidents-frontend/actions/workflows/incidents-frontend.yml)
- #### API-шлюз:  *https://github.com/ByeLarry/incidents-gateway*  [![incidents-gateway](https://github.com/ByeLarry/incidents-gateway/actions/workflows/incidents-gateway.yml/badge.svg)](https://github.com/ByeLarry/incidents-gateway/actions/workflows/incidents-gateway.yml)
- #### Сервис авторизации:  *https://github.com/ByeLarry/incidents-auth-service*  [![incidents-auth](https://github.com/ByeLarry/incidents-auth-service/actions/workflows/incidents-auth.yml/badge.svg)](https://github.com/ByeLarry/incidents-auth-service/actions/workflows/incidents-auth.yml)
- #### Сервис марок (инцидентов): *https://github.com/ByeLarry/indcidents-marks-service*  [![incidents-marks](https://github.com/ByeLarry/incidents-marks-service/actions/workflows/incidents-marks.yml/badge.svg)](https://github.com/ByeLarry/incidents-marks-service/actions/workflows/incidents-marks.yml)
- #### Сервис поиска *https://github.com/ByeLarry/incidents-search-service*  [![incidents-search](https://github.com/ByeLarry/incidents-search-service/actions/workflows/incidents-search.yml/badge.svg)](https://github.com/ByeLarry/incidents-search-service/actions/workflows/incidents-search.yml)
- #### Сервис мониторинга состояния системы: *https://github.com/ByeLarry/incidents-healthcheck*  [![incidents-healthcheck](https://github.com/ByeLarry/incidents-healthcheck/actions/workflows/incidents-healthcheck.yml/badge.svg)](https://github.com/ByeLarry/incidents-healthcheck/actions/workflows/incidents-healthcheck.yml)
- #### Демонастрация функционала пользовательской части версии 0.1.0: *https://youtu.be/H0-Qg97rvBM*
- #### Демонастрация функционала пользовательской части версии 0.2.0: *https://youtu.be/T33RFvfTxNU*
- #### Демонастрация функционала панели администратора версии 0.1.0: *https://youtu.be/7LTnEMYuzUo*



