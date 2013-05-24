all:
	phantomjs screenshots.js

page:
	python templater.py > screenshots/index.html

clean:
	rm -rf screenshots
