import { Events } from "../Types/index";
export declare class BlockHit {
    /**
     * The actual arg
     */
    protected arg: any;
    /**
     * Add a listener for the event
     */
    on(callback: (data: Events['BlockHit']) => void): BlockHit;
    /**
     * Remove the listener for the event
     */
    off(): void;
}
