import { ActionFormData, ActionFormResponse } from "mojang-minecraft-ui";
import { Player } from "../Entity/index.js";
/**
 * Create a new ActionForm
 */
export declare class ActionForm {
    /**
     * Create a new ActionForm!
     */
    constructor();
    /**
     * The actual form
     */
    protected form: ActionFormData;
    /**
     * The title and body
     */
    protected data: string[];
    /**
     * Add a button to the form
     * @param {string} text Text for the button
     * @param {string} iconPath The icon path for the button
     * @example .addButton('Diamond Sword!', 'textures/items/diamond_sword.png')
     */
    addButton(text: string, iconPath?: string): ActionForm;
    /**
     * Get the form's body
     * @returns {string} The form's body
     * @example .getBody()
     */
    getBody(): string;
    /**
     * Get the form's title
     * @returns {string} The form's title
     * @example .getTitle()
     */
    getTitle(): string;
    /**
     * Set the body's text
     * @param {string} text The body's new text
     * @returns {ActionForm} The action form
     * @example .setBody("Text")
     */
    setBody(text: string): ActionForm;
    /**
     * Set the body's text
     * @param {string} text The body's new text
     * @returns {ActionForm} The action form
     * @example .setTitle("Text")
     */
    setTitle(text: string): ActionForm;
    /**
     * Show the form to a player
     * @param {Player} player Player to show the form to
     * @returns {Promise<ActionFormResponse>} Action form promise
     * @example .show(player).then(result => {
     * console.warn(result.selection)
     * })
     */
    show(player: Player): Promise<ActionFormResponse>;
}
