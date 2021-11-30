# Getting Started

This is how you would set up a typical documentation site.

## Installation

Just install the npm package - no big deal.

```
npm i @quark-code/quark-doc --save-dev
```

## Setup

By default, your content source is expected to be in the `docs_src` folder in the root of your project and the output will be placed in a `docs` folder (which will be created if it doesn't exist).

If you want to use different folders or provide additional information (such as copying static files, which we'll get to later) then you need to provide a `quark-doc.config.js` file in the root of your project. You can specify the source and destination folders for your files as shown below:

```javascript
const config = {
    srcDir: 'docs_src',
    destDir: 'docs'
}

module.exports = config;
```

To build your content add a script item to the `package.json` file:

```javascript
"docs:gen": "quark-doc"
```

QuarkDoc doesn't clear out the destination in case you want to do some other processing, so you need to clear the folder first. The best way of doing this is to use `rimrf`. Just install it:

```
npm i rimraf --save-dev
```

And then add it to the script (remember to use the correct destination path):

```javascript
"docs:gen": "rimraf docs && quark-doc"
```

## Folder Structure

QuarkDoc expects the following 3 folders in the source folder:

* _data
* _includes
* _layouts

We'll get to what goes into each of those folders a bit later. The actual page content can go anywhere other than in those 3 folders. The special page template `index.template.js` in the root of the source folder is treated as the main entry point (converted to `index.html`). All other pages are converted using the following convention: "`something.template.js`" is converted to "`\something\index.html`".

## Viewing the Generated Output

That's really up to you - you can use any dev server, but I'm quite fond of `Web Dev Server`. Just install it like so:

```
npm i @web/dev-server --save-dev
```

Then add a script item to the `package.json` file to serve the pages (remember to use the correct destination path):

```javascript
"docs:serve": "wds --root-dir=docs --node-resolve --watch"
```

## Deploying the Generated Output

Just deploy the destination folder contents to your favourite web server and you're done!

## Commands

To build the pages:

```
npm run docs:gen
```

To view the pages:

```
npm run docs:serve
```