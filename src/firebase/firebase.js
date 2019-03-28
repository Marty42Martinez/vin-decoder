var config = {
  apiKey: 'AIzaSyDMwSsQmipYCRuNWWoGPIkIs17AcMafos4',
  authDomain: 'vin-decoder-a468b.firebaseapp.com',
  databaseURL: 'https://vin-decoder-a468b.firebaseio.com',
  projectId: 'vin-decoder-a468b',
  messagingSenderId: '1091046465412'
};

export const app = firebase.initializeApp(config);
export const auth = firebase.auth();
const db = firebase.database();
export const usersRef = db.ref('users');
export const vinDataRef = db.ref('vin-data');
