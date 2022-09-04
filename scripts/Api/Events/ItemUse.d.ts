import { Events } from "../Types/index.js";
export declare class ItemUse {
    /**
     * The actual arg
     */
    protected arg: any;
    /**
     * Add a listener for the event
     */
    on(callback: (data: Events['ItemUse']) => void): ItemUse;
    /**
     * Remove the listener for the event
     */
    off(): void;
}
