import { Events } from "../Types/index.js";
export declare class PlayerLeave {
    /**
     * The actual arg
     */
    protected arg: any;
    /**
     * Add a listener for the event
     */
    on(callback: (data: Events['PlayerLeave']) => void): PlayerLeave;
    /**
     * Remove the listener for the event
     */
    off(): void;
}
