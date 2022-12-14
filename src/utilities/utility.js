function randomNumber (min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

function classImgAssigner (className) {
    const tinyName = className.toLowerCase()
    let src = "a"
    switch (tinyName) {
        case 'alchemist':
        case 'barbarian':
        case 'bard':
        case 'champion':
        case 'cleric':
        case 'druid':
        case 'fighter':
        case 'gunslinger':
        case 'inventor':
        case 'investigator':
        case 'kineticist':
        case 'magus':
        case 'monk':
        case 'oracle':
        case 'psychic':
        case 'ranger':
        case 'rogue':
        case 'sorcerer':
        case 'summoner':
        case 'swashbuckler':
        case 'thaumaturge':
        case 'witch':
        case 'wizard':
            src = `https://content.demiplane.com/elements/pathfinder-2e/classes/class-icon-${tinyName}.png`
            break;
        default:
            src = 'kekW'
            break;
    }
    return src;
}

function classicFour () {
    const classicArr = ["Fighter", "Wizard", "Rogue", "Cleric"];
    return classicArr[randomNumber(0, 3)];
};

export {randomNumber, classImgAssigner, classicFour}