Pokemon.import_pokemon();
const allPokemons = new Map(Pokemon.all_pokemons);

// Nombre de Pokémon par page
const pokemonPerPage = 25;
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
        id.innerHTML = "N° " + pokemon.id; // Suppose que pokemon a une propriété 'id'
        id.setAttribute('data-label', "ID");
        row.appendChild(id);
        
        var nom = document.createElement('td');
        nom.innerHTML = pokemon.name; // Suppose que pokemon a une propriété 'name'
        nom.setAttribute('data-label', "NOM");
        row.appendChild(nom);
        
        var gen = document.createElement('td');
        gen.innerHTML = "GEN " + pokemon.generation; // Suppose que pokemon a une propriété 'generation'
        gen.setAttribute('data-label', "GÉNÉRATION");
        row.appendChild(gen);
        
        // Ajoutez le reste des colonnes comme vous l'avez fait auparavant
        
        tbody.appendChild(row);
    });
}

// Fonction pour créer les boutons de pagination
function createPaginationButtons() {
    const maxPage = Math.ceil(allPokemons.size / pokemonPerPage);
    const paginationButtons = document.getElementById("paginationButtons");
    paginationButtons.innerHTML = "0";

    for (let i = 1; i <= maxPage; i++) {
        const button = document.createElement("button");
        button.textContent = i;
        button.addEventListener("click", () => {
            displayPokemons(i);
        });
        paginationButtons.appendChild(button);
    }
}

// Initialisation : afficher la première page et créer les boutons de pagination
createPaginationButtons();
displayPokemons(1);