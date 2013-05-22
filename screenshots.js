// PhantomJS script to generate screenshots of a stylesheet across
// several Plans pages / interfaces.
//
// usage: phantomjs screenshots.js
//
// known bug: one of the screenshots (the one corresponding to the
// pairing of the first interface with the first page, as ordered in
// the lists defined on the next line) always appears unstyled.
// I have no idea why this is.

// interfaces x pages
var interfaces = ['modern', 'postmodern', 'centered'];
var pages = ['customize', 'edit', 'editsubmit', 'nosuchuser',
             'read', 'search', 'styles'];

// sheets
var sheets = {
    'default': 'styles/default/default.css',
    'oldstyle': 'styles/oldstyle/oldstyle.css',
    'jolly': 'styles/jolly/jolly.css',
    'blue': 'styles/blue/blue.css',
    'terminal': 'styles/terminal/terminal.css',
    'parchment': 'styles/parchment/parchment.css',
    //postmodern
    'slate': 'styles/slate.css',
    'libre': 'styles/libre.css',
}

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
                'stylepath': sheets[s],
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
        page.open('html/' + fn, function() {
            // load css file
            page.evaluate(function(filename) {
                var link = document.createElement('link');
                link.setAttribute("rel", "stylesheet");
                link.setAttribute("type", "text/css");
                link.setAttribute("href", filename);
                document.getElementsByTagName("head")[0].appendChild(link);
            }, shot.stylepath);
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
