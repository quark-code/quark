/**
@license
MIT License
Copyright (c) 2021 Paul H Mason. All rights reserved.
*/
const root = process.cwd();
const Prism = require('prismjs');
const prettify = require('html-prettify');
const marked = require("marked");
const fs = require('fs-extra');
const config = require(root + '/quark-doc.config');

const loadLanguages = require('prismjs/components/');
loadLanguages(['powershell']);

marked.setOptions({
    renderer: new marked.Renderer(),
    pedantic: false,
    gfm: true,
    breaks: false,
    sanitize: false,
    smartLists: true,
    smartypants: false,
    xhtml: false,
    highlight: (code, lang) => {
        lang = lang || 'javascript';
        return Prism.highlight(code, Prism.languages[lang], lang);
    }
});


function html(strings, ...values) {
    return strings.map((str, idx) => str + (Array.isArray(values[idx]) ? values[idx].join('\n') : values[idx] || '')).join('');
}

function md(strings, ...values) {
    return marked(html(strings, ...values));
}

function mdRaw(text) {
    const data = marked(text);
    return data;
}

function code(data, language = 'markup', options) {
    let inline = false;

    if (options) {
        inline = options.inline ? true : inline
    }

    let lineArray = Prism.highlight(data, Prism.languages[language], language).split('\n');
    let lines = lineArray.filter(line => line.length > 0);
    // let lines = lineArray.map(line => line.trim()).filter(line => line.length > 0);

    if (lines.length > 0) {
        lines[0] = (`<pre class="language-${language}" ${inline ? 'inline' : ''}><code class="language-${language}">${lines[0]}`).trim();

        if (lines.length === 1) {
            lines[0] = (`${lines[0]}</code></pre>`).trim();
        } else {
            lines[lines.length - 1] = (`${lines[lines.length - 1]}</code></pre>`).trim();
        }

        return lines.join('\n');
    }

    return '';  
}

function escape(unsafe) {
    if (!((typeof unsafe === 'string' || unsafe instanceof String))) {
        unsafe = String(unsafe);
    } 

    return unsafe ? unsafe
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;") : unsafe;
 }

function table(strings, ...values) {
    const dataArray = strings.map((str, idx) => str + (values[idx] || '')).join('').split('\n');
    const data = dataArray.map(line => line.trim()).filter(line => line.length > 0).join('\n');
    return prettify(marked(data));
}

function pageExists(page) {
    const path = `${__dirname}\\${config.srcDir}\\${page}.template.js`;
    return fs.pathExistsSync(path); 
}

function includeExists(include) {
    const path = `${__dirname}\\${config.srcDir}\\_includes\\${include}.template.js`;
    return fs.pathExistsSync(path);
}

module.exports = {
    html: html,
    md: md,
    mdRaw: mdRaw,
    code: code,
    table: table,
    escape: escape,
    pageExists: pageExists,
    includeExists: includeExists
}