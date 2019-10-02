class Character {
    constructor(name, id) {
        this._name = name;
        this._id = id;
        this._imageUrl = `./images/characters/${name.toLowerCase().replace(" ", "_").replace(".", "")}.png`
        this._sound = new Audio(`./sounds/${name.toLowerCase().replace(" ", "_").replace(".", "")}.wav`);
    }

    get name() {
        return this._name;
    }

    get id() {
        return this._id;
    }

    get imageUrl() {
        return this._imageUrl;
    }

    playSound() {
        this._sound.play();
    }
}

const charactersNames = [
    'Stan',
    'Kyle',
    'Cartman',
    'Kenny',
    'Butters',
    'Wendy',
    'Jimmy',
    'Token',
    'Clyde',
    'Mr. Mackey',
    'Chef',
    'Ike',
    'Mr. Hankey',
    'Mr. Garrison',
    'Timmy',
    'Servietsky',
    'Officer Barbrady'
];
const characters = [];
let index = 1;

charactersNames.forEach(characterName => {
    const character = new Character(characterName, index)
    characters.push(character);
    const imgElt = document.createElement("img");
    imgElt.src = characters[index-1].imageUrl;
    imgElt.addEventListener('click', () => character.playSound());
    document.body.appendChild(imgElt);
    index++;
});

console.log(characters[Math.floor(Math.random() * 17)]);