import { Events } from "../Types/index.js";
export declare class BlockBreak {
    /**
     * The actual arg
     */
    protected arg: any;
    /**
     * Add a listener for the event
     */
    on(callback: (data: Events['BlockBreak']) => void): BlockBreak;
    /**
     * Remove the listener for the event
     */
    off(): void;
}
