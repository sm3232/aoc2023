const files = require("node:fs");
const lazyRegex = /(o(?=ne))|(t(?=wo))|(t(?=hree))|(f(?=our))|(f(?=ive))|(s(?=ix))|(s(?=even))|(e(?=ight))|(n(?=ine))|[0-9]/gi;
const greedyRegex = /(one)|(two)|(three)|(four)|(five)|(six)|(seven)|(eight)|(nine)/gi;
const strings = {
    "one": "1",
    "two": "2",
    "three": "3",
    "four": "4",
    "five": "5",
    "six": "6",
    "seven": "7",
    "eight": "8",
    "nine": "9",
};

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
        let matches = lines[i].matchAll(lazyRegex);     // Match all carefully
        for(const match of matches){
            if(match[0] >= '0' && match[0] <= '9') {    // If the match is a normal digit,
                num += match[0];
            } else {
                let greedy = lines[i].substring(match.index, match.index + 5).match(greedyRegex); // Identify which number is spelled out
                num += strings[greedy[0]];
            }
        }
        if(!num.length) continue;                       // Protection against blank lines
        sum += parseInt(num[0] + num[num.length - 1]);  // First and last digit of num
    }
    console.log(sum);
});
