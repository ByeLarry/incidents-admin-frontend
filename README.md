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
     ![Диаграмма прецедентов для администратора](https://github.com/user-attachments/assets/b1c4d789-bf0a-412c-888d-242d12e7d5ab)

## Ссылки

- #### Клиентская часть:  *https://github.com/ByeLarry/incidents-frontend*
- #### API-шлюз:  *https://github.com/ByeLarry/incidents-gateway*
- #### Сервис авторизации:  *https://github.com/ByeLarry/incidents-auth-service*
- #### Сервис марок (инцидентов): *https://github.com/ByeLarry/indcidents-marks-service*
- #### Сервис поиска *https://github.com/ByeLarry/incidents-search-service*
- #### Демонастрация функционала пользовательской части версии 0.1.0: *https://youtu.be/H0-Qg97rvBM*
- #### Демонастрация функционала пользовательской части версии 0.2.0: *https://youtu.be/T33RFvfTxNU*
- #### Демонастрация функционала панели администратора версии 0.1.0: *https://youtu.be/7LTnEMYuzUo*



