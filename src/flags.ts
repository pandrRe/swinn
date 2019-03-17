export type FlagToggles<T> = {
    [P in keyof T]: (force?: boolean) => void;
};

export type FlagGetters<T> = {
    [P in keyof T]: () => boolean;
};

export type Flags<T extends FlagDefinitions> = {
    /**
     * Toggles a specific flag or directly sets a value.
     */
    toggle: FlagToggles<T>;

    /**
     * Gets the value of a specific flag.
     */
    get: FlagGetters<T>;
}

export type FlagValues<T extends FlagDefinitions> = {
    [K in keyof T]: boolean;
};

export type FlagDefinitions = {
    [key: string]: boolean;
}

/**
 * Creates a FlagValues object with all flags set to false.
 * Notice that this breaks Intellisense for FlagGetters amd FlagToggles.
 * @param flags 
 */
export function styleFlags(...flags: string[]) {
    return flags.reduce((obj, flag) => {
        obj[flag] = false;
        return obj;
    }, {} as FlagDefinitions);
}