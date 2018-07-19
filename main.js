class Trainer {
    constructor (){
        this.party = [];
    }

    all() {
        console.log(this.party);
    }
    
    add(poke) {
        this.party.push(poke);
        current = this.party.length - 1;
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

//MODAL JQUERY SCRIPT
$('#myModal').on('shown.bs.modal', function () {
    $('#myInput').trigger('focus')
  })
  
//RENDER DEFINITIONS
let pokeNameDisplay = document.getElementById("poke-name");
let avatarDisplay = document.getElementById("avatar");
let abilityDisplay1 = document.getElementsByClassName("ability-display")[0];
let abilityDisplay2 = document.getElementsByClassName("ability-display")[1];
let HPBar = document.getElementsByClassName("bar-fill")[0];
let HPAnimation = document.getElementsByClassName("animating-bar")[0];
let ATKBar = document.getElementsByClassName("bar-fill")[1];
let ATKAnimation = document.getElementsByClassName("animating-bar")[1];
let DEFBar = document.getElementsByClassName("bar-fill")[2];
let DEFAnimation = document.getElementsByClassName("animating-bar")[2];

//RENDER FUNCTION

let render = (targetPoke) => {
    pokeNameDisplay.innerText = PokeTom.party[targetPoke].name;

    avatarDisplay.src = PokeTom.party[targetPoke].avatar;
    avatarDisplay.height = "350";
    avatarDisplay.width = "350";

    let ability1 = PokeTom.party[targetPoke].abilities[0];
    if(ability1.includes("-")){
        let abilityArray = ability1.split("");
        console.log(abilityArray.indexOf("-") + 1);
        abilityArray.splice(ability1.indexOf("-"), 1, " ");
        ability1 = abilityArray.join("");
        abilityLetter = ability1.charAt(ability1.indexOf(" ") + 1).toUpperCase();
        ability1 = ability1.charAt(0).toUpperCase() + ability1.slice(1, ability1.indexOf(" ") + 1) + ability1.charAt(ability1.indexOf(" ") + 1).toUpperCase() + ability1.slice(ability1.indexOf(" ") + 2);
    };

    let ability2 = PokeTom.party[targetPoke].abilities[1];
    if(ability2.includes("-")){
        let abilityArray = ability2.split("");
        console.log(abilityArray.indexOf("-") + 1);
        abilityArray.splice(ability2.indexOf("-"), 1, " ");
        ability2 = abilityArray.join("");
        abilityLetter = ability2.charAt(ability2.indexOf(" ") + 1).toUpperCase();
        ability2 = ability2.charAt(0).toUpperCase() + ability2.slice(1, ability2.indexOf(" ") + 1) + ability2.charAt(ability2.indexOf(" ") + 1).toUpperCase() + ability2.slice(ability2.indexOf(" ") + 2);
    };

    abilityDisplay1.innerText = ability1;
    abilityDisplay2.innerText = ability2;

    HPBar.style.width = String(((319 - PokeTom.party[targetPoke].hp) / 319) * 100) + "%";

    ATKBar.style.width = String(((238 - PokeTom.party[targetPoke].attack) / 238) * 100) + "%";

    DEFBar.style.width = String(((288 - PokeTom.party[targetPoke].defense) / 288) * 100) + "%";

    HPAnimation.classList.add("filling");
    ATKAnimation.classList.add("filling");
    DEFAnimation.classList.add("filling");

    setTimeout(() => {
        HPAnimation.classList.remove("filling");
        ATKAnimation.classList.remove("filling");
        DEFAnimation.classList.remove("filling");}, 1600);
}


//INITIALIZATION

let searchButton = document.getElementById("search-button");

// axios.get("https://pokeapi-nycda.firebaseio.com/pokemon/45.json")
axios.get("https://pokeapi.co/api/v2/pokemon/vileplume/").then((response) => {
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
    searchBeep.play();
    
    //LOADING:
    pokeNameDisplay.innerText = "Loading...";
    avatarDisplay.src = "Dancing_Ditto.gif";
    avatarDisplay.height="200";
    avatarDisplay.width="200";
    abilityDisplay1.innerText = "Loading...";
    abilityDisplay2.innerText = "Loading...";

    let searchInput = document.getElementsByClassName("search-input")[0].value;
    
    // axios.get("https://pokeapi-nycda.firebaseio.com/pokemon/" + searchInput + ".json")
    axios.get("https://pokeapi.co/api/v2/pokemon/" + searchInput.toLowerCase() + "/").then((response) => {
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

    })
});

//DITTO

let kingButton = document.getElementById("king-button");
let dittoButton = document.getElementById("ditto");
let dittoSound = document.getElementById("baby-talk");
let dittoSound2 = document.getElementById("baby-talk-2");
let bubble = document.getElementById("bubble-pop");
let fanfare = document.getElementById("fanfare");

kingButton.addEventListener("click", (event) => {
    event.preventDefault();
    if (dittoButton.style.display === "none"){
        bubble.play();
        dittoButton.style.display = "block";
        dittoButton.classList.add("rising");
    } else {
        bubble.play();
        dittoButton.classList.add("falling");
        setTimeout(() => {
            dittoButton.style.display = "none";
            dittoButton.classList.remove("rising");
            dittoButton.classList.remove("falling");
        }, 1500)
    }
});

let playCount = 1;

dittoButton.addEventListener("click", (event) => {
    
    if (playCount % 2 === 0){
        dittoSound2.play();
        playCount++;
    } else {
        dittoSound.play();
        playCount++;
    };

    let randomizer = (min, max) => {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min;
    }

    let randomPokeNum = randomizer(1, 807);

    //LOADING:
    pokeNameDisplay.innerText = "Loading...";
    avatarDisplay.src = "Dancing_Ditto.gif";
    avatarDisplay.height="200";
    avatarDisplay.width="200";
    abilityDisplay1.innerText = "Loading...";
    abilityDisplay2.innerText = "Loading...";

    axios.get("https://pokeapi.co/api/v2/pokemon/" + randomPokeNum + "/").then((response) => {
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
    })
});

//TOGGLES

let toggleLeft = document.getElementsByClassName("toggle-button")[0];
let toggleRight = document.getElementsByClassName("toggle-button")[2];
let beep = document.getElementById("toggle-beep");
let searchBeep = document.getElementById("search-beep");

let current = -1;

toggleLeft.addEventListener("click", (event) => {
        beep.play();
        current--;
        if (current < 0){
            
            current = PokeTom.party.length - 1;
        }
        render(current);
        console.log(current);
});
    
toggleRight.addEventListener("click", (event) => {
        beep.play();
        current++;
        if (current >= PokeTom.party.length){
            current = 0;
        }
        render(current);
        console.log(current);
});


// let render = (targetPoke) => {
//     let pokeNameDisplay = document.getElementById("poke-name");
//     pokeNameDisplay.innerText = PokeTom.party[targetPoke].name;

//     let avatarDisplay = document.getElementById("avatar");
//     avatarDisplay.src = PokeTom.party[targetPoke].avatar;

//     let abilityDisplay1 = document.getElementsByClassName("ability-display")[0];
//     let abilityDisplay2 = document.getElementsByClassName("ability-display")[1];

//     let ability1 = PokeTom.party[targetPoke].abilities[0];
//     if(ability1.includes("-")){
//         let abilityArray = ability1.split("");
//         console.log(abilityArray.indexOf("-") + 1);
//         abilityArray.splice(ability1.indexOf("-"), 1, " ");
//         ability1 = abilityArray.join("");
//         abilityLetter = ability1.charAt(ability1.indexOf(" ") + 1).toUpperCase();
//         ability1 = ability1.charAt(0).toUpperCase() + ability1.slice(1, ability1.indexOf(" ") + 1) + ability1.charAt(ability1.indexOf(" ") + 1).toUpperCase() + ability1.slice(ability1.indexOf(" ") + 2);
//     };

//     let ability2 = PokeTom.party[targetPoke].abilities[1];
//     if(ability2.includes("-")){
//         let abilityArray = ability2.split("");
//         console.log(abilityArray.indexOf("-") + 1);
//         abilityArray.splice(ability2.indexOf("-"), 1, " ");
//         ability2 = abilityArray.join("");
//         abilityLetter = ability2.charAt(ability2.indexOf(" ") + 1).toUpperCase();
//         ability2 = ability2.charAt(0).toUpperCase() + ability2.slice(1, ability2.indexOf(" ") + 1) + ability2.charAt(ability2.indexOf(" ") + 1).toUpperCase() + ability2.slice(ability2.indexOf(" ") + 2);
//     };

//     abilityDisplay1.innerText = ability1;
//     abilityDisplay2.innerText = ability2;

//     let HPBar = document.getElementsByClassName("bar-fill")[0];
//     let HPAnimation = document.getElementsByClassName("animating-bar")[0];
//     HPBar.style.width = String(((319 - PokeTom.party[targetPoke].hp) / 319) * 100) + "%";

//     let ATKBar = document.getElementsByClassName("bar-fill")[1];
//     let ATKAnimation = document.getElementsByClassName("animating-bar")[1];
//     ATKBar.style.width = String(((238 - PokeTom.party[targetPoke].attack) / 238) * 100) + "%";

//     let DEFBar = document.getElementsByClassName("bar-fill")[2];
//     let DEFAnimation = document.getElementsByClassName("animating-bar")[2];
//     DEFBar.style.width = String(((288 - PokeTom.party[targetPoke].defense) / 288) * 100) + "%";

//     HPAnimation.classList.add("filling");
//     ATKAnimation.classList.add("filling");
//     DEFAnimation.classList.add("filling");

//     setTimeout(() => {
//         HPAnimation.classList.remove("filling");
//         ATKAnimation.classList.remove("filling");
//         DEFAnimation.classList.remove("filling");}, 1600);
// }