all: screenshots previews page

screenshots:
	phantomjs screenshots.js

previews:
	python preview.py

page:
	python templater.py > index.html

clean:
	rm -rf screenshots
	rm -rf index.html

.PHONY: screenshots previews page
