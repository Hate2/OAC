import { world } from "mojang-minecraft";
import { Block } from "../Block/index";
import { Player, Entity } from "../Entity/index";
import { setTickTimeout } from "../utils";
export class ProjectileHit {
    constructor() {
        /**
         * The actual arg
         */
        this.arg = undefined;
    }
    /**
     * Add a listener for the event
     */
    on(callback) {
        this.arg = world.events.projectileHit.subscribe(({ source, entityHit, blockHit, projectile, hitVector, location }) => {
            setTickTimeout(() => callback({
                entity: source.id === 'minecraft:player' ? new Player(source) : new Entity(source),
                hitEntity: entityHit?.entity ? entityHit.entity.id === 'minecraft:player' ? new Player(entityHit.entity) : new Entity(entityHit.entity) : undefined,
                hitBlock: blockHit?.block ? {
                    block: new Block(blockHit.block),
                    face: blockHit.face,
                    faceLocationX: blockHit.faceLocationX,
                    faceLocationY: blockHit.faceLocationY
                } : undefined,
                projectile: new Entity(projectile),
                hitVector: hitVector,
                location: location
            }), 0);
        });
        return this;
    }
    /**
     * Remove the listener for the event
     */
    off() {
        world.events.entityHit.unsubscribe(this.arg);
    }
}
