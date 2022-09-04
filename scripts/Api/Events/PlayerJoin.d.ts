import { Events } from "../Types/index.js";
export declare class PlayerJoin {
    /**
     * The actual arg
     */
    protected arg: any;
    /**
     * Add a listener for the event
     */
    on(callback: (data: Events['PlayerJoin']) => void): PlayerJoin;
    /**
     * Remove the listener for the event
     */
    off(): void;
}
