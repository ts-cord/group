/**
 * Custom error class representing a Group error.
 *
 * @class
 * @extends Error
 * @since 0.0.1
 */
export class GroupError extends Error {
    constructor(message: string, options?: ErrorOptions) {
        super(message, options);
    }
}