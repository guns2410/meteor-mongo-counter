// Import Tinytest from the tinytest Meteor package.
import { Tinytest } from "meteor/tinytest";

// Import and rename a variable exported by mongo-counter.js.
import { name as packageName } from "meteor/mongo-counter";

// Write your tests here!
// Here is an example.
Tinytest.add('mongo-counter - example', function (test) {
  test.equal(packageName, "mongo-counter");
});
