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
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import software.uncharted.tellfinder.data.model.PropertyDescriptor;
import software.uncharted.tellfinder.data.service.impl.PropertyDescriptorServiceImpl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Slf4j
@RestController
@RequestMapping("/properties")
public class PropertyController {

  @Autowired
  PropertyDescriptorServiceImpl propertyDescriptorService;

  @RequestMapping(method = RequestMethod.GET)
  public Map<String,List<PropertyDescriptor>> getProperties() {

    Map<String, List<PropertyDescriptor>> propertyTypeMap = new HashMap<>();
    propertyTypeMap.put("default", propertyDescriptorService.getDefaultDescriptors());
    propertyTypeMap.put("domain", propertyDescriptorService.getDomainDescriptors());
    propertyTypeMap.put("virtual", propertyDescriptorService.getVirtualPropertyDescriptors());

    return propertyTypeMap;
  }

}
