import axios from 'axios';
import firebaseConfig from '../apiKeys';

const dbUrl = firebaseConfig.databaseURL;

const getUser = (uid) => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/users/${uid}.json`)
    .then((response) => resolve(response.data))
    .catch((error) => reject(error));
});

const updateUser = (userObj) => new Promise((resolve, reject) => {
  axios.patch(`${dbUrl}/users/${userObj.uid}.json`, userObj)
    .then(() => getUser(userObj.uid).then(resolve))
    .catch((error) => reject(error));
});

export {
  getUser,
  updateUser
};
