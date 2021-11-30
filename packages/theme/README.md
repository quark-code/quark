The `@quark-elements/theme` package is a generic theming library for web components based on design tokens, which are converted to CSS custom variables for use.

# Usage

First, you need to import the theme package.

```
npm install @quark-elements/theme --save
```

To create a theme you need to define a set of design tokens that describe the theme and group them into a custom theme class, which can then be used as a theme template to register one or more theme brands with the theme manager. It sounds like a bit of a mouthful, so here's how to do it:

```javascript
import { Theme, themeManager } from '@quark-elements/theme';

// Create a custom theme template class.
class MyTheme extends Theme {
    constructor(name, foreground, background) {
        // The name of the theme must be passed to the base constructor.
        super(name);

        // Add the design tokens that make up the theme.
        // Normal (light and dark mode are the same)
        this.addToken('test-foreground-color', foreground);
        this.addToken('test-background-color', background);
        // Different light and dark mode.
        this.addToken('test-surface-color', '#FAFAFA').dark('#1E1E1E');
        // Reference value, with default.
        this.addToken('test-button-color', '{test-background-color:#00FF00}');
    }
}

// Create the theme brands.
const redThemeBrand = new MyTheme('red', 'white', 'red');
const blueThemeBrand = new MyTheme('blue', 'yellow', 'blue');

// Register the theme brands with the theme manager.
redThemeBrand.register();
blueThemeBrand.register();

// Use a particular theme.
blueThemeBrand.use();

// You can also do the following:
themeManager.register(redThemeBrand);
themeManager.register(blueThemeBrand);
```

# ThemeManager
The `ThemeManager` class is exposed as the singleton `window._themeManager`, but is most easily accessed by importing a reference.

```javascript
import { themeManager } from '@quark-elements/theme';
```

## API

### themeNames: Array
A property that returns an array containing the names of all the registered themes.

### defaultThemeName: string
The name of the default theme if it has been set, otherwise null, which is activated if `use` is called without a `name`. It is set by calling `makeDefault`.

### activeThemeName: string
The name of the currently active theme (by calling `use`), or null if there is no active theme.

### register(theme: Theme)
Registers the given `Theme` instance.

### unregister(name: string)
Unregisters the theme with the given name. Note: It simple unregisters the theme and doesn't remove the applied CSS variables - you need to `use` a new theme afterwards.

### has(name: string)
Returns whether or not a theme with the given name is registered.

### use(name: string)
Applies the theme with the given name to the `html` element as a style tag. If `use` is called without a `name`, then the default theme will be used (if set). If there is no default theme then a theme with the name of `default` will be used, if it exists.

### clear()
Clears the currently applied theme.

### makeDefault(name: string)
Sets the named theme as the default, which will be used if `use` is called without a `name`.

### Mode: string
Gets or sets the theme mode, which can be one of:

* `system` - This is the default and uses whichever mode (dark or light) specified by the browser.
* `dark` - Forces dark mode.
* `light` - Forces light mode.

# Theme
A theme is a named collection of design tokens that describes all the configurable values that make up a theme. You will typically subclass `Theme` to create a class that defines all the design tokens that make up a theme (your application will only have a single theme type) and the constructor will accept values for those tokens that can be overridden to create different brands.

> A brand is an instance of a single theme where certain tokens (usually colors) are overridden.

## API

### constructor(name: string)
Creates a new `Theme` instance with the given `name`. The name must be unique per `ThemeManager`.

### name: string
Returns the `theme` name (readonly).

### tokens: Array
Returns an array containing all the theme tokens.

### Mode: string
Gets or sets the theme mode, which can be one of:

* `system` - This is the default and uses whichever mode (dark or light) specified by the browser.
* `dark` - Forces dark mode.
* `light` - Forces light mode.

You normally wouldn't set this on a `Theme` instance, but rather indirectly *via* the global `ThemeManager` instance.

### addToken(name: string, value: string)
Adds a new design token to the theme.

#### name: string
The unique design token name. The name, which must be a unique and you should use dash (`-`) separators to make it readable, is converted into a CSS custom variable name. For example:

`my-button-background-color` is transformed into `--my-button-background-color`.

#### value: string
This can either be a CSS value or a reference to another design token name. In the case of a CSS value, the transform is simple:

`#FF0000` is transformed to `--something: #FF0000`.

If you want the value to be another design token (reference value), then it must be contained within braces (`{}`).

`{my-background-color}` is transformed to `--something: var(--my-background-color)`.

You can also provide a default value if you use a reference value by separating it with a colon (`:`).

`value: {my-background-color: #0000FF}` is transformed to `--something: var(--my-background-color,  #0000FF)`.

### register()
Registers the theme instance. This simply calls the global `themeManager.register` method.

### unregister()
Unregisters the theme instance. This simply calls the global `themeManager.unregister` method.

### use(el)
Applies the theme with the given name to the document. This simply calls the global `themeManager.use` method.

## Dark Mode
A theme can use either `dark`, `light` or `system` (the browser determines the mode) mode. The `addToken` method takes a `value` parameter that specifies the values used for light mode (and dark mode, if you don't provide alternative dark mode values). If you want different values for dark mode you can call the `dark` methods on the returned `DesignToken` instance returned by `addToken`. e.g. If you want different colors for light and dark mode for the `surface` design token, you can do the following:

```javascript
this.addToken('test-surface-color', '#FAFAFA').dark('#1E1E1E');
```

You should only provide dark mode override values where it makes sense. The default mode is `system` (the browser sets the mode type based on user proference, which may be a browser or OS setting). You can force the mode using the global `ThemeManager` instance (`window._themeManager`) or import it

```javascript
import { themeManager } from "@quark-elements/theme";

window._themeManager.mode = 'dark'; // or 'light' or 'system'.

// OR
themeManager.mode = 'dark';
```

## Example
```javascript
import { DesignToken, Theme } from '@quark-elements/theme';

// Create a custom theme template class.
class MyTheme extends Theme {
    constructor(name, foreground, background) {
        // The name of the theme must be passed to the base constructor.
        super(name);

        // Add the design tokens that make up the theme.
        this.addToken('test-surface-color', '#FAFAFA').dark('#1E1E1E');
        this.addToken('test-foreground-color', foreground);
        this.addToken('test-background-color', background);
        this.addToken('test-button-color', '{test-background-color:#00FF00}');
    }
}

// Create the theme brands.
const redThemeBrand = new MyTheme('red', 'white', 'red');
const blueThemeBrand = new MyTheme('blue', 'yellow', 'blue');

// Register the theme brands with the theme manager.
redThemeBrand.register();
blueThemeBrand.register();

// Use a particular theme.
blueThemeBrand.use();
```