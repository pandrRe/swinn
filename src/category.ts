import { Attributes, AttributeValues } from "./attributes";
import { Rule } from "./rule";
import { FlagValues, FlagDefinitions } from "./flags";

export type StyleCategory<Attrs extends Attributes, Flags extends FlagDefinitions> = {
    name: string,
    attributes?: Attrs,
    flags?: Flags,
    default?: AttributeValues<Attrs>,
    rule?: Rule,
};

export function category<T extends Attributes, U extends FlagDefinitions, >(builder: StyleCategory<T, U>) {
    return builder;
}