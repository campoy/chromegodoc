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
<<<<<<< HEAD
    var a = document.createElement('a');
    a.href = tab.url;
    chrome.tabs.create({
        url: 'http://godoc.org/' + godocPath(a.hostname, a.pathname),
=======
    console.log(tab);
    chrome.tabs.create({
        url: 'http://godoc.org/?q=' + encodeURIComponent(tab.url),
>>>>>>> 7eafbed376877672c4b266d6a830440594c43520
        active: true,
        index: tab.index + 1,
    });
});

var godocPath = function(host, path) {
    if (host == 'github.com') {
        var pieces = path.substr(1).split('/');
        if (pieces.length > 4 && pieces[3] == "master" && pieces[2] == "tree") {
            // if we see tree/master just ignore that part
            pieces = pieces.slice(0, 2).concat(pieces.splice(4));
        } else if (pieces.length > 4 && pieces[3] == "master" && pieces[2] == "blob") {
            // but if we find a blob, we ignore also the filename
            pieces = pieces.slice(0, 2).concat(pieces.splice(4, pieces.length - 5));
        }
        return host + '/' + pieces.join('/')
    }

    if (host == 'code.google.com') {
        return host + path.split('/').slice(0, 3).join('/');
    }

    // non github
    return host + path;
};
