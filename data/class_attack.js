class Attack{
    static all_attacks = new Map();

    constructor(cc=null, duration, energy, move_id, name, power, stamina_loss_scaler, type){
        if (cc!=null){
            this._critical_chance = cc;
        }
        this._duration = duration;
        this._energy_delta = energy;
        this._move_id = move_id;
        this._name = name;
        this._power = power;
        this._stamina_loss_scaler = stamina_loss_scaler;
        this._type = new Type(type);
    }

    toString(){
        return `${this._name}`;
    }
}