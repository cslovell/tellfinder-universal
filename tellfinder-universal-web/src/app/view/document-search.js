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

import { inject } from 'aurelia-framework';
import { BindingEngine } from 'aurelia-binding';
import { DialogService } from 'aurelia-dialog';

import { PROPERTY_TAG, ThumbnailContextBuilder } from 'tellfinder-ui-core';


import {Search} from 'tellfinder-ui-core';
import {DocumentSearchService} from '../../services/document-search-service';
import { WebsocketService } from 'tellfinder-ui-core';
import $ from 'jquery';


@inject(BindingEngine, DocumentSearchService, ThumbnailContextBuilder, DialogService, WebsocketService)
export class DocumentSearch extends Search {
    query;

    constructor(bindingEngine, searchService, thumbnailContextBuilder, dialogService, websocketService, ...rest) {
        super(...rest);
        this.bindingEngine = bindingEngine;
        this.searchService = searchService;
        this.viewName = 'documentsearch';
        this.thumbnailContextBuilder = thumbnailContextBuilder;
        this.dialogService = dialogService;
        this.webSocketService = websocketService;

        // Bound things
        this.facetsContext = null;
        this.thumbnailContext = null;
        this.documentSearchVM = this;
        this.searchtype = 'documents';
        this.bindings = [];
    }
    /**
     * Call base class to execute document search, then handle the response by
     * generating a thumbnail for each document returned.
     */
    search() {
        super.search({view : this.viewStyle})
            .then((response) => {
                this.thumbnailContext = this.thumbnailContextBuilder.generateThumbnailContext(response.documents);
                this.updateSelections();
                if(!this.searchModel.selectionQuery) {
                    $('#document-scroll').scrollTop(0);
                }
            });
    }

    /**
     * A stateless mechanism to render selections, in that its entirely generated from url.
     * Only single selection is supported at this time.
     * If there is a selection query, update the selectedThumbailModel with its value, otherwise,
     * set it to null.
     *
     * The selectedThumbnailModel data binding is also used by the thumbnail details container to
     * determine where to position itself.
     */
    updateSelections() {
        if (this.searchModel.selectionQuery) {
            let selection = this.queryStringService.decodeToken(this.searchModel.selectionQuery);
            this.selectedThumbnailModel = this.thumbnailContext.find((thumb) => thumb.id === selection.value);
        } else {
            this.selectedThumbnailModel = null;
        }
    }

    thumbnailMatchesSelectionQuery(thumbnail) {
        let match = false;
        if (this.searchModel.selectionQuery) {
            let selection = this.queryStringService.decodeToken(this.searchModel.selectionQuery);
            if (thumbnail.id() === selection.value) {
                match = true;
            }
        }
        return match;
    }

    /**
     * Called when a thumbnail in the main search area is clicked.
     * If the id of the thumbnail matches the current selectionQuery (i.e. from url),
     * then this is a deselection, so the selectionQuery gets wiped out.
     * Otherwise this is a selection, so populate the selectionQuery.
     * Then trigger navigation to this view for a full refresh.
     */
    onThumbnailClick(e, thumbnail) {
        if (this.thumbnailMatchesSelectionQuery(thumbnail)) {
            this.searchModel.clearSelectionQuery();
        } else {
            let idProp = this.propertyService.getFirstPropertyByTag(PROPERTY_TAG.ID);
            this.searchModel.replaceSelectionQuery(this.queryStringService.encodeToken(idProp.key, thumbnail.id()));
        }
        this.updateSelections();
    }

    /**
     * Called when the thumbnail details panel close button in the main search area
     * is clicked. This is a deselection, so the selectionQuery gets wiped out.
     * Then trigger navigation to this view for a full refresh.
     */
    onThumbnailDetailsClose() {
        this.searchModel.clearSelectionQuery();
        this.updateSelections();
    }


    get resultsPerPage() {
        return this.configService.getConfigValue('search.pageSize');
    }
}
