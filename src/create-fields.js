export default function createFields(vehicleLabel) {
  const template = document.createElement('template');
  const html = `
  <dt>${vehicleLabel.Variable}</dt>
  <dd><textarea rows="2" cols="25">${vehicleLabel.Value ? vehicleLabel.Value : ''}</textarea></dd>`;
  template.innerHTML = html;
  
  return template.content;
}