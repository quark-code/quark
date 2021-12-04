
import { Theme } from '@quark-elements/core/providers';
import { ChevronLeft, ChevronRight, ChevronUp, ChevronDown, Settings } from '../icons';

export class QuarkTheme extends Theme {
    static get icons() {
        return {
            'chevron-left': ChevronLeft,
            'chevron-right': ChevronRight,
            'chevron-up': ChevronUp,
            'chevron-down': ChevronDown,
            'settings': Settings
        }
    }

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