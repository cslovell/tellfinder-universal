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

import {inject, bindable, customElement} from 'aurelia-framework';
import {EventAggregator} from 'aurelia-event-aggregator';
import {Router} from 'aurelia-router';
import { PROPERTY_TAG, ConfigService, PropertyService } from 'tellfinder-core-ui-lib';
import _ from 'lodash';


@customElement('sub-nav-bar')
@inject(ConfigService, PropertyService, Router, 'SearchModel', EventAggregator)
export class SubNavBar {
  @bindable context;
  @bindable queryLinkerObject;
  @bindable queryLinkingFn;
  @bindable numResults;
  @bindable hasData;

  constructor(configService, propertyService, router, searchModel, eventAggregator){
    this.configService = configService;
    this.propertyService = propertyService;
    this.router = router;
    this.searchModel = searchModel;
    this.eventAggregator = eventAggregator;
  }

  attached() {
    this.mouseleavesort();
  }

  dropdownSortToggle() {
    this.isSortSettingsOpen = !this.isSortSettingsOpen;
  }

  setSearchOrder(dir) {
    if (this.searchModel.order !== dir) {
      this.searchModel.order = dir;
      const url = this.router.generate(this.context.viewName, this.searchModel.state());
      this.router.navigate(url);
    }
  }

  mouseleavesort = () => {
    this.isSortSettingsOpen = false;
  };

  contextChanged() {
    this.isSortSettingsOpen = false;

    if (this.context) {
      this._createSortOptions();
      this._setActiveSort();
    }
  }

  _createSortOptions() {
    let state = this.searchModel.state();
    state.p = 1;
    delete state.sel;

    // Get a list of sortable tagged properties, as well as the default relevance.  Map then to an internal datamodel for sub-nav.
    this.primarySortProperties = [
      ...this.configService.getConfigValue('search.sort'),
      ...this.propertyService.getPropertiesByTag(PROPERTY_TAG.PRIMARY_DATE)
    ].map((sortProperty)=> {
      state.s = sortProperty.key;
      return {
        name: sortProperty.key,
        displayName: sortProperty.friendlyName,
        url: this.router.generate(this.context.viewName, state)}
    });

    this.secondarySortProperties = this.propertyService.getPropertiesByTag(PROPERTY_TAG.SORTABLE)
      .filter((secondaryProperty) => {
        return this.primarySortProperties.findIndex((primaryProperty) => secondaryProperty.key === primaryProperty.name) < 0;
      }).map((sortProperty)=> {
        state.s = sortProperty.key;
        return {
          name: sortProperty.key,
          displayName: sortProperty.friendlyName,
          url: this.router.generate(this.context.viewName, state)}
      });
    this.secondarySortProperties = _.sortBy(this.secondarySortProperties, 'displayName');
  }

  _setActiveSort() {
    this.selectedSort = this.searchModel.sort;
  }
}
