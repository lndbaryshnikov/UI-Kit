# UI-Kit
    UI kit (набор элементов пользовательского интерфейса в едином стиле).
    
Также сверстано несколько страничек (небольшой сайт) для демонстрации 
использования компонентов из набора. Переход между сайтом и UI-Kit 
осуществляется с помощью ссылок под заголовком UI-kit и в левой части 
хэдера сайта. Страницы отзывчивы в небольшом диапазоне (не меньше 800px 
в ширину). Верстка ориентирована на последние версии Chrome и Firefox.

Для ознакомления страница выложена на 
[GitHub Pages](https://lndbaryshnikov.github.io/UI-Kit/).

Развертывание 
-------------
```js
$ git clone https://github.com/lndbaryshnikov/UI-Kit.git
$ npm install
$ npm run build
```

Разработка
-------------
```js
$ npm run dev
```

Сервер для разработки
-------------
```js
$ npm run server
```

Режим watch для разработки
-------------
```js
$ npm run watch
```

Линтинг кода
-------------
```js
$ npm run lint
```

Для сборки проекта использовался модульный сборщик Webpack.
Также использованы следующие препроцессоры, библиотеки и 
плагины:
* [Pug](https://github.com/pugjs/pug) для HTML
* [SCSS](https://github.com/sass/sass) для CSS
* [JQuery](https://www.npmjs.com/package/jquery)
и [JQuery UI](https://www.npmjs.com/package/jquery-ui)
* Карта реализована с помощью [Leaflet](https://www.npmjs.com/package/leaflet)

Все вышеперечисленные пакеты устанавливаются с помощью менеджера 
пакетов npm командой _"npm install"_. Все пакеты, использованные 
в данном проекте и их версии можно посмотреть в package.json.

Так же для черточек делений слайдеров использован плагин 
[jQuery-ui-Slider-Pips](https://github.com/simeydotme/jQuery-ui-Slider-Pips).
Плагин скачивается с GitHub. В проекте лежит по адресу _src/pips-float-plugin._

UI-Kit (компонент map) объявляет всего одну глобальную переменную (mapsContainer),
которая содержит карты объекты с созданными картами для удобного к ним доступа и 
изменения базовой конфигурации. 
