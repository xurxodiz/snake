---

Summary

> [About](https://github.com/Froggies/trake#about)

> [How to Play](https://github.com/Froggies/trake#how-to-play)

> [Features](https://github.com/Froggies/trake#features)

> [Team](https://github.com/Froggies/trake#team)


---


This game was specially made for the [GitHub's Game Off 2015 : The Game Has Changed](https://github.com/blog/1972-the-game-has-changed)
![GitHub's Game Off](https://cloud.githubusercontent.com/assets/121322/6641792/41f367b0-c95d-11e4-8f32-985f41d40579.jpeg)

# About

We made a game from the most simple snake game, to the most complicated we can do in 3 weeks, in Tron style (reference to the track "The game has changed" on Tron : Legacy Soundtrack by Daft Punk https://www.youtube.com/watch?v=DmKDVvIEhBYtr).

Try it on http://ns3361665.ip-91-121-202.eu:5000

## Forked from jrgdiz/snake

As prescribed in the Game Off rules, this game is a fork of an other game found in github : A simple clone of the snake game https://github.com/jrgdiz/snake

## Technology

Back :
   * Java ?

Front :
   * Vanilla Js (100% pure Javascript)
   * HTML5 with canvas
   * CSS3 by Stylus (CSS preprocessor https://github.com/stylus/stylus)

## Installation

```bash
> git clone https://github.com/Froggies/trake.git
> cd trake
> npm install
```

## Run

```bash
> npm start
> open webbrowser on http://127.0.0.1:3000
```

## Architecture

* public/ : displayed by web browser
    * build/ : generated stuff for browser, don't forget to delete useless files some times !
    * css/ : all stylesheet needs, simple css files (with .css extension) or stylus files (with .styl extension)
    * js/ : all javascript files in ES6 (thanks to browserify and babelify plugins) format
    * images/ : you know what it is!
* shared/ : js files can be used in browser and/or in server, must be in es5 format
* server/ : all js files for the server 
* index.js : entry point of the server
* constants.js : constants to configure the server

# How to play

## Launch screen

* Chose your name and bike color
* Join a existing room (as player or viewer) or create a new one with your own rules :
   * Room name
   * Number of players
   * Infinite walls behind the bike (or not)

![Trake helps](https://github.com/Froggies/trake/blob/master/public/images/help/help.png)

## In Game

* Use keyboard arrows to control your bike (or screen arrows on mobile)
* Try to crush you opponent in your trail and try to stay alive !
* Get some bonuses... avoid the traps :
   * The batteries give you +1pts and make your wall longer (in "non-infinite wall" mode)
   * The mines kill you
   * The ice make you slip
   * The portal teleport you to the other portal

![Trake helps](https://github.com/Froggies/trake/blob/master/public/images/help/help.png)

# Features

* [x] Multiple players (with personalized name and color)
* [x] Artificial Inteligence players
* [x] Score-board
* [x] Spectator mode
* [x] Objects : batteries, mines, ice and portals
* [x] Infinite wall behind bike (Tron mode) or not (Snake mode)
* [x] Chat inside rooms
* [x] Mobile compatibility
* [ ] Finish the `perfect trace` branch to interpolate correctly trajectory of other players
* [ ] Enhance IA, creates others, encourage community to create one
* [ ] Room types / Game mode : survivor, flag, course...


# Team

From [@Froggies](https://github.com/Froggies) :

* [@undless](https://github.com/undless)
* [@manland](https://github.com/manland)
