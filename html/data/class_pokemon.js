class Pokemon{
    static all_pokemons = new Map();

    constructor (gen, base_attack, base_defense, base_stamina, pokemon_id, pokemon_name, type1, type2=null, attaques_chargees, attaques_rapides) {
        this._form = 'Normal';
        this._generation = gen;
        this._base_attack = base_attack;
        this._base_defense = base_defense;
        this._base_stamina = base_stamina;
        this._pokemon_id = pokemon_id;
        this._pokemon_name = pokemon_name;
        this._type1 = type1;
        if (type2!=null){ this._type2 = type2;}
        this._charged_moves = attaques_chargees;
        this._fast_moves = attaques_rapides;
    }

    toString(){
        let type = "";
        if(this._type2==null){
            type = `Type : ${this._type1}`;
        } else {
            type = `Types : ${this._type1} & ${this._type2}`;
        }
        let moves = this.getAttacks();
        let atqs = "\tCompétences : ";
        for(let move of moves){
            atqs += ` ${move._name} .`; 
        }
        atqs += "\n";
        return `\n\n--> ID : ${this._pokemon_id} | Name : ${this._pokemon_name} (Generation ${this._generation}) | ${type}\n\tStamina : ${this._base_stamina} HP | Attaque : ${this._base_attack} DMG | Défense : ${this._base_defense} DEF\n${atqs}`;
    }

    static import_pokemon(){
        for (let pokemon of pokemons) {
            for(let poke_type of pokemon_type){
                if (pokemon['form']=="Normal" && poke_type['form']=="Normal"){
                    if (pokemon['pokemon_id']==poke_type['pokemon_id']){
                        
                        // Trouver la génération du pokemon courant
                        for (let i = 1; i <= Object.keys(generation).length; i++) {
                            let genKey = `Generation ${i}`;
                            let gen = generation[genKey];
                            var generationDuPokemon = 0;

                            for (let genPoke of gen) {
                                if (genPoke["id"] == pokemon["pokemon_id"]) {
                                    generationDuPokemon = i; // Marquer que le Pokémon est trouvé
                                    break; // Sortir de la boucle dès que le Pokémon est trouvé
                                }
                            }

                            if (generationDuPokemon) {
                                break; // Sortir de la boucle externe si le Pokémon est trouvé
                            }
                        }

                        function genererAttaques(/*type1, type2=null*/){
                            // Générer les attaques du pokemon courant
                            for(let pokeMove of pokemon_moves){
                                if(pokeMove['pokemon_id']==pokemon["pokemon_id"]){
                                    // Les attaques chargées
                                    var tab_of_charged_moves = [];
                                    for(let attaque_chargee of pokeMove['charged_moves']){
                                        for(let charged_move of charged_moves){
                                            if(charged_move['name']===attaque_chargee /*||(charged_move['name'].includes(attaque_chargee))*/ ){
                                                //if((charged_move['type']==type1)||(charged_move['type']==type2)||(charged_move['type']=="Normal")){
                                                let atq = null;
                                                if (charged_move.hasOwnProperty("critical_chance")){
                                                    atq = new Attack(charged_move['critical_chance'], charged_move['duration'], charged_move['energy_delta'], charged_move['move_id'], charged_move['name'], charged_move['power'], charged_move['stamina_loss_scaler'], charged_move['type']);
                                                } else {
                                                    atq = new Attack(null, charged_move['duration'], charged_move['energy_delta'], charged_move['move_id'], charged_move['name'], charged_move['power'], charged_move['stamina_loss_scaler'], charged_move['type']);
                                                }
                                                if (!Attack.all_attacks.has(atq)){
                                                    Attack.all_attacks.set(atq._move_id, atq);
                                                }
                                                tab_of_charged_moves.push(atq);
                                                //}
                                            }
                                        }
                                    }

                                    // Les attaques rapides
                                    var tab_of_fast_moves = [];
                                    for(let attaque_rapide of pokeMove['fast_moves']){
                                        for(let fast_move of fast_moves){
                                            if(fast_move['name']===attaque_rapide/*||(fast_move['name'].includes(attaque_rapide))*/){
                                                //if((fast_move['type']==type1)||(fast_move['type']==type2)||(fast_move['type']=="Normal")){
                                                let atq = new Attack(null, fast_move['duration'], fast_move['energy_delta'], fast_move['move_id'], fast_move['name'], fast_move['power'], fast_move['stamina_loss_scaler'], fast_move['type']);
                                                if (!Attack.all_attacks.has(atq)){
                                                    Attack.all_attacks.set(atq._move_id, atq);
                                                }
                                                tab_of_fast_moves.push(atq);
                                                //}
                                                
                                            }
                                        }
                                    }
                                }
                            }
                            return [tab_of_charged_moves, tab_of_fast_moves];
                        }
                        
                        // Transformer le pokemon courant en un Pokemon class
                        // Ainsi que la gestion des Types
                        if (poke_type['type'].length==2){
                            let type1 = new Type(poke_type['type'][0]);
                            let type2 = new Type(poke_type['type'][1]);

                            if (!Type.all_types.has(poke_type['type'][0])){
                                Type.all_types.set(poke_type['type'][0], type1);
                            }
                            if (!Type.all_types.has(poke_type['type'][1])){
                                Type.all_types.set(poke_type['type'][1], type2);
                            }
                            
                            let attaques = genererAttaques(/*type1, type2*/);

                            this.all_pokemons.set(pokemon['pokemon_id'] ,new Pokemon(generationDuPokemon, pokemon['base_attack'], pokemon['base_defense'], pokemon['base_stamina'], pokemon['pokemon_id'], pokemon['pokemon_name'], type1, type2, attaques[0], attaques[1]));
                        } else{
                            let type = new Type(poke_type['type'][0]);
                            if (!Type.all_types.has(poke_type['type'][0])){
                                Type.all_types.set(poke_type['type'][0], type);
                            }

                            let attaques = genererAttaques(/*type*/);
                            this.all_pokemons.set(pokemon['pokemon_id'] ,new Pokemon(generationDuPokemon, pokemon['base_attack'], pokemon['base_defense'], pokemon['base_stamina'], pokemon['pokemon_id'], pokemon['pokemon_name'], type, null, attaques[0], attaques[1]));
                        }    
                    }
                    
                }
            }
            
        }
    }

    getTypes(){
        if (this._type2!=null){
            return [this._type1, this._type2];
        } else {
            return [this._type1];
        }
    }

    getAttacks(){
        return this._charged_moves.concat(this._fast_moves);
    }
}