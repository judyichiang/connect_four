const button1 = document.querySelector('.col-1');
const button2 = document.querySelector('.col-2');
const button3 = document.querySelector('.col-3');
const button4 = document.querySelector('.col-4');
const button5 = document.querySelector('.col-5');
const button6 = document.querySelector('.col-6');
const button7 = document.querySelector('.col-7');



button1.addEventListener('click', function() {
  // get player's class color name
  // need to check the column for existing discs below
  // remove the 'hidden' class for the disc above the top-most disc
  // check sibling for truthy then remove 'hidden'
  //
  var A1 = document.getElementById('A1');
  A1.firstElementChild.classList.remove('hidden');



})
