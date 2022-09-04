import { Events } from "../Types/index";
export declare class EntityHit {
    /**
     * The actual arg
     */
    protected arg: any;
    /**
     * Add a listener for the event
     */
    on(callback: (data: Events['EntityHit']) => void): EntityHit;
    /**
     * Remove the listener for the event
     */
    off(): void;
}
