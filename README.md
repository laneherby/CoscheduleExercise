<!DOCTYPE html>
<html>    
<meta charset="UTF-8">
<head>
    <script src="https://code.jquery.com/jquery-1.12.4.js"></script>
    <script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>
    <script src="./script.js"></script>
    <link rel="stylesheet" type="text/css" href="style.css">
    <title>Coschedule Coding Exercise</title>
</head>
<body>
    <div class="row">
        <div class="column left">
            <label>Search for Pokemon: </label>
            <input id="txtSearch" type="text" />
        </div>
        <div class="column middle">
            <img src="" id="imgSprite"></a><br />
            Pokemon: <label id="pokeName"></label><br />
            ID: <label id="pokeID"></label><br />
            Type(s): <label id="pokeType"></label><br />
            Abilities: <label id="pokeAbilities"></label><br />
            Base XP: <label id="pokeBaseXP"></label><br />
            Speed: <label id="pokeSpeed"></label><br />
            Sp. Defense: <label id="pokeSpDef"></label><br />
            Sp. Attack: <label id="pokeSpAtt"></label><br />
            Defense: <label id="pokeDef"></label><br />
            Attack: <label id="pokeAtt"></label><br />
            HP: <label id="pokeHP"></label><br /><br />            
            <input type="button" onclick="addFavoritePoke()" value="Add to Favorites">
            <input type="hidden" id="hiddenPokeURL">
        </div>
        <div class="column right">
            <label>Add a Comment</label><br />
            <textarea id="pokeComment"></textarea><br /><br />
            <input type="button" value="Save Comment" onclick="savePokeComment()">
        </div>
    </div>
    <div class="row">
        <div class="column left">
            Favorite Pokemon List<br /><br />
            <ul id="pokeFavs"></ul>
        </div>
    </div>
</body>
</html> 
