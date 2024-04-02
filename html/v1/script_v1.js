var tbody = document.getElementById("tablo");
Pokemon.import_pokemon();

for(let [idP, pokemon] of Pokemon.all_pokemons){
    var row = document.createElement('tr');

    var id = document.createElement('td');
    id.innerHTML = "N° " + idP;
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
    if (parseInt(idP) < 10){
        source = "../webp/thumbnails/00" + idP + ".webp";
        img.setAttribute('src', source);
    } else if (parseInt(idP) < 100){
        source = "../webp/thumbnails/0" + idP + ".webp";
        img.setAttribute('src', source);
    } else {
        source = "../webp/thumbnails/" + idP + ".webp";
        img.setAttribute('src', source);
    }

    illustration.appendChild(img);
    row.appendChild(illustration);
    
    tbody.appendChild(row);
}





