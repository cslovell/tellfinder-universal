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

import {Aurelia, inject, LogManager, FrameworkConfiguration} from 'aurelia-framework';
import {HttpClient} from 'aurelia-fetch-client';
import {ConsoleAppender} from 'aurelia-logging-console';

import {ConfigService,PropertyService} from 'tellfinder-core-ui-lib';

import {AppUiConfig} from "./app-ui-config";

// App Specific Containers
import {PropertyFormatService, SearchStrategyService, SearchModel, SuggestionService} from 'tellfinder-core-ui-lib';

const logger = LogManager.getLogger('dss-unversal-app');


@inject(Aurelia, ConfigService, PropertyService, HttpClient, AppUiConfig)
export class App {

  constructor(aurelia, configService, propertyService, httpClient, appUiConfig)
  {
    logger.debug('Creating DSS-Universal app.');

    this.aurelia = aurelia;
    this.httpClient = httpClient;
    this.configService = configService;
    this.propertyService = propertyService;
    this.appUiConfig = appUiConfig;
  }

  activate() {
    return Promise.all([
      this.configService.loadAppConfigurtion(),
      this.propertyService.loadProperties()
    ])
      .then(() => this.configureLogging())
      .then(() => this.configure(this.aurelia));
  }

  configureLogging() {
    LogManager.addAppender(new ConsoleAppender());
    LogManager.setLevel(LogManager.logLevel.debug);
  }

  configure(aurelia) {
    let config = new FrameworkConfiguration(aurelia);
    config
      .feature('tellfinder-core-ui-lib', () => {
        config.globalResources('tellfinder-core-ui-lib/components/thumbnail-menu/thumbnail-menu');
        config.globalResources('tellfinder-core-ui-lib/components/image-gallery/image-control-menu');
        config.globalResources('tellfinder-core-ui-lib/components/thumbnail-details/thumbnail-details');
        config.globalResources('tellfinder-core-ui-lib/components/common/property-link');
        config.globalResources('tellfinder-core-ui-lib/components/common/paging-controls');
        config.globalResources('tellfinder-core-ui-lib/components/facets/facets-wrapper');
      });

    // Resolve Dependencies
    config.container.registerSingleton('PropertyFormatService', PropertyFormatService);
    config.container.registerSingleton('SearchStrategyService', SearchStrategyService);
    config.container.registerSingleton('SearchModel',SearchModel);
    config.container.registerSingleton('SuggestionService',SuggestionService);

    return config.apply();
  }

  configureRouter(config ,router) {
    logger.debug('Configuring router.');
    this.router = router;


    let excludeRoutes = [];
    this.appUiConfig.configureRouter(config, router, "*", excludeRoutes);
  }
}