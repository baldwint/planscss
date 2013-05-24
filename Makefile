all: screenshots previews page

screenshots:
	phantomjs screenshots.js

previews:
	python preview.py

page:
	python templater.py > screenshots/index.html

clean:
	rm -rf screenshots
