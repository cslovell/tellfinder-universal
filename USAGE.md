# Using TellFinder Universal

This document outlines the functionality provided within the TellFinder Universal application.

## Basic Searching ##

From the Documents Search Page, click the search bar and type the word 'practical' and press enter.

<center>
<img src="https://s3.amazonaws.com/support.tellfinder.com/universal/basic_1.png" width="1800"/>
</center>

The search page shows a paginated list of documents that match your search phrase.  Note that in each case, the reason 
for the match is highlighted. By default, the documents are ordered by their relevance.  The relevence score can be seen
 at the bottom of each thumbnail and is a relative score out of 5 stars.

The Facets panel on the right-hand side of the view, summarizes&mdash;for each of the key identifying attributes&mdash;the 
top values extracted from the search results. Use the facets to broadly understand the results and quickly filter or 
expand your search to pinpoint the most relevant ads.

For example, clicking on single facet under the Image Urls category will filter the result set down to the single document that uses that image.

<center>
<img src="https://s3.amazonaws.com/support.tellfinder.com/universal/filter_1.png" width="400"/>
<img src="https://s3.amazonaws.com/support.tellfinder.com/universal/filter_2.png" width="300"/>
</center>

Clear your search by click the 'X' icon to the right of the search bar and enter in the term `price:*`.  This will find 
any documents in the dataset that contain
a price extraction. Click the second result title 'Trying to figure out voltage for 3S vs. 4s for a new build.'.  It 
will bring up the details for that document.

<center>
<img src="https://s3.amazonaws.com/support.tellfinder.com/universal/details_1.png"/>
</center>

The details allow you to see all properties extracted by the pipeline for this document. Click 'Go To Original' to be 
taken to the original source of the document, which in this case, is a Reddit submission.

## Domain Customization ##

In most cases, there will be more elements on your documents than the default provided by [tellfinder-data](https://github.com/unchartedsoftware/tellfinder-data). 
Note that in the `tellfinder-universal-server/src/main/resources` directory, there is a file titled `application-reddit.yaml`.  
Here, we can specify some customizations for the data.
```
tellfinder:
  domain:
    document-properties:
    -   key: author
        es-key: feature.author
        friendly-name: Author
        group-friendly-name: Authors
        icon:
            class-name: fa fa-user
        tags: string,array,facet,linkable,case_sensitive

    -   key: score
        es-key: feature.score
        friendly-name: Score
        group-friendly-name: Score
        icon:
            class-name: fa fa-thumbs-up
        tags: array,facet,facet_log,numeric1,sortable

    -   key: subreddit
        es-key: feature.subreddit
        friendly-name: Subreddit
        group-friendly-name: Subreddits
        icon:
            class-name: fa fa-reddit
        tags: string,array,facet,case_sensitive,linkable

    -   key: edited
        es-key: feature.edited
        friendly-name: Edited
        group-friendly-name: Edited
        icon:
          class-name: fa fa-pencil
        tags: array,indicator,numeric1

    primary-document-property-groups:
    -   type: Post
        keys:
        - title
        - author
        - subreddit
```
This defines four new properties `author`,`score`,`subreddit`,and `edited`.  Note the `tags` sub-field which specifies 
how TellFinder should treat the property. 

Searching for 'bourbon' in TellFinder now shows the following:

<center>
<img src="https://s3.amazonaws.com/support.tellfinder.com/universal/reddit_1.png" width="400"/>
<img src="https://s3.amazonaws.com/support.tellfinder.com/universal/reddit_2.png" width="400" />
</center>

Note that we now have `Subreddit` and `Author` showing up on the Thumbnails, as well as a variety of new facets groups. 
Note the &#x1f517;1 in the 'bourbon' subreddit. This tells us that TellFinder has found another document that is not in 
our current search result set. TellFinder will automatically look for links for properties tagged `linkable`.  In our 
example configuration above `author` and `subreddit` are `linkable`.  Click the &#x1f517; button on that facet value to 
add the missing document to your search.

<center>
<img src="https://s3.amazonaws.com/support.tellfinder.com/universal/expand_1.png" width="200"/>
</center>

## Advanced Search

Clear your existing search and click the &#x2699; icon in the top right to open the advanced search menu. 
In the dropdown tab for the <b>ALL</b> category, selected the <b>Edited</b> indicator and click <b>Add</b>. 
This will search for all submissions in our index that have been edited.
