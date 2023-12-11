import { getSessionUser } from './utils.js';

document.addEventListener('DOMContentLoaded', async function () {
  const user =  await getSessionUser();

  if(user.role=="Test Taker")
    hideButton();
});



function hideButton() {
  // Your logic to hide the button
  const linkElement = document.getElementById('managerButton');
  if (linkElement) {
    linkElement.style.display = 'none';
  }
}
