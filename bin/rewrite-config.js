#!/usr/bin/env node

const cheerio = require('cheerio')
const copy = require('recursive-copy')
const fs = require('fs')
const rimraf = require('rimraf')

const DIST_DIR = process.env.DIST_DIR
const WWW_DIR = process.env.WWW_DIR
const DOOM_STATE_SERVICE_URL = process.env.DOOM_STATE_SERVICE_URL
const DOOM_ENGINE_SERVICE_URL = process.env.DOOM_ENGINE_SERVICE_URL

// - Delete existing files from public directory
// - Copy `dist` assets to public directory
// - Rewrite config meta tags on public directory `index.html`
rimraf(`${WWW_DIR}/*`, {}, function() {
    copy(`${DIST_DIR}`, `${WWW_DIR}`, {debug:true}, function(error, results) {
        if (error) {
            console.error('Copy failed: ' + error);
        } else {
            console.info('Copied ' + results.length + ' files');

            rewriteIndexHTML(`${WWW_DIR}/index.html`, {
                DOOM_STATE_SERVICE_URL: DOOM_STATE_SERVICE_URL,
                DOOM_ENGINE_SERVICE_URL: DOOM_ENGINE_SERVICE_URL
            })
        }
    });
})

/**
 * Rewrite meta tag config values in "index.html".
 * @param {string} file
 * @param {object} values
 */
function rewriteIndexHTML(file, values) {

    console.info(`Reading '${file}'`)
    fs.readFile(file, 'utf8', function (error, data) {
        if (!error) {
            const $ = cheerio.load(data)
            console.info(`Rewriting values '${values}'`)
            for (let [key, value] of Object.entries(values)) {
                console.log(key, value);
                $(`[property=${key}]`).attr("content", value);
            }

            fs.writeFile(file, $.html(), function (error) {
                if (!error) {
                    console.info(`Wrote '${file}'`)
                } else {
                    console.error(error)
                }
            });
        } else {
            console.error(error)
        }
    });
}
