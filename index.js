const fs = require('fs')
const http = require('http')
const url = require('url')
const replaceTemplate = require('./modules/replaceTemplate')

const tempOverview = fs.readFileSync(`${__dirname}/templates/template-overview.html`, 'utf-8')
const tempCard = fs.readFileSync(`${__dirname}/templates/template-card.html`, 'utf-8')
const tempCity = fs.readFileSync(`${__dirname}/templates/template-city.html`, 'utf-8')

const data = fs.readFileSync(`${__dirname}/data/data.json`, 'utf-8');
const dataObj = JSON.parse(data);

const server = http.createServer((req, res) => {
    const { query, pathname } = url.parse(req.url, true);

    // Overview page
    if (pathname === '/' || pathname === '/overview') {
        res.writeHead(200, {'Content-type': 'text/html'})

        // Looping to replace placeholders
        const cardsHtml = dataObj.map(element => replaceTemplate(tempCard, element))
        const output = tempOverview.replace('{%CITY_CARDS%}', cardsHtml)
        res.end(output)

    // City page
    } else if (pathname === '/city') {
        res.writeHead(200, {'Content-type': 'text/html'});
        const city = dataObj[query.id],
            output = replaceTemplate(tempCity, city);
        res.end(output)

    // API
    } else if (pathname === '/api') {
        res.writeHead(200, {'Content-type': 'application/json'})
        res.end(data);

    // Not found
    } else {
        res.writeHead(404, {
            'Content-type': 'text/html'
        })
        res.end('<h1>Page Not Found</h1>')
    }
})

server.listen(8000, () => {
    console.log('Server is up')
})