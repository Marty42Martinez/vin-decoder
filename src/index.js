// const inputVIN = '1GNFC23049R278215';
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
    const data = JSON.parse(request.response);
    const listNode = document.createElement('dl');
    const unFilledProperties = [];
    
    if(request.status >= 200 && request.status < 400) {
      for(let i = 0; i < data.Count; i++) {
        const vehicleLabel = data.Results[i];
        if(vehicleLabel.Value === null) {
          unFilledProperties.push(vehicleLabel);
        } else {
          const termNode = document.createElement('dt');
          const defNode = document.createElement('dd');
          
          termNode.textContent = vehicleLabel.Variable;
          defNode.textContent = vehicleLabel.Value;

          listNode.appendChild(termNode);
          listNode.appendChild(defNode);
        }
      
      }
    } else {
      console.log('error');
    }
    vehicleReport.appendChild(listNode)
  }

  request.send();
});


//sample VINs
//1GNFC23049R278215
//2MEFM75W02X651698
//5UXWX7C5*BA