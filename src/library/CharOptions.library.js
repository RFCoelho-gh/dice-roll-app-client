//! Source: ALL
const classLibrary = [
    "Alchemist", "Barbarian", "Bard", "Champion", "Cleric",
    "Druid", "Fighter", "Gunslinger", "Inventor", "Investigator",
    "Magus", "Monk", "Oracle", "Psychic", "Ranger", "Rogue", "Sorcerer",
    "Summoner", "Swashbuckler", "Thaumaturge", "Witch", "Wizard"
];

//! Source: CORE RULEBOOK ONLY
const backgroundLibrary = [
    {
        name: "Acolyte",
        ability: {
            str: 0,
            dex: 0,
            con: 0,
            int: 2,
            wis: 2,
            cha: 0,
        },
        skill: ["Acrobatics", "Circus Lore"],
        feat: {
            name: "Student of the Canon",
            link: "https://2e.aonprd.com/Feats.aspx?ID=847"
        },
        rarity: "Common",
        source: "Core Rulebook, pg. 60"
    },
    {
        name: "Acrobat",
        ability: {
            str: 2,
            dex: 2,
            con: 0,
            int: 0,
            wis: 0,
            cha: 0,
        },
        skill: ["Nature", "Terrain Lore"],
        feat: {
            name: "Train Animal",
            link: "https://2e.aonprd.com/Feats.aspx?ID=847"
        },
        rarity: "Common",
        source: "Core Rulebook, pg. 60"
    },
    {
        name: "Animal Whisperer",
        ability: {
            str: 0,
            dex: 0,
            con: 0,
            int: 0,
            wis: 2,
            cha: 2,
        },
        skill: ["Nature", "Terrain Lore"],
        feat: {
            name: "Train Animal",
            link: "https://2e.aonprd.com/Feats.aspx?ID=847"
        },
        rarity: "Common",
        source: "Core Rulebook, pg. 60"
    },
    {
        name: "Animal Whisperer",
        ability: {
            str: 0,
            dex: 0,
            con: 0,
            int: 0,
            wis: 2,
            cha: 2,
        },
        skill: ["Nature", "Terrain Lore"],
        feat: {
            name: "Train Animal",
            link: "https://2e.aonprd.com/Feats.aspx?ID=847"
        },
        rarity: "Common",
        source: "Core Rulebook, pg. 60"
    },

]

const librarySize = {
    classAmount: classLibrary.length,
    backgroundAmount: backgroundLibrary.length,
}

export {classLibrary, librarySize};