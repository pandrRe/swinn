# Swinn
BEM interface for modern front-end.


## Introduction

In the current front-end landscape, dynamic and reusable styles have become a necessity. Currently, the community is split: some still do it the "old way", some have chosen a CSS-in-JS solution from the many available.

There hasn't been a silver bullet yet as all methods have their flaws: CSS-in-JS doesn't fully respect separation of concerns, some solutions have generated class names, giving up their semantic meanings. The good ol' static class names that apply BEM or some other CSS methodology are OK, but they lack flexibility as JS does not provide a robust className API. You can mix class names with the DOM `style` API, but it tends to feel hacky and it isn't declarative.

Swinn comes in to fill the spot of the unexisting className API, while adhering to the BEM methodology and providing flexible and composable styles for your components.

## Quick Start

Swinn is framework agnostic and does not have a single dependency, weighing around 1.6kb! So you might guess that it's very easy to drop it on your project. And it is!

Add it as a dependency to your project using:
```
npm install swinn
```

Or just drop one of the bundles on the repo's `build` folder on your JS files.

## Usage

First, declare a style category. It will be used for all components of the same family.

```js
import { category, styleFlags } from "swinn"

const button = category({
    //This name will be used throughout the CSS classes.
    name: "button",
    attributes: {
        color: ["red", "green", "blue"],
        size: ["small", "medium", "big"],
    },
    default: {
        color: "blue",
        size: "medium",
    },
    flags: styleFlags("dim", "hidden"),
});

export { button };
```

Now you can build Button components that comply to their style category: they can only have one Color attribute, one Size attribute and have "dim" and "hidden" as style flags.

```jsx
//Pseudo-React example. Doesn't actually work.
import { createStyle } from "swinn";
import { button } from "./button_style.js";

function Button({ attributes, flags, text }) {
    const style = createStyle(button, attributes, flags);

    return <button className={style.displayClass()}>
        text
    </button>
}

//Results in a button with className 'button button-color-red'.
function RedButton({ text }) {
    return <Button attributes={{ color: "red" }} text={text}/>
}

//Results in a button with className 'button button-color-green button-dim'.
function GreenDimButton({ text }) {
    return <Button 
        attributes={{ color: "green" }}
        flags={{ dim: true }}
        text={text}
    />
}
```