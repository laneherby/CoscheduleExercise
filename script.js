//Lane Herberholz
//Coschedule Coding Exercise
//Using the PokeAPI from the Github provided

//This section controls the comments for each pokemon
//A temporary array controls the comments based on the Pokemon ID
let comments = [];
function savePokeComment() {
  let commentID = document.getElementById("pokeID").innerHTML;
  if (commentID) {
    let userComment = document.getElementById("pokeComment").value;
    let commentChanged = false;

    //This loops through all comments to see if it exists and replaces it with current comment
    for (let i = 0; i < comments.length; i++) {
      if (comments[i].id === commentID) {
        comments[i].comment = userComment;
        commentChanged = true;
      }
    }

    //This happens if there is no previous comment adding a new one with Pokemon ID
    if (!commentChanged) {
      comments.push({ id: commentID, comment: userComment });
    }
  }
}

//This async function retrieves all the whole list of Pokemon for the autcomplete search
const getPokeList = async () => {
  //pokeapi call
  const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=2000");
  const resJson = await response.json();
  let results = resJson.results;

  //This loop replaces the key pair identifiers in the array of objects so jQuery autocomplete can use it
  for (let i = 0; i < results.length; i++) {
    results[i].label = results[i].name;
    delete results[i].name;

    results[i].value = results[i].url;
    delete results[i].url;
  }

  //This is api for autocomplete setting the list to the Pokemon we fetches from pokeapi
  $("#txtSearch").autocomplete({
    source: results,
    minLength: 3, //must type 3 letters in search box before results
    select: function(event, ui) { //This is calling the function for showing the Pokemon information
      event.preventDefault();
      $("#txtSearch").val(ui.item.label);
      getPokeInfo(ui.item.value);
    }
  });
};

//calling function above
getPokeList();

//This function takes the specific Pokemon endpoint and displays all important info onto the html
const getPokeInfo = async pokeURL => {
  //pokeapi call
  const response = await fetch(pokeURL);
  const resJson = await response.json();

  //setting all the labels and comments from the json provided by pokeapi
  document.getElementById("imgSprite").src = resJson.sprites.front_default;
  document.getElementById("pokeName").innerHTML = capsFirstLetter(resJson.name);
  document.getElementById("pokeID").innerHTML = resJson.id;

  let types = [];
  for (let i = 0; i < resJson.types.length; i++) {
    types.push(capsFirstLetter(resJson.types[i].type.name));
  }
  document.getElementById("pokeType").innerHTML = types.join(", ");

  let abilities = [];
  for (let i = 0; i < resJson.abilities.length; i++) {
    abilities.push(capsFirstLetter(resJson.abilities[i].ability.name));
  }

  document.getElementById("pokeAbilities").innerHTML = abilities.join(", ");
  document.getElementById("pokeBaseXP").innerHTML = resJson.base_experience;
  document.getElementById("pokeSpeed").innerHTML = resJson.stats[0].base_stat;
  document.getElementById("pokeSpDef").innerHTML = resJson.stats[1].base_stat;
  document.getElementById("pokeSpAtt").innerHTML = resJson.stats[2].base_stat;
  document.getElementById("pokeDef").innerHTML = resJson.stats[3].base_stat;
  document.getElementById("pokeAtt").innerHTML = resJson.stats[4].base_stat;
  document.getElementById("pokeHP").innerHTML = resJson.stats[5].base_stat;
  document.getElementById("hiddenPokeURL").val = pokeURL;

  document.getElementById("pokeComment").value = "";
  for (let i = 0; i < comments.length; i++) {
    if (comments[i].id === resJson.id.toString()) {
      document.getElementById("pokeComment").value = comments[i].comment;
    }
  }
};

//This function adds the current Pokemon to the list of favorites
function addFavoritePoke() {
  let ul = document.getElementById("pokeFavs");

  //creates new list item for list of favorites
  let li = document.createElement("li");
  li.setAttribute("value", document.getElementById("hiddenPokeURL").val);
  li.setAttribute("name", document.getElementById("pokeName").innerHTML);
  li.setAttribute("ID", "li-" + document.getElementById("pokeID").innerHTML);
  li.appendChild(
    document.createTextNode(
      document.getElementById("pokeName").innerHTML + "\u00A0\u00A0\u00A0\u00A0"
    )
  );

  //creates button that lets you view selected favorite Pokemon
  let viewBtn = document.createElement("button");
  viewBtn.innerHTML = "View";
  viewBtn.onclick = function() {
    viewFavoritePoke(event);
  };
  li.appendChild(viewBtn);

  //creates button that lets you remove selected Pokemon from favorites
  let removeBtn = document.createElement("button");
  removeBtn.innerHTML = "Remove";
  removeBtn.onclick = function() {
    removeFavoritePoke(event);
  };
  li.appendChild(removeBtn);

  //adds list item that has been created
  ul.appendChild(li);
}

//Calls get Pokemon info function for selected favorite
function viewFavoritePoke(e) {
  $("#txtSearch").val(e.target.parentElement.attributes["name"].value);
  getPokeInfo(e.target.parentElement.attributes["value"].value);
}

//removes list item from favorite Pokemon list
function removeFavoritePoke(e) {
  e.target.parentElement.remove();
}

//Extra function to capitalize first letter of string for Pokemon names
function capsFirstLetter(pokeName) {
  return pokeName.charAt(0).toUpperCase() + pokeName.slice(1);
}
