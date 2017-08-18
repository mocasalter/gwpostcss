var gulp = require('gulp'),
    gulpUtil = require('gulp-util'),
    gulpCopy = require('gulp-copy'),
    sassGlob = require('gulp-sass-glob'),
    imagemin = require('gulp-imagemin'),
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    uglify = require('gulp-uglify'),
    svgSprite = require('gulp-svg-sprite'),
    svgSymbols = require('gulp-svg-symbols'),
    cssImport = require('css-import'),
    cssmqpacker = require('css-mqpacker'),
    csswring = require('csswring'),
    pngquant = require('imagemin-pngquant'),
    del = require('del'),
    runSequence = require('run-sequence'),
    browserSync = require('browser-sync').create(),
    reload = browserSync.reload;





/*------------------------------------*\
  #OPTIONS
\*------------------------------------*/

var paths = {
    source: {
      styles: './source/css/**/*.scss',
      images: './source/images/*',
      sprites: './source/svg-sprites/*.svg',
      icons: './source/svg-icons/*.svg',
      scripts: './source/js/*.js',
      patterns: ['./pattern-library/**/*.html', './pattern-library/**/*.md', './pattern-library/data.json',],
    },
    dist: {
      styles: './dist/css',
      images: './dist/images',
      sprites: './dist/images',
      icons: './dist/images',
      scripts: './dist/js',
    }
};

var spriteConfig = {
    dest: '',
    shape: {
        spacing: {
            padding: 5
        }
    },
    mode: {
      css: {
          bust: false,
          dest: './',
          sprite: 'dist/images/sprites.svg',
          render: {
              scss: {
                  dest: './source/css/base/_sprites.scss',
                  template: './source/svg-sprites/sprites.css'
              }
          }
      }
    }
};





/*------------------------------------*\
  #ERRORS
\*------------------------------------*/

function onError(err) {
  console.log(err.toString());
  if (watching) {
    this.emit('end');
  } else {
    process.exit(1);
  }
}




/*------------------------------------*\
  #Images
\*------------------------------------*/

gulp.task('images', function(callback) {
  runSequence('clean-images', 'imagemin', callback);
});

// get rid of old images
gulp.task('clean-images', function() {
    return del([ paths.dist.images ]);
});

// minify images
gulp.task('imagemin', function () {
   return gulp.src(paths.source.images)
      .pipe(imagemin({
          progressive: true,
          svgoPlugins: [{removeViewBox: false}],
          use: [pngquant()]
      }))
      .pipe(gulp.dest(paths.dist.images));
});





/*------------------------------------*\
  #SVGS
\*------------------------------------*/

gulp.task('sprites', function() {
    return gulp.src(paths.source.sprites)
        .pipe(svgSprite(spriteConfig))
        .pipe(gulp.dest(''));
});

// build svg shapes
gulp.task('shapes', function () {
  return gulp.src(paths.source.icons)
    .pipe(svgSymbols({
        templates: ['default-svg'],
        title: '%f',
        slug: function (name) {
            return name.toLowerCase().trim().replace(/\s/g, '-');
        }
    }))
    .pipe(gulp.dest(paths.dist.images));
});





/*------------------------------------*\
  #SCRIPTS
\*------------------------------------*/

gulp.task('scripts', function() {
  return gulp.src(paths.source.scripts)
    .pipe(uglify().on('error', onError))
    .pipe(gulp.dest('./pattern-library/assets/js'))
    .pipe(gulp.dest(paths.dist.scripts));
});





/*------------------------------------*\
  #SERVER
\*------------------------------------*/

gulp.task('serve', ['styles'], function() {
    browserSync.init({
        server: './pattern-library'
    });

    gulp.watch(paths.source.styles, ['styles']).on('change', reload);
    gulp.watch(paths.source.patterns).on('change', reload);
});





/*------------------------------------*\
  #STYLES
\*------------------------------------*/

gulp.task('styles', function () {
    return gulp.src(paths.source.styles)
      .pipe(sourcemaps.init()) // Start source maps
      .pipe(sassGlob())
      .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
      .pipe(sourcemaps.write('/')) // Finish source maps
      .pipe(gulp.dest(paths.dist.styles))
      .pipe(gulp.dest('./pattern-library/assets/css'))
      .pipe(reload({ stream: true }));
});





/*------------------------------------*\
  #WATCH
\*------------------------------------*/

gulp.task('watch', function() {
    watching = true;
    gulp.watch(paths.source.styles, ['styles']);
    gulp.watch(paths.source.scripts, ['scripts']);
    gulp.watch(paths.source.icons, ['shapes']);
    gulp.watch([paths.source.images, paths.source.sprites], ['images']);
});





/*------------------------------------*\
  #DEFAULT
\*------------------------------------*/

gulp.task('default', ['serve', 'watch']);