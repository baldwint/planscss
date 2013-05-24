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

pages = [s for s in os.listdir('html')
         if os.path.splitext(s)[1] == '.html']

for page in pages:

    with open(os.path.join('html', page)) as fl:
        lines = fl.readlines()

    # determine where the header ends
    i = lines.index('</head>\n')
    lines.insert(i, '\n') # insert placeholder

    for style in sheets:

        # insert stylesheet line
        path = os.path.join(os.pardir, os.pardir, 'html', sheets[style])
        lines[i] = ('<link rel="stylesheet" type="text/css"'
                    ' href="{path}" />').format(path=path)

        # write out to file
        out = os.path.join('previews', style, page)
        with open(out, 'w') as fl:
            fl.writelines(lines)
