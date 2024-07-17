const files = require("node:fs");
const colorReplace = /((?<=r)ed)|((?<=g)reen)|((?<=b)lue)/gi

class Game {
    constructor(){
        this.id = 0;
        this.r = [];
        this.g = [];
        this.b = [];
    }
};


files.readFile("./input.txt", "utf-8", (e, data) => {
    if(e){ // If error
        console.error("Error reading file.");
        return 0;
    }
    let lines = data.split('\n');                       // Consider each line in the file
    lines = lines.filter((line) => line.length > 0);
    let games = lines.map(str => {
        let edited = str.substring(5); // Removing "Game" from the start of each line
        edited = edited.replaceAll(colorReplace, ""); // Truncating "red" => "r", "green" => "g", and "blue" => "b"
        let game = new Game();
        game.id = parseInt(edited.substring(0, edited.indexOf(':')).trim()); // Grabbing game ID
        edited = edited.substring(edited.indexOf(':') + 2);                  // Clean up colon and whitespace
        let gameData = edited.split(';');                                    // Split into rounds
        for(let i = 0; i < gameData.length; i++){
            let colors = gameData[i].split(',');                             // Split into colors
            for(let k = 0; k < colors.length; k++){
                colors[k] = colors[k].trim();
                game[colors[k][colors[k].length - 1]]?.push(
                    parseInt(
                        colors[k].substring(0, colors[k].indexOf(' ')).trim()
                    )
                );
            }
        }
        return game;
    });
    let sum = 0;
    games.forEach((game) => {
        sum += Math.max(...game.r) * Math.max(...game.b) * Math.max(...game.g);
    });
    console.log(sum);

});
