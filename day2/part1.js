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
        edited = edited.replaceAll(colorReplace, "");
        let game = new Game();
        game.id = parseInt(edited.substring(0, edited.indexOf(':')).trim());
        edited = edited.substring(edited.indexOf(':') + 2);
        let gameData = edited.split(';');
        for(let i = 0; i < gameData.length; i++){
            let colors = gameData[i].split(',');
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
    const C_RED = 12;
    const C_GREEN = 13;
    const C_BLUE = 14;
    let possible = [], impossible = [];
    games.forEach((game) => {
        (Math.max(...game.r) <= C_RED && 
            Math.max(...game.g) <= C_GREEN && 
            Math.max(...game.b) <= C_BLUE
        ) ? possible.push(game) : impossible.push(game);
    });
    let sum = 0;
    for(let i = 0; i < possible.length; i++){
        sum += possible[i].id;
    }
    console.log(sum);

});
