class Trainer {
    constructor (){
        this.party = [];
    }
    
    add(poke) {
        this.party.push(poke);
    }
}

let TashKetchum = new Trainer();

class Pokemon {
    constructor(name, avatar, type1, type2, hp, attack, defense, abilities) {
        this.name = name;
        this.avatar = avatar;
        this.type1 = type1;
        this.type2 = type2;
        this.hp = hp;
        this.attack = attack;
        this.defense = defense;
        this.abilities = abilities;
    }
}

axios.get("http://api.openweathermap.org/data/2.5/weather?zip=" + searchInput + ",us&id=524901&APPID=5e1d3af2a4608603007bf841e72537a7").then((response) => {
    data = response.data;

http://pokeapi.co/api/v2/