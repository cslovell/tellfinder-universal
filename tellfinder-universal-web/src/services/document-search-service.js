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

import {HttpClient} from 'aurelia-fetch-client';
import {inject} from 'aurelia-framework';

import {SearchService} from 'tellfinder-ui-core';
import {FacetsSearchService} from "./facets-search-service";


/**
 * Base search class service
 */
@inject(HttpClient, FacetsSearchService)
export class DocumentSearchService extends SearchService {
    constructor(http, facetsSearchService) {
        super();
        this.http = http;
        this.endpoint = 'api/documents';
        this.facetsSearchService = facetsSearchService;
    }

    getFacets(query, keys, count, filters, filtersQueryFacet, expansions, selections, facetCounts) {
        return this.facetsSearchService.getFacets(query,keys,count,filters, filtersQueryFacet, expansions, selections, facetCounts);
    }
}
