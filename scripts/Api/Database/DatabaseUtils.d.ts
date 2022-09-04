import { Database } from "./Database";
export declare class DatabaseUtils {
    /**
     * Create a new database
     * @param {string} name The name of the database
     * @returns {Database} A new database
     */
    create(name: string): Database;
    /**
     * Delete a database
     * @param {Database|string} database Database (or database name) to delete
     */
    delete(database: Database | string): void;
}
