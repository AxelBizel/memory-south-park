class Character {
    constructor(name, id) {
        this._name = name;
        this._id = id;
        this._imageUrl = `./images/${name.toLowerCase()}.png`
        this._sound = new Audio(`./sounds/${name.toLowerCase()}.wav`);
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

const characters = [];

characters.push(new Character('Cartman', 1));
characters.push(new Character('Kenny', 2));