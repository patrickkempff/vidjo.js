# Vidjo

A simple (es6) library for dealing with background video's.

```js
import Vidjo from 'vidjo';

const video = new Vidjo(document.body, 'videos/example', {
    'poster': 'videos/poster.jpg',
    'autoplay': true,
    'shouldEnableVideo': () => window.matchMedia( "(min-width: 500px)" ).matches
    });

```


## Installation

To include Vidjo in your project, first install with npm.

```
$ npm install vidjo
```

### With Babel
[Babel](https://babeljs.io/) is a next generation JavaScript compiler. One of the features is the ability to use ES6/ES2015 modules now, even though browsers do not yet support this feature natively.

```js
import Vidjo from 'vidjo';

```


### Browserify/Webpack

There are several ways to use [Browserify](http://browserify.org/) and [Webpack](https://webpack.github.io/). For more information on using these tools, please refer to the corresponding project's documention. In the script, including Vidjo will usually look like this...

```js
var Vidjo = require("vidjo");

```

### AMD (Asynchronous Module Definition)

AMD is a module format built for the browser. For more information, i recommend [require.js' documentation](http://requirejs.org/docs/whyamd.html).

```js
define(["vidjo"], function($) {
 
});

```