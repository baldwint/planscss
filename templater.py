"""
Generates a webpage containing all screenshots.

Requires Jinja2 (install with `pip install jinja2`).

"""

import os
from jinja2 import Template
template = Template(open('index.html.jinja2').read())

# each stylesheet has its own folder within the build directory
import json
from collections import OrderedDict
sheets = json.load(
        open('sheets.json'),
        object_pairs_hook=OrderedDict
    ).keys()

# pages to show
pages = json.load(open('pages.json'))

print template.render(sheets=sheets, pages=pages)
