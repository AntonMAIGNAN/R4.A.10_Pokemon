

function getPokemonsByType(typeName){
    pokemonByType = [];
    for(let [id, pokemon] of Pokemon.all_pokemons){
        for(let type of pokemon.getTypes()){
            if(type == typeName){
                pokemonByType.push(pokemon);
            }
        }       
    }
    return pokemonByType;
}

function getPokemonsByAttack(attackName){
    pokemonsByAttack = [];
    for(let [id, pokemon] of Pokemon.all_pokemons){
        for(let atq of pokemon.getAttacks()){
            if (atq._name==attackName){
                pokemonsByAttack.push(pokemon);
            }
        }
    }
    return pokemonsByAttack;
}

function getAttacksByType(typeName){
    attacksByType = [];
    for(let [id, atq] of Attack.all_attacks){
        if (atq._type==typeName){
            attacksByType.push(atq);
        }
    }
    return attacksByType;
}

function sortPokemonByName(){
    let copie = new Map(Pokemon.all_pokemons);
    pokemonByName = Array.from(copie.entries()).sort(function compare(a ,b){
        if (a[1]._pokemon_name < b[1]._pokemon_name)
            return -1;
        if (a[1]._pokemon_name > b[1]._pokemon_name)
            return 1;
        return 0;
    });
    return new Map(pokemonByName);
}    

function sortPokemonByStamina(){
    let copie = new Map(Pokemon.all_pokemons);
    pokemonByStamina = Array.from(copie.entries()).sort(function compare(a, b) {
        if (a[1]._base_stamina > b[1]._base_stamina)
            return -1;
        if (a[1]._base_stamina < b[1]._base_stamina )
            return 1;
        return 0;
    });
    pokemonByStamina = new Map(pokemonByStamina);
    return pokemonByStamina;
}

function getWeakestEnemies(attack){
    let copie = new Map(Pokemon.all_pokemons);
    WeakestEnemies = Array.from(copie.entries()).sort(function compare(a, b) {
        let typesA = a[1].getTypes();
        let typesB = b[1].getTypes();
        let typeAtq = attack._type;
        let calculEffectivenessA = 0;
        let calculEffectivenessB = 0;

        if (typesA.length>1){
            let firstEffectivenessA = typeAtq._effectiveness.get(typesA[0]._type);
            let secondEffectivenessA = typeAtq._effectiveness.get(typesA[1]._type);
            calculEffectivenessA = firstEffectivenessA * secondEffectivenessA;
        } else {
            calculEffectivenessA = typeAtq._effectiveness.get(typesA[0]._type);
        }
    
        if (typesB.length>1){
            let firstEffectivenessB = typeAtq._effectiveness.get(typesB[0]._type);
            let secondEffectivenessB = typeAtq._effectiveness.get(typesB[1]._type);
            calculEffectivenessB = firstEffectivenessB * secondEffectivenessB;
        } else {
            calculEffectivenessB = typeAtq._effectiveness.get(typesB[0]._type);
        }
            
        if (calculEffectivenessA < calculEffectivenessB)
            return -1;
        if (calculEffectivenessA > calculEffectivenessB)
            return 1;
        return 0;
        
    });
    return new Map(WeakestEnemies);
}

function getStrongestEnemies(attack){
    let copie = new Map(Pokemon.all_pokemons);
    StrongestEnemies = Array.from(copie.entries()).sort(function compare(a, b) {
        let typesA = a[1].getTypes();
        let typesB = b[1].getTypes();
        let typeAtq = attack._type;
        let calculEffectivenessA = 0;
        let calculEffectivenessB = 0;

        if (typesA.length>1){
            let firstEffectivenessA = typeAtq._effectiveness.get(typesA[0]._type);
            let secondEffectivenessA = typeAtq._effectiveness.get(typesA[1]._type);
            calculEffectivenessA = firstEffectivenessA * secondEffectivenessA;
        } else {
            calculEffectivenessA = typeAtq._effectiveness.get(typesA[0]._type);
        }
    
        if (typesB.length>1){
            let firstEffectivenessB = typeAtq._effectiveness.get(typesB[0]._type);
            let secondEffectivenessB = typeAtq._effectiveness.get(typesB[1]._type);
            calculEffectivenessB = firstEffectivenessB * secondEffectivenessB;
        } else {
            calculEffectivenessB = typeAtq._effectiveness.get(typesB[0]._type);
        }
            
        if (calculEffectivenessA > calculEffectivenessB)
            return -1;
        if (calculEffectivenessA < calculEffectivenessB)
            return 1;
        return 0;
        
    });
    return new Map(StrongestEnemies);
}

//console.log(getPokemonsByAttack("Struggle"));
//console.log(getPokemonsByType("Bug"));

/*let tab = getAttacksByType("Fire");
for(let atq of tab){
    console.log(`${atq._name} -> ${atq._type}`);
}*/
//console.log(sortPokemonByName());
//console.log(sortPokemonByStamina());
//console.log(Attack.all_attacks);
//console.log(getWeakestEnemies(Attack.all_attacks.get(90)));
//console.log(getStrongestEnemies(Attack.all_attacks.get(90)));