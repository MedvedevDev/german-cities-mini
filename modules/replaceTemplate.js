// Function to replace placeholders with object data
module.exports =  (temp, city) => {
    let output = temp.replace(/{%CITYNAME%}/g, city.cityName);
    output = output.replace(/{%IMAGE%}/g, city.image);
    output = output.replace(/{%CITYAREA%}/g, city.area);
    output = output.replace(/{%STATE%}/g, city.state);
    output = output.replace(/{%CITYCODES%}/g, city.postalCodes);
    output = output.replace(/{%CITYPOPULATION%}/g, city.population);
    output = output.replace(/{%CITYDESCRIPTION%}/g, city.description);

    if (!city.overpopulated) output = output.replace(/{%NOT_OVERPOPULATED%}/g, 'not-live');

    return output;
}