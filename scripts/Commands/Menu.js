import { ActionForm, ModalForm } from "../Api/index.js"
import { banDB, client } from "../index.js"
import { isAdmin } from "../utils.js"

const form = new ActionForm()
    .setTitle("Admin Menu")
    .setBody("This is the admin menu")
    .addButton("§3Ban")
    .addButton("§bUnban")
    .addButton("§3Invsee")

const banForm = new ModalForm()
    .setTitle("Ban Menu")
    .addTextField("§3The name of the person you want to ban", "Example: Dooka")
    .addTextField("§3The ban reason", "Example: Hacking")

const unbanForm = new ModalForm()
    .setTitle("Unban Menu")
    .addTextField("§3The name of the person you want to unban", "Example: L0VE MC")

const invseeForm = new ModalForm()
    .setTitle("Invsee Menu")
    .addTextField("§3The name of the person you want to see the inventory of", "Example: iBlqzed")

client.commands.create({
    name: "menu",
    description: "Open the admin menu. §2Example: -menu",
    aliases: ['adminmenu', 'amenu']
}, ({ player }) => {
    if (!isAdmin(player)) return player.message(`§7[§9OAC§7] §cYou need to be admin to run this command!`)
    const rot = player.getRotation(), loc = player.getLocation()
    const event = client.on("Tick", () => {
        if (!client.world.getAllPlayers().find(e => e.getName() === player?.getName())) return client.off(event)
        const _loc = player.getLocation(), _rot = player.getRotation()
        if ((_loc.x !== loc.x) || (_loc.y !== loc.y) || (_loc.z !== loc.z) || (_rot.x !== rot.x) || (_rot.y !== rot.y)) {
            form.show(player).then(({ selection }) => {
                if (selection === 0) banForm.show(player).then(({ formValues, canceled }) => {
                    if (canceled) return
                    if (banDB.has(formValues[0])) return player.message(`§7[§9OAC§7] §c${formValues[0]} has already been banned!`)
                    banDB.set(formValues[0], formValues[1])
                    client.world.getAllPlayers().find(e => e.getName() === formValues[0])?.kick(`§7[§9OAC§7] §cYou have been banned!\n§3Reason: ${formValues[1] === '' ? "No reason specified!" : formValues[1]}`)
                    player.message(`§7[§9OAC§7] §3Successfully banned ${formValues[0]}`)
                })
                if (selection === 1) unbanForm.show(player).then(({ formValues, canceled }) => {
                    if (canceled) return
                    if (!banDB.has(formValues[0])) return player.message(`§7[§9OAC§7] §c${formValues[0]} isn't even banned!`)
                    banDB.delete(formValues[0])
                    player.message(`§7[§9OAC§7] §3Successfully unbanned ${formValues[0]}`)
                })
                if (selection === 2) invseeForm.show(player).then(({ formValues, canceled }) => {
                    if (canceled) return
                    const target = client.world.getAllPlayers().find(plr => plr.getName() === formValues[0])
                    if (!target) return player.message(`§7[§9OAC§7] §cPlayer is not online!`)
                    player.runCommand(`fill ~~~ ~1~~ chest`)
                    const block = player.getDimension().getBlock(locationFunctions.locationToBlockLocation(player.getLocation()))
                    const blockInv = block.getInventory()
                    const plrInv = target.getInventory()
                    for (let i = 0; i < 36; i++) {
                        if (i === 9) for (let i = 9; i < 27; i++) blockInv.setItem(i, i > 17 ? bar2 : bar)
                        blockInv.setItem(i > 8 ? i + 18 : i, plrInv.getItem(i))
                    }
                    player.message(`§7[§9OAC§7] §3A chest has been placed near you with ${target.getName()}'s inventory.`)
                })
            })
            client.off(event)
        }
    })
})
