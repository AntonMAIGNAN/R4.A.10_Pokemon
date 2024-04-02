Pokemon.import_pokemon();

// Fonction pour afficher les Pokémon sur une page donnée
function displayPokemons(page) {
    const startIndex = (page - 1) * pokemonPerPage;
    const endIndex = startIndex + pokemonPerPage;
    const currentPagePokemons = Array.from(allPokemons.values()).slice(startIndex, endIndex);
    
    const tbody = document.getElementById("tablo");
    tbody.innerHTML = "";
    
    currentPagePokemons.forEach(pokemon => {
        var row = document.createElement('tr');

        var id = document.createElement('td');
        id.innerHTML = "N° " + pokemon._pokemon_id;
        id.setAttribute('data-label', "ID");
        row.appendChild(id);
        

        var nom = document.createElement('td');
        nom.innerHTML = pokemon._pokemon_name;
        nom.setAttribute('data-label', "NOM");
        row.appendChild(nom);
        

        var gen = document.createElement('td');
        gen.innerHTML = "GEN " + pokemon._generation;
        gen.setAttribute('data-label', "GÉNÉRATION");
        row.appendChild(gen);
        
        var types = document.createElement('td');
        types.setAttribute('data-label', "TYPES");
        let type = "";
        sesTypes = pokemon.getTypes();
        if(sesTypes[1]==null){
            type = `${sesTypes[0]}`;
        } else {
            type = `${sesTypes[0]} & ${sesTypes[1]}`;
        }
        types.innerHTML = type;
        row.appendChild(types);

        var endurance = document.createElement('td');
        endurance.innerHTML = pokemon._base_stamina + " PV";
        endurance.setAttribute('data-label', "ENDURANCE");
        row.appendChild(endurance);

        var attaque = document.createElement('td');
        attaque.innerHTML = pokemon._base_attack + " ATK";
        attaque.setAttribute('data-label', "ATTAQUE");
        row.appendChild(attaque);

        var defense = document.createElement('td');
        defense.innerHTML = pokemon._base_defense + " DEF";
        defense.setAttribute('data-label', "DÉFENSE");
        row.appendChild(defense);

        var illustration = document.createElement('td');
        var img = document.createElement('img');
        illustration.setAttribute('data-label', "IMAGE");
        let source = "";
        if (parseInt(pokemon._pokemon_id) < 10){
            source = "../webp/images/00" + pokemon._pokemon_id + ".webp";
            img.setAttribute('src', source);
        } else if (parseInt(pokemon._pokemon_id) < 100){
            source = "../webp/images/0" + pokemon._pokemon_id + ".webp";
            img.setAttribute('src', source);
        } else {
            source = "../webp/images/" + pokemon._pokemon_id + ".webp";
            img.setAttribute('src', source);
        }
        img.setAttribute("height", "50px");
        img.setAttribute("width", "50px");
        illustration.appendChild(img);
        row.appendChild(illustration);
        
        tbody.appendChild(row);
    });
}

// Désactiver les boutons quand nécessaires
function verifDesactivation(page){
    if (page==1){
        precedent.disabled = true;
        precedent.setAttribute("style", "cursor:not-allowed")
        suivant.setAttribute("style", "cursor:pointer")
    } else if (page==maxPage){
        suivant.disabled = true;
        suivant.setAttribute("style", "cursor:not-allowed")
        precedent.setAttribute("style", "cursor:pointer")
    } else {
        precedent.disabled = false;
        suivant.disabled = false;
        precedent.setAttribute("style", "cursor:pointer")
        suivant.setAttribute("style", "cursor:pointer")
    }
}

// Afficher dans mon SPAN #page : le numéro de la page courante.
function afficherNombrePage(page){
    let textContainer = document.getElementById("page");
    textContainer.textContent = `${page} / ${maxPage}`;
}

// Initialisation de la PAGE n°1
const suivant = document.getElementById("suivant");
const precedent = document.getElementById("precedent");
const allPokemons = new Map(Pokemon.all_pokemons);
const pokemonPerPage = 25;
const maxPage = Math.ceil(allPokemons.size / pokemonPerPage);
var PAGE = 1;
displayPokemons(PAGE);
verifDesactivation(PAGE);
afficherNombrePage(PAGE);

// Ajouts d'événement sur les boutons.
// -- bouton "SUIV" 
suivant.addEventListener("click", ()=>{
    PAGE++;
    displayPokemons(PAGE);
    verifDesactivation(PAGE);
    afficherNombrePage(PAGE);
})

// -- bouton "PREC"
precedent.disabled = true;
precedent.addEventListener("click", ()=>{
    PAGE--;
    displayPokemons(PAGE);
    verifDesactivation(PAGE);
    afficherNombrePage(PAGE);
})




