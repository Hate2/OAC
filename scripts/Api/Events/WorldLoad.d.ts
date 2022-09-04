import { Events } from "../Types/index";
export declare class WorldLoad {
    /**
     * The actual arg
     */
    protected arg: any;
    /**
     * Add a listener for the event
     */
    on(callback: (data: Events['WorldLoad']) => void): WorldLoad;
    /**
     * Remove the listener for the event
     */
    off(): void;
}
