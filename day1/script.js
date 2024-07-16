const files = require("node:fs");

files.readFile("./input.txt", "utf-8", (e, data) => {
    if(e){ // If error
        console.error("Error reading file.");
        return 0;
    }
    let lines = data.split('\n');                       // Consider each line in the file
    let sum = 0;                                        // Sum starts at 0
    for(let i = 0; i < lines.length; i++){ 
        if(!lines[i].length) continue;                  // Protection against blank lines
        let num = "";
        for(let k = 0; k < lines[i].length; k++){       // For each char in line
            if(lines[i][k] >= '0' && lines[i][k] <= '9') num += lines[i][k];
            // If char is a number, append it to num
        }
        if(!num.length) continue;                       // Protection against blank lines
        sum += parseInt(num[0] + num[num.length - 1]);  // First and last digit of num
    }
    console.log(sum);
});
