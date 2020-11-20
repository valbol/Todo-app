const { admin, db } = require('./admin');

module.exports = async (request, response, next) => {
  let idToken;
  if (
    request.headers.authorization &&
    request.headers.authorization.startsWith('Bearer ')
  ) {
    idToken = request.headers.authorization.split('Bearer ')[1];
  } else {
    console.error('No token found');
    return response.status(403).json({ error: 'Unauthorized!' });
  }
  try {
    const verifedToken = await admin.auth().verifyIdToken(idToken);
    request.user = verifedToken;

    const userData = await db
      .collection('users')
      .where('userId', '==', request.user.uid)
      .limit(1)
      .get();
    request.user.username = userData.docs[0].data().username;
    request.user.imageUrl = userData.docs[0].data().imageUrl;
    console.info(`User token verified - ${request.user.username}`);
    return next();
  } catch (err) {
    console.error('Error with verifying token ', err);
    return response.status(403).json(err);
  }
};
