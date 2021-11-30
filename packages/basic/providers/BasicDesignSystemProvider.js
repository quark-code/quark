/**
@license
MIT License
Copyright (c) 2021 Paul H Mason. All rights reserved.
*/
import { Theme, DesignSystemProvider, themeManager } from '@quark-elements/core/providers';

class BasicTheme extends Theme {
    constructor(name, foreground, background) {
        super(name);

        this.addToken('test-surface-color', '#FAFAFA').dark('#1E1E1E');
        this.addToken('test-foreground-color', foreground);
        this.addToken('test-background-color', background);
        this.addToken('test-button-color', background);
        //this.addToken('test-one-color', '{test-background-color}');
        //this.addToken('test-two-color', '{test-background-color:#00FF00}');
    }
}

const designSystemProvider = new DesignSystemProvider(BasicTheme);

function provideBasicDesignSystem() {
    return designSystemProvider;
} 

export { provideBasicDesignSystem, BasicTheme, themeManager }