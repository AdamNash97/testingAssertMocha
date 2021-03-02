//Using Callback function for async
//const fs = require('fs');
//Using Promises for async
const fs = require('fs').promises;

class Todos {
    constructor() {
        this.todos = [];
    }
    list() {
        return [...this.todos];
    }
    add(title) {
        let todo = {
        title: title,
        completed: false,
    }
    this.todos.push(todo);
    }
    complete(title) {
        if (this.todos.length === 0) {
            throw new Error("You have no TODOs stored. Why don't you add one first?");
        }

        let todoFound = false;
        this.todos.forEach((todo) => {
            if (todo.title === title) {
                todo.completed = true;
                todoFound = true;
                return;
            }
        });

        if (!todoFound) {
            throw new Error(`No TODO was found with the title: "${title}"`);
        }
    }

//Testing asynchronous code.One of the features we want in our TODO module is a CSV export feature. This will print all the TODOs we have in store along with the completed status to a file. 

     //Using a Callback function
     //saveToFile(callback) {
       saveToFile() {
        let fileContents = 'Title,Completed\n';
        this.todos.forEach((todo) => {
            fileContents += `${todo.title},${todo.completed}\n`
        });

        //fs.writeFile('todos.csv', fileContents, callback);
        //Now return the result of the writeFile() promise.
        return fs.writeFile('todos.csv', fileContents);
     }
}

module.exports = Todos;
