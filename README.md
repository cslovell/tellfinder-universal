# TellFinder Universal

> A TellFinder application for general purpose domain-specific search

## Overview

TellFinder is an open-source tool for domain specific search. It provides efficient visual analytics to support 
domain experts by automatically characterizing and organizing publicly available Internet data.

This repository is a sample application built from TellFinder's open source component libraries. It uses
publicly available Reddit data as it's datasource. The client-side is built using the [Aurelia](http://aurelia.io) front-end framework, 
while the back-end is built from [Spring Boot](https://projects.spring.io/spring-boot/)

## Prerequisites
- [Java8 JDK](http://www.oracle.com/technetwork/java/javase/downloads/jdk8-downloads-2133151.html)
- [Docker + Docker Compose](https://www.docker.com/community-edition)
- [Node/NPM](https://nodejs.org/en/download/)
- A GitHub account

## Dependencies

This application is built from open source TellFinder components.  You must clone the
[tellfinder-data](https://github.com/unchartedsoftware/tellfinder) and [tellfinder-ui-core](https://github.com/unchartedsoftware/tellfinder-ui-core)
repositories in the following manner: 
```
{workspace_root}
  |
  --> tellfinder-data
  |
  --> tellfinder-ui-core
  |
  --> tellfinder-universal (this repository)
  |
  --> tellfinder-pipeline-core
```

Below is a script that will set this up:
```bash
    mkdir tellfinder
    cd tellfinder/
    git clone https://github.com/unchartedsoftware/tellfinder-universal.git
    git clone https://github.com/unchartedsoftware/tellfinder-data.git
    git clone https://github.com/unchartedsoftware/tellfinder-ui-core.git
    git clone https://github.com/unchartedsoftware/tellfinder-pipeline-core.git
```

## JSPM and Gulp

TellFinder uses [JSPM](https://jspm.io/) for web client package management and [Gulp](https://gulpjs.com/) for client build automation.  To install:
```bash
npm install -g jspm gulp
```
(Note: Some NPM configurations may require `sudo` access to install global dependencies)

A [GitHub Authorization Token](https://github.com/settings/tokens) must be created with the `public_repo` setting checked.  Copy the token to your clipboard and run:
```bash
jspm registry config github
```
to configure JSPM for installing front-end resources from GitHub.

## Generating Data

To generate data for TellFinder, follow the instructions in the [TellFinder-Pipeline-Core](https://github.com/unchartedsoftware/tellfinder-pipeline-core) project to build
an Elasticsearch index.

## Building and Running
First, launch the Docker container services (note that sudo access may be necessary for running docker/docker-compose commands).  From the `tellfinder/tellfinder-universal` directory:
```bash
cd containers/local
docker-compose up -d
cd ..
```

Next, build and launch the web server.  From the `tellfinder/tellfinder-universal` directory:
```bash
cd tellfinder-universal-server/
../gradlew build
java -jar -Dspring.profiles.active=default,universal ./build/libs/tellfinder-universal-server-6.0.4.jar
```

Finally, in a separate console window, build and run the client. From the `tellfinder/tellfinder-universal` directory: 
```bash
cd tellfinder-universal-web/
npm install && jspm install && gulp symlink
gulp watch
```

Open `localhost:3000` in your browser to access TellFinder.  Search for 'hello' to see some documents from your created index.

## Usage

Please see USAGE.md for more information on using TellFinder. 