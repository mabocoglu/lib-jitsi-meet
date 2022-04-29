const keySeperator = '_|mabocoglu_||';

/**
 * Used for keeping multiple video type. Such as video:camera and video:desktop
 * We do not expect multiple audio types but this class also support it.
 * To get all video type please use getAll method. For a specific video type, you can use getWithOptionalKey method.
 * 
 */
class OptionalKeyMap extends Map {

    /**
     * return all values
     * @constructor
     * @param {any} key key.
     * @returns {Array} all the values
     */
    getAll(key) {
        return this.getWithOptionalKey(key, null);
    }

    /**
     * return multiple values
     * 
     * @param {any} key key.
     * @param {any} optionalKey optional key.
     * @returns {Array} returns the values
     */
    getWithOptionalKey(key, optionalKey = null) {

        var values = [];

        if (optionalKey) {
            let keyString = `${key}${keySeperator}${optionalKey}`;
            if (this.has(keyString)) {
                values.push(this.get(keyString));
            }

        } else {
            let startsWith = `${key}${keySeperator}`

            for (let keyString of this.keys()) {
                if (keyString && (keyString === key || keyString.startsWith(startsWith))) {
                    const value = this.get(keyString);
                    values.push(value);
                }
            }
        }
        return values;
    }

    /**
     * save the value according to the key and optional key
     * 
     * @param {any} key key.
     * @param {any} optionalKey optional key.
     * @returns {OptionalKeyMap}
     */
    setWithOptionalKey(key, optionalKey, value) {

        let keyString = optionalKey ? `${key}${keySeperator}${optionalKey}` : key;
        this.set(keyString, value);
        return this;
    }

    /**
     * Deletes the contents according to the key
     * 
     * @param {any} key mandatory key for delete
     * @returns {boolean} returns if deletion is successful
     */
    deleteAll(key) {
        return this.deleteWithOptionalKey(key, null);
    }

    /**
     * Deletes the contents according to the key and optional key
     * 
     * @param {any} key mandatory key for delete
     * @param {any} optionalKey optional key for specific content.
     * @returns {boolean} returns if deletion is successful
     */
    deleteWithOptionalKey(key, optionalKey = null) {

        let result = false;

        if (optionalKey) {
            let keyForDeletion = `${key}${keySeperator}${optionalKey}`;
            if (this.has(keyForDeletion)) {
                result |= this.delete(keyForDeletion);
            }

        } else {

            let startsWith = `${key}${keySeperator}`

            for (let keyString of this.keys()) {
                if (keyString && (keyString === key || keyString.startsWith(startsWith))) {
                    if (this.has(keyString)) {
                        result |= this.delete(keyString);
                    }
                }
            }
        }

        return result;
    }
}

module.exports = OptionalKeyMap;