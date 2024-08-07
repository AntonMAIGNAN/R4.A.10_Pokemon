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
        gen.innerHTML = (pokemon._generation > 0 ? "GEN " + pokemon._generation : '???');
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

        img.addEventListener("mouseover", function(event) {
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
            imageBulle.setAttribute("src", img.src.replace("thumbnails", "images"));
        });

        img.addEventListener("mouseout", ()=>{
            // Masquer la bulle d'information lorsque la souris quitte l'image
            var tooltip = document.getElementById("tooltip");
            tooltip.style.display = "none";
        });

        illustration.appendChild(img);
        row.appendChild(illustration);  

        

        // Popup
        var couleur = definirCouleur(pokemon.getTypes()[0]._type);
        let ovId = "o"+pokemon._pokemon_id;
        let popId = "p"+pokemon._pokemon_id;

        var overlay = document.createElement("div");
        overlay.setAttribute("id", ovId);
        overlay.classList.add("overlay");

        var popup = document.createElement("div");
        popup.setAttribute("id", popId);
        popup.classList.add("popup");

        var close = document.createElement("div");
        
        var fermeture = document.createElement("img");
        fermeture.setAttribute('src', '../webp/icons/fermer.png');
        fermeture.setAttribute('width', '20px');
        fermeture.setAttribute('alt', 'icon fermeture');
        fermeture.setAttribute('title', 'fermer');
        fermeture.addEventListener("mouseenter", ()=>{
            close.style.backgroundColor = `${couleur}`;
        })
        fermeture.addEventListener("mouseout", ()=>{
            close.style.backgroundColor = "transparent";
        })
        close.appendChild(fermeture);
        close.classList.add("fermeture");
        close.addEventListener("click", ()=>{
            closePopup(popId, ovId);
        })
        popup.appendChild(close);
        

        // *** Partie 1 : Statistiques et informations.
        var part1 = document.createElement("div");
        part1.style.display = "flex";
        part1.style.justifyContent = 'space-evenly';

        // Partie gauche
        var divGauche = document.createElement("div");
        divGauche.classList.add("divGauche");

        var headPopup = document.createElement("div");
        headPopup.classList.add("headPopup");

        var containerTitre = document.createElement("div");
        
        containerTitre.style.backgroundColor = `${couleur}`;
        containerTitre.classList.add("titlePopup");

        var titre = document.createElement("h2");
        titre.textContent = pokemon._pokemon_name + " N°" + pokemon._pokemon_id;

        var sprite = document.createElement("img");
        let src = "";
        if (parseInt(pokemon._pokemon_id) < 10){
            src = "../webp/sprites/00" + pokemon._pokemon_id + "MS.webp";
            sprite.setAttribute('src', src);
        } else if (parseInt(pokemon._pokemon_id) < 100){
            src = "../webp/sprites/0" + pokemon._pokemon_id + "MS.webp";
            sprite.setAttribute('src', src);
        } else {
            src = "../webp/sprites/" + pokemon._pokemon_id + "MS.webp";
            sprite.setAttribute('src', src);
        }
        sprite.setAttribute("width", "35px");
        sprite.setAttribute("height", "35px");

        var types = document.createElement("div");
        types.classList.add("types");
        for(let type of pokemon.getTypes()){
            let imgType = document.createElement("img");
            let src = "../webp/types/" + type + ".png";
            imgType.setAttribute("src", src);
            imgType.setAttribute("title", type);
            imgType.setAttribute("alt", "Type = " + type);
            imgType.setAttribute("width", "100px");
            imgType.setAttribute("height", "22px");
            types.appendChild(imgType);
        }

        // -- Statistiques
        var stats = document.createElement("div");
        stats.classList.add("stats");
        var divLabel = document.createElement("div");
        divLabel.classList.add("divLabel");
        var divStat = document.createElement("div");
        divStat.classList.add("divStat");
        var divIcon = document.createElement("div");
        divIcon.classList.add("divIcon");

        // Endurance
        var hpLabel = document.createElement("span");
        hpLabel.textContent = "Endurance";

        var hpStat = document.createElement("span");
        hpStat.textContent = pokemon._base_stamina;

        var hpIcon = document.createElement("img");
        hpIcon.setAttribute("src", "../webp/icons/hp.svg");
        hpIcon.setAttribute("alt", "Icone de vitalité");
        hpIcon.setAttribute("title", "HP");

        // Attaque
        var atqLabel = document.createElement("span");
        atqLabel.textContent = "Attaque";

        var atqStat = document.createElement("span");
        atqStat.textContent = pokemon._base_attack;

        var atqIcon = document.createElement("img");
        atqIcon.setAttribute("src", "../webp/icons/atk.svg");
        atqIcon.setAttribute("alt", "Icone d'attaque");
        atqIcon.setAttribute("title", "ATK");

        // Defense
        var defLabel = document.createElement("span");
        defLabel.textContent = "Défense";

        var defStat = document.createElement("span");
        defStat.textContent = pokemon._base_defense;

        var defIcon = document.createElement("img");
        defIcon.setAttribute("src", "../webp/icons/def.svg");
        defIcon.setAttribute("alt", "Icone de défense");
        defIcon.setAttribute("title", "DEF");

        // Construction des divs
        // - LABEL
        divLabel.appendChild(hpLabel);
        divLabel.appendChild(atqLabel);
        divLabel.appendChild(defLabel);
        // - STAT
        divStat.appendChild(hpStat);
        divStat.appendChild(atqStat);
        divStat.appendChild(defStat);
        // - ICON
        divIcon.appendChild(hpIcon);
        divIcon.appendChild(atqIcon);
        divIcon.appendChild(defIcon);

        // Construction des STATISTIQUES
        stats.appendChild(divLabel);
        stats.appendChild(divStat);
        stats.appendChild(divIcon);

        // -- Construction de la partie gauche.
        // Le titre
        containerTitre.appendChild(sprite);
        containerTitre.appendChild(titre);
        headPopup.appendChild(containerTitre);
        // Les types
        headPopup.appendChild(types);
        divGauche.appendChild(headPopup);
        // Les stats
        divGauche.appendChild(stats);

        // Partie droite
        var divDroite = document.createElement("div");
        divDroite.classList.add("partDroite");

        var imgPkm = document.createElement("img");
        let srcPkm = "";
        if (parseInt(pokemon._pokemon_id) < 10){
            srcPkm = "../webp/images/00" + pokemon._pokemon_id + ".webp";
            imgPkm.setAttribute('src', srcPkm);
        } else if (parseInt(pokemon._pokemon_id) < 100){
            srcPkm = "../webp/images/0" + pokemon._pokemon_id + ".webp";
            imgPkm.setAttribute('src', srcPkm);
        } else {
            srcPkm = "../webp/images/" + pokemon._pokemon_id + ".webp";
            imgPkm.setAttribute('src', srcPkm);
        }
        imgPkm.setAttribute("alt", "Image de " + pokemon._pokemon_name);
        imgPkm.setAttribute("width", "250px");
        imgPkm.setAttribute("height", "250px");

        // -- Construction de la partie droite
        divDroite.appendChild(imgPkm);

        // *-----* Construction de la PARTIE 1
        part1.appendChild(divGauche);
        part1.appendChild(divDroite);

        // *** Partie 2 : les attaques.
        var part2 = document.createElement("div");
        part2.classList.add("part2");
        var mesOnglets = document.createElement("div");
        mesOnglets.classList.add("mesOnglets");
        var mesContenus = document.createElement("div");
        mesContenus.classList.add("mesContenus");

        creerAttribut(pokemon._fast_moves, mesOnglets, mesContenus, 'FAST', couleur,  pokemon.getTypes()[0]._type);
        creerAttribut(pokemon._charged_moves, mesOnglets, mesContenus, 'CHARGED', couleur,  pokemon.getTypes()[0]._type);

        // Rendre active la premiere attaque
        if (mesOnglets.length > 0){
            mesOnglets.firstChild.classList.add('active');
            mesOnglets.firstChild.classList.add('popup-color-' + pokemon.getTypes()[0]._type);
            mesContenus.firstChild.classList.add('activeContenu');
        }
        
        part2.appendChild(mesOnglets);
        part2.appendChild(mesContenus);

        // Constituion de la popup.
        popup.appendChild(part1);
        popup.appendChild(part2);

        row.addEventListener("click", ()=>{
            openPopup(popId, ovId, pokemon.getTypes()[0]._type);
        })

        tbody.appendChild(overlay);
        tbody.appendChild(popup);
        tbody.appendChild(row);

        popup.style.paddingBottom = "150px";
        popup.style.borderColor = couleur;

    });
}

// Ouvrir la popup
function openPopup(id, overlay, couleur) {
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
    var contenus =  Array.from(popup.getElementsByClassName("mesContenus"))[0];
    var onglets =  Array.from(popup.getElementsByClassName("mesOnglets"))[0];

    // Rendre onglet actif to inactif
    let ongletActifs = Array.from(popup.getElementsByClassName("active"));
    for(let onglet of ongletActifs){
        onglet.classList.remove('active');
        onglet.classList.remove('popup-color-' + couleur);
        onglet.classList.add('inactif');
    }

    let contenuActifs = Array.from(popup.getElementsByClassName("activeContenu"));
    for(let contenu of contenuActifs){
        contenu.classList.remove('activeContenu');
    }
    
    // Rendre active la premiere attaque
    onglets.firstChild.classList.add('active');
    onglets.firstChild.classList.add('popup-color-' + couleur);
    contenus.firstChild.classList.add('activeContenu');
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
    if ((page==1)&&(page==maxPage)){
        precedent.disabled = true;
        precedent.setAttribute("style", "cursor:not-allowed")
        suivant.disabled = true;
        suivant.setAttribute("style", "cursor:not-allowed")
    }else if (page==1){
        precedent.disabled = true;
        precedent.setAttribute("style", "cursor:not-allowed")
        suivant.disabled = false;
        suivant.setAttribute("style", "cursor:pointer")
    } else if (page==maxPage){
        suivant.disabled = true;
        suivant.setAttribute("style", "cursor:not-allowed")
        precedent.disabled = false;
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
var allPokemons = new Map(Pokemon.all_pokemons);
const pokemonPerPage = 25;
var maxPage = Math.ceil(allPokemons.size / pokemonPerPage);
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
    console.log(PAGE);
    displayPokemons(PAGE);
    verifDesactivation(PAGE);
    afficherNombrePage(PAGE);
})

function creerAttribut(tabAttacks, containerOnglets, containerContenu, typeMove, codeCouleur, couleur){
    for(let attaque of tabAttacks){
        let onglet = document.createElement("button");
        onglet.classList.add("onglet");
        onglet.textContent = attaque._name;
        onglet.setAttribute("data-anim", attaque._move_id);
        onglet.classList.add("inactif");

        onglet.addEventListener("mouseenter", ()=>{
            onglet.style.backgroundColor = `rgba(${hexToRgb(codeCouleur)}, 0.5)`;
        })
        onglet.addEventListener("mouseout", ()=>{
            onglet.style.removeProperty("background-color");
            if (onglet.classList.contains('active')){
                onglet.classList.remove("active");
                onglet.classList.add("active");
            } else{
                onglet.classList.remove("inactif");
                onglet.classList.add('inactif');
            }
        })

        onglet.addEventListener("click", ()=>{

            if (onglet.classList.contains('active')){
                return
            } else{
                onglet.classList.remove('inactif');
                onglet.classList.add('active');
                onglet.classList.add('popup-color-' + couleur);
            }

            let index = onglet.getAttribute('data-anim');
            var lesOnglets = Array.from(document.getElementsByClassName("onglet"));
            for(let i=0; i < lesOnglets.length; i++){
                
                if(lesOnglets[i].getAttribute("data-anim")!=index){
                    onglet.classList.add('inactif');
                    lesOnglets[i].classList.remove("active");
                    lesOnglets[i].classList.remove('popup-color-' + couleur);
                }
            }

            var lesContenus = Array.from(document.getElementsByClassName("contenu"));
            for(let j=0; j < lesContenus.length; j++){

                if(lesContenus[j].getAttribute('data-anim')==index){
                    lesContenus[j].classList.add('activeContenu');
                } else {
                    lesContenus[j].classList.remove('activeContenu');
                }
            }
            
        })

        let contenu = document.createElement("div");
        let contenuGauche = document.createElement("div");
        let contenuDroit = document.createElement("div");

        // Container des attributs de l'attaque
        contenu.setAttribute("data-anim", attaque._move_id);
        contenu.classList.add("contenu");

        // Type de mouvement.
        var move = document.createElement("p");
        move.style.borderColor = `${codeCouleur}`;
        move.classList.add("move");
        move.textContent = typeMove;
        contenu.appendChild(move);

        // -- GAUCHE

        // - Durée
        let duree = document.createElement("div");
        duree.classList.add("row-attribute");
        duree.innerHTML = "<p class='label'>Durée  :  </p><p class='value'>" + attaque._duration + " ms</p>";
        contenuGauche.appendChild(duree);

        // - Coût en énergie
        let drain = document.createElement("div");
        drain.classList.add("row-attribute");
        drain.innerHTML = "<p class='label'> Drain d'énergie  : </p><p class='value'>" + attaque._energy_delta + "</p>";
        contenuGauche.appendChild(drain);

        // - Type
        let type = document.createElement("div");
        type.classList.add("row-attribute");
        type.innerHTML = "<p class='label'>Type  : </p><p class='value'> " + attaque._type._type + "</p>";
        contenuGauche.appendChild(type);

        contenu.appendChild(contenuGauche);

        //-- DROITE

        // - Damage
        let damage = document.createElement("div");
        damage.classList.add("row-attribute");
        damage.innerHTML = "<p class='label'>Dégat  :  </p><p class='value'>" + attaque._power + "</p>";
        contenuDroit.appendChild(damage);
        
        // - Coefficient de perte de vie
        let coeffVie = document.createElement("div");
        coeffVie.classList.add("row-attribute");
        coeffVie.innerHTML = "<p class='label'>Coefficient de dégat  : </p><p class='value'>" + attaque._stamina_loss_scaler + "</p>";
        contenuDroit.appendChild(coeffVie);

        // - Chance critique
        if ('_critical_chance' in attaque){
            let criticalChance = document.createElement("div");
            criticalChance.classList.add("row-attribute");
            criticalChance.innerHTML = "<p class='label'>Chance de coup critique  : </p><p class='value'>" + attaque._critical_chance + "</p>";
            contenuDroit.appendChild(criticalChance);
        }
        contenu.appendChild(contenuDroit);

        contenu.style.borderColor = `${codeCouleur}`;
        containerOnglets.appendChild(onglet);
        containerContenu.appendChild(contenu);
    }
}


function definirCouleur(type) {
    let couleur = '';
    switch (type) {
        case 'Bug':
            couleur = '#c2d4aa';
            break;
        case 'Dark':
            couleur = '#6c6c6c';
            break;
        case 'Dragon':
            couleur = '#435DBF';
            break;
        case 'Electric':
            couleur = '#ffe699';
            break;
        case 'Fire':
            couleur = '#ffaf7a';
            break;
        case 'Fairy':
            couleur = '#fcb9b9'; 
            break;
        case 'Fighting':
            couleur = '#d07851';
            break;
        case 'Flying':
            couleur = '#add8e6'; 
            break;
        case 'Ghost':
            couleur = '#c9c9eb'; 
            break;
        case 'Grass':
            couleur = '#a4cf9e';
            break;
        case 'Ground':
            couleur = '#e6bb8e'; 
            break;
        case 'Ice':
            couleur = '#afeeee';
            break;
        case 'Normal':
            couleur = '#c3c3c3';
            break;
        case 'Poison':
            couleur = '#d5a8d4';
            break;
        case 'Psychic':
            couleur = '#f5a2a2';
            break;
        case 'Rock':
            couleur = '#c3b091';
            break;
        case 'Steel':
            couleur = '#b0c4de';
            break;
        case 'Water':
            couleur = '#a2cffe';
            break;
        default:
            couleur = '#ffffff'; // Couleur par défaut
    }
    return couleur;
}

// Fonction pour convertir une couleur hexadécimale en RGB
function hexToRgb(hex) {
    // Supprimer le "#" du début de la chaîne hexadécimale si présent
    hex = hex.replace(/^#/, '');

    // Séparer les composantes RGB
    let r = parseInt(hex.substring(0, 2), 16);
    let g = parseInt(hex.substring(2, 4), 16);
    let b = parseInt(hex.substring(4, 6), 16);

    // Retourner les composantes RGB sous forme de chaîne
    return `${r}, ${g}, ${b}`;
}

var filteredMap= new Map(allPokemons)

// Compléte dynamiquement le select des TYPES dans les filtres 
const typeSelect = document.getElementById("type-select");
var rond = Array.from(document.getElementsByClassName("rond"))[0];
var allTypes = Type.all_types;

var option = document.createElement("option");
option.classList.add("option");
option.setAttribute("value", "noType");
option.textContent = " -- Type -- ";
typeSelect.appendChild(option);

for(let [type, object] of allTypes){
    let option = document.createElement("option");
    option.classList.add("option");
    option.setAttribute("value", type);
    let color = definirCouleur(type);
    option.textContent = type;
    option.addEventListener("mouseenter", ()=>{
        option.style.backgroundColor = color;
    })
    option.addEventListener("mouseout", ()=>{
        option.style.backgroundColor = 'transparent';
    })
    option.addEventListener("click", ()=>{
        rond.style.backgroundColor = color;
    })
    typeSelect.appendChild(option);
}


// Compléte dynamiquement le select des GEN dans les filtres 
const genSelect = document.getElementById("gen-select");

var option = document.createElement("option");
option.classList.add("option");
option.setAttribute("value", "noGen");
option.textContent = " -- Génération -- ";
genSelect.appendChild(option);

for(let generation of Pokemon.all_generations){
    let option = document.createElement("option");
    option.classList.add("option");
    option.setAttribute("value", generation);
    option.textContent = "GEN " + generation;
    
    genSelect.appendChild(option);
}


const nom = document.getElementById("name")

// Fonction pour filtrer les Pokémon en fonction des sélections dans les menus déroulants et du texte entré dans le champ nom
function filtrageCombine() {
    let pokemonsFiltres = new Map(Pokemon.all_pokemons);

    let selectedType = typeSelect.value;
    let selectedGen = genSelect.value;

    // Filtrer en fonction du type sélectionné dans le menu déroulant
    if (selectedType !== 'noType') {
        pokemonsFiltres = new Map(Array.from(pokemonsFiltres.entries()).filter(([_, pokemon]) => {
            let typesMap = pokemon.getTypes();
            return Array.from(typesMap.values()).some(type => type._type === selectedType);
        }));
    }

    // Filtrer en fonction de la génération sélectionnée dans le menu déroulant
    if (selectedGen !== 'noGen') {
        pokemonsFiltres = new Map([...pokemonsFiltres.entries()].filter(([_, pokemon]) => pokemon._generation == selectedGen));
    }

    // Filtrer en fonction du nom saisi dans le champ nom
    if (nom.value !== '') {
        pokemonsFiltres = new Map([...pokemonsFiltres.entries()].filter(([_, pokemon]) => pokemon._pokemon_name.toLowerCase().includes(nom.value.toLowerCase())));
    }

    // Mettre à jour maxPage et PAGE
    maxPage = Math.ceil(pokemonsFiltres.size / pokemonPerPage);
    PAGE = 1;

    allPokemons = new Map(pokemonsFiltres);

    // Afficher les Pokémon filtrés
    displayPokemons(1);
    verifDesactivation(1);
    afficherNombrePage(1);
}

// Écouter les changements dans le menu déroulant type-select
typeSelect.addEventListener("change", () => {
    filtrageCombine();
});

// Écouter les changements dans le menu déroulant gen-select
genSelect.addEventListener("change", () => {
    filtrageCombine();
});

// Écouter les changements dans le champ nom
nom.addEventListener("input", () => {
    filtrageCombine();
});



var compt = 0;
var click ="";

document.querySelectorAll("th").forEach((enTete, index) => {
    enTete.addEventListener("click", () => {
        compt ++;
        switch(compt % 2){
            case 0 :
                //pas de click
                click = "tri_croissant";
                break;
            case 1 : 
                //1 click
                click = "tri_decroissant";
                break;
        }
        for(let th of document.getElementsByTagName("th")){
            th.style.fontWeight = "500";
            th.innerHTML = th.id.toUpperCase();
        }
        switch (index) {
            case 0:
                trierListePokemon('id', click);
                let id = document.getElementById("id");
                id.style.fontWeight = '900';
                if(click == "tri_decroissant"){
                    id.innerHTML = "ID &#9660;";
                } else {
                    id.innerHTML = "ID &#9650;";
                }
                break;
            case 1:
                trierListePokemon('nom', click);
                let nom = document.getElementById("nom");
                nom.style.fontWeight = '900';
                if(click == "tri_decroissant"){
                    nom.innerHTML = "NOM &#9660;";
                } else {
                    nom.innerHTML = "NOM &#9650;";
                }
                break;
            case 2:
                trierListePokemon('generation', click);
                let generation = document.getElementById("génération");
                generation.style.fontWeight = '900';
                if(click == "tri_decroissant"){
                    generation.innerHTML = "GÉNÉRATION &#9660;";
                } else {
                    generation.innerHTML = "GÉNÉRATION &#9650;";
                }
                break;
            case 3:
                trierListePokemon('types', click);
                let types = document.getElementById("types");
                types.style.fontWeight = '900';
                if(click == "tri_decroissant"){
                    types.innerHTML = "TYPES &#9660;";
                } else {
                    types.innerHTML = "TYPES &#9650;";
                }
                break;
            case 4:
                trierListePokemon('endurance', click);
                let endurance = document.getElementById("endurance");
                endurance.style.fontWeight = '900';
                if(click == "tri_decroissant"){
                    endurance.innerHTML = "ENDURANCE &#9660;";
                } else {
                    endurance.innerHTML = "ENDURANCE &#9650;";
                }
                break;
            case 5:
                trierListePokemon('attaque', click);
                let attaque = document.getElementById("attaque");
                attaque.style.fontWeight = '900';
                if(click == "tri_decroissant"){
                    attaque.innerHTML = "ATTAQUE &#9660;";
                } else {
                    attaque.innerHTML = "ATTAQUE &#9650;";
                }
                break;
            case 6:
                trierListePokemon('defense', click);
                let defense = document.getElementById("defense");
                defense.style.fontWeight = '900';
                if(click == "tri_decroissant"){
                    defense.innerHTML = "DEFENSE &#9660;";
                } else {
                    defense.innerHTML = "DEFENSE &#9650;";
                }
                break;
            default:
                break;
        }
    });
});


function trierListePokemon(critere, click) {
    let tab = Array.from(allPokemons.entries());
    console.log(critere + " " + click);

    if (critere === "id") {
        if (click === "tri_decroissant") {
            tab.sort((pokemonA, pokemonB) => {
                return pokemonB[1]._pokemon_id - pokemonA[1]._pokemon_id;
            });
        } else {
            tab.sort((pokemonA, pokemonB) => {
                return pokemonA[1]._pokemon_id - pokemonB[1]._pokemon_id;
            });
        }
    } else if (critere === "nom") {
        if (click === "tri_decroissant") {
            tab.sort((pokemonA, pokemonB) => {
                return pokemonB[1]._pokemon_name.localeCompare(pokemonA[1]._pokemon_name);
            });
        } else {
            tab.sort((pokemonA, pokemonB) => {
                return pokemonA[1]._pokemon_name.localeCompare(pokemonB[1]._pokemon_name);
            });
        }
    }else if (critere === "generation") {
        tab.sort((pokemonA, pokemonB) => {
            //si génération est égale alors ordre alphabétique
            if (pokemonA[1]._generation === pokemonB[1]._generation) {
                return pokemonA[1]._pokemon_name.localeCompare(pokemonB[1]._pokemon_name);
            } else {
                // Sinon on trie par génération
                if (click === "tri_decroissant") {
                    return pokemonB[1]._generation - pokemonA[1]._generation;
                } else {
                    return pokemonA[1]._generation - pokemonB[1]._generation;
                }
            }
        });
    } else if (critere === "types") {
        tab.sort((pokemonA, pokemonB) => {
            if (click === "tri_decroissant") {
                return pokemonB[1].getTypes()[0]._type.localeCompare(pokemonA[1].getTypes()[0]._type);
            } else {
                return pokemonA[1].getTypes()[0]._type.localeCompare(pokemonB[1].getTypes()[0]._type);
            }
        });
    }else if (critere === "endurance") {
        tab.sort((pokemonA, pokemonB) => {
            //si la génération est égale alors on trie par ordre alphabétique
            if (pokemonA[1]._base_stamina === pokemonB[1]._base_stamina) {
                return pokemonA[1]._pokemon_name.localeCompare(pokemonB[1]._pokemon_name);
            } else {
                // Sinon on trie par endurance
                if (click === "tri_decroissant") {
                    return pokemonB[1]._base_stamina - pokemonA[1]._base_stamina;
                } else {
                    return pokemonA[1]._base_stamina - pokemonB[1]._base_stamina;
                }
            }
        });
    } else if (critere === "attaque") {
        tab.sort((pokemonA, pokemonB) => {
            if (pokemonA[1]._base_attack === pokemonB[1]._base_attack) {
                //si l'attaque est égale alors on trie par ordre alphabétique
                return pokemonA[1]._pokemon_name.localeCompare(pokemonB[1]._pokemon_name);
            } else {
                // Sinon on trie par attaque
                if (click === "tri_decroissant") {
                    return pokemonB[1]._base_attack - pokemonA[1]._base_attack;
                } else {
                    return pokemonA[1]._base_attack - pokemonB[1]._base_attack;
                }
            }
        });
    } else if (critere === "defense") {
        tab.sort((pokemonA, pokemonB) => {
            if (pokemonA[1]._base_defense === pokemonB[1]._base_defense) {
                //si la défense est égale alors on trie par ordre alphabétique
                return pokemonA[1]._pokemon_name.localeCompare(pokemonB[1]._pokemon_name);
            } else {
                // Sinon on trie par défense
                if (click === "tri_decroissant") {
                    return pokemonB[1]._base_defense - pokemonA[1]._base_defense;
                } else {
                    return pokemonA[1]._base_defense - pokemonB[1]._base_defense;
                }
            }
        });
    }

    allPokemons = new Map(tab);
    PAGE = 1;
    displayPokemons(1);
    verifDesactivation(1);
    afficherNombrePage(1);
}
