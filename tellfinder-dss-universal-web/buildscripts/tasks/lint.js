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
var paths = require('../paths');

var changed = require('gulp-changed');
var eslint = require('gulp-eslint');
var notifier   = require('node-notifier');

// runs eslint on all .js files
gulp.task('lint', function() {
  var warningReport = '';

  return gulp.src([paths.scripts], {follow: true})
    .pipe(changed(paths.output, {extension: '.js'}))
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.result(function(result) {
      var generateMessage = function() {
        var resultMsg = result.filePath + ':\n';
        result.messages.forEach(function(msg) {
          resultMsg += '\t' + msg.message + '\n';
        });
        resultMsg += '\n';
        return resultMsg;
      };

      if (result.errorCount > 0) {
        notifier.notify({
          title : 'ES Lint Error',
          message : generateMessage(result)
        });
      }

      if (result.warningCount > 0) {
        warningReport += generateMessage(result);
      }
    }))
    .pipe(eslint.results(function() {
      if (warningReport !== '') {
        notifier.notify({
          title : 'ES Lint Warnings',
          message : warningReport
        });
      }
    }));
});