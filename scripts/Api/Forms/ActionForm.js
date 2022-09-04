import { ActionFormData } from "mojang-minecraft-ui";
/**
 * Create a new ActionForm
 */
export class ActionForm {
    /**
     * Create a new ActionForm!
     */
    constructor() {
        /**
         * The actual form
         */
        this.form = new ActionFormData();
        /**
         * The title and body
         */
        this.data = new Array(2);
    }
    /**
     * Add a button to the form
     * @param {string} text Text for the button
     * @param {string} iconPath The icon path for the button
     * @example .addButton('Diamond Sword!', 'textures/items/diamond_sword.png')
     */
    addButton(text, iconPath) {
        this.form.button(text, iconPath);
        return this;
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
     * Set the body's text
     * @param {string} text The body's new text
     * @returns {ActionForm} The action form
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
     * @returns {ActionForm} The action form
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
     * @returns {Promise<ActionFormResponse>} Action form promise
     * @example .show(player).then(result => {
     * console.warn(result.selection)
     * })
     */
    async show(player) {
        return this.form.show(player.getIEntity());
    }
}
