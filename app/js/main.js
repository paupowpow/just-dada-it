const inputForm = document.querySelector("#inputForm");
const inputBox = document.querySelector("#inputBox");
const outputBox = document.querySelector("#outputBox");

const enNouSuf = ['acy', 'al', 'ance', 'ence', 'dom', 'er', 'or', 'ism', 'ist', 'ity', 'ty', 'ment', 'ness', 'ship', 'sion', 'tion'];
const enVerSuf = ['ate', 'en', 'ify', 'fy', 'ize', 'ise'];
const enAdjSuf = ['able', 'ible', 'al', 'esque', 'ful', 'ic', 'ical', 'ious', 'ous', 'ish', 'ive', 'less', 'y'];
const enPronoun = ['I', 'you', 'You', 'he', 'He', 'she', 'She', 'we', 'We', 'they', 'They'];
const enArticles = ['the', '...'];

let endingsArray = [];

function handleText() {
    let inputString = inputBox.value;
    let inputArray = inputString.split(" ");
    let wordsWithoutEndings = separateWordsFromWords(inputArray);
    let splitArray = splitWords(wordsWithoutEndings);
}

function separateWordsFromWords(inputArray) {
    return inputArray.map(word => {
        let newWord = word;
        let tempWord = "";
        enNouSuf.forEach(suf => {
            let regEx = new RegExp(suf + '$');
            tempWord = extractEndingFromWord(word, regEx, true);
            if (tempWord !== word) {
                newWord = tempWord;
            }
        });
        enVerSuf.forEach(suf => {
            let regEx = new RegExp(suf + '$');
            tempWord = extractEndingFromWord(word, regEx, false);
            if (tempWord !== word) {
                newWord = tempWord;
            }
        });
        enAdjSuf.forEach(suf => {
            let regEx = new RegExp(suf + '$');
            tempWord = extractEndingFromWord(word, regEx, false);
            if (tempWord !== word) {
                newWord = tempWord;
            }
        });
        enPronoun.forEach(pronoun => {
            let regEx = new RegExp('^' + pronoun + '$');
            tempWord = extractEndingFromWord(word, regEx, false);
            if (tempWord !== word) {
                newWord = tempWord;
            }
        });
        enArticles.forEach(article => {
            let regEx = new RegExp('^' + article + '$');
            tempWord = extractEndingFromWord(word, regEx, false);
            if (tempWord !== word) {
                newWord = tempWord;
            }
        });
        return (newWord === word ? word : newWord);
    }).filter(word => word !== '');
}

function extractEndingFromWord(word, regex, addEndingsToArray) {
    let indexOfEnding = word.search(regex);
    if (indexOfEnding >= 0) {
        if (addEndingsToArray) {
            endingsArray.push(word.substring(indexOfEnding));
        }
        return word.substring(0, indexOfEnding)
    } else {
        return word;
    }
}

function splitWords(filteredWords) {
    let arraysOfSplits = filteredWords.reduce((result, word) => {
        let splitWords = splitIt(word, []);
        return [...result, splitWords]
    }, []);

    return [].concat.apply([], arraysOfSplits);
}

function splitIt(word, resultArray) {
    if (word.length < 1) {
        return resultArray;
    }
    if (word.length === 1 || word.length === 2) {
        resultArray.push(word);
        return resultArray;
    }
    const numberOfLetters = giveNumberOfLetters();
    if (word.length >= numberOfLetters) {
        let unit1 = word.substring(0, numberOfLetters);
        resultArray.push(unit1);
        let unit2 = word.substring(numberOfLetters);
        if (unit2.length > 0) {
            if (unit2.length === 1 || unit2.length === 2) {
                resultArray.push(unit2)
            } else {
                splitIt(unit2, resultArray);
            }
        } else {
            return resultArray;
        }
        return resultArray;
    }
}

function giveNumberOfLetters() {
    const probaArray = [1, 2, 2, 2, 2, 2, 2, 3, 3, 3];
    return probaArray[Math.floor(Math.random() * probaArray.length)];
}


inputForm.addEventListener('click', handleText);