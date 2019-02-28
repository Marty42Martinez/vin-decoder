export default function createFields(vehicleLabel) {
  const template = document.createElement('template');
  const html = `
  <dt>${vehicleLabel.Variable}</dt>
  <dd><input type='text'></dd>`;
  template.innerHTML = html;
  
  return template.content;
}