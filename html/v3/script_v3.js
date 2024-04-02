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

        // Tooltip servant à afficher les images.
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

        // Popup
        let ovId = "o"+pokemon._pokemon_id;
        let popId = "p"+pokemon._pokemon_id;

        var overlay = document.createElement("div");
        overlay.setAttribute("id", ovId);
        overlay.classList.add("overlay");

        var popup = document.createElement("div");
        popup.setAttribute("id", popId);
        popup.classList.add("popup");


        var containerTitre = document.createElement("div");
        var titre = document.createElement("h2");
        titre.textContent = pokemon._pokemon_name + "(n°" + pokemon._pokemon_id +")";
        containerTitre.appendChild(titre);

        var mesAttaques = document.createElement("div");

        var fastAtk = document.createElement("h3");
        fastAtk.textContent = "Attaques rapides :";
        var listFastAtk = document.createElement("ul");
        for(let fastMove of pokemon._fast_moves){
            let elem = document.createElement("li");
            elem.textContent = fastMove._name;
            listFastAtk.appendChild(elem);
        }

        mesAttaques.appendChild(fastAtk);
        mesAttaques.appendChild(listFastAtk);

        var chargedAtk = document.createElement("h3");
        chargedAtk.textContent = "Attaques chargées :";
        var listChargedMoves = document.createElement("ul");
        for(let chargedMove of pokemon._charged_moves){
            let elem = document.createElement("li");
            elem.textContent = chargedMove._name;
            listChargedMoves.appendChild(elem);
        }

        mesAttaques.appendChild(chargedAtk);
        mesAttaques.appendChild(listChargedMoves);

        var boutonFermeture = document.createElement("button");
        boutonFermeture.textContent = "Fermer";
        boutonFermeture.classList.add("bouton");
        boutonFermeture.addEventListener("click", ()=>{
            closePopup(popId, ovId);
        })
        mesAttaques.appendChild(boutonFermeture);

        popup.appendChild(containerTitre);
        popup.appendChild(mesAttaques);
        
        //row.setAttribute("onclick", `openPopup(${popId}, ${ovId})`);
        row.addEventListener("click", ()=>{
            openPopup(popId, ovId);
        })

        tbody.appendChild(overlay);
        tbody.appendChild(popup);
        tbody.appendChild(row);
    });
}

// Ouvrir la popup
function openPopup(id, overlay) {
    var popup = document.getElementById(id);
    var overlayPopup = document.getElementById(overlay);
    popup.style.display = 'block';
    overlayPopup.style.display = 'block';
    overlayPopup.addEventListener('click', function (event) {
        if (event.target === overlayPopup) {
            popup.style.display = 'none';
            overlayPopup.style.display = 'none';
        }
    });
}

// Fermer la popup
function closePopup(id, overlay) {
    var popup = document.getElementById(id);
    var overlay = document.getElementById(overlay);
    popup.style.display = 'none';
    overlay.style.display = 'none';
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






