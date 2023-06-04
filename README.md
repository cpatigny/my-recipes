# MyRecipes

MyRecipes is a list of recipes that I know how to cook and that I like.

## Use Firebase Emulator

To run MyRecipes on your local machine using Firebase Emulator, you'll need to configure the Firebase Emulator.

1. Install the CLI

```shell
npm install -g firebase-tools
```

2. Login to firebase using the console

```shell
firebase login
```

3. Initialize firebase in the project

```shell
# run this at the root of the project
firebase init
```

4. Select Emulators, Storage and Realtime Database options
5. Select the options you want
6. Update `firebase.ts` file with correct ports if needed
7. Start the emulators

```shell
firebase emulators:start
```
