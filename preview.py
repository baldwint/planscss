"""
Writes copies of each example page, with a hard link to a stylesheet
"""

import sys
import os
import json

sheets = json.load(open('sheets.json'))

# make output directory structure if it doesn't exist
for s in sheets:
    try:
        os.makedirs(os.path.join('previews', s))
    except OSError:
        pass # already exists

interfaces = ['modern', 'centered'] # postmodern is hardcoded
pages = json.load(open('pages.json'))

def insert_placeholder(page):
    """
    Inserts a blank line at the end of the header.

    Returns lines as a list of strings, and the index
    of the blank line.

    """
    with open(os.path.join('html', page)) as fl:
        lines = fl.readlines()

    # determine where the header ends
    i = lines.index('</head>\n')
    lines.insert(i, '\n') # insert placeholder

    return lines, i

for page in pages:

    # load postmodern version
    newpage = '%s.%s.html' % (page, 'postmodern')
    newlines, ni = insert_placeholder(newpage)

    for interface in interfaces:

        # load modern or centered version
        oldpage = '%s.%s.html' % (page, interface)
        oldlines, oi = insert_placeholder(oldpage)

        for style, stylepath in sheets.iteritems():

            # insert stylesheet line to both pages
            path = os.path.join(os.pardir, os.pardir,
                                'html', stylepath[interface])
            link =     ('<link rel="stylesheet" type="text/css"'
                        ' href="{path}" />').format(path=path)

            newlines[ni] = link
            oldlines[oi] = link

            # write old file out
            out = os.path.join('previews', style,
                               '%s.%s.html' % (page, interface))
            with open(out, 'w') as fl:
                fl.writelines(oldlines)

            # write postmodern page out
            out = os.path.join('previews', style,
                               '%s.%s.html' % (page, 'post' + interface))
            with open(out, 'w') as fl:
                fl.writelines(newlines)
