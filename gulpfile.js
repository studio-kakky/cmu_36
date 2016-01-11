var gulp = require('gulp');
var sass = require('gulp-sass');
var babel = require('gulp-babel');
var concat = require('gulp-concat');
var runSequence = require('run-sequence');
var browserSync = require('browser-sync');
var DESTDIR = 'dest/';

gulp.task('script:slideshow', function(cb) {
  return gulp.src([
    'node_modules/reveal.js/js/reveal.js',
    'node_modules/reveal.js/lib/js/head.min.js'
  ])
  .pipe(concat('libs.js'))
  .pipe(gulp.dest(DESTDIR+'js/'),cb);
});

gulp.task('script:copy_plugin_reveal', function(cb) {
  return gulp.src([
    'node_modules/reveal.js/plugin/**/*.*'
  ])
  .pipe(gulp.dest(DESTDIR+'lib/reveal/plugin/'),cb);
});

gulp.task('css:slideshow', function(cb) {
  return gulp.src([
    'node_modules/reveal.js/css/reveal.css',
    'node_modules/reveal.js/css/theme/black.css',
    'node_modules/reveal.js/lib/css/zenburn.css'
  ])
  .pipe(concat('styles.css'))
  .pipe(gulp.dest(DESTDIR+'css/'),cb);
});

gulp.task('copy:html',function(cb) {
  return gulp.src('presentation/src/**/*.html')
    .pipe(gulp.dest(DESTDIR),cb);
});

gulp.task('copy:img', function(cb) {
  return gulp.src('presentation/img/**/*.*')
    .pipe(gulp.dest(DESTDIR+'img'),cb);
});


gulp.task('browser-sync', function() {
    browserSync({
        server: {
            baseDir: 'dest/'
        }
    });
});

gulp.task('watch', function() {
  gulp.watch('presentation/src/**/*.*',['build:slideshow']);
});

gulp.task('build:slideshow',function(cb){
  runSequence(
    'script:slideshow',
    'script:copy_plugin_reveal',
    'css:slideshow',
    'copy:html',
    'copy:img',
    cb
  );
});
gulp.task('default',function() {
  runSequence(
    'build:slideshow','browser-sync','watch'
  );
});
