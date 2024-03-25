function getPokemonsByType(typeName){
    let pokemonByType = [];
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
    let pokemonsByAttack = [];
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
    let attacksByType = [];
    for(let [id, atq] of Attack.all_attacks){
        if (atq._type==typeName){
            attacksByType.push(atq);
        }
    }
    return attacksByType;
}

function sortPokemonByName(){
    let copie = new Map(Pokemon.all_pokemons);
    let pokemonByName = Array.from(copie.entries()).sort(function compare(a ,b){
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
    let pokemonByStamina = Array.from(copie.entries()).sort(function compare(a, b) {
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
    let WeakestEnemies = Array.from(copie.entries()).sort(function compare(a, b) {
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
    return new Map(WeakestEnemies);
}

// Elle s'appuie sur getWeakestEnemies() pour avoir le tableau trié du moins résistant au plus résistant selon une attaque donnée.
function getWeakestEnemies2(attackName){
    let weakestEnemies = [];
    let attack = null;

    // On cherche l'objet Attack en question via le nom en argument.
    for(let [id,atq] of Attack.all_attacks){
        if (atq._name == attackName){
            attack = atq;
            break;
        }
    }

    if (attack !=null){
        // On trie les pokemons du moins au plus résistant par rapport à cette attaque.
        let sortedTab = getWeakestEnemies(attack);
        
        // On cherche le coeff le moins efficace avec ses attaques.
        let typeAtq = attack._type;
        let coeffLeMoinsEffficace = 1;
        let poke1 = null;

        for(let [id, pokemon] of sortedTab){
            poke1 = pokemon;
            break;
        }

        for (let type of poke1.getTypes()){
            coeffLeMoinsEffficace *= typeAtq._effectiveness.get(type._type);
        }
        
        // On parcourt les pokémons triés selon la résistance. 
        // On les ajoute au tableau tant que leur coeff est égal a 'coeffLeMoinsEffficace'.
        let sonCoeff;
        for(let [id,pokemon] of sortedTab){
            sonCoeff = 1;
            for (let type of pokemon.getTypes()){
                sonCoeff *= typeAtq._effectiveness.get(type._type);
            }
            if (sonCoeff==coeffLeMoinsEffficace){
                weakestEnemies.push(pokemon);
            } else {
                break;
            }
        }
    }
    
    return weakestEnemies;
}

function getStrongestEnemies(attack){
    let copie = new Map(Pokemon.all_pokemons);
    let StrongestEnemies = Array.from(copie.entries()).sort(function compare(a, b) {
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

function getBestAttackTypesForEnemy(name){
    let sesTypes = null;
    let bestCoeff = 0;
    let bestAttackTypesSet = new Set();

    // Trouver le pokémon et ainsi définir ses types.
    for (let [id,pokemon] of Pokemon.all_pokemons){
        if (pokemon._pokemon_name == name){
            sesTypes = pokemon.getTypes();
            break;
        }
    }

    if (!sesTypes) {
        console.log("Pokemon not found.");
        return [];
    }

    // Boucle pour déterminer le plus gros coeff de dégat pour les types du pokemons.
    for (let [id, attack] of Attack.all_attacks){
        let coeffDegat = 1;
        for (let type of sesTypes){
            let typeEffectiveness = attack._type._effectiveness.get(type._type);
            if (typeEffectiveness !== undefined) {
                coeffDegat *= typeEffectiveness;
            }
        }
        
        // Si le coefficient de dégât est supérieur, mettre à jour les attaques les plus efficaces
        if (coeffDegat > bestCoeff){
            bestCoeff = coeffDegat;
            bestAttackTypesSet = new Set([attack._type._type]);
        } else if (coeffDegat == bestCoeff) {
            // Si le coefficient de dégât est égal, ajouter ce type d'attaque aux attaques les plus efficaces
            bestAttackTypesSet.add(attack._type._type);
        }
    }

    // Convertir l'ensemble en tableau et le retourner
    return Array.from(bestAttackTypesSet);
}


