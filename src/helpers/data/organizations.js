import axios from 'axios';
import firebaseConfig from '../apiKeys';

const axiosCall = axios.create({ baseURL: firebaseConfig.databaseURL });

const getOrganization = (orgId) => new Promise((resolve) => {
  axiosCall.get(`/organizations/${orgId}.json`).then((resp) => resolve(resp.data));
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

export {
  // eslint-disable-next-line import/prefer-default-export
  getUsersOrganizations
};
