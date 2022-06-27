const tokens = require('./tokens.json');

//const sass = require('sass');

const fs = require('fs');

//const kebabize = str => str.replace(/[A-Z]+(?![a-z])|[A-Z]/g, ($, ofs) => (ofs ? "-" : "") + $.toLowerCase());

const maps = [];

const elements = [];

const typographies = [];

for(const [tokenKey, tokenValue] of Object.entries(tokens.global)) {
    if (tokenValue.value && typeof tokenValue.value == 'string') {
        elements.push({ 
            name: `$${tokenKey}`, 
            value: !Number.isNaN(parseInt(tokenValue.value)) ? 
                tokenValue.value + 'px' : 
                tokenValue.value, 
            type: tokenValue.type, 
            description: tokenValue.description ? 
                tokenValue.description : 
                "" 
        });
    } else if (tokenValue.type && tokenValue.type == 'typography') {
        typographies.push({ name: `${tokenKey}`, value: tokenValue.value });
    } else {
        maps.push({ name: `${tokenKey}`, values: Object.values(tokenValue)});
    }
}

let elementsString = "";

let mapsString = "";

elements.forEach(e => {
    elementsString += `${e.name}: ${e.value};\n/* ${e.description} */\n\n`;
});

// maps.forEach(e => {
//     elementsString += `${e.name}: ${e.value};\n/* ${e.description} */\n\n`;
// });

console.log(maps);

//const res = sass.compileString(elementsString);

fs.writeFileSync('result.scss', elementsString);

module.exports = {};