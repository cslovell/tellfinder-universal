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
var proxyMiddleware = require('http-proxy-middleware');
var browserSync = require('browser-sync');


// this task utilizes the browsersync plugin
// to create a dev server instance
// at http://localhost:9000
gulp.task('serve', ['build'], serve);

// this task utilizes the browsersync plugin
// to create a dev server instance
// at http://localhost:9000
gulp.task('serve-bundle', ['bundle'], serve);

function serve(done) {
  browserSync({
    online: false,
    open: false,
    port: 3000,
    server: {
      baseDir: ['.'],
      middleware: [proxyMiddleware(['/api'], {
        target: 'http://localhost:8080',
        pathRewrite: {
          '^/api': ''
        }
      }),
        proxyMiddleware('/websocket', {
          target: 'http://localhost:8080',
          ws: true
        })
      ]
    }
  }, done);
}

// this task utilizes the browsersync plugin
// to create a dev server instance
// at http://localhost:9000
gulp.task('serve-export', ['export'], function(done) {
  browserSync({
    online: false,
    open: false,
    port: 3000,
    server: {
      baseDir: ['./export'],
      middleware: [proxyMiddleware(['/api'], {
        target: 'http://localhost:8080',
        pathRewrite: {
          '^/api': ''
        }
      }),
        proxyMiddleware('/websocket', {
          target: 'http://localhost:8080',
          ws: true
        })
      ]
    }
  }, done);
});