# UI-Kit
    UI kit (набор элементов пользовательского интерфейса в едином стиле).
    
Также сверстано несколько страничек (небольшой сайт) для демонстрации 
использования компонентов из набора. Переход между сайтом и UI-Kit 
осуществляется с помощью ссылок под заголовком UI-kit и в левой части 
хэдера сайта. Макет адаптивен и выглядит качественно на экранах с разрешениями 
от 320px до 1920px. Верстка ориентирована на последние версии Chrome и Firefox.

Для ознакомления страница выложена на 
[GitHub Pages](https://lndbaryshnikov.github.io/UI-Kit/).

Развертывание 
-------------
```js
$ git clone https://github.com/lndbaryshnikov/UI-Kit.git
$ cd UI-Kit
$ npm install
$ npm run build
```

Сервер для разработки
-------------
```js
$ npm run server
```

Линтинг кода
-------------
```js
$ npm run lint
```

Развертывание на GitHub Pages
-------------
```js
$ npm run deploy
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
пакетов npm командой `npm install`. Все пакеты, использованные 
в данном проекте и их версии можно посмотреть в package.json.

Так же для черточек делений слайдеров использован плагин 
[jQuery-ui-Slider-Pips](https://github.com/simeydotme/jQuery-ui-Slider-Pips).
Плагин скачивается с GitHub. В проекте лежит по адресу `src/pips-float-plugin`.

UI-Kit (компонент `map`) объявляет всего одну глобальную переменную (`mapsContainer`),
которая ссылается на объект с созданными картами для удобного к ним доступа и 
изменения базовой конфигурации.
