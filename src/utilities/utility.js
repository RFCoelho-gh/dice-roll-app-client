

function randomNumber (min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

function classImgAssigner (className) {
    const tinyName = className.toLowerCase()
    let src = "a"
    console.log(tinyName)
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
    console.log(src)

    return src;

}

export {randomNumber, classImgAssigner}