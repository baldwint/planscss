"""
Generates a webpage containing all screenshots.

Requires Jinja2 (install with `pip install jinja2`).

"""

import os
from jinja2 import Template
template = Template(open('index.html').read())

# each stylesheet has its own folder within the build directory
sheets = [fn for fn in os.listdir('screenshots')
        if os.path.isdir(os.path.join('screenshots', fn))]

# pages to show. exclude customize since that screenshot is wrong
pages = ['read', 'edit', 'search', 'styles', 'editsubmit', 'nosuchuser']

print template.render(sheets=sheets, pages=pages)
