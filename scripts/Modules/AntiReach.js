import { config } from "../globalVars"
import { banPlayer } from "../utils"

const { reachLimit } = config.modules.antiReach

function isReach(p1, p2) {
    return Math.sqrt((p1.x - p2.x) ** 2 + (p1.y - p2.y) ** 2 + (p1.z - p2.z) ** 2) > reachLimit
}

export async function AntiReach(player, loc) {
    if (isReach(player.location, loc)) banPlayer(player, "Using reach!")
}