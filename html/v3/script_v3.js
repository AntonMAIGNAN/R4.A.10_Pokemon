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
        var mesAttaques = document.createElement("div");
        var mesOnglets = document.createElement("div");
        var mesContenus = document.createElement("div");

        for(let fastMove of pokemon._fast_moves){
            let onglet = document.createElement("button");
            onglet.classList.add("onglet");
            onglet.textContent = fastMove._name;
            onglet.setAttribute("data-anim", fastMove._move_id);
            onglet.addEventListener("click", ()=>{

                if (onglet.classList.contains('active')){
                    return
                } else{
                    onglet.classList.add('active');
                }

                let index = onglet.getAttribute('data-anim');
                var lesOnglets = Array.from(document.getElementsByClassName("onglet"));
                for(let i=0; i < lesOnglets.length; i++){
                    
                    if(lesOnglets[i].getAttribute("data-anim")!=index){
                        lesOnglets[i].classList.remove("active");
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
            contenu.setAttribute("data-anim", fastMove._move_id);
            contenu.classList.add("contenu");
            // -- GAUCHE

            // - Durée
            let duree = document.createElement("p");
            duree.textContent = "Durée  :  " + fastMove._duration + "ms";
            contenuGauche.appendChild(duree);

            // - Coût en énergie
            let drain = document.createElement("p");
            drain.textContent = "Drain d'énergie  :  " + fastMove._energy_delta;
            contenuGauche.appendChild(drain);

            // - Type
            let type = document.createElement("p");
            type.textContent = "Type  :  " + fastMove._type._type;
            contenuGauche.appendChild(type);

            contenu.appendChild(contenuGauche);

            //-- DROITE

            // - Damage
            let damage = document.createElement("p");
            damage.textContent = "Dégat  :  " + fastMove._power;
            contenuDroit.appendChild(damage);
            
            // - Coefficient de perte de vie
            let coeffVie = document.createElement("p");
            coeffVie.textContent = "Coefficient de dégat  :  " + fastMove._stamina_loss_scaler;
            contenuDroit.appendChild(coeffVie);

            // - Chance critique
            if ('_critical_chance' in fastMove){
                let criticalChance = document.createElement("p");
                criticalChance.textContent = "Chance de coup critique  :  " + fastMove._critical_chance;
                contenuDroit.appendChild(criticalChance);
            }
            contenu.appendChild(contenuDroit);

            mesOnglets.appendChild(onglet);
            mesContenus.appendChild(contenu);
        }

        var boutonFermeture = document.createElement("button");
        boutonFermeture.textContent = "Fermer";
        boutonFermeture.classList.add("bouton");
        boutonFermeture.addEventListener("click", ()=>{
            closePopup(popId, ovId);
        })

        part2.appendChild(mesOnglets);
        part2.appendChild(mesContenus);
        
        // Constituion de la popup.
        popup.appendChild(part1);
        popup.appendChild(part2);

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

function creerAttribut(container, attaque){
    
}




