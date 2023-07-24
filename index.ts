const fs = require('fs'); // file system
const path = require('path'); // routes absolute

interface CountryData {
  name: string;
  population: number;
  area: number;
  density: number
}

//-------------------------------

const readData = () => {
  const countriesData: CountryData[] = [];

  try {
    const pathCountries = path.join(__dirname, 'data/countries.txt');
    const countries: string = fs.readFileSync(pathCountries, 'utf-8');

    const lines = countries.split('\n');

    for (const line of lines) {
      const parts = line.split(' ');
      const len = parts.length;
      if (len === 2) {
        throw new Error('Line too short or incorrect');
      }

      const name = parts.slice(0, len - 2).join(' ');
      const population = parseInt(parts[len - 2].replaceAll(',', ''));
      const area = parseInt(parts[len - 1].replaceAll(',', ''));
      const density = (population/area);
      
      countriesData.push({ name, population, area, density });
    }
  } catch (error: any) {
    console.error('Error reading data:', error.message);
  }
  
  return countriesData;
};

const countriesData = readData();


//--------------Ordenar
countriesData.sort((a, b) => b.density - a.density);

//---------------------
countriesData.forEach(data => {
  console.log(`${data.name}: Density = ${data.density.toFixed(2)} people/km²`);
});


const csvCountries = 'country,population,area,density\n' + countriesData.map(data => {
  return `${data.name},${data.population},${data.area},${data.density.toFixed(2)}`;
}).join('\n');


const outPathCountries = path.join(__dirname, 'data/countries.csv');
fs.writeFileSync(outPathCountries, csvCountries, 'utf-8');


