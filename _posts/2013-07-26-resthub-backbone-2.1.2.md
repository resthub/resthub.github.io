---
layout: post
title: Backbone stack 2.1.2 released
author: bmeurant
categories: [release]
tags: [backbone]
version: Backbone stack 2.1.2
published: true
---

RESTHub Backbone stack released with a major dependency update:

For complexity reasons and some design limitations (related, in particular, to
Relational model cache management), we decided to switch (see [here](https://twitter.com/sdeleuze/status/347078498755686401)) to
[Backbone Associations 0.5.1](http://dhruvaray.github.io/backbone-associations/).

## Upgrade from 2.1.1

* Bootstrap from 2.3.1 to 2.3.2
* Handlebars from 1.0.0-rc3 to 1.0.0
* Backbone Relational to [Backbone Associations 0.5.1](http://dhruvaray.github.io/backbone-associations/)

## New features and fixes

 * [update populate model to properly handle radios input](https://github.com/resthub/resthub-backbone-stack/pull/126)
 * [Collection.fetch : url option is inconsistent in 0.9.2 and 1.0 ?](https://github.com/resthub/resthub-backbone-stack/issues/124)
 * [populateModel and Backbone.Validation](https://github.com/resthub/resthub-backbone-stack/issues/127)
 * [stopListening implementation issue](https://github.com/resthub/resthub-backbone-stack/issues/133)
 * [Backbone.Validation management](https://github.com/resthub/resthub-backbone-stack/issues/134)
 * [Unit tests for render(), context and root management](https://github.com/resthub/resthub-backbone-stack/issues/41)
 * [fix endless loop on flatten method](https://github.com/resthub/resthub-backbone-stack/pull/131)
 * [Manage a destroy event on the Views](https://github.com/resthub/resthub-backbone-stack/pull/132)
 * [_ensureContext do not handle well dynamic context](https://github.com/resthub/resthub-backbone-stack/issues/136)
 * `Merge` instead of `replace` behaviour for default render context
 * [Remove uneeded unbind + validation during save fixes](https://github.com/resthub/resthub-backbone-stack/pull/139)
 * [Fix Backbone localstorage adapter](https://github.com/resthub/resthub-backbone-stack/commit/f9ced8c8d579fd383c6d60e12f1b3d83431cc2d4)
 * [Fix war packaging configuration](https://github.com/resthub/resthub-backbone-stack/commit/e4def545d84c94693368b9d492d7b6783c532a47)
 * [Change synchronization policy of validation api](https://github.com/resthub/resthub-backbone-stack/pull/143)


