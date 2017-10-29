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
var fs = require('fs-extra');
var childExec = require('child_process').exec;

var isWin = /^win/.test(process.platform);

gulp.task('symlink', function() {
  doSymlink('tellfinder-ui-core',isWin ? '..\\..\\' : '../../../');
});

function doSymlink(project, pathing) {
  if (!fs.existsSync('src/' + project)) {
    if (isWin) {
      let path = pathing ? pathing : '..\\..\\';
      childExec("mklink /J .\\src\\" + project + " " + path + project + "\\src", function(err, stdout, stderr) {
        console.log( stdout);
        if (err || stderr) {
          console.log("err", err, stderr);
        }
      });
    } else {
      let path = pathing ? pathing : '../../../';
      childExec('ln -sf ' + path + project + '/src src/' + project, function(err, stdout, stderr){
        console.log(stdout);
        if (err || stderr) {
          console.log("err", err, stderr);
        }
      });
    }
  } else {
    console.log("Symlink for " + project + " already exists");
  }
}
