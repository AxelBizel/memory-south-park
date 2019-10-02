class Character {
    constructor(name, id) {
        this._name = name;
        this._id = id;
        this._imageUrl = `./images/characters/${name.toLowerCase().replace(" ", "_").replace(".", "")}.png`
        this._sound = new Audio(`./sounds/${name.toLowerCase().replace(" ", "_").replace(".", "")}.wav`);
        this.isRevealed = false;
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
    'Officer Barbrady',
];
const characters = [];
let index = 1;

charactersNames.forEach(characterName => {
    const character = new Character(characterName, index)
    characters.push(character);
    index++;
});

characters.push(new Character('Mystery', 'mystery'));