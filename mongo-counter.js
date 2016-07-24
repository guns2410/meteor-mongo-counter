import { Mongo } from 'meteor/mongo';
import { _ } from 'meteor/underscore';

class MongoCounter {
  constructor(name) {
    this.name = name;
    this.collection = new Mongo.Collection(this.name);
    this.cachedValues = [];
  }

  set valueId(val) {
    if (_.indexOf(this.cachedValues, val) > -1) return true;
    let initialValue = this.collection.findOne({ _id: val });
    if (!initialValue) this.collection.insert({ _id: val, next_val: 1 });
    this.cachedValues.push(val);
  }

  increment(val, amount) {
    this.collection.update({ _id: val }, { $inc: { next_val: amount } });
  }

  decrement(val, amount) {
    this.collection.update({ _id: val }, { $dec: { next_val: amount } });
  }

  setValue(val, valueToSet) {
    this.collection.update({ _id: val }, { $set: { next_val: valueToSet } });
  }
}

export const incrementCounter = (collectionId, valueId, amount = 1) => {
  let collection = new MongoCounter(collectionId);
  let initialValue = collection.findOne({ _id: valueId }).next_val;
  collection.increment(valueId, amount);
  return initialValue;
};

export const decrementCounter = (collectionId, valueId, amount = 1) => {
  let collection = new MongoCounter(collectionId);
  let initialValue = collection.findOne({ _id: valueId }).next_val;
  collection.decrement(valueId, amount);
  return initialValue;
};

export const setValue = (collectionId, valueId, valueToSet) => {
  let collection = new MongoCounter(collectionId);
  collection.setValue(valueId, valueToSet);
  return initialValue;
};
