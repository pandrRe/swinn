import { Attributes, AttributeValues, AttributeGetters, AttributeSetters, AttributeUnsetters } from "./attributes";
import { StyleCategory } from "./category";
import { Rule } from "./rule";
import { displayClassSplit, displayClassParam } from "./displayClass";
import { FlagValues, Flags, FlagGetters, FlagToggles, FlagDefinitions } from "./flags";

export type Style<T extends Attributes, U extends FlagDefinitions> = {
    /**
     * Sets the value of a style attribute.
     */
    set: AttributeSetters<T>,

    /**
     * Gets the value of a style attribute.
     */
    get: AttributeGetters<T>,

    /**
     * Deletes an attribute from the style.
     */
    unset: AttributeUnsetters<T>,

    /**
     * Set the values of multiple style attributes through an object.
     * 
     * @param values A Key-Value object containing the attributes' values.
     */
    setMany: (values: AttributeValues<T>) => void,

    /**
     * Builds the style's attribute and flags into a single CSS class string.
     */
    displayClass: () => string,

    /**
     * Object responsible for managing the style's flags.
     */
    flags: Flags<U>,

    /**
     * Alias for style.set.attribute(value).
     * @param attribute The attribute to be changed.
     * @param value The attribute's new value.
     */
    setAttribute: <K extends keyof T>(attribute: K, value: string) => void;

    /**
     * Alias for style.get.attribute().
     * @param attribute The attribute to be retrieved.
     */
    getAttribute: <K extends keyof T>(attribute: K) => string | undefined;

    /**
     * Alias for style.unset.attribute().
     * @param attribute The attribute to be unset.
     */
    unsetAttribute: <K extends keyof T>(attribute: K) => void;

    /**
     * Alias for flags.toggle.flag().
     * @param flag The flag to be toggled.
     */
    toggleFlag: <K extends keyof U>(flag: K) => void;

    /**
     * Alias for flags.toggle.flag(force).
     * @param flag The flag to be set.
     * @param value The new boolean value for the flag.
     */
    setFlag: <K extends keyof U>(flag: K, value: boolean) => void;

    /**
     * Alias for flags.get.flag().
     * @param flag The flag to be retrieved.
     */
    getFlag: <K extends keyof U>(flag: K) => boolean;
};

/**
 * Builds a Style object from a StyleCategory and sets its starting values.
 * @param category A StyleCategory.
 * @param attributeValues The initial values for the Style's attributes.
 * @param flagValues  The initial values for the Style's flags.
 */
export function createStyle<T extends Attributes, U extends FlagDefinitions>(category: StyleCategory<T, U>, attributeValues?: AttributeValues<T>, flagValues?: Partial<FlagValues<U>>): Style<T, U> {
    let instanceAttr: AttributeValues<T> = Object.assign({}, category.default || {}, attributeValues || {});
    let instanceFlags: FlagValues<U> = Object.assign({}, category.flags, flagValues);

    const classDisplayOption = category.rule || Rule.Single;

    const set: AttributeSetters<T> = Object.keys(category.attributes || {}).reduce((obj, attr) => {
        obj[attr] = function(value: string) {
            instanceAttr = Object.assign({}, instanceAttr, { [attr]: value })
        };
        return obj;
    }, {} as AttributeSetters<T>);

    const get: AttributeGetters<T> = Object.keys(category.attributes || {}).reduce((obj, attr) => {
        obj[attr] = function() {
            return instanceAttr[attr];
        };
        return obj;
    }, {} as AttributeGetters<T>);

    const unset: AttributeUnsetters<T> = Object.keys(category.attributes || {}).reduce((obj, attr) => {
        obj[attr] = function() {
            delete instanceAttr[attr];
        };
        return obj;
    }, {} as AttributeUnsetters<T>);

    function setMany(values: AttributeValues<T>) {
        return Object.assign(instanceAttr, values);
    }
    
    const flags: Flags<U> = {
        toggle: Object.keys(instanceFlags).reduce((obj, flag) => {
            obj[flag] = function(force?: boolean) {
                force? instanceFlags[flag] = force : instanceFlags[flag] = !instanceFlags[flag];
            };
            return obj;
        }, {} as FlagToggles<U>),

        get: Object.keys(instanceFlags).reduce((obj, flag) => {
            obj[flag] = function() {
                //Category definition will ALWAYS have flag defaults so we can discard undefined.
                return instanceFlags[flag]!;
            };
            return obj;
        }, {} as FlagGetters<U>),
    }

    function setAttribute<K extends keyof T>(attribute: K, value: string) {
        set[attribute](value);
    }

    function getAttribute<K extends keyof T>(attribute: K) {
        return get[attribute]();
    }

    function unsetAttribute<K extends keyof T>(attribute: K) {
        unset[attribute]();
    }

    function toggleFlag<K extends keyof U>(flag: K) {
        flags.toggle[flag]();
    }

    function setFlag<K extends keyof U>(flag: K, value: boolean) {
        flags.toggle[flag](value);
    }

    function getFlag<K extends keyof U>(flag: K) {
        return flags.get[flag]();
    }

    const displayClass = classDisplayOption === Rule.Single?
        () => displayClassParam(category, instanceAttr, instanceFlags)
        : () => displayClassSplit(category, instanceAttr, instanceFlags);

    return {
        set, get, unset, setMany, displayClass, flags,
        setAttribute, getAttribute, unsetAttribute, toggleFlag, setFlag, getFlag, 
    };
}