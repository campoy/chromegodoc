/* Copyright 2012 The Go Authors.   All rights reserved.
 * Use of this source code is governed by a BSD-style
 * license that can be found in the LICENSE file.
 */
'use strict';

chrome.runtime.onInstalled.addListener(function() {
    chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
        chrome.declarativeContent.onPageChanged.addRules([{
            conditions: [
                new chrome.declarativeContent.PageStateMatcher({
                    pageUrl: {
                        hostEquals: 'github.com'
                    },
                }),
                new chrome.declarativeContent.PageStateMatcher({
                    pageUrl: {
                        hostEquals: 'code.google.com'
                    },
                }),
                new chrome.declarativeContent.PageStateMatcher({
                    pageUrl: {
                        hostEquals: 'launchpad.net'
                    },
                }),
                new chrome.declarativeContent.PageStateMatcher({
                    pageUrl: {
                        hostEquals: 'bitbucket.org'
                    },
                })
            ],
            actions: [new chrome.declarativeContent.ShowPageAction()]
        }]);
    });
});

chrome.pageAction.onClicked.addListener(function(tab) {
    console.log(tab);
    var a = document.createElement('a');
    a.href = tab.url;
    chrome.tabs.create({
        url: 'http://godoc.org/' + a.hostname + a.pathname,
        active: true,
        index: tab.index + 1,
    });
});
