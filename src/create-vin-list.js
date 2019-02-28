export default function createVINList(vehicleLabel) {
  const template = document.createElement('template');
  const html = `
  <dt>${vehicleLabel.Variable}</dt>
  <dd>${vehicleLabel.Value}</dd>`;
  template.innerHTML = html;
  
  return template.content;
}