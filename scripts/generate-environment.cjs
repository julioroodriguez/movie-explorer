const fs = require('fs');
const path = require('path');

const token = process.env.TMDB_TOKEN;

if (!token) {
  console.error('TMDB_TOKEN environment variable is missing.');
  process.exit(1);
}

const content = `
export const environment = {
  production: true,
  tmdbApiUrl: 'https://api.themoviedb.org/3',
  tmdbToken: ${JSON.stringify(token)},
  tmdbImageBaseUrl: 'https://image.tmdb.org/t/p/w500'
};
`;

const outputPath = path.join(
  process.cwd(),
  'src',
  'environments',
  'environment.ts'
);

fs.writeFileSync(outputPath, content);

console.log('Production environment generated.');