/** 
 * This is the solution of exercice 1 of web developement lab N°1 - SD203 
 * Url: http://perso.telecom-paristech.fr/~concolat/cours/TP/sd203/js/
 *
 * Author : Taycir Yahmed 
 * School: Telecom ParisTech
 * Date : December 2016
 */
/**
 * Quesion 1a
 */
function factorielIt(n) {

    fact = 1;

    for (var k = 1; k <= n; k++) {
        fact *= k;
    }

    return fact;
}

/**
 * Quesion 1b
 */

function factorielRec(n) {

    if (n === 1) {
        return 1;
    } else {
        return n * factorielRec(n - 1);
    }

}

/**
 * Quesion 1c
 */

function factorielTableau(a) {

    b = []

    for (var k = 0; k < a.length; k++) {
        b[k] = factorielRec(a[k]);
    }

    return b;

}


/**
 * Quesion 1d
 */

function factorielMap(a) {
    return a.map(factorielRec);
}