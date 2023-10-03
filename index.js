const fs = require('fs')
const http = require('http')

// Function to replace placeholders with object data
const replaceTemplate = (temp, city) => {
    let output = temp.replace('{%CITYNAME%}', city.cityName);
    output = output.replace('{%IMAGE%}', city.image);
    output = output.replace('{%STATE%}', city.state);
    output = output.replace('{%CITYCODES%}', city.postalCodes);
    output = output.replace('{%CITYPOPULATION%}', city.population);
    output = output.replace('{%CITYAREA%}', city.area);
    output = output.replace('{%CITYDESCRIPTION%}', city.description);

    if (!city.overpopulated) output = output.replace('{%NOT_OVERPOPULATED%}', 'not-live');

    return output;
}

const tempOverview = fs.readFileSync(`${__dirname}/templates/template-overview.html`, 'utf-8')
const tempCard = fs.readFileSync(`${__dirname}/templates/template-card.html`, 'utf-8')
const tempCity = fs.readFileSync(`${__dirname}/templates/template-city.html`, 'utf-8')
const data = fs.readFileSync(`${__dirname}/data/data.json`, 'utf-8');
const dataObj = JSON.parse(data);

const server = http.createServer((req, res) => {
    const pathName = req.url;

    // Overview page
    if (pathName === '/' || pathName === '/overview') {
        res.writeHead(200, {'Content-type': 'text/html'})

        // Looping to replace placeholders
        const cardsHtml = dataObj.map(element => replaceTemplate(tempCard, element))
        const output = tempOverview.replace('{%CITY_CARDS%}', cardsHtml)
        res.end(output)

    // City page
    } else if (pathName === '/city') {
        res.end('City')

    // API
    } else if (pathName === '/api') {
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