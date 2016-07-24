const callCounters = async function (collectionName, method, arguments) {
  let mongo = MongoInternals.defaultRemoteCollectionDriver().mongo;
  let collection = mongo.rawCollection(collectionName);
  return await collection[method](...arguments);
};

export const deleteCounters = (collectionName) => (
  callCounters(collectionName, 'remove', {})
);

export const incrementCounter = (collectionName, name, amount = 1) => {
  let doc = callCounters(collectionName, 'findAndModify', [
    { _id: name },
    null,
    { $inc: { next_val: amount } },
    { new: true, upsert: true },
  ]).await();
  return doc.value.next_val;
};

export const decrementCounter = (collectionName, name, amount = 1) => (
  incrementCounter(collectionName, name, -amount)
);

export const setCounter = (collectionName, name, value) => {
  let doc = callCounters(collectionName, 'findAndModify', [
    { _id: name },
    null,
    { $set: { next_val: value } },
    { new: true, upsert: true },
  ]);
  return doc.next_val;
};
