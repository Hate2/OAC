import { Events } from "../Types/index.js";
export declare class EntityEvent {
    /**
     * The actual arg
     */
    protected arg: any;
    /**
     * Add a listener for the event
     */
    on(callback: (data: Events['EntityEvent']) => void): EntityEvent;
    /**
     * Remove the listener for the event
     */
    off(): void;
}
