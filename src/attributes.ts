export interface Attributes {
    [key: string]: string[],
};

export type AttributeValues<T extends Attributes> = {
    [P in keyof T]?: string;
};

export type AttributeSetters<T> = {
    [P in keyof T]: (value: string) => void;
};

export type AttributeGetters<T> = {
    [P in keyof T]: () => string | undefined;
};

export type AttributeUnsetters<T> = {
    [P in keyof T]: () => void;
};