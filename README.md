From the most simple snake game, to the most complicated we can do in 3 weeks. Try it on http://ns3361665.ip-91-121-202.eu:5000

# Fork of

> https://github.com/jrgdiz/snake : A simple clone of the snake game, developed as my first attempt at using canvas and Javascript.

# Installation

```bash
> git clone https://github.com/Froggies/trake.git
> cd trake
> npm install
```

# Run

```bash
> npm start
> open webbrowser on http://127.0.0.1:3000
```

# Features

* Multiple players
* Spectator mode
* Objects : food, bomb, ice and portal
* Infinite wall (behind trake) or not (snake mode)
* Chat inside rooms

# TODO / Ideas

* Finish the `perfect trace` branch to interpolate correctly trajectory of other players
* Add multiple IA, encourage community to create one
* Mobile : touch event
* Room types : survivor, flag, course...

# Architecture

* public/ : displayed by web browser
    * build/ : generated stuff for browser, don't forget to delete useless files some times !
    * css/ : all stylesheet needs, simple css files (with .css extension) or stylus files (with .styl extension)
    * js/ : all javascript files in ES6 (thanks to browserify and babelify plugins) format
    * images/ : you know what it is!
* shared/ : js files can be used in browser and/or in server, must be in es5 format
* server/ : all js files for the server 
* index.js : entry point of the server
* constants.js : constants to configure the server

# Team

From [@Froggies](https://github.com/Froggies) :

* [@undless](https://github.com/undless)
* [@manland](https://github.com/manland)
