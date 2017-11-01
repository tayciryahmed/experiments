/** 
 * This is the solution of exercice 3 of web developement lab N°1 - SD203 
 * Url: http://perso.telecom-paristech.fr/~concolat/cours/TP/sd203/js/
 *
 * Author : Taycir Yahmed 
 * School: Telecom ParisTech
 * Date : December 2016
 */
/**
 * Question 3a
 */
function Student(name, firstName, id) {
    this.name = name;
    this.firstName = firstName;
    this.id = id;


    /**
     * Question 3b
     */

    this.print = function() {
        console.log('student: ' + this.name + ', ' + id);
    }
}


/**
 * Question 3c
 */

function ForeignStudent(name, firstName, id, nationalite) {

    Student.call(this, name, firstname, id);
    this.nationalite = nationalite;

    this.print = function() {
        console.log('student: ' + this.name + ' ' + this.id + ' ' + this.nationalite);
    }
}

ForeignStudent.prototype = new Student();


/**
 * Question 3d
 */


/**
 * The used appraoch is : create modules using a self-contained object interface
 */

var module = (function() {

    function Student(name, firstName, id) {
        this.name = name;
        this.firstName = firstName;
        this.id = id;

        this.print = function() {
            console.log('student: ' + this.name + ', ' + id);
        }
    }

    function ForeignStudent(name, firstName, id, nationalite) {

        Student.call(this, name, firstname, id);

        this.nationalite = nationalite;

        this.print = function() {
            console.log('student: ' + this.name + ', ' + this.id + ', ' + this.nationalite);
        }
    }

    ForeignStudent.prototype = new Student();


    return {
        Student: Student,
        ForeignStudent: ForeignStudent
    };


}());



/**
 * Question 3d
 */

var fs = require('fs');

var modulePromotion = (function() {

    var Promotion = {};

    Promotion.students = [];


    Promotion.add = function(student) {
        Promotion.students.push(student);
        return Promotion.students;
    }

    Promotion.remove = function(student) {

        Array.prototype.remove = function(obj) {
            var i = this.indexOf(obj);
            if (i >= 0) {
                this.splice(i, 1);
            }
        };

        Promotion.students.remove(student);

        return Promotion.students;
    }

    Promotion.saveToFile = function(filename) {

        return fs.writeFileSync(filename, JSON.stringify(Promotion.students));

    }

    Promotion.readFromFile = function(filename) {

        Promotion.students = fs.readFileSync(filename, 'utf8');

        return Promotion.students;

    }

    return Promotion;


})();

/**

* The follwing code was used to generate the json data for students:

modulePromotion.students = [{'name':'Yahmed', 'firstname': 'Nesrine'},
{'name':'Yahmed', 'firstname': 'Taycir', 'nationalite' : 'Tunisian'},
{'name':'Yahmed', 'firstname': 'Ahmed', 'nationalite' : 'Tunisian'},
{'name':'Yahmed', 'firstname': 'Nesrine'},
{'name':'Yahmed', 'firstname': 'Taycir', 'nationalite' : 'Tunisian'},
{'name':'Yahmed', 'firstname': 'Ahmed', 'nationalite' : 'Tunisian'},
{'name':'Yahmed', 'firstname': 'Nesrine'},
{'name':'Yahmed', 'firstname': 'Taycir', 'nationalite' : 'Tunisian'},
{'name':'Yahmed', 'firstname': 'Ahmed', 'nationalite' : 'Tunisian'},
{'name':'Yahmed', 'firstname': 'Nesrine', 'id':'1997'},
{'name':'Yahmed', 'firstname': 'Taycir', 'nationalite' : 'Tunisian'},
{'name':'Yahmed', 'firstname': 'Ahmed', 'nationalite' : 'Tunisian'},
{'name':'Yahmed', 'firstname': 'Nesrine'},
{'name':'Yahmed', 'firstname': 'Taycir', 'nationalite' : 'Tunisian'},
{'name':'Yahmed', 'firstname': 'Ahmed', 'nationalite' : 'Tunisian'},
{'name':'Yahmed', 'firstname': 'Nesrine'},
{'name':'Yahmed', 'firstname': 'Taycir', 'nationalite' : 'Tunisian'},
{'name':'Yahmed', 'firstname': 'Ahmed', 'nationalite' : 'Tunisian'},
{'name':'Yahmed', 'firstname': 'Nesrine'},
{'name':'Yahmed', 'firstname': 'Taycir', 'nationalite' : 'Tunisian'},
{'name':'Yahmed', 'firstname': 'Ahmed', 'nationalite' : 'Tunisian'}];
*/

modulePromotion.readFromFile('./test.json');

console.log(modulePromotion.students);