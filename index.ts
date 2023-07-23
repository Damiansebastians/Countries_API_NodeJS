const fs = require('fs'); // file system
const path = require('path'); // routes absolute

interface CountryData {
  country: string;
  population: number;
  area: number;
}

//-------------------------------

const readData = () => {
  try {
    const pathCountries = path.join(__dirname, 'src/countries.txt');
    const countries: string = fs.readFileSync(pathCountries, 'utf-8');
    const lines = countries.split('\n');
    const countriesData: CountryData[] = [];

    for (const line of lines) {
      const [country, population, area] = line.split(' ');
        countriesData.push({
          country: country.trim(),
          population: parseInt(population),
          area: parseInt(area),
      });
    }
    return countriesData;

  } catch (e) {
    if (typeof e === 'string') {
      e.toUpperCase()
    } else if (e instanceof Error) {
      e.message
    }
    return [];
  };
}

const countriesData = readData();

function calculateDensity(countriesData: CountryData[]){

  return countriesData.map(countryData => ({
    country: countryData.country,
    density: countryData.population / countryData.area,
  }));
}

const densities = calculateDensity(countriesData);

//---------------------
densities.forEach(data => {
  console.log(`${data.country}: Density = ${data.density.toFixed(2)} people/km²`);
});


