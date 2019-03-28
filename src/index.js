// const inputVIN = '1GNFC23049R278215';
import createFields from './create-fields.js';
import { auth, vinDataRef } from './firebase/firebase.js';
let inputVIN = '';
const inputForm = document.getElementById('vin-input');
const vinSection = document.getElementById('vin-section');
const vehicleReport = document.getElementById('vehicle-report');
const saveReportButton = document.getElementById('save-report');

auth.onAuthStateChanged(user => {
  if(user) {
    const signOutButton = document.getElementById('sign-out');
    signOutButton.addEventListener('click', () => {
      auth.signOut();
      window.location = './auth.html';
    });
  } else {
    window.location = './auth.html';
  }
});

inputForm.addEventListener('submit', event => {
  event.preventDefault();
  clearDisplay(vehicleReport);
  inputVIN = inputForm.vin.value;
  vinFetch(inputVIN);

  saveReportButton.classList.remove('hidden');
  
});

function vinFetch(inputVIN) {
  var request = new XMLHttpRequest();
  
  const inputLocation = 'https://vpic.nhtsa.dot.gov/api/vehicles/DecodeVIN/' + inputVIN + '?format=json';
  request.open('GET', inputLocation, true);
  
  
  request.onload = function() {
    const data = JSON.parse(request.response);
    
    if(request.status >= 200 && request.status < 400) {
      for(let i = 0; i < data.Count; i++) {
        const vehicleLabel = data.Results[i];
        const dom = createFields(vehicleLabel);
        vehicleReport.appendChild(dom);
      
      }
    } else {
      console.log('error');
    }
    
  };
  
  request.send();
}

saveReportButton.addEventListener('click', event => {
  event.preventDefault();
  let inputList = [];
  let varList = [];
  const formAreas = vehicleReport.querySelectorAll('textarea');
  formAreas.forEach(area => { 
    inputList.push(area.value); 
  });
  const vinVariables = vehicleReport.querySelectorAll('dt');
  vinVariables.forEach(variable => { 
    varList.push(variable.textContent);
  });
  const vinReportRef = vinDataRef.child(inputVIN);
  let newVinData = {};
  for(let i = 0; i < varList.length; i++) {
    newVinData[i] = {
      label: varList[i],
      value: inputList[i]
    }; 
  }
  vinReportRef.set(newVinData);
});

function clearDisplay(node) {
  while(node.children.length > 0) {
    node.firstElementChild.remove();
  }
}


//sample VINs
//1GNFC23049R278215
//2MEFM75W02X651698
//5UXWX7C5*BA