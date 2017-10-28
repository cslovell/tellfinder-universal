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

// this file provides a list of unbundled files that
// need to be included when exporting the application
// for production.
module.exports = {
  'list': [
    'index.html',
    'config.js',
    'favicon.ico',
    'jspm_packages/system.js',
    'jspm_packages/system-polyfills.js',
    'jspm_packages/system-csp-production.js',
    'dist/main.css',
    'locales/**/*',
    'assets/**/*.*'
  ],
  // this section lists any jspm packages that have
  // unbundled resources that need to be exported.
  // these files are in versioned folders and thus
  // must be 'normalized' by jspm to get the proper
  // path.
  'normalize': [
    [
      // include font-awesome.css and its fonts files
      'font-awesome', [
      '/css/font-awesome.min.css',
      '/fonts/*'
    ]
    ], [
      'bluebird', [
        '/js/browser/bluebird.min.js'
      ]
    ], [
      'aurelia-bootstrap-datepicker', [
        '/aurelia-bootstrap-datepicker.css',
        '/aurelia-bootstrap-datepicker.html',
        '/aurelia-bootstrap-datepicker.js',
        '/index.js'
      ]
    ], [
      'google-recaptcha', [
        '/recaptcha.js'
      ]
    ]
  ]
};