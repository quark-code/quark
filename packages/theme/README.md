The `@quark-elements/theme` package is a generic theming library for web components based on design tokens, which are converted to CSS custom variables for use. It also supports svg icons, which are linked to themes.

# Installation

```
npm install @quark-elements/theme --save
```

# Creating a Theme

Before getting into creating themes, there are 3 import concepts to understand.

* ThemeManager: This class manages all the theme instances (brands) for an application. A singleton instance, `window.themeManager` is automatically created that you will interact with.
* Theme: This is the application or design system specific template for all brands and defines all the required design tokens and icons. It is created by subclassing `Theme`.
* Brand: This is a named instance of the `Theme` subclass which allows you to create one or more unique brands or variants by overriding the default design token and icon values. You will always have a least one brand (instance).

The theme an application, you need to import `Theme` in order to create a theme template, and `themeManager` which is used to register the theme brands that you create and set the active theme brand.

```javascript
import { Theme, themeManager } from '@quark-elements/theme';
```

A typical custom theme definition looks like this:

```javascript
class MyTheme extends Theme {  
    // The theme design tokens that are shared by all brands.
    static get tokens() {
        return {
            // Design token definitions.
        }
    }

    // The theme icons that are shared by all brands.
    static get icons() {
        return {
            // Icon definitions.
        };
    }

    constructor(name, /* override parameters */) {
        super(name);

        // Add brand design tokens that are unique to each brand.

        // Add brand icons that are unique to each brand.
    }
}
```

The static `tokens` getter should return an object containing all the design tokens that are shared by every instance of the theme (brands) and the static `icons` getter should return an object containing all the shared icons. These are called the `Theme Design Tokens` and the `Theme Icons`.

This is enough if you only want a single brand (look and feel), but if you want more than one brand then you need to override the shared design token (you'll always want to do this) and icon values (not so common). The values used for the design token and icon overrides should be passed in *via* the constructor. All overrides should be done in the constructor, or methods called from the constructor. These are called the `Brand Design Tokens` and the `Brand Icons`.

## Creating Theme Design Tokens

`Theme Design Tokens` are created in a static getter function called 'tokens`, and each token is converted to a CSS custom property with the corresponding value. Theme definitions can also support light and dark modes by providing an optional dark mode value for design tokens (typically color values). If a dark mode value isn't provided then the light value will be provided for both the light and dark mode. The code snippet below shows the design token definition possibilities.

```javascript
static get tokens() {
    return {
        // A design token with a light value only.
        'theme-primary-color': '#1976D2',

        // A design token with a light and a dark value.
        'theme-surface-color': {
            light: '#FFFFFF',
            dark: '#282828'
        },

        // A design token with a reference value.
        'theme-typography-font-serif': 'Georgia',
        'theme-typography-headline-font': '{theme-typography-font-serif}',

        // A design token with a reference value and a default value.
        'theme-typography-headline-weight': '{theme-typography-weight-bold:600}',
    }
}
```

## Creating Theme Icons

TODO

## Creating Brand Design Tokens

TODO

## Creating Brand Icons

TODO

# Using a Theme

TODO