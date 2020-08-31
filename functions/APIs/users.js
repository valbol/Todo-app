const { admin, db } = require('../util/admin');
const config = require('../util/config');

const firebase = require('firebase');

firebase.initializeApp(config);

const { validateLoginData, validateSignUpData } = require('../util/validators');

//Login
exports.loginUser = async (request, response) => {
  const user = {
    email: request.body.email,
    password: request.body.password,
  };
  const { valid, errors } = validateLoginData(user);
  if (!valid) return response.status(400).json(errors);
  try {
    const auth = await firebase
      .auth()
      .signInWithEmailAndPassword(user.email, user.password);

    const token = await auth.user.getIdToken();
    return response.json({ token });
  } catch (error) {
    console.error(error);
    return response
      .status(403)
      .json({ general: 'wrong credentials, please try again' });
  }
};

//SignUp
exports.signUpUser = async (request, response) => {
  const newUser = {
    firstName: request.body.firstName,
    lastName: request.body.lastName,
    email: request.body.email,
    phoneNumber: request.body.phoneNumber,
    country: request.body.country,
    password: request.body.password,
    confirmPassword: request.body.confirmPassword,
    username: request.body.username,
  };
  const { valid, errors } = validateSignUpData(newUser);
  if (!valid) return response.status(400).json(errors);
  let token, userId;
  // TODO - verify usernname call
  const userDoc = await db.doc(`/users/${newUser.username}`).get();
  console.error(`User - ${JSON.stringify(userDoc)}`);
  if (userDoc.exists) {
    return response
      .status(400)
      .json({ username: 'Sorry!, This username already taken' });
  }
  try {
    console.info('Try to create a user');
    const tryCreateUser = await firebase
      .auth()
      .createUserWithEmailAndPassword(newUser.email, newUser.password);
    userId = tryCreateUser.user.uid;
    token = await tryCreateUser.user.getIdToken();

    const userCredentials = {
      firstName: newUser.firstName,
      lastName: newUser.lastName,
      username: newUser.username,
      phoneNumber: newUser.phoneNumber,
      country: newUser.country,
      email: newUser.email,
      createdAt: new Date().toISOString(),
      userId: userId,
    };
    const userCreated = await db
      .doc(`/users/${newUser.username}`)
      .set(userCredentials);
    console.info(`user is ${JSON.stringify(userCreated)}`);
    return response.status(201).json({ token });
  } catch (err) {
    console.error(`===We get error${err}===`);
    if (err.code === 'auth/email-already-in-use') {
      return response.status(400).json({ email: err.message });
    } else {
      return response
        .status(500)
        .json({ general: 'Something went wrong, please try again' });
    }
  }
};
