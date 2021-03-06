/* Copyright 2012 The Go Authors.   All rights reserved.
 * Use of this source code is governed by a BSD-style
 * license that can be found in the LICENSE file.
 */
'use strict';

chrome.runtime.onInstalled.addListener(function() {
    chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
        var hosts = ['github.com', 'code.google.com', 'launchpad.net', 'bitbucket.org'];
        var conds = [];
        for (var h = 0; h < hosts.length; h++) {
            conds.push(new chrome.declarativeContent.PageStateMatcher({
                pageUrl: {
                    hostEquals: hosts[h]
                },
            }));
        }
        chrome.declarativeContent.onPageChanged.addRules([{
            conditions: conds,
            actions: [new chrome.declarativeContent.ShowPageAction()]
        }]);
    });
});

chrome.pageAction.onClicked.addListener(function(tab) {
    var a = document.createElement('a');
    a.href = tab.url;

    // remove non code part of URLs for github
    if (a.hostname == 'github.com') {
        var pieces = a.pathname.split('/');
        // empty/username/projectname/pulls|issues|tree
        if (pieces.length > 3 && pieces[3] != 'tree') {
            a.pathname = pieces.slice(0, 3).join('/');
        }
    }

    chrome.tabs.create({
        url: 'http://godoc.org/?q=' + encodeURIComponent(a.href),
        active: true,
        index: tab.index + 1,
    });
});
