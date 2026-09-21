// findMovie.js
// Question 4: Use Array.find to find a movie by ID

const movies = [
    { id: 1, name: "Jawan" },
    { id: 2, name: "Pathaan" },
    { id: 3, name: "Animal" },
];

// Function that uses Array.find to return the movie with matching id
function findMovieById(id) {
    return movies.find((movie) => movie.id === id);
}

// Test with id 2
const result = findMovieById(2);
console.log("Searching for movie with id 2:");
console.log(result);

// Additional tests
console.log("\nSearching for movie with id 1:");
console.log(findMovieById(1));

console.log("\nSearching for movie with id 99 (not found):");
console.log(findMovieById(99)); // undefined
