const reverseObject = objectToReverse => {
  const reversedObject = {};

  Object
    .keys(objectToReverse)
    .reverse()
    .forEach(key => {
      reversedObject[key] = objectToReverse[key];
    });

  return reversedObject;
};

export default reverseObject;
