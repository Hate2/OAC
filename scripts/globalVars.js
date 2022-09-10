//              _______   _______   _______ 
//             |   _   | |   _   | |   _   |
//             |.  |   | |.  1   | |.  1___|
//             |.  |   | |.  _   | |.  |___ 
//             |:  1   | |:  |   | |:  1   |
//             |::.. . | |::.|:. | |::.. . |
//             `-------' `--- ---' `-------'
//              01001111 01000001 01000011 
//                    - Anti-Cheat -

export const config = {
    trustedTag: "trusted",
    adminScoreboard: 'oac_admin',
    modules: {
        anti32k: {
            enabled: true
        },
        antiAutoclicker: {
            enabled: true,
            cpsWarnLimit: 15,
            cpsBanLimit: 25
        },
        antiGMC: {
            enabled: true
        },
        antiIllegalItems: {
            enabled: true,
            items: [
                "minecraft:beehive",
                "minecraft:bee_nest",
                "minecraft:moving_block",
                "minecraft:movingblock",
                "minecraft:axolotl_bucket",
                "minecraft:cod_bucket",
                "minecraft:powder_snow_bucket",
                "minecraft:pufferfish_bucket",
                "minecraft:salmon_bucket",
                "minecraft:tadpole_bucket",
                "minecraft:tropical_fish_bucket",
                "minecraft:mob_spawner",
                "minecraft:repeating_command_block",
                "minecraft:chain_command_block",
                "minecraft:command_block",
                "minecraft:structure_block",
                "minecraft:border",
                "minecraft:border_block",
                "minecraft:barrier",
                "minecraft:bedrock",
                "minecraft:deny",
                "minecraft:allow",
                "minecraft:camera",
                "minecraft:lit_deepslate_redstone_ore",
                "minecraft:soul_fire",
                "minecraft:stickypistonarmcollision",
                "minecraft:light_block",
                "minecraft:lit_blast_furnace",
                "minecraft:jigsaw",
                "minecraft:lava_cauldron",
                "minecraft:sweet_berry_bush",
                "minecraft:lit_smoker",
                "minecraft:bamboo_sapling",
                "minecraft:bubble_column",
                "minecraft:chalkboard",
                "minecraft:structure_void",
                "minecraft:info_update2",
                "minecraft:info_update",
                "minecraft:netherreactor",
                "minecraft:glowstick",
                "minecraft:glowingobsidian",
                "minecraft:cave_head_body_with_verries",
                "minecraft:cave_vines_body_with_verries",
                "minecraft:end_portal_frame",
                "minecraft:end_portal",
                "minecraft:end_gateway",
                "minecraft:frosted_ice",
                "minecraft:frame",
                "minecraft:invisiblebedrock",
                "minecraft:powered_repeater",
                "minecraft:unpowered_repeater",
                "minecraft:daylight_detector_inverted",
                "minecraft:portal",
                "minecraft:unlit_redstone_torch",
                "minecraft:lit_redstone_ore",
                "minecraft:wall_sign",
                "minecraft:standing_sign",
                "minecraft:lit_furnace",
                "minecraft:fire",
                "minecraft:powered_comparator",
                "minecraft:unpowered_comparator",
                "minecraft:tripwire",
                "minecraft:pistonarmcollision",
                "minecraft:lit_redstone_lamp",
                "minecraft:water",
                "minecraft:flowing_water",
                "minecraft:lava",
                "minecraft:flowing_lava",
                "minecraft:melon_stem",
                "minecraft:pumpkin_stem"
            ]
        },
        antiKillaura: {
            enabled: true,
            flagAmount: 10
        },
        antiNamespoof: {
            enabled: true
        },
        antiNoClip: {
            enabled: true
        },
        antiNuker: {
            enabled: true
        },
        antiReach: {
            enabled: true,
            reachLimit: 7
        },
        antiSpeed: {
            enabled: true
        },
        chatFilter: {
            enabled: true,
            messages: [
                "discord.gg",
                "dsc.gg",
                "niggers",
                "kys",
                "@outlook.com",
                "@gmail.com",
                "@hotmail.com",
                "discordapp.com",
                "§k",
                "https://",
                "http://"
            ]
        }
    }
}

export const nameRegex = /[a-zA-Z0-9\-_() ]/

export const notFullBlocks = [
    "minecraft:air",
    "minecraft:red_flower",
    "minecraft:yellow_flower",
    "minecraft:tallgrass",
    "minecraft:water",
    "minecraft:lava",
    "minecraft:tripwire_hook",
    "minecraft:string",
    "minecraft:double_plant",
    "minecraft:flower_pot",
    "minecraft:web",
    "minecraft:seagrass",
    "minecraft:sand",
    "minecraft:gravel",
    "minecraft:bamboo"
]

export const notFullBlocksIncludes = [
    "stairs",
    "door",
    "coral",
    "chest",
    "slab",
    "concrete_powder",
    "vine"
]