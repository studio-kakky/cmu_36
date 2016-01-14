var gulp = require('gulp');
var sass = require('gulp-sass');
var babel = require('gulp-babel');
var concat = require('gulp-concat');
var runSequence = require('run-sequence');
var browserSync = require('browser-sync');
var del = require('del');
var DESTDIR = 'dest/';

/*
 * Slideshowのビルド
 */

// reveal.js
gulp.task('script:slideshow', function(cb) {
  return gulp.src([
    'node_modules/reveal.js/js/reveal.js',
    'node_modules/reveal.js/lib/js/head.min.js'
  ])
  .pipe(concat('libs.js'))
  .pipe(gulp.dest(DESTDIR+'js/'),cb);
});

// revealのplugin
gulp.task('script:copy_plugin_reveal', function(cb) {
  return gulp.src([
    'node_modules/reveal.js/plugin/**/*.*'
  ])
  .pipe(gulp.dest(DESTDIR+'lib/reveal/plugin/'),cb);
});

// スライドショー用cssのコンパイル
gulp.task('css:slideshow', function(cb) {
  return gulp.src([
    'node_modules/reveal.js/css/reveal.css',
    'node_modules/reveal.js/css/theme/black.css',
    'node_modules/reveal.js/lib/css/zenburn.css'
  ])
  .pipe(concat('styles.css'))
  .pipe(gulp.dest(DESTDIR+'css/'),cb);
});

// html sourceのコピー
gulp.task('copy:html',function(cb) {
  return gulp.src('presentation/src/**/*.html')
    .pipe(gulp.dest(DESTDIR),cb);
});

// 画像ファイルのコピー
gulp.task('copy:img', function(cb) {
  return gulp.src('presentation/img/**/*.*')
    .pipe(gulp.dest(DESTDIR+'img'),cb);
});

/*
 * デモのビルド
 */

// 外部ライブラリ
gulp.task('scripts:demo_lib', function(cb) {
  return gulp.src([
    'src_demo/scripts/core/**/*.js',
    'node_modules/three.js/build/three.js',
    'node_modules/liquidfun-emscripten/liquidfun.js'
  ])
  .pipe(concat('libs.js'))
  .pipe(gulp.dest(DESTDIR+'demo/js/'), cb);
});

// クラス
gulp.task('scripts:demo_classes', function(cb) {
  return gulp.src([
    'src_demo/scripts/classes/staticbox.js',
    'src_demo/scripts/classes/dynamicbox.js',
    'src_demo/scripts/classes/renderer.js',
    'src_demo/scripts/classes/liquidparticle.js'
  ])
  .pipe(babel())
  .pipe(concat('classes.js'))
  .pipe(gulp.dest(DESTDIR+'demo/js/'), cb);
});

// デモ本体
gulp.task('scripts:demo', function(cb) {
  return gulp.src([
    'src_demo/scripts/demo/**/*.js'
  ])
  .pipe(babel())
  .pipe(gulp.dest(DESTDIR+'demo/js/'), cb);
});

// css
gulp.task('css:demo', function(cb) {
  return gulp.src([
    'src_demo/sass/styles.scss'
  ])
  .pipe(sass())
  .pipe(gulp.dest(DESTDIR+'demo/css/'), cb);
});

//staticファイル
gulp.task('copy:demo_statics', function(cb) {
  return gulp.src([
    'src_demo/statics/**/*.*'
  ])
  .pipe(gulp.dest(DESTDIR+'demo/'), cb);
});

/*
 * ローカルサーバー
 */


gulp.task('browser-sync', function() {
    browserSync({
        server: {
            baseDir: 'dest/'
        }
    });
});

/*
 * そのた
 */

// watch
gulp.task('watch', function() {
  gulp.watch('presentation/src/**/*.*',['build:slideshow']);
  gulp.watch('src_demo/**/*.*',['build:demo']);
});

// clean dest
gulp.task('clean:dest', function(cb) {
  return del([DESTDIR], cb);
});

/*
 * 実行タスク
 */


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

gulp.task('build:demo', function(cb) {
  runSequence(
    'scripts:demo_lib',
    'scripts:demo_classes',
    'scripts:demo',
    'css:demo',
    'copy:demo_statics',
    cb
  );
});

gulp.task('build:all' ,function(cb) {
  runSequence(
    'clean:dest',
    'build:demo',
    'build:slideshow',
    cb
  );
});

gulp.task('default',function() {
  runSequence(
    'build:all', 'browser-sync','watch'
  );
});
