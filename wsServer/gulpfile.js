'use strict';

var gulp = require('gulp');
var wp = require('gulp-webpack');
var wpConfig = require('./webpack.config.js');

// Build

gulp.task('build', function() {
  return gulp.src('./client')
             .pipe(wp(wpConfig))
             .pipe(gulp.dest('build/'));
});

gulp.task('default', ['build']);
