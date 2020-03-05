const gulp = require('gulp');
const browserSync = require('browser-sync');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const rename = require('gulp-rename');
const htmlmin = require('gulp-htmlmin');
const imagemin = require('gulp-imagemin');
const concat = require('gulp-concat');
const webpack = require('webpack');
const gulpWebpack = require('webpack-stream');
const webpackConfig = require('./webpack.config.js');
const eslint = require('gulp-eslint');

gulp.task('server', function() {
  browserSync.init({
    server: {
      baseDir: './dist',
    },
  });
  gulp.watch('./dist/*.html').on('change', browserSync.reload);
  gulp.watch('./scss/*.css').on('change', browserSync.reload);
});

gulp.task('lint', function() {
  return gulp
    .src('src/**/*.js')
    .pipe(eslint({}))
    .pipe(eslint.format());
});

gulp.task('styles', function() {
  return gulp
    .src('./src/scss/**/*.+(scss|sass)')
    .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
    .pipe(rename({ suffix: '.min', prefix: '' }))
    .pipe(autoprefixer())
    .pipe(gulp.dest('./dist/css'))
    .pipe(browserSync.stream());
});

gulp.task('watch', function() {
  gulp.watch('./src/scss/**/*.+(scss|sass|css)', gulp.parallel('styles'));
  gulp.watch('./src/*.html').on('change', gulp.parallel('html'));
  gulp.watch('./src/js/*.js').on('change', gulp.parallel('scripts'));
});

gulp.task('html', function() {
  return gulp
    .src('./src/*.html')
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest('./dist'));
});

gulp.task('scripts', function() {
  return gulp
    .src('./src/js/*.js')
    .pipe(gulpWebpack(webpackConfig, webpack))
    .pipe(gulp.dest('./dist/js/'));
});

gulp.task('img', function() {
  return gulp
    .src('./src/img/**/*')
    .pipe(imagemin())
    .pipe(gulp.dest('./dist/img'));
});

gulp.task('allcss', function() {
  return gulp
    .src('./src/css/**/*.css')
    .pipe(concat('styles.css'))
    .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
    .pipe(rename({ suffix: '.min', prefix: '' }))
    .pipe(autoprefixer())
    .pipe(gulp.dest('./dist/css'));
});

gulp.task(
  'default',
  gulp.parallel('watch', 'server', 'styles', 'html', 'scripts', 'img', 'allcss', 'lint'),
);
