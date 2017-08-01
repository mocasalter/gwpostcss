A CSS starter project from [Gravity Works](http://www.gravityworksdesign.com/).

## Getting Started

1. Install [Node.js](https://nodejs.org/en/), [Gulp.js](http://gulpjs.com/) and [Node Version Manager](https://github.com/creationix/nvm/blob/master/README.md#installation) if you don't have them already
2. Copy all the files and folders in /startercss into your project's theme folder (don't forget the .gitignore) and navigate there in command line
3. Run `nvm use`* to make sure you're running the right version of node for this project
4. Run `npm install` to download all the required node modules
5. Run `gulp` to start watching your files for changes, or `gulp thetaskname` to run a single task. See gulpfile.js for all available tasks.

\* Optional but recommended

### Folder Structure
`/source` = Source files. These are for dev use only.

`/dist` = Distribution files. These go on the server.

`/pattern-library` = See Astrum Pattern Library below

### The Gulp Tasks
The Gulp tasks are configured to

* Compile Sass into minified CSS
* Create a styleguide with [mdcss](https://github.com/jonathantneal/mdcss) (see /src/styleguide/)
* Open & auto reload the mdcss styleguide in the browser
* Minify JS
* Build an svg sprite sheet
* Build an svg symbols file
* Minify images

You can add to, remove, or modify any of these tasks. 

#### Sprites Task
If you need to change the sprite image path, see `/src/svg-sprites/sprites.css`

#### SVG Symbols
Bug with Chrome is that the svg file needs to be placed as the first thing in the body. If you don't have access to change markup on the body then you can inject it with JS.

```javascript
$.ajax({
  url: "[YOURPATHHERE]/images/svg-symbols.svg",
  context: document.body
}).done(function(data) {
  $('svg',data).attr('class','visually-hidden').prependTo('body');
});
```

## Astrum Pattern Library

1. Run the gulp task to see the library in-browser
2. Add and edit components: [Getting started with Astrum](https://github.com/NoDivide/astrum#getting-started)