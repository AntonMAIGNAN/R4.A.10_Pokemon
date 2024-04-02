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
            source = "../webp/thumbnails/00" + pokemon._pokemon_id + ".webp";
            img.setAttribute('src', source);
        } else if (parseInt(pokemon._pokemon_id) < 100){
            source = "../webp/thumbnails/0" + pokemon._pokemon_id + ".webp";
            img.setAttribute('src', source);
        } else {
            source = "../webp/thumbnails/" + pokemon._pokemon_id + ".webp";
            img.setAttribute('src', source);
        }
        img.setAttribute("class", "pokeImage");
        illustration.appendChild(img);
        row.appendChild(illustration);

        row.setAttribute("class", "rowClick");       
        tbody.appendChild(row);

        const mesPokeImages = Array.from(document.getElementsByClassName("pokeImage"));
        for (let pokeImage of mesPokeImages) {
            pokeImage.addEventListener("mouseover", function(event) {
                // Définir les coordonnées de la bulle
                var x = event.clientX + window.scrollX + 2; 
                var y = event.clientY + window.scrollY + 5; 

                // Afficher la bulle
                var tooltip = document.getElementById("tooltip");
                tooltip.style.display = "flex";
                tooltip.style.position = "absolute";
                tooltip.style.top = y + "px";
                tooltip.style.left = x + "px";

                // Afficher l'image dans la bulle.
                var imageBulle = document.getElementById("tooltipImage");
                imageBulle.setAttribute("src", pokeImage.src.replace("thumbnails", "images"));
            });

            pokeImage.addEventListener("mouseout", ()=>{
                // Masquer la bulle d'information lorsque la souris quitte l'image
                var tooltip = document.getElementById("tooltip");
                tooltip.style.display = "none";
            });
        }

        // Créer la popup pour cette ligne
        /*row.addEventListener("click", function(event) {
            // Fermer la popup active, s'il y en a une
            fermerPopupActive();

            let popup = document.createElement("div");
            popup.classList.add("popup");

            let popupTitle = document.createElement("h2");
            popupTitle.textContent = `${pokemon._pokemon_name} (N°${pokemon._pokemon_id})`;
            popup.appendChild(popupTitle);

            let generationInfo = document.createElement("p");
            generationInfo.textContent = `Génération: ${pokemon._generation}`;
            popup.appendChild(generationInfo);

            let typesInfo = document.createElement("p");
            typesInfo.textContent = `Types: ${type}`;
            popup.appendChild(typesInfo);

            let enduranceInfo = document.createElement("p");
            enduranceInfo.textContent = `Endurance: ${pokemon._base_stamina} PV`;
            popup.appendChild(enduranceInfo);

            let attaqueInfo = document.createElement("p");
            attaqueInfo.textContent = `Attaque: ${pokemon._base_attack} ATK`;
            popup.appendChild(attaqueInfo);

            let defenseInfo = document.createElement("p");
            defenseInfo.textContent = `Défense: ${pokemon._base_defense} DEF`;
            popup.appendChild(defenseInfo);

            let boutonFermeture = document.createElement("button");
            boutonFermeture.classList.add("bouton");
            boutonFermeture.textContent = "Fermer";
            boutonFermeture.addEventListener("click", ()=>{
                let e = document.querySelector(".popup");
                e.parentNode.removeChild(e);
            });
            popup.appendChild(boutonFermeture);

            // Ajoutez la popup à la page
            document.body.appendChild(popup);

            
            let ligneTop = event.clientX + window.scrollX + 2;
            let ligneLeft = event.clientX + window.scrollX + 2;
            // Positionnez la popup au-dessus de la ligne
            popup.style.top = `${ligneTop}px`;
            popup.style.left = `${ligneLeft}px`;
        });*/
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

// Fonction pour fermer la popup active
function fermerPopupActive() {
    let popupActive = document.querySelector(".popup");
    if (popupActive) {
        popupActive.parentNode.removeChild(popupActive);
    }
}






