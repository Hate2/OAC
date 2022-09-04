import { Events } from "../Types/index";
export declare class Chat {
    /**
     * The actual arg
     */
    protected arg: any;
    /**
     * Add a listener for the event
     */
    on(callback: (data: Events['Chat']) => void): Chat;
    /**
     * Remove the listener for the event
     */
    off(): void;
}
