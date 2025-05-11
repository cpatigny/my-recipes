import { PreparationSteps, PreparationStepWithId } from '../types/recipe';
import { generateKey } from './firebase.helpers';

export const generateStepKey = (recipeId: string) => {
  const path = `recipes/${recipeId}/steps`;
  return generateKey(path);
};

export const convertStepsObjectToArray = (steps: PreparationSteps) => {
  const stepsArray: PreparationStepWithId[] = [];

  Object.keys(steps).forEach(key => {
    const step = steps[key];
    if (!step) return;
    stepsArray.push({ id: key, ...step });
  });

  return stepsArray;
};
