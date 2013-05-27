all: screenshots previews page

screenshots: previews
	phantomjs screenshots.js

previews:
	python preview.py

page:
	python templater.py > index.html

clean:
	rm -rf screenshots
	rm -rf previews
	rm -rf index.html

.PHONY: screenshots previews page
