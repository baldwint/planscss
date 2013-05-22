Plans stylesheet preview tool
=============================

This repo contains all the standard GrinnellPlans stylesheets, and a
tool to quickly compare their behavior across interfaces.

Quickstart
----------

1. Install PhantomJS. ``brew install phantomjs`` did it for me on a Mac.
2. In this directory, run ``phantomjs screenshots.js`` (or ``make``).
3. Screenshots are created in the ``screenshots`` subfolder, grouped
   by stylesheet.

Your Mission
------------

Should you choose to accept it, your mission is to descend into
``html/styles`` and edit the older stylesheets (``default``,
``oldstyle``, ``jolly``, ``blue``, ``terminal``, ``parchment``)
such that the ``postmodern`` interface resembles the ``modern``
interface, without changing the original appearance under ``modern``.

Here's my workflow:

 1. Do the quickstart.
 2. Descend into the screenshot folder of the sheet I will work on.
 3. Bulk change the filename extension::

     for file in *.modern.html.png ; do mv $file `echo $file | sed 's/\(.*\.\)png/\1orig.png/'` ; done

 4. In ``screenshots.js``, comment out the sheets I'm not working on,
    and run ``make`` again.
 5. Open an image comparison program (like Kaleidoscope) to keep tabs
    on the difference between
    ``foo.modern.html.orig.png``, 
    ``foo.modern.html.png``, and
    ``foo.postmodern.html.png``, 
    while I edit the css file and habitually invoke ``make``.


