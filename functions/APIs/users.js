const { admin, db } = require('../util/admin');
const config = require('../util/config');

const firebase = require('firebase');

firebase.initializeApp(config);

const { validateLoginData, validateSignUpData } = require('../util/validators');
const { request } = require('http');

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

deleteImage = imageName => {
  const bucket = admin.storage().bucket();
  const path = `${imageName}`;
  return bucket
    .file(path)
    .delete()
    .then(() => {
      return;
    })
    .catch(error => {
      return;
    });
};

exports.uploadProfilePhoto = (request, response) => {
  const BusBoy = require('busboy');
  const path = require('path');
  const os = require('os');
  const fs = require('fs');
  const busboy = new BusBoy({ headers: request.headers });

  let imageFileName;
  let imageToBeUploaded = {};

  busboy.on('file', (fieldname, file, filename, encoding, mimetype) => {
    if (mimetype !== 'image/png' && mimetype !== 'image/jpeg' && !file) {
      return response
        .status(400)
        .json({ error: 'Wrong file type submited or no file provided' });
    }
    const imageExtension = filename.split('.')[filename.split('.').length - 1];
    imageFileName = `${request.user.username}.${imageExtension}`;
    const filePath = path.join(os.tmpdir(), imageFileName);
    imageToBeUploaded = { filePath, mimetype };
    file.pipe(fs.createWriteStream(filePath));
  });
  deleteImage(imageFileName);
  busboy.on('finish', async () => {
    try {
      admin
        .storage()
        .bucket()
        .upload(imageToBeUploaded.filePath, {
          resumable: false,
          metadata: {
            metadata: {
              contentType: imageToBeUploaded.mimetype,
            },
          },
        });

      const imageUrl = await `https://firebasestorage.googleapis.com/v0/b/${config.storageBucket}/o/${imageFileName}?alt=media`;
      db.doc(`/users/${request.user.username}`).update({ imageUrl });

      return response.json({ message: 'Image uploaded successfully' });
    } catch (error) {
      console.error(error);
      return response.status(500).json({ error: error.code });
    }
  });
  busboy.end(request.rawBody);
};

// createFileStream = (busboy, request, response) => {
//   const path = require('path');
//   const os = require('os');
//   const fs = require('fs');
//   let imageFileName;
//   let imageToBeUploaded = {};
//   try {
//     busboy.on('file', (fieldname, file, filename, encoding, mimetype) => {
//       if (mimetype !== 'image/png' && mimetype !== 'image/jpeg') {
//         return response.status(400).json({ error: 'Wrong file type submited' });
//       }
//       const imageExtension = filename.split('.')[
//         filename.split('.').length - 1
//       ];
//       imageFileName = `${request.user.username}.${imageExtension}`;
//       const filePath = path.join(os.tmpdir(), imageFileName);
//       imageToBeUploaded = { filePath, mimetype };
//       file.pipe(fs.createWriteStream(filePath));
//     });
//     return [imageFileName, imageToBeUploaded];
//   } catch (error) {
//     console.log(error);
//   }
// };

// uploadPhotoToStorage = (
//   busboy,
//   imageFileName,
//   imageToBeUploaded,
//   request,
//   response
// ) => {
//   busboy.on('finish', () => {
//     admin
//       .storage()
//       .bucket()
//       .upload(imageToBeUploaded.filePath, {
//         resumable: false,
//         metadata: {
//           metadata: {
//             contentType: imageToBeUploaded.mimetype,
//           },
//         },
//       })
//       .then(() => {
//         const imageUrl = `https://firebasestorage.googleapis.com/v0/b/${config.storageBucket}/o/${imageFileName}?alt=media`;
//         return db.doc(`/users/${request.user.username}`).update({
//           imageUrl,
//         });
//       })
//       .then(() => {
//         return response.json({ message: 'Image uploaded successfully' });
//       })
//       .catch(error => {
//         console.error(error);
//         return response.status(500).json({ error: error.code });
//       });
//     busboy.end(request.rawBody);
//   });
// };

// // Upload profile picture
// exports.uploadProfilePhoto = (request, response) => {
//   const BusBoy = require('busboy');
//   const busboy = new BusBoy({ headers: request.headers });
//   [imageFileName, imageToBeUploaded] = createFileStream(
//     busboy,
//     request,
//     response
//   );
//   deleteImage(imageFileName);
//   uploadPhotoToStorage(
//     busboy,
//     imageFileName,
//     imageToBeUploaded,
//     request,
//     response
//   );
// };

exports.getUserDetail = async (request, response) => {
  let userData = {};
  try {
    const userDoc = await db.doc(`/users/${request.user.username}`).get();
    if (userDoc.exists) {
      userData.userCredentials = userDoc.data();
    }
    return response.json(userData);
  } catch (error) {
    console.error(error);
    return response.status(500).json({ error: error.code });
  }
};

exports.updateUserDetails = async (request, response) => {
  let document = db.collection('users').doc(`${request.user.username}`);
  try {
    const userDoc = await document.update(request.body);
    console.info(`updated - ${userDoc}`);
    return response.json({ message: 'Updated sucessfully' });
  } catch (error) {
    console.error(error);
    return response.status(500).json({
      message: 'Cannot Update the value',
    });
  }
};
