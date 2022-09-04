import { MessageFormData } from "mojang-minecraft-ui";
/**
 * Create a new MessageForm
 */
export class MessageForm {
    /**
     * Create a new MessageForm!
     */
    constructor() {
        /**
         * The actual form
         */
        this.form = new MessageFormData();
        /**
         * The title and body
         */
        this.data = new Array(2);
    }
    /**
     * Get the form's body
     * @returns {string} The form's body
     * @example .getBody()
     */
    getBody() {
        return this.data[1];
    }
    /**
     * Get the form's title
     * @returns {string} The form's title
     * @example .getTitle()
     */
    getTitle() {
        return this.data[0];
    }
    /**
     * Set the form's first button
     * @param {string} text Text for the button
     * @returns {MessageForm} The message form
     * @example .setButton1('Confirm?')
     */
    setButton1(text) {
        this.form.button1(text);
        return this;
    }
    /**
     * Set the form's second button
     * @param {string} text Text for the button
     * @returns {MessageForm} The message form
     * @example .setButton1('Cancel?')
     */
    setButton2(text) {
        this.form.button2(text);
        return this;
    }
    /**
     * Set the body's text
     * @param {string} text The body's new text
     * @returns {MessageForm} The message form
     * @example .setBody("Text")
     */
    setBody(text) {
        this.data[1] = text;
        this.form.body(text);
        return this;
    }
    /**
     * Set the body's text
     * @param {string} text The body's new text
     * @returns {MessageForm} The message form
     * @example .setTitle("Text")
     */
    setTitle(text) {
        this.data[0] = text;
        this.form.title(text);
        return this;
    }
    /**
     * Show the form to a player
     * @param {Player} player Player to show the form to
     * @returns {Promise<MessageFormResponse>} Message form promise
     * @example .show(player).then(result => {
     * console.warn(result.selection)
     * })
     */
    async show(player) {
        return this.form.show(player.getIEntity());
    }
}
