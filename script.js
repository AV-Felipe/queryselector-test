const headerBox = document.querySelector('header');
const htwoBoxArray = document.querySelectorAll('h2');
const listElement = document.querySelector('ul');
const listItems = document.querySelectorAll('li');


document.addEventListener('DOMContentLoaded', () =>{
console.log("carreguei");

//Stylizes header
let headerBackgroundColor;
let headerForegroundColor;
let currentContrastRatio;

do{
    headerBackgroundColor = generateHexColor();
    headerForegroundColor = generateHexColor();
    currentContrastRatio = contrastLevel(headerBackgroundColor, headerForegroundColor);
}while(currentContrastRatio > 0.22222);

headerBox.style.backgroundColor = '#' + headerBackgroundColor;
headerBox.style.color = '#' + headerForegroundColor;

console.log(headerBackgroundColor);
console.log(headerForegroundColor);
console.log(currentContrastRatio);

//Stylizes h2

let hBackgroundColor;
let hForegroundColor;

do{
    hBackgroundColor = generateHexColor();
    hForegroundColor = generateHexColor();
    currentContrastRatio = contrastLevel(hBackgroundColor, hForegroundColor);
}while(currentContrastRatio > 0.22222);

htwoBoxArray.forEach( element =>{
    element.style.backgroundColor = '#' + hBackgroundColor;
    element.style.color = '#' + hForegroundColor;
}
);

//Stylizes ul

const ulBackground = generateComplementarColor(hBackgroundColor);
listElement.style.backgroundColor = '#' + ulBackground;

//Stylizes li

listItems.forEach(item => {
    item.style.backgroundColor = '#' + hForegroundColor;
    item.style.color = '#' + hBackgroundColor;
})

}
);

function generateHexColor () {
    const randomNumber = Math.floor(Math.random()*16_777_216);
    let hexNumber = randomNumber.toString(16);
    
    if (hexNumber.length < 6){
        hexNumber = "0" + hexNumber;
    }
    
    return(hexNumber);
};

function generateComplementarColor(colorA) {
    let colorB;

    colorB = `${colorA[2]}${colorA[3]}${colorA[4]}${colorA[5]}${colorA[0]}${colorA[1]}`;

    return(colorB);
    
}

function contrastLevel(colorA, colorB) {
    const rgbA = generateRgb(colorA);
    const rgbB = generateRgb(colorB);

    let contrastRatio;
    
    if (getLuminance(rgbA) > getLuminance(rgbB)){
        contrastRatio = (getLuminance(rgbB) + 0.05) / (getLuminance(rgbA) + 0.05);
    }else{
        contrastRatio = (getLuminance(rgbA) + 0.05) / (getLuminance(rgbB) + 0.05);
    };

    return(contrastRatio);
    /*
    aceptable values acordng to WCAG:
    0.14285 minimum for samall text to conform in AAA-level
    0.22222 minimum for small text to conform in AA-level or large text in AAA-level
    0.33333 minimum for large text in AA-level
    */

    function generateRgb(hexColor){
        const [...colors] = hexColor;
        const red = parseInt(`${colors[0]}${colors[1]}`, 16);
        const green = parseInt(`${colors[2]}${colors[3]}`, 16);
        const blue = parseInt(`${colors[4]}${colors[5]}`, 16);

        return([red, green, blue]);
    }

    function getLuminance(rgbArray){
        
        const luminanceArray = rgbArray.map( (element) => {
            element = element / 255;
            if (element <= 0.03928){
                return(element / 12.92);
            }else{
                return(Math.pow((element + 0.055) / 1.055, 2.4));
            }
        });

        const totalLuminance = luminanceArray[0] * 0.2126 + luminanceArray[1] * 0.7152 + luminanceArray[2] * 0.0722;

        return(totalLuminance);
    }
    
}