Cloned from https://github.com/jrgdiz/snake : A simple clone of the snake game, developed as my first attempt at using canvas and Javascript.

# Installation

```bash
> npm install
```

# Run

```bash
> npm start
> open webbrowser on http://127.0.0.1:3000
```

# Architecture

* public/ : displayed by web browser
    * build/ : generated stuff for browser, don't forget to delete useless files some times !
    * css/ : all stylesheet needs, simple css files (with .css extension) or stylus files (with .styl extension)
    * js/ : all javascript files in ES6 (thanks to browserify and babelify plugins) format
    * images/ : you know what it is!
* index.js : entry point of the server
* constants.js : constants to configure the server