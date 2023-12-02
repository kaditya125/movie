const faker = require('faker');

const generateDummyMovieData = (count) => {
    const dummyData = [];

    for (let i = 0; i < count; i++) {
        const movie = {
            name: faker.random.words(),
            imdb: faker.random.float({ min: 1, max: 10, precision: 0.1 }),
            date: faker.date.past(10).getFullYear().toString(),
            sposter: faker.image.image(),
            bposter: faker.image.image(),
            genre: faker.random.word(),
            type: faker.random.arrayElement(['movie', 'series']),
            url: `${faker.lorem.slug()}.html`,
            trailer: `${faker.lorem.slug()} trailer.mp4`,
            low: `video/${faker.lorem.slug()} 480ph.mp4`,
            medium: `video/${faker.lorem.slug()} 720ph.mp4`,
            high: `video/${faker.lorem.slug()} 1080ph.mp4`
        };

        dummyData.push(movie);
    }

    return dummyData;
};

const dummyData = generateDummyMovieData(200);
console.log(JSON.stringify(dummyData, null, 2));
