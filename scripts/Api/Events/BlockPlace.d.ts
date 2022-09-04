import { Events } from "../Types/index.js";
export declare class BlockPlace {
    /**
     * The actual arg
     */
    protected arg: any;
    /**
     * Add a listener for the event
     */
    on(callback: (data: Events['BlockPlace']) => void): BlockPlace;
    /**
     * Remove the listener for the event
     */
    off(): void;
}
