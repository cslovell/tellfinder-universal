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

import 'tokenfield/dist/css/bootstrap-tokenfield.min.css!';
import 'font-awesome/css/font-awesome.min.css!';

import 'fetch';
import {HttpClient} from 'aurelia-fetch-client';


function configureHttpClient(httpClient){
  httpClient.configure((config) => {
    config
      .withBaseUrl('api/');
  });
}

export function configure(aurelia) {
  let httpClient = aurelia.container.get(HttpClient);

  configureHttpClient(httpClient);

  aurelia.use
      .standardConfiguration();

  aurelia.use
    .defaultResources()
    .history()
    .router()
    .eventAggregator()
    .plugin('aurelia-resize')
    .plugin('aurelia-validation')
    .plugin('aurelia-animator-css')
    .plugin('aurelia-bootstrap-datepicker')
    .plugin('aurelia-dialog', (config) => {
      config.useDefaults();
      config.settings.lock = false;
      config.settings.centerHorizontalOnly = false;
      config.settings.startingZIndex = 1080;
    });

    aurelia.start().then(() => aurelia.setRoot());
}
