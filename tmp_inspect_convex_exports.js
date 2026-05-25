const { getFilteredPets, getRecommendedPets } = require('./convex/pets.js');
console.log('filtered', typeof getFilteredPets, Object.keys(getFilteredPets || {}));
console.log('recommended', typeof getRecommendedPets, Object.keys(getRecommendedPets || {}));
