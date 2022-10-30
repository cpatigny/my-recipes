/**
 * @param {string} confirmText text that will be displayed to the userData
 * @param {string} wordToEnter word that must be write to confirmText
 * @param {function} onConfirm function that will be executed on confirm
 */
const confirm = (confirmText: string, wordToEnter: string, onConfirm: () => void): void => {
  let text;
  let quit = false;

  do {
    text = prompt(confirmText);

    if (text === null) quit = true; // user cliked "cancel" button

    if (text === wordToEnter) onConfirm();
  } while (!quit && text !== wordToEnter);
};

export default confirm;
