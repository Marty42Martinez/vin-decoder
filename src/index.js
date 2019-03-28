// const inputVIN = '1GNFC23049R278215';
import createVINList from './create-vin-list.js';
import createFields from './create-fields.js';
let inputVIN = '';
const inputForm = document.getElementById('vin-input');
const vehicleReport = document.getElementById('vehicle-report');

inputForm.addEventListener('submit', function(event) {
  event.preventDefault();
  clearDisplay(vehicleReport);
  inputVIN = inputForm.vin.value;
  
  var request = new XMLHttpRequest();
  
  const inputLocation = 'https://vpic.nhtsa.dot.gov/api/vehicles/DecodeVIN/' + inputVIN + '?format=json';
  request.open('GET', inputLocation, true);
  
  
  request.onload = function() {
    // const emptyFields = document.getElementById('empty-fields');
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