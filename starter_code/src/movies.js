/* eslint no-restricted-globals: 'off' */
// Turn duration of the movies from hours to minutes 

function turnHoursToMinutes(movies) {
    let dataReturn = movies.map(movie => {
        let newDuration = movie.duration.split(" ");
        if (newDuration.length === 2) {
            newDuration = parseInt(newDuration[0]) * 60 + parseInt(newDuration[1]);
        } else {
            if (newDuration[0].includes("h")) {
                newDuration = parseInt(newDuration[0])*60;
            } else {
                newDuration = parseInt(newDuration);
            }
        }
        return { ...movies, duration: newDuration };
    })
    return dataReturn;
}


// Get the average of all rates with 2 decimals 

function ratesAverage(movies) {
    let avgToReturn = movies.reduce((acc, movie) => {
        if (movie.rate == 0){
            return acc
        }
        return acc += parseFloat(movie.rate)
    }, 0)
    avgToReturn /= movies.length;
    avgToReturn = parseFloat(avgToReturn.toFixed(2));
    return avgToReturn
}


// Get the average of Drama Movies
function dramaMoviesRate(movies) {
    let dataReturn= movies.filter((movie)=>{
        return movie.genre.includes("Drama")
    })
    if (dataReturn.length === 0) {
        return undefined
    }
    dataReturn = ratesAverage(dataReturn)
    return dataReturn;
    
}


// Order by time duration, in growing order

function orderByDuration(movies) {
    let dataReturn = movies.sort((a,b)=>{
        if (a.duration > b.duration){
            return 1
        } if (a.duration < b.duration) {
            return -1
        } if (a.title > b.title){
            return 1
        } if (a.title < b.title){
            return -1
        }
        return 0;
    })
    return dataReturn;
}


// How many movies did STEVEN SPIELBERG

function howManyMovies(movies) {
    if (movies.length === 0) {
        return undefined
    }
    let dataReturn = movies.filter((movie)=>{
        return movie.director == "Steven Spielberg"
    })
    dataReturn = dataReturn.filter((movie)=>{
        return movie.genre.includes("Drama")
    })
    dataReturn = dataReturn.length
    return `Steven Spielberg directed ${dataReturn} drama movies!`
}


// Order by title and print the first 20 titles

function orderAlphabetically(movies) {
    let dataReturn = movies.map((movie)=>{
        return movie.title
    })
    dataReturn.sort()
    return dataReturn.splice(0,20)
}


// Best yearly rate average
function bestYearAvg(movies){
    if(movies.length === 0){return;}
   
    var bestYear = 0, bestRate = 0;
     let moviesByYear = {};
     movies.forEach(movie => {
       if(!moviesByYear[movie.year]){
         moviesByYear[movie.year] =  [];
       }
       moviesByYear[movie.year].push(movie);
     });
     for(let year in moviesByYear){
       let rate = ratesAverage(moviesByYear[year]);
       if(rate > bestRate){
         bestRate = rate;
         bestYear = year;
       }
     }
     return (`The best year was ${bestYear} with an average rate of ${bestRate}`);
   }