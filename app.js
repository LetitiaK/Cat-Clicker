// Separate concerns into Model, View and "Octopus"

// Model
// The model has a variable for the currently selected cat
// and an array that holds all the data of all the available cats
var model = {
  currentCat: null,
  cats: [
    {
      clickCount: 0,
      name: "Garfield",
      imgSrc: "img/Garfield.jpg"
    },
    {
      clickCount: 0,
      name: "Sina",
      imgSrc: "img/Sina.jpg"
    },
    {
      clickCount: 0,
      name: "Susi",
      imgSrc: "img/Susi.jpg"
    },
    {
      clickCount: 0,
      name: "Strolch",
      imgSrc: "img/Strolch.jpg"
    },
    {
      clickCount: 0,
      name: "Felix",
      imgSrc: "img/Felix.jpg"
    }
  ]
};

// View
// The view is separated into the catview and the catlistview
// It is always convient to seprate the views to as small as possible views

var catView = {
    // The view requires an init function
    init: function() {

        // store pointers to our DOM elements for easy access later
        this.catElem = document.getElementById('catpage');
        this.catNameElem = document.getElementById('catname');
        this.catImageElem = document.getElementById('catpic');
        this.countElem = document.getElementById('counter');

        // on click, increment the current cat's counter
        // this goes to the octopus and not directely to the model
        this.catImageElem.addEventListener('click', function(){
            octopus.incrementCounter();
        });

        // render this view (update the DOM elements with the right values)
        this.render();
    },

    render: function() {
        // update the DOM elements with values from the current cat
        var currentCat = octopus.getCurrentCat();
        this.countElem.textContent = currentCat.clickCount;
        this.catNameElem.textContent = currentCat.name;
        this.catImageElem.src = currentCat.imgSrc;
    }
};

var catListView = {
    // A view requires an init function
    init: function() {
        // store the DOM element for easy access later
        this.catListElem = document.getElementById('cats');

        // render this view (update the DOM elements with the right values)
        this.render();
    },

    render: function() {
        var cat, elem, i;
        // get the cats we'll be rendering from the octopus
        var cats = octopus.getCats();

        // empty the cat list
        this.catListElem.innerHTML = '';

        // loop over the cats
        for (i = 0; i < cats.length; i++) {
            // this is the cat we're currently looping over
            cat = cats[i];

            // make a new cat list item and set its text
            elem = document.createElement('li');
            elem.textContent = cat.name;

            // on click, setCurrentCat and render the catView
            // (this uses our closure-in-a-loop trick to connect the value
            //  of the cat variable to the click event function)
            elem.addEventListener('click', (function(catCopy) {
                return function() {
                    octopus.setCurrentCat(catCopy);
                    catView.render();
                };
            })(cat));

            // finally, add the element to the list
            this.catListElem.appendChild(elem);
        }
    }
};

// Octopus

var octopus = {

    init: function() {
        // set our current cat to the first one in the list
        model.currentCat = model.cats[0];

        // tell our views to initialize
        catListView.init();
        catView.init();
    },

    getCurrentCat: function() {
        return model.currentCat;
    },

    getCats: function() {
        return model.cats;
    },

    // set the currently-selected cat to the object passed in
    setCurrentCat: function(cat) {
        model.currentCat = cat;
    },

    // increments the counter for the currently-selected cat
    incrementCounter: function() {
        model.currentCat.clickCount++;
        catView.render();
    }
};

// make it go!
octopus.init();
