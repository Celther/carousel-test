let gallery = [
  {
    heading: "Treatment",
    subheading: "After X Peels",
    beforeImage: {
      url: "images/dos.jpg",
      issue: "acne"
    },
    afterImage: {
      url: "images/emma-stone.jpg",
      issue: "acne"
    }
  },
  {
    heading: "Treatment 2",
    subheading: "After Y Peels",
    beforeImage: {
      url: "images/face9.jpg",
      issue: "acne"
    },
    afterImage: {
      url: "images/face11.jpg",
      issue: "psoriasis"
    }
  }
];

// just querying the DOM...like a boss!
var links = document.querySelectorAll(".itemLinks");
var slides = document.querySelectorAll(".slide");
var wrapper = document.querySelector("#slides-wrapper");
var previousButton = document.querySelector(".previous");
var nextButton = document.querySelector('.next');

// the activeLink provides a pointer to the currently displayed item
var activeLink = 0;

//Dynamically create the slides
function createSlides(array) {
  for (var i=0; i < array.length; i++) {
    // From the CSS Property #viewport
    var slideWidth = 1040;
    newSlide = document.createElement('div');
    newCaptions = document.createElement('div');
    newH2 = document.createElement('h2');
    heading = document.createTextNode(array[i].heading);
    newH3 = document.createElement('h3');
    subheading = document.createTextNode(array[i].subheading);
    beforeFigure = document.createElement('figure');
    afterFigure = document.createElement('figure');
    wrapper.style.width = (slideWidth * array.length) + "px";
    wrapper.appendChild(newSlide);
    newSlide.setAttribute('id', ('item-' + (i + 1)));
    newSlide.classList.add('slide');
    newSlide.appendChild(newCaptions);
    newCaptions.classList.add('captions');
    newCaptions.appendChild(newH2);
    newH2.appendChild(heading);
    newCaptions.appendChild(newH3);
    newH3.appendChild(subheading);
    newSlide.appendChild(beforeFigure);
    beforeFigure.classList.add('before-image');
    beforeFigure.style.backgroundImage = "url(" + array[i].beforeImage.url + ")";
    newSlide.appendChild(afterFigure);
    afterFigure.style.backgroundImage = "url(" + array[i].afterImage.url + ")";
    afterFigure.classList.add('after-image');
    slides = document.querySelectorAll(".slide");
  }
}
createSlides(gallery);

// setup the event listeners
for (var i = 0; i < links.length; i++) {
    var link = links[i];
    link.addEventListener('click', setClickedItem, false);

    // identify the item for the activeLink
    link.itemID = i;
}
previousButton.addEventListener('click', function(ev) {
  navigate(-1);
})
nextButton.addEventListener('click', function(ev) {
  navigate(1);
})

// set first item as active
links[activeLink].classList.add("active");

function setClickedItem(e) {
    removeActiveLinks();

    var clickedLink = e.target;
    activeLink = clickedLink.itemID;

    changePosition(clickedLink, clickedLink.itemID);
}

function removeActiveLinks() {
    for (var i = 0; i < gallery.length; i++) {
        links[i].classList.remove("active");
    }
}

// Handle changing the slider position as well as ensure
// the correct link is highlighted as being active
function changePosition(link, id) {
    var pos = id * -1040;
    var translateValue = "translate3d(" + pos + "px, 0px, 0)";
    wrapper.style.transform = translateValue;

    link.classList.add("active");
}

function navigate(direction) {
  var numSlides = gallery.length;
  activeLink = activeLink + direction;
  if (direction === -1 && activeLink < 0) {
    activeLink = numSlides - 1;
  }
  if (direction === 1 && !slides[activeLink]) {
    activeLink = 0;
  }
  removeActiveLinks();
  changePosition(links[activeLink], activeLink);
}
