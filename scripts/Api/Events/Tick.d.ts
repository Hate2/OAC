import { Events } from "../Types/index.js";
export declare class Tick {
    /**
     * The actual arg
     */
    protected arg: any;
    /**
     * Add a listener for the event
     */
    on(callback: (data: Events['Tick']) => void): Tick;
    /**
     * Remove the listener for the event
     */
    off(): void;
}
