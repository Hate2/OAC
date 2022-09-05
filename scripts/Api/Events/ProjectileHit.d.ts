import { Events } from "../Types/index";
export declare class ProjectileHit {
    /**
     * The actual arg
     */
    protected arg: any;
    /**
     * Add a listener for the event
     */
    on(callback: (data: Events['ProjectileHit']) => void): ProjectileHit;
    /**
     * Remove the listener for the event
     */
    off(): void;
}
