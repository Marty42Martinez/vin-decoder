var config = {
  apiKey: 'AIzaSyDMwSsQuipsYCRuNWWoGPIkIs17AcMafos4',
  authDomain: 'vin-decoder-a468b.firebaseapp.com',
  databaseURL: 'https://vin-decoder-a468b.firebaseio.com',
  projectId: 'vin-decoder-a468b',
  storageBucket: 'vin-decoder-a468b.appspot.com',
  messagingSenderId: '1091046465412'
};

firebase.initializeApp(config);
export const auth = firebase.auth();
const db = firebase.database();
export const usersRef = db.ref('users');
export const vinDataRef = db.ref('vin-data');
