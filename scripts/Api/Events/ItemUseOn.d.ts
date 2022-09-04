import { Events } from "../Types/index.js";
export declare class ItemUseOn {
    /**
     * The actual arg
     */
    protected arg: any;
    /**
     * Add a listener for the event
     */
    on(callback: (data: Events['ItemUseOn']) => void): ItemUseOn;
    /**
     * Remove the listener for the event
     */
    off(): void;
}
/**
const oldLog = log[(data.source as IPlayer).name] ?? Date.now() - 102
log[(data.source as IPlayer).nam[e] = Date.now()
if ((oldLog + 100) < Date.now())]
 */ 
