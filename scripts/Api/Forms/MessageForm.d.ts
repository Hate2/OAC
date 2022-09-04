import { MessageFormData, MessageFormResponse } from "mojang-minecraft-ui";
import { Player } from "../Entity/index.js";
/**
 * Create a new MessageForm
 */
export declare class MessageForm {
    /**
     * Create a new MessageForm!
     */
    constructor();
    /**
     * The actual form
     */
    protected form: MessageFormData;
    /**
     * The title and body
     */
    protected data: string[];
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
     * Set the form's first button
     * @param {string} text Text for the button
     * @returns {MessageForm} The message form
     * @example .setButton1('Confirm?')
     */
    setButton1(text: string): MessageForm;
    /**
     * Set the form's second button
     * @param {string} text Text for the button
     * @returns {MessageForm} The message form
     * @example .setButton1('Cancel?')
     */
    setButton2(text: string): MessageForm;
    /**
     * Set the body's text
     * @param {string} text The body's new text
     * @returns {MessageForm} The message form
     * @example .setBody("Text")
     */
    setBody(text: string): MessageForm;
    /**
     * Set the body's text
     * @param {string} text The body's new text
     * @returns {MessageForm} The message form
     * @example .setTitle("Text")
     */
    setTitle(text: string): MessageForm;
    /**
     * Show the form to a player
     * @param {Player} player Player to show the form to
     * @returns {Promise<MessageFormResponse>} Message form promise
     * @example .show(player).then(result => {
     * console.warn(result.selection)
     * })
     */
    show(player: Player): Promise<MessageFormResponse>;
}
