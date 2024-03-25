class Type{
    static all_types = new Map();

    constructor(type){
        this._type = type;
        this._effectiveness = new Map();
        for(let typeDefenseur in type_effectiveness[type]){
            let multiplicateurDegat = type_effectiveness[type][typeDefenseur];
            this._effectiveness.set(typeDefenseur, multiplicateurDegat);
        }
    }

    toString(){
        return `${this._type}`;
    }
}