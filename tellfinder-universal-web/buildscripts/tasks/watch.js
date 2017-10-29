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

'use strict';

const gulp = require('gulp');
const runSequence = require('run-sequence');
const paths = require('../paths');
const browserSync = require('browser-sync');

function reportChange(event) {
  console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
}

// This task will serve a development version of the application. watch for changes
// It will watch js, html, and css files and reload/refresh the deployment on file changes
gulp.task('watch', ['serve'], function() {
  gulp.watch(paths.scripts, ['build-system', browserSync.reload]).on('change', reportChange);
  gulp.watch(paths.html, ['build-html', browserSync.reload]).on('change', reportChange);
  gulp.watch(paths.sass, ['build-css', browserSync.resume]).on('change', reportChange);
});

// This task will first install any jspm dependencies and then initiate a watch development deployment
gulp.task('install-then-watch', function(callback) {
  return runSequence('symlink', 'jspm-install', 'watch', callback);
});
