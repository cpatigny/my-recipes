interface ObjectOfObject {
  [key: string]: object;
}

/**
 * Reverse the order of the object
 */
const reverseObject = (objectToReverse: ObjectOfObject): ObjectOfObject => {
  const reversedObject: ObjectOfObject = {};

  Object
    .keys(objectToReverse)
    .reverse()
    .forEach(key => {
      const object = objectToReverse[key];

      if (object) {
        reversedObject[key] = object;
      }
    });

  return reversedObject;
};

export default reverseObject;
