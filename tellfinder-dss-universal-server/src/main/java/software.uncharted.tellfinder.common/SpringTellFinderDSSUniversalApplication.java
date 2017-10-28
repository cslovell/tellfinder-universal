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

package software.uncharted.tellfinder.common;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.scheduling.annotation.EnableAsync;
import software.uncharted.tellfinder.data.service.CacheClearService;

import javax.annotation.PostConstruct;

/**
 * Spring Boot for Domain Specific Search
 */
@SpringBootApplication
@ComponentScan({"software.uncharted.tellfinder"})
@Slf4j
@EnableAsync(proxyTargetClass=true)
@EnableCaching
@EnableAutoConfiguration
public class SpringTellFinderDSSUniversalApplication {
  @Autowired
  CacheClearService cacheClearService;

  public static void main(String[] args) {
    SpringApplication.run(software.uncharted.tellfinder.data.TellfinderDataApplication.class, args);
  }

  @PostConstruct
  public void init() {
    cacheClearService.clearDataCaches();
  }
}
