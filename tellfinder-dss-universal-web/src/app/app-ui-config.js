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

import {inject} from 'aurelia-framework';
import { ConfigService } from 'tellfinder-core-ui-lib';

const AVAILABLE_ROUTES = [
  { route: '', redirect: 'documents' },
  { route: 'search', name: 'search', redirect: 'documents' },
  {
    route:      'documents',
    name:       'documentsearch',
    moduleId:   './view/document-search',
    title:      'Documents',
    nav:        true
  }
];

@inject(ConfigService)
export class AppUiConfig {
    constructor(configService) {
        this.configService = configService;
    }

    configureRouter(config, router) {
      AVAILABLE_ROUTES.forEach((route) => {
        router.addRoute(Object.assign({}, route))
      });
    }
}
