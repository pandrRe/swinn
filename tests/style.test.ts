import { category, createStyle, Rule } from "../src/index";
import { styleFlags } from "../src/flags";

describe("Test attributes.", () => {
    test("Without default attributes and with default CSS rule.", () => {
        const button = category({
            name: "button",
            attributes: {
                color: ["red", "green", "blue"],
                size: ["small", "medium", "big"],
            },
        });
    
        const buttonStyle = createStyle(button);
        expect(buttonStyle.displayClass()).toBe("button");
        expect(buttonStyle.get.color()).toBeUndefined();
        expect(buttonStyle.getAttribute("color")).toBeUndefined();
    
        expect(buttonStyle.get.size()).toBeUndefined();
        expect(buttonStyle.getAttribute("size")).toBeUndefined();
    
        buttonStyle.set.color("red");
    
        expect(buttonStyle.get.color()).toBe("red");
        expect(buttonStyle.displayClass()).toBe("button button-color-red");
    
        buttonStyle.setAttribute("size", "medium");
    
        expect(buttonStyle.getAttribute("size")).toBe("medium");
        expect(buttonStyle.displayClass()).toBe("button button-color-red button-size-medium");
    
        buttonStyle.unset.color();
        expect(buttonStyle.get.color()).toBeUndefined();
        expect(buttonStyle.displayClass()).toBe("button button-size-medium");

        buttonStyle.unsetAttribute("size");
        expect(buttonStyle.getAttribute("size")).toBeUndefined();
        expect(buttonStyle.displayClass()).toBe("button");

        buttonStyle.setMany({
            color: "green",
            size: "small",
        });
        expect(buttonStyle.displayClass()).toBe("button button-color-green button-size-small");
    });

    test("With default attributes and with default CSS rule.", () => {
        const list = category({
            name: "list",
            attributes: {
                elementFont: ["arial", "helvetica", "comic-sans"],
                elementColor: ["red", "green", "blue"],
                highlightColor: ["cyan", "yellow"],
            },
            default: {
                elementColor: "red",
                highlightColor: "cyan",
            },
        });

        const listStyle = createStyle(list);

        expect(listStyle.get.elementColor()).toBe("red");
        expect(listStyle.getAttribute("highlightColor")).toBe("cyan");
        expect(listStyle.get.elementFont()).toBeUndefined();
        expect(listStyle.displayClass()).toBe("list list-element-color-red list-highlight-color-cyan");

        listStyle.set.elementColor("green");
        listStyle.setAttribute("elementFont", "helvetica");

        expect(listStyle.displayClass()).toBe("list list-element-color-green list-highlight-color-cyan list-element-font-helvetica");

        listStyle.unset.highlightColor();

        expect(listStyle.displayClass()).toBe("list list-element-color-green list-element-font-helvetica");
    });

    test("With Split CSS rule.", () => {
        const modal = category({
            name: "modal",
            attributes: {
                headerType: ["alert", "success", "neutral"],
                size: ["slim", "fat"],
            },
            default: {
                headerType: "neutral",
                size: "slim",
            },
            rule: Rule.Split,
        });

        const modalStyle = createStyle(modal, { size: "fat" });

        expect(modalStyle.get.size()).toBe("fat");
        expect(modalStyle.displayClass()).toBe("modal header-type-neutral size-fat");
    });
});

describe("Test flags.", () => {
    test("With plain objects.", () => {
        const text = category({
            name: "text",
            flags: {
                bold: false,
                italic: false,
                underlined: false,
            },
        });

        const textStyle = createStyle(text, {}, { bold: true });

        expect(textStyle.flags.get.bold()).toBe(true);
        expect(textStyle.getFlag("italic")).toBe(false);
        expect(textStyle.flags.get.underlined()).toBe(false);
        expect(textStyle.displayClass()).toBe("text text-bold");

        textStyle.flags.toggle.bold();
        textStyle.toggleFlag("italic");
        textStyle.setFlag("underlined", true);

        expect(textStyle.displayClass()).toBe("text text-italic text-underlined");
    });

    test("With styleFlags function (no Intellisense).", () => {
        const text = category({
            name: "text",
            flags: styleFlags("bold", "italic", "underlined"),
        });

        const textStyle = createStyle(text, {}, { italic: true });

        expect(textStyle.flags.get.bold()).toBe(false);
        expect(textStyle.getFlag("italic")).toBe(true);
        expect(textStyle.flags.get.underlined()).toBe(false);
        expect(textStyle.displayClass()).toBe("text text-italic");

        expect(textStyle.get.randomProp).toBeUndefined();

        textStyle.flags.toggle.bold();
        textStyle.toggleFlag("italic");
        textStyle.setFlag("underlined", true);

        expect(textStyle.displayClass()).toBe("text text-bold text-underlined");
    });
})