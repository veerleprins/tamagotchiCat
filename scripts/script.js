document.getElementById('Aai').addEventListener('click', function () {
  clicked('Aai')
});
document.getElementById('Maak_schoon').addEventListener('click', function () {
  clicked('Maak_schoon')
});
document.getElementById('Geef_eten').addEventListener('click', function () {
  clicked('Geef_eten')
});

var textBoxCat = document.getElementById('textCat');
var kittieCat = document.getElementById('cat');
var textBox = document.getElementById('textVak');
var imageList = ['Cat_happy.svg', 'Cat_sad.svg', 'Cat_satisfied.svg',
  'Cat_shocked.svg', 'Cat_dissapointed.svg', 'Cat_dead.svg'
];

var moodPet = 0;
var dirtyPet = 0;
var hungryPet = 0;
var agePet = 0;
var interval = setInterval(update, 7000);

function changeImage() {
  //This function changes the image to a sad cat when the values are above 7.
  if (hungryPet > 7 || dirtyPet > 7 || moodPet > 7) {
    kittieCat.src = ('images/' + imageList[1]);
  };
  return;
};

function update() {
  //This function changes the values ​​after 6.5 seconds and adjusts them 
  //unless checkDead === true. Then the code will change to the 'dead'
  //version anyway.
  hungryPet += 2;
  dirtyPet += 1;
  moodPet += 2;
  changeText(hungryPet, dirtyPet, moodPet);
  changeImage();
  var dead = checkDead(moodPet, dirtyPet, hungryPet);
  if (dead == true) {
    textBox.innerHTML = ("Your tamagotchi didn't survive...");
    kittieCat.src = 'images/' + imageList[5];
    textBoxCat.innerHTML = ('R.I.P.');
    clearTimeout(interval);
  };
  return;
};

function clicked(clicked_id) {
  //This function first checks whether the cat has values below 10.
  //It also checks whether the age is under 9. If this is the case, 
  //the function will check which button is pressed. When this isn't 
  //the case, the user will see whether the tamagotchi has survived 
  //or whether the tamagotchi has died.
  var dead = checkDead(moodPet, dirtyPet, hungryPet);
  if ((agePet < 9) && (dead == false)) {
    agePet++;
    document.getElementById('petAge').innerHTML = ('Age: ' + agePet);
    if (clicked_id == 'Geef_eten') {
      giveFood();
    } else if (clicked_id == 'Aai') {
      pet();
    } else if (clicked_id == 'Maak_schoon') {
      clean();
    };
  };
  if (dead == true) {
    textBox.innerHTML = ("Your tamagotchi didn't survive...");
    kittieCat.src = 'images/' + imageList[5];
    textBoxCat.innerHTML = ('R.I.P.');
    clearTimeout(interval);
  };
  if (agePet >= 9) {
    textBox.innerHTML = ('Your tamagotchi survived!');
    textBoxCat.innerHTML = ('Miaaaauw');
    kittieCat.src = 'images/' + imageList[2];
    clearTimeout(interval);
  };
  return;
};

function checkDead(mood, dirty, hungry) {
  //This function checks wheter the values are below 10 procent and 
  //returns boolean with false or true.
  if ((mood < 10) && (dirty < 10) && (hungry < 10)) {
    return false;
  } else {
    return true;
  };
};

function checkNul(x) {
  //This function checks if the values are numbers. If it's
  //a negative number, it returns a 0.
  if (x < 0) {
    x = 0;
  }
  return x;
};

function pet() {
  //This function changes the image to a happy cat, gives a new
  //text to the 'textBoxCat' of the tamagotchi and changes the values
  //of 'hungryPet' and 'moodPet'.
  kittieCat.src = 'images/' + imageList[2];
  textBoxCat.innerHTML = ('Prrrrrr');
  setTimeout(myFunction, 1500);
  hungryPet += 1;
  moodPet -= 4;
  changeText(hungryPet, dirtyPet, moodPet);
  return;
};

function changeText(c_hungry, c_dirty, c_mood) {
  //This function first sends the values ​​to checkNul and then changes
  //the inner HTMLs using a forloop to the new values.
  c_hungry = checkNul(c_hungry);
  c_dirty = checkNul(c_dirty);
  c_mood = checkNul(c_mood);
  var myArray = ['Hungry', 'Dirty', 'Mood'];
  var myArray2 = [c_hungry, c_dirty, c_mood];
  for (var i = 0; i < myArray.length; i++) {
    document.getElementById(myArray[i]).innerHTML = (myArray[i] + ': ' + myArray2[i])
  };
  return;
};

function clean() {
  //This function first checks if the cat is dirty enough. When this 
  //is not the case, it changes the image to a sad cat. Then the 
  //values ​​are changed again.
  if (dirtyPet < 2) {
    kittieCat.src = 'images/' + imageList[4];
    textBoxCat.innerHTML = ("...");
  } else {
    kittieCat.src = 'images/' + imageList[3];
    textBoxCat.innerHTML = ('Miauw? *food?*');
  };
  setTimeout(myFunction, 1500);
  dirtyPet -= 4;
  hungryPet += 3;
  moodPet += 2;
  changeText(hungryPet, dirtyPet, moodPet);
  return;
};

function giveFood() {
  //This function changes the background image, gives a new text to 
  //the 'textBoxCat' of the tamagotchi and changes the values ​​of 'hungerPet'
  // and 'moodPet'. In addition, there will be an interval so that the 
  //background and the tamagotchi image will change again.
  document.body.style.backgroundImage = "url('images/Livingroom_withfood.png')";
  kittieCat.src = 'images/' + imageList[2];
  textBoxCat.innerHTML = ('Nomnomnom');
  setTimeout(myFunction, 1500);
  dirtyPet += 2;
  hungryPet -= 4;
  moodPet -= 2;
  changeText(hungryPet, dirtyPet, moodPet);
  return;
};

function myFunction() {
  //This function changes the background image together with the cat image
  //back to the original images.
  document.body.style.backgroundImage = "url('images/Livingroom_image.png')";
  textBoxCat.innerHTML = ('');
  kittieCat.src = 'images/' + imageList[0];
  return;
};