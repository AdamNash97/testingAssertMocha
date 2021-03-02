const Todos = require('./index');
const assert = require('assert').strict;
const fs = require('fs');

//1st Test
describe("integration test", function() {
  it("should be able to add and complete TODOs", function() {
      let todos = new Todos();
        //todos.add("get up from bed");
        //todos.add("make up bed");
        //assert.notStrictEqual(todos.list().length, 1);
        assert.strictEqual(todos.list().length, 0);

        todos.add("run code");
        assert.strictEqual(todos.list().length, 1);
        assert.deepStrictEqual(todos.list(), [{title: "run code", completed: false}]);

        todos.add("test everything");
        assert.strictEqual(todos.list().length, 2);
        assert.deepStrictEqual(todos.list(),
            [
                { title: "run code", completed: false },
                { title: "test everything", completed: false }
            ]
        );

        todos.complete("run code");
        assert.deepStrictEqual(todos.list(),
            [
                { title: "run code", completed: true },
                { title: "test everything", completed: false }
            ]
    );
    });
});

//2nd Test
describe("complete()", function() {
    it("should fail if there are no TODOs", function() {
        let todos = new Todos();
        const expectedError = new Error("You have no TODOs stored. Why don't you add one first?");

        assert.throws(() => {
            todos.complete("doesn't exist");
        }, expectedError);
    });
});

//3rd Test
/*
describe("saveToFile()", function() {
    //The done() callback function is used by Mocha to tell it when an asynchronous function is completed.
    //Callback Function
    //it("should save a single TODO", function(done) {
    //Promises
    //it("should save a single TODO", function() {
    //Async/Await
    it("should save a single TODO", async function() {
        let todos = new Todos();
        todos.add("save a CSV");
        //Callback Function
        //todos.saveToFile((err) => {
        //Promises
        //return todos.saveToFile().then(() => {
        //Async/ Await
        await todos.saveToFile();
        //We also omit the catch() clause because Mocha can detect when a promise is rejected. If rejected, it automatically fails the test.
            assert.strictEqual(fs.existsSync('todos.csv'), true);
            let expectedFileContents = "Title,Completed\nsave a CSV,false\n";
            let content = fs.readFileSync("todos.csv").toString();
            assert.strictEqual(content, expectedFileContents);
            //done(err);
        //});
    });
});
*/

//3rd Test using Hooks: before, beforeEach, after, afterEach - used to separate tests.
/*describe("saveToFile()", function () {
    it("should save a single TODO", async function () {
        let todos = new Todos();
        todos.add("save a CSV");
        await todos.saveToFile();

        assert.strictEqual(fs.existsSync('todos.csv'), true);
        let expectedFileContents = "Title,Completed\nsave a CSV,false\n";
        let content = fs.readFileSync("todos.csv").toString();
        assert.strictEqual(content, expectedFileContents);
    });

    it("should save a single TODO that's completed", async function () {
        let todos = new Todos();
        todos.add("save a CSV");
        todos.complete("save a CSV");
        await todos.saveToFile();

        assert.strictEqual(fs.existsSync('todos.csv'), true);
        let expectedFileContents = "Title,Completed\nsave a CSV,true\n";
        let content = fs.readFileSync("todos.csv").toString();
        assert.strictEqual(content, expectedFileContents);
    });
});
*/

//3rd test with hook improvement.We’ll use the beforeEach() hook to set up our test fixture of TODO items. A test fixture is any consistent state used in a test. In our case, our test fixture is a new todos object that has one TODO item added to it already. We will then use afterEach() to remove the file created by the test.
describe("saveToFile()", function () {
    beforeEach(function () {
        this.todos = new Todos();
        this.todos.add("save a CSV");
    });

    afterEach(function () {
        if (fs.existsSync("todos.csv")) {
            fs.unlinkSync("todos.csv");
        }
    });

    it("should save a single TODO without error", async function () {
        await this.todos.saveToFile();

        assert.strictEqual(fs.existsSync("todos.csv"), true);
        let expectedFileContents = "Title,Completed\nsave a CSV,false\n";
        let content = fs.readFileSync("todos.csv").toString();
        assert.strictEqual(content, expectedFileContents);
    });

    it("should save a single TODO that's completed", async function () {
        this.todos.complete("save a CSV");
        await this.todos.saveToFile();

        assert.strictEqual(fs.existsSync('todos.csv'), true);
        let expectedFileContents = "Title,Completed\nsave a CSV,true\n";
        let content = fs.readFileSync("todos.csv").toString();
        assert.strictEqual(content, expectedFileContents);
    });
});

//In this tutorial, you wrote a Node.js module to manage TODO items and tested the code manually using the Node.js REPL. You then created a test file and used the Mocha framework to run automated tests. With the assert module, you were able to verify that your code works. You also tested synchronous and asynchronous functions with Mocha. Finally, you created hooks with Mocha that make writing multiple related test cases much more readable and maintainable.
