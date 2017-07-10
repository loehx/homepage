
# Alexander-Loehn.com [![Build Status](https://travis-ci.org/loehx/homepage.svg?branch=master)](https://travis-ci.org/loehx/homepage)

My personal homepage about me as a web developer.

## Page contents

The page contents are in a self made up structure of JSON and Markdown files. The assets get copied to the `public` folder to get accessed from outside. The url request `/en/home` searches for a `home.json` in the `data/en` folder. This file represents the model, that gets passed to the view.

All files named `settings.json` in the current or parent folder are getting included automatically in each model.

A JSON property value starting with `include:` gets resolved automatically. For instance: `"plugins": "include:../plugins.json"` becomes `"plugins": { "plugin #1": "dependence" }` or `"text": "include:./text.md"` becomes `"plugins": "##Title\nThis is a text."`.

All these files are pushed to the repository.


## Third party

* [Express.js](http://expressjs.com/)
* [Handlebars](http://handlebarsjs.com/) - Later switched to [Nunjucks](https://mozilla.github.io/nunjucks/) which is a way better in my opinion.
* [LESS](https://github.com/emberfeather/less.js-middleware) - Generated on demand. Which is great, because you don't need to compile the main less files yourself.
* [Gulp](http://gulpjs.com/) - Combined with [gulp-mocha](https://github.com/sindresorhus/gulp-mocha) for automatic unit testing.
* [bower](https://github.com/bower/bower) - To keep frontend plugins up to date. Following plugins are installed:
 * [Bootstrap 3](http://getbootstrap.com/)
 * [jQuery](https://jquery.com/)
 * [LESSHAT](https://github.com/madebysource/lesshat)
 * [Modernizr](https://modernizr.com/)
* [dependence](https://github.com/loehx/dependence) - My own plugin for managing modules in Node.js.
* [fs-extra](https://github.com/jprichardson/node-fs-extra) - To move a bunge of files very safely.
* [js-beautify](https://github.com/beautify-web/js-beautify) - To clean up the outgoing HTML.
* [markdown-it](https://github.com/markdown-it/markdown-it) - To render markdown to HTML in my paragraphs. This is the best markdown compiler I know.

## Deployment

After pushing new chages to [Github](https://github.com/), [Travis-CI](https://travis-ci.org/loehx) pulls and builds the homepage using [Gulp](http://gulpjs.com/). If the unit tests were successful, it gets published to [Heroku](https://www.heroku.com/) automatically.

Last build: https://travis-ci.org/loehx/homepage

## Browser / Device support

* **Fully supported**: IE>8, Edge, Chrome, Firefox, iPad, iPhone
* **Mostly supported**: Android smartphones and tablets
* **Not supported**: IE<9, Windows Phone, Black Berry

## Languages

* Alexander-Loehn.com (International)
* Alexander-Loehn.de (Germany)

## Features

* **#1**: Sticky navbar
* **#2**: Dynamic navigation build up
* **#3**: Scroll spy on navigation
* **#4**: Smooth scroll for Google Chrome
* **#5**: Background parallax effect
* **#6**: Page loading progress
* **#7**: Smooth scroll to section

## Copyright

Copyright (c) 2015 Alexander Löhn All Rights Reserved.
