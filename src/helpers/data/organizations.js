import axios from 'axios';
import firebase from 'firebase/app';
import firebaseConfig from '../apiKeys';

const axiosCall = axios.create({ baseURL: firebaseConfig.databaseURL });

const getUserInOrg = (orgId) => new Promise((resolve) => {
  const uid = firebase.auth().currentUser?.uid;
  axiosCall.get(`/organization_users.json/?orderBy="userId"&equalTo="${uid}"`).then((resp) => {
    const orgUsers = Object.values(resp.data);

    const orgs = orgUsers.map((og) => axiosCall.get(`/organizations/${og.organizationId}.json`));

    return Promise.all(orgs).then((resplvedOrgs) => {
      resolve(!!(resplvedOrgs.filter((og) => og.data?.firebaseKey === orgId).length));
    });
  });
});

const createUserOrg = (userObj) => new Promise((resolve) => {
  axiosCall.post('/organization_users.json', userObj).then((newOrgInfo) => {
    const { data: { name: firebaseKey } } = newOrgInfo;
    axiosCall.patch(`/organization_users/${firebaseKey}.json`, { firebaseKey }).then(resolve);
  });
});

const getOrganization = (orgId) => new Promise((resolve) => {
  const orgInfoProm = axiosCall.get(`/organizations/${orgId}.json`)
    .then((resp) => resp.data);
  const canAccessProm = getUserInOrg(orgId);
  Promise.all([orgInfoProm, canAccessProm]).then(([orgInfo, userCanAccess]) => {
    resolve({ ...orgInfo, userCanAccess: orgId ? userCanAccess : true });
  });
});

const getUsersOrganizations = (uid) => new Promise((resolve) => {
  axiosCall.get(`/organization_users.json/?orderBy="userId"&equalTo="${uid}"`).then((resp) => {
    const orgUsers = Object.values(resp.data);

    const orgs = orgUsers.map((og) => getOrganization(og.organizationId));

    Promise.all(orgs).then((resplvedOrgs) => {
      resolve(resplvedOrgs);
    });
  });
});

const createOrganization = (orgObj) => new Promise((resolve) => {
  const {
    uid: userId,
    displayName,
    email,
    photoURL: profilePic
  } = firebase.auth().currentUser;

  axiosCall.post('/organizations.json', orgObj).then((newOrgInfo) => {
    const { data: { name: firebaseKey } } = newOrgInfo;
    const updateOrgProm = axiosCall.patch(`/organizations/${firebaseKey}.json`, { firebaseKey });
    const userOrgProm = createUserOrg({
      displayName,
      userId,
      username: email.split('@')[0],
      isAdmin: true,
      active: false,
      profilePic,
      organizationId: firebaseKey,
      bio: ''
    });
    Promise.all([updateOrgProm, userOrgProm]).then(() => getUsersOrganizations(userId).then((userOrgs) => resolve([userOrgs, firebaseKey])));
  });
});
export {
  getUsersOrganizations,
  getOrganization,
  createOrganization
};
