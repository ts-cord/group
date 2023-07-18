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

type ArrayWithLength<T extends number, U extends unknown[] = []> = U['length'] extends T ? U : ArrayWithLength<T, [true, ...U]>;

/**
 * @link https://github.com/type-challenges/type-challenges/issues/5077
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export type GreaterThan<T extends number, U extends number> = ArrayWithLength<U> extends [...ArrayWithLength<T>, ...infer _] ? false : true;