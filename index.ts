const fs = require('fs'); // file system
const path = require('path'); // routes absolute

interface CountryData {
  country: string;
  population: number;
  area: number;
  density?: number
}

//-------------------------------

const readData = () => {
  const countriesData: CountryData[] = [];

  try {
    const pathCountries = path.join(__dirname, 'data/countries.txt');
    const countries: string = fs.readFileSync(pathCountries, 'utf-8');
    const lines = countries.split('\n');

    for (const line of lines) {
      const regex = /^(.*?)\s+([\d,]*)\s+([\d,]*)$/;
      const countryDataMatches = line.match(regex);

      if (countryDataMatches) {
        const [, country, population, area] = countryDataMatches;

        countriesData.push({
          country: country.trim(),
          population: parseInt(population.replace(/,/g, '')),
          area: parseInt(area.replace(/,/g, '')),
        });
      }
    }
  } catch (error: any) {
    console.error('Error reading data:', error.message);
  }

  return countriesData;
};



const countriesData = readData();

function calculateDensity(countriesData: CountryData[]){

  return countriesData.map(countryData => ({
    country: countryData.country,
    population: countryData.population,
    area: countryData.area,
    density: countryData.population / countryData.area,
  }));
}

const densities = calculateDensity(countriesData);

//--------------Ordenar
densities.sort((a, b) => b.density - a.density);

//---------------------
densities.forEach(data => {
  console.log(`${data.country}: Density = ${data.density.toFixed(2)} people/km²`);
});


const csvCountries = 'country,population,area,density\n' + densities.map(data => {
  return `${data.country},${data.population},${data.area},${data.density.toFixed(2)}`;
}).join('\n');


const outPathCountries = path.join(__dirname, 'data/countries.csv');
fs.writeFileSync(outPathCountries, csvCountries, 'utf-8');


