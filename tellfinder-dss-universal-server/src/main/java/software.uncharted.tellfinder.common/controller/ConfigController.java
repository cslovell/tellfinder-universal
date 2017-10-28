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

package software.uncharted.tellfinder.common.controller;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import software.uncharted.tellfinder.data.service.CacheClearService;
import software.uncharted.tellfinder.data.service.ElasticsearchService;
import software.uncharted.tellfinder.data.util.BaseConfig;

import java.util.List;

@Slf4j
@RestController
@RequestMapping("/config")
public class ConfigController {

  @Autowired
  protected ElasticsearchService elasticsearchService;

  @Autowired
  protected BaseConfig config;

  @Autowired
  protected CacheClearService cacheClearService;

  String activeIndex = null;

  @RequestMapping(method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
  public BaseConfig getConfig() {
    return config;
  }

  @RequestMapping(method = RequestMethod.GET, value = "/indices", produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
  public List<String> getIndices() {
    return elasticsearchService.getAliases();
  }

  @RequestMapping(method = RequestMethod.GET, value = "/indices/active", produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
  public String getActiveIndex() {

    if(activeIndex == null) {
      return null;
    }

    boolean exists = elasticsearchService.getClient().admin().indices()
            .prepareExists(activeIndex)
            .execute().actionGet().isExists();
    return (exists) ? activeIndex : null;
  }

  @RequestMapping(method = RequestMethod.PUT, value = "/indices/active/{index:.+}", produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
  public void putActiveIndex(@PathVariable("index") String index) {
    activeIndex = index;
    cacheClearService.clearDataCaches();
  }

}
