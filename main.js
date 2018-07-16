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
    constructor(name, avatar, hp, attack, defense, abilities) {
        this.name = name.charAt(0).toUpperCase() + name.slice(1);
        this.avatar = avatar;
        this.hp = hp;
        this.attack = attack;
        this.defense = defense;
        this.abilities = abilities;
    }
}

let searchButton = document.getElementById("search-button");

searchButton.addEventListener("click", (event) => {
    let searchInput = document.getElementsByClassName("search-input")[0].value;
    
    axios.get("https://pokeapi.co/api/v2/pokemon/" + searchInput + "/").then((response) => {
    data = response.data;
    // console.log(data);
    let newPoke = new Pokemon (
        data.name,
        data.sprites.front_default,
        data.stats[5].base_stat,
        data.stats[4].base_stat,
        data.stats[3].base_stat,
        [data.abilities[0].ability.name, data.abilities[1].ability.name]
    )
    console.log(newPoke);
    })
});