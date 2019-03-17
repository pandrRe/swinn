import { AttributeValues, Attributes } from "./attributes";
import { StyleCategory } from "./category";
import { FlagValues, FlagDefinitions } from "./flags";
import { toParamCase } from "./toParamCase";

export function displayClassSplit<T extends Attributes, U extends FlagDefinitions>(category: StyleCategory<T, U>, attributes: AttributeValues<T>, flags?: FlagValues<U>) {
    let classStr = toParamCase(category.name);

    Object.keys(attributes).forEach(attr => {
        classStr += ` ${toParamCase(attr)}-${toParamCase(attributes[attr]!)}`;
    });

    Object.keys(flags || {}).forEach(flag => {
        if (flags![flag]) {
            classStr += ` ${toParamCase(flag)}`;
        }
    });
    
    return classStr;
}

export function displayClassParam<T extends Attributes, U extends FlagDefinitions>(category: StyleCategory<T, U>, attributes: AttributeValues<T>, flags?: FlagValues<U>) {
    const categoryName = toParamCase(category.name);
    
    let classStr = categoryName;

    Object.keys(attributes).forEach(attr => {
        classStr += ` ${categoryName}-${toParamCase(attr)}-${toParamCase(attributes[attr]!)}`;
    });

    Object.keys(flags || {}).forEach(flag => {
        if (flags![flag]) {
            classStr += ` ${categoryName}-${toParamCase(flag)}`;
        }
    });

    return classStr;
}