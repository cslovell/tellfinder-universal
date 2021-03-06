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

import {buildQueryString} from 'aurelia-path';
import {PropertyService, PROPERTY_TAG} from 'tellfinder-ui-core';

@inject(HttpClient, PropertyService)
export class FacetsSearchService {
    constructor(httpCient, propertyService) {
        this.http = httpCient;
        this.propertyService =  propertyService;
    }

    getFacets(query, keys, count, filters, filtersQueryFacet, expansions, selections, facetCounts) {
        let requestParams = {
            q: query,
            keys: this.propertyService.getPropertiesByTag(PROPERTY_TAG.FACET).map((facet) => facet.key ),
            f : filters,
            e : expansions,
            sel: selections,
            fq: filtersQueryFacet,
            fc: facetCounts,
            timeseries: false
        };

        this.activeRequest = JSON.stringify(requestParams);
        let url = 'api/facets?' + buildQueryString(requestParams);

        return this.http.fetch(url)
            .then((response) => {
                if(this.activeRequest === JSON.stringify(requestParams)) {
                    return response.json();
                } else {
                    return Promise.reject(response);
                }
            });

    }
}