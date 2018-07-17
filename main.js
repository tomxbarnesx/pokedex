class Trainer {
    constructor (){
        this.party = [];
    }

    all() {
        console.log(this.party);
    }
    
    add(poke) {
        this.party.push(poke);
    }
}

let PokeTom = new Trainer();

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


//RENDER FUNCTION
// let targetPoke = PokeTom.party.length - 1;

let render = (targetPoke) => {
    let pokeNameDisplay = document.getElementById("poke-name");
    pokeNameDisplay.innerText = PokeTom.party[targetPoke].name;

    let avatarDisplay = document.getElementById("avatar");
    avatarDisplay.src = PokeTom.party[targetPoke].avatar;

    let abilityDisplay1 = document.getElementsByClassName("ability-display")[0];
    let abilityDisplay2 = document.getElementsByClassName("ability-display")[1];
    abilityDisplay1.innerText = PokeTom.party[targetPoke].abilities[0];
    abilityDisplay2.innerText = PokeTom.party[targetPoke].abilities[1];

    let HPBar = document.getElementsByClassName("bar-fill")[0];
    let HPAnimation = document.getElementsByClassName("animating-bar")[0];
    HPBar.style.width = String(((255 - PokeTom.party[targetPoke].hp) / 255) * 100) + "%";

    let ATKBar = document.getElementsByClassName("bar-fill")[1];
    let ATKAnimation = document.getElementsByClassName("animating-bar")[1];
    ATKBar.style.width = String(((190 - PokeTom.party[targetPoke].hp) / 190) * 100) + "%";

    let DEFBar = document.getElementsByClassName("bar-fill")[2];
    let DEFAnimation = document.getElementsByClassName("animating-bar")[2];
    DEFBar.style.width = String(((230 - PokeTom.party[targetPoke].hp) / 230) * 100) + "%";

    HPAnimation.classList.add("filling");
    ATKAnimation.classList.add("filling");
    DEFAnimation.classList.add("filling");

    setTimeout(function(){
        HPAnimation.classList.remove("filling");
        ATKAnimation.classList.remove("filling");
        DEFAnimation.classList.remove("filling");}, 2000);
}


//INITIALIZATION

let searchButton = document.getElementById("search-button");

// axios.get("https://pokeapi.co/api/v2/pokemon/vileplume/")
axios.get("https://pokeapi-nycda.firebaseio.com/pokemon/45.json").then((response) => {
    data = response.data;
    let newPoke = new Pokemon (
        data.name,
        data.sprites.front_default,
        data.stats[5].base_stat,
        data.stats[4].base_stat,
        data.stats[3].base_stat,
        [data.abilities[0].ability.name.charAt(0).toUpperCase() + data.abilities[0].ability.name.slice(1), data.abilities[1].ability.name.charAt(0).toUpperCase() + data.abilities[1].ability.name.slice(1)]
    )
    PokeTom.add(newPoke);

    let targetPoke = PokeTom.party.length - 1;
    render(targetPoke);
});


//SEARCH

searchButton.addEventListener("click", (event) => {
    let searchInput = document.getElementsByClassName("search-input")[0].value;
    
    // axios.get("https://pokeapi.co/api/v2/pokemon/" + searchInput.toLowerCase() + "/")
    axios.get("https://pokeapi-nycda.firebaseio.com/pokemon/" + searchInput + ".json").then((response) => {
    data = response.data;

    if (data.abilities.length > 1){
        let newPoke = new Pokemon (
            data.name,
            data.sprites.front_default,
            data.stats[5].base_stat,
            data.stats[4].base_stat,
            data.stats[3].base_stat,
            [data.abilities[0].ability.name.charAt(0).toUpperCase() + data.abilities[0].ability.name.slice(1), data.abilities[1].ability.name.charAt(0).toUpperCase() + data.abilities[1].ability.name.slice(1)]
        )

        PokeTom.add(newPoke);
        PokeTom.all();
    } else {
        let newPoke = new Pokemon (
            data.name,
            data.sprites.front_default,
            data.stats[5].base_stat,
            data.stats[4].base_stat,
            data.stats[3].base_stat,
            [data.abilities[0].ability.name.charAt(0).toUpperCase() + data.abilities[0].ability.name.slice(1), "N/A"]
        )

        PokeTom.add(newPoke);
        PokeTom.all();
    }

    let targetPoke = PokeTom.party.length - 1;
    render(targetPoke);

    let current = PokeTom.party.length - 1;

    toggleLeft.addEventListener("click", (event) => {
        current--;
        render(current);
    });
    
    toggleRight.addEventListener("click", (event) => {
        current++;
        render(current);
    });

    })
});

//TOGGLES

// let toggleLeft = document.getElementsByClassName("toggle-arrow")[0];
// let toggleRight = document.getElementsByClassName("toggle-arrow")[1];

// let current = PokeTom.party.length - 1;

// toggleLeft.addEventListener("click", (event) => {
//     current--;
//     render(current);
// });

// toggleRight.addEventListener("click", (event) => {
//     current++;
//     render(current);
// });

//indexOf ++ // --