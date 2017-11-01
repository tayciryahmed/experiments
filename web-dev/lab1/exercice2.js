/** 
 * This is the solution of exercice 2 of web developement lab N°1 - SD203 
 * Url: http://perso.telecom-paristech.fr/~concolat/cours/TP/sd203/js/
 *
 * Author : Taycir Yahmed 
 * School: Telecom ParisTech
 * Date : December 2016
 */
/**
 * Quesion 2a
 */
function countWords(s) {

    //exclude  start and end white-space  
    s = s.replace(/(^\s*)|(\s*$)/gi, "");

    //convert 2 or more spaces to 1    
    s = s.replace(/[ ]{2,}/gi, " ");

    // exclude newline with a start spacing    
    s = s.replace(/\n /, "\n");

    var words = s.split(" ");

    var freqMap = {};
    words.forEach(function(w) {
        if (!freqMap[w]) {
            freqMap[w] = 0;
        }
        freqMap[w] += 1;
    });

    return freqMap;

}


/**
 * Quesion 2b 
 * IDEA: Any function can become a constructor when using "new"
 */

function WordList(s) {
    this.s = s;

    this.countWords = function() {

        var words = s.split(" ");

        var freqMap = {};
        words.forEach(function(w) {
            if (!freqMap[w]) {
                freqMap[w] = 0;
            }
            freqMap[w] += 1;
        });

        dict = freqMap;

        // Create items array
        var items = Object.keys(dict).map(function(key) {
            return [key, dict[key]];
        });

        // Sort the array based on the second element
        items.sort(function(first, second) {
            return second[1] - first[1];
        });

        return items;
    };

    this.maxCountWord = function() {
        items = this.countWords();
        return items[0][0];

    };
    this.minCountWord = function() {
        items = this.countWords();
        return items[items.length - 1][0];
    };
    this.getWords = function() {
        words = s.split(" ");
        uniqueWords = [];
        for (var k = 0; k < words.length; k++) {
            if (uniqueWords.indexOf(words[k]) === -1) {
                uniqueWords.push(words[k]);
            }
        }

        return uniqueWords;

    };
    this.getCount = function(word) {
        count = 0;
        words = s.split(' ');
        for (var k = 0; k < words.length; k++) {
            if (words[k] === word) {
                count += 1;
            }
        }
        return count;
    };

    /**
     * Question 2c
     */

    this.applyWordFunc = function(f) {
        words = s.split(' ');
        words = this.getWords();
        return words.map(f);
    };

}



/**
 * Question 2d
 */

var a = new WordList('tay tay mes med med ali lai ali');
console.log(a.applyWordFunc(function(word) {
    return {
        'nbreOccurence': a.getCount(word),
        'longueur': word.length
    };
}));