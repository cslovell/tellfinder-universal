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

var gutil = require('gulp-util');

module.exports = {
  "bundles": {
    "dist/app/login-app": {
      "includes": [
        "[main.js]",
        "[login/app.js]",
        "[login/app.html!text]"
      ],
      "options": {
        "inject": true,
        "minify": !!gutil.env.minify,
        "depCache": false,
        "rev": true
      }
    },
    // Contents of the app/ui-lib/etc itself
    "dist/app/tellfinder": {
      "includes": [
        // All local app files
        "[**/*.js]",
        "**/*.html!text",
        "*.css!text",
        // All our own code dependencies
        "[tellfinder-ui-core/**/*.js]",
        "[tellfinder-ui-core/**/*.html!text]",
      ],
      "excludes": [
        "[main.js]",
        "[login/app.js]",
        "[login/app.html!text]",
      ],
      "options": {
        "inject": true,
        "minify": !!gutil.env.minify,
        "depCache": false,
        "rev": true
      }
    },
    // All dependencies
    "dist/app/dependencies": {
      "includes": [
        // Grab everything including our code
        "**/*.js",
        "tellfinder-ui-core/**/*.js",
        "css",
        "text",
        // Aurelia itself
        "aurelia-framework",
        "aurelia-google-analytics",
        "aurelia-validation",
        "aurelia-validation/resources/**/*",
        "aurelia-binding",
        "aurelia-bootstrap-datepicker",
        "aurelia-bootstrapper",
        "aurelia-dialog",
        "aurelia-fetch-client",
        "aurelia-polyfills",
        "aurelia-router",
        "aurelia-resize",
        "aurelia-animator-css",
        "aurelia-templating-binding",
        "aurelia-templating-resources",
        "aurelia-templating-router",
        "aurelia-loader-default",
        "aurelia-history-browser",
        "aurelia-logging-console",
        "aurelia-logging",
        "aurelia-bootstrap-datepicker",
        "npm:bootstrap-datepicker@1.6.4",
        "github:itmcdev/aurelia-google-recaptcha@master"
      ],
      // Exclude our code itself, leaving only dependencies
      "excludes": [
        "[**/*.js]",
        "[tellfinder-ui-core/**/*.js]"
      ],
      "options": {
        "inject": true,
        "minify": !!gutil.env.minify,
        "depCache": false,
        "rev": true
      }
    }
  }
}