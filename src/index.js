// const inputVIN = '1GNFC23049R278215';
import createVINList from './create-vin-list.js';
import createFields from './create-fields.js';
let inputVIN = '';
const inputForm = document.getElementById('vin-input');
inputForm.addEventListener('submit', function(event) {
  event.preventDefault();
  inputVIN = inputForm.vin.value;
  
  var request = new XMLHttpRequest();
  
  const inputLocation = 'https://vpic.nhtsa.dot.gov/api/vehicles/DecodeVIN/' + inputVIN + '?format=json';
  request.open('GET', inputLocation, true);
  
  
  request.onload = function() {
    const vehicleReport = document.getElementById('vehicle-report');
    const emptyFields = document.getElementById('empty-fields');
    const data = JSON.parse(request.response);
    
    const unFilledProperties = [];
    
    if(request.status >= 200 && request.status < 400) {
      for(let i = 0; i < data.Count; i++) {
        const vehicleLabel = data.Results[i];
        if(vehicleLabel.Value === null) {
          unFilledProperties.push(vehicleLabel);

        } else {
          const dom = createVINList(vehicleLabel);
          vehicleReport.appendChild(dom);
        }
      
      }
    } else {
      console.log('error');
    }
    
    unFilledProperties.forEach(variable => {
      const field = createFields(variable);
      emptyFields.appendChild(field);
    });
   
  };

  request.send();
});


//sample VINs
//1GNFC23049R278215
//2MEFM75W02X651698
//5UXWX7C5*BA