// PhantomJS script to generate screenshots of a stylesheet across
// several Plans pages / interfaces.
//
// usage: phantomjs screenshots.js
//
// dependency: python previews.py must be run prior to this script.

// interfaces x pages
var interfaces = ['modern', 'postmodern', 'centered'];
var pages = ['customize', 'edit', 'editsubmit', 'nosuchuser',
             'read', 'search', 'styles'];

// sheets to render
var fs = require('fs');
f = fs.open('sheets.json', "r");
console.log(JSON.parse(f.read()));
var sheets = JSON.parse(f.read());

// set up phantom
var page = require('webpage').create()
page.viewportSize = { width: 1024, height: 768 };

// construct queue of screenshots to be rendered
shots = new Array();
for (var j in pages) {
    for (var i in interfaces) {
        for (var s in sheets) {
            shots.push({
                'interf': interfaces[i],
                'page': pages[j],
                'style': s,
            });
        }
    }
}

console.log('Rendering ' + shots.length + ' screenshots');

// application loop
var lock = false;
var interval = setInterval(function() {
    if (!lock && shots.length > 0) {
        lock = true;
        var shot = shots.shift()
        var fn = shot.page + '.' + shot.interf + '.html';
        console.log('Rendering: ' + fn + ' in ' + shot.style);
        // load html file
        page.open('previews/' + shot.style + '/' + fn, function() {
            // render png
            page.render('screenshots/' + shot.style + '/' + fn + ".png");
            console.log('done.');
            lock = false;
        });
    }
    if (!lock && shots.length == 0) {
        console.log("image render complete!");
        phantom.exit();
    }
}, 250);
