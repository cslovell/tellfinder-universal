/*
 * Copyright 2017 Uncharted Software Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

var gulp = require('gulp');
var runSequence = require('run-sequence');
var changed = require('gulp-changed');
var plumber = require('gulp-plumber');
var eslint = require('gulp-eslint');
var to5 = require('gulp-babel');
var sourcemaps = require('gulp-sourcemaps');
var paths = require('../paths');
var compilerOptions = require('../babel-options');
var assign = Object.assign || require('object.assign');
var notify = require('gulp-notify');
var browserSync = require('browser-sync');
var htmlmin = require('gulp-htmlmin');

var gutil = require('gulp-util');
var path = require('path');
var sass = require('gulp-sass');
var cleanCSS = require('gulp-clean-css');

// transpiles changed es6 files to SystemJS format
// the plumber() call prevents 'pipe breaking' caused
// by errors from other gulp plugins
// https://www.npmjs.com/package/gulp-plumber
gulp.task('build-system', ['lint'], function() {
  var warningReport = '';

  return gulp.src(paths.scripts, {follow: true})
    .pipe(plumber({errorHandler: notify.onError('Error: <%= error.message %>')}))
    .pipe(changed(paths.output, {extension: '.js'}))
    .pipe(sourcemaps.init({loadMaps: true}))
    .pipe(to5(assign({}, compilerOptions('systemjs'))))
    .pipe(sourcemaps.write('.', {includeContent: false, sourceRoot: '/src'}))
    .pipe(gulp.dest(paths.output));
});

// copies changed html files to the output directory
gulp.task('build-html', function() {
  return gulp.src(paths.html, {follow: true})
    .pipe(plumber({errorHandler: notify.onError('Error: <%= error.message %>')}))
    .pipe(changed(paths.output, {extension: '.html'}))
    .pipe(htmlmin({collapseWhitespace: gutil.env.minify}))
    .pipe(gulp.dest(paths.output));
});

// copies changed css files to the output directory
gulp.task('build-css', function() {
  // Tell libSass where our libraries are for easy @including
  var sassPaths = [
    "./src/tellfinder-core-ui-lib",
    "./src/fonts",
    "./src/tellfinder-core-ui-lib/uncharted-bootstrap/scss",
    "./node_modules/bootstrap-sass/assets/stylesheets"];

  var minify = !!gutil.env.minify;
  var stream = gulp.src('src/scss/main.scss', {follow: true})
    .pipe(plumber({errorHandler: notify.onError('Error: <%= error.message %>')}))
    //.pipe(changed(paths.output, {extension: '.css'}));

  if(!minify) {
    stream = stream.pipe(sourcemaps.init());
  }
  stream = stream.pipe(sass({includePaths: sassPaths}).on('error', sass.logError));

  if(minify) {
    stream = stream.pipe(cleanCSS({level: {1: {specialComments: 0}}}));
  } else {
    stream = stream.pipe(sourcemaps.write({includeContent: true, sourceRoot: '/src'}))
  }
  return stream
    .pipe(gulp.dest(paths.output))
    .pipe(browserSync.stream());
});

// this task calls the clean task (located
// in ./clean.js), then runs the build-system
// and build-html tasks in parallel
// https://www.npmjs.com/package/gulp-run-sequence
gulp.task('build', function(callback) {
  return runSequence(
    'clean',
    ['build-system', 'build-html', 'build-css'],
    callback
  );
});