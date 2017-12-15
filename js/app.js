var cat_names = ["Garfield", "Sina", "Susi", "Strolch", "Felix"]
var clicks = [0,0,0,0,0]

$(function() {
  for (i=0; i < cat_names.length; i++) {
    var cat = cat_names[i];
    var elem = document.createElement('li');
    elem.textContent = cat;
    elem.addEventListener('click', (function(catCopy,i) {
      return function() {
        document.getElementById("catpic").innerHTML = '';
        $('#catname').html(catCopy);
        $('#counter').html(clicks[i]);
        var image = document.createElement('img');
        image.src = "img/" + catCopy + ".jpg";
        image.setAttribute("height", "500px");
        image.setAttribute("id", catCopy);
        document.getElementById("catpic").appendChild(image);
        var cat_click = clicks[i];
        $('#' + catCopy).click(function() {
          console.log("I am here");
          cat_click++;
          clicks[i] = cat_click;
          $('#counter').html(clicks[i]);
        });
      };
    })(cat,i));

    document.getElementById("cats").appendChild(elem);
  };
});
