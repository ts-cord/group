import { GroupError } from './group-error';

/**
 * Group is an extension of the native Map. It is used in tscord for groups that contain items with IDs.
 */
export class Group<K, V> extends Map<K, V> {
    public constructor(iterable?: Iterable<readonly [K, V]> | null | undefined) {
        super(iterable);
    }

    /**
     * Equals to {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/forEach Map.forEach}, but returns the group instead of undefined.
     * @param fn Function to executein each element.
     * @returns {this}
     */
    public each(fn: (value: V, key: K, group: this) => void): this {
        if (typeof fn !== 'function') throw new GroupError('fn parameter must be a valid function.', { cause: fn });

        for (const [key, value] of this) {
            fn(value, key, this);
        }

        return this;
    }

    /**
     * Searches for the first element that satisfies the `fn` function. This is like {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find Array.find}.
     * @param fn - Function to test (should return a boolean value)
     * @returns {this}
     */
    public find<S extends V>(fn: (value: V, key: K, group: this) => value is S): V | undefined {
        if (typeof fn !== 'function') throw new GroupError('fn parameter must be a valid function.', { cause: fn });

        for (const [key, value] of this) {
            if (fn(value, key, this)) {
                return value;
            }
        }
        return undefined;
    }

    /**
     * Equals to {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter Array.filter}, but returns a Group instead of Array.
     * @param fn - Function to test (should return a boolean value)
     * @returns {this}
     */
    public filter<S extends V>(fn: (value: V, key: K, group: this) => value is S): Group<K, V> {
        if (typeof fn !== 'function') throw new GroupError('fn parameter must be a valid function.', { cause: fn });

        const filteredGroup = new Group<K, V>();

        for (const [key, value] of this) {
            if (fn(value, key, this)) {
                filteredGroup.set(key, value);
            }
        }

        return filteredGroup;
    }

    /**
     * Equals to {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/Map Array.Map}, but returns a Group instead of `V[]`.
     * @param fn 
     * @returns {this}
     */
    public map(fn: (value: V, key: K, group: this) => unknown): Group<K, unknown> {
        if (typeof fn !== 'function') throw new GroupError('fn parameter must be a valid function.', { cause: fn });

        const mappedMap = new Group<K, unknown>();

        for (const [key, value] of this) {
            const mappedValue = fn(value, key, this);

            mappedMap.set(key, mappedValue);
        }

        return mappedMap;
    }
    public findKey(fn: (value: V, key: K, group: this) => unknown): K | undefined {
        if (typeof fn !== 'function') throw new GroupError('fn parameter must be a valid function.', { cause: fn });

        for (const [key, value] of this) {
            if (fn(value, key, this)) {
                return key;
            }
        }
        return undefined;
    }

    /**
     * Gets the first element value in this Group.
     * @returns {V | undefined}
     */
    public first(): V | undefined {
        return [...this.values()][0];
    }

    /**
     * Gets the last element value in this Group.
     * @returns {V | undefined}
     */
    public last(): V | undefined {
        return [...this.values()][this.size - 1];
    }

    /**
     * Checks if all items passes a test. . Equals to {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/Every Array.every}.
     * @param fn Function used to test.
     * @returns {boolean}
     */
    public every(fn: (value: V, key: K, group: this) => unknown): boolean {
        if (typeof fn !== 'function') throw new GroupError('fn parameter must be a valid function.', { cause: fn });

        for (const [key, value] of this) {
            if (!fn(value, key, this)) {
                return false;
            }
        }
        return true;
    }

    /**
     * Checks if there exists an item that passes a test. Equals to {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/Some Array.some}.
     * @param fn Function used to test.
     * @returns {boolean}
     */
    public some(fn: (value: V, key: K, group: this) => unknown): boolean {
        if (typeof fn !== 'function') throw new GroupError('fn parameter must be a valid function.', { cause: fn });

        for (const [key, value] of this) {
            if (fn(value, key, this)) {
                return true;
            }
        }
        return false;
    }

    /**
     * Checks if all of the items has in this Group.
     * @param {K[]} keys - Keys to check for.
     * @returns {boolean}
     */
    public hasAll(keys: K[]): boolean {
        if (!Array.isArray(keys)) throw new GroupError('Invalid keys parameter. Expected an array of keys.', { cause: keys });

        return keys.every((key) => super.has(key));
    }

    /**
     * Checks if any of the items has in this Group.
     * @param {K[]} keys - Keys to check for.
     * @returns {boolen}
     */
    public hasAny(keys: K[]): boolean {
        if (!Array.isArray(keys)) throw new GroupError('Invalid keys parameter. Expected an array of keys.', { cause: keys });

        return keys.some((key) => super.has(key));
    }

    /**
     * Deletes items that satisfy the provided filter function.
     * @param fn Function used to test.
     * @example
     * const someGroup = new Group<string, number>()
     *     .set('123', 10)
     *     .set('321', 15)
     *     .set('231', 20);
     * 
     * someGroup.sweep((value) => value > 10); // Group(1) [Map] { '123' => 10 }
     * @returns {this}
     */
    public sweep(fn: (value: V, key: K, group: this) => unknown): this {
        if (typeof fn !== 'function') throw new GroupError('fn parameter must be a valid function.', { cause: fn });

        for (const [key, value] of this) {
            if (fn(value, key, this)) {
                this.delete(key);
            }
        }
        return this;
    }

    /**
     * Equals to {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/At Array.at}. Returns the item at a given index.
     * @param {number} index 
     * @returns {V | undefined}
     */
    public at(index: number): V | undefined {
        if (!Number.isInteger(index)) throw new GroupError('Invalid index parameter. Expected an integer number.', { cause: index });

        return [...this.values()].at(index);
    }

    /**
     * Gets the key at the given index.
     * @param {number} index 
     * @returns {K | undefined}
     */
    public keyAt(index: number): K | undefined {
        if (!Number.isInteger(index)) throw new GroupError('Invalid index parameter. Expected an integer number.', { cause: index });

        return [...this.keys()].at(index);
    }
}