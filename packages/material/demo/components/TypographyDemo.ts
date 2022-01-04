/**
@license
MIT License
Copyright (c) 2021 Paul H Mason. All rights reserved.
*/
import { html, css, QuarkElement } from '@quark-elements/core/elements/QuarkElement.js';
import { 
    displayLarge, displayMedium, displaySmall, headlineLarge, headlineMedium, headlineSmall, titleLarge, titleMedium, titleSmall, 
    labelLarge, labelMedium, labelSmall, bodyLarge, bodyMedium, bodySmall, codeLarge, codeMedium, codeSmall 
} from '../../providers/theme/tokens/typography.js';

export class TypographyDemo extends QuarkElement {
    static get styles() {
        return [
            displayLarge, displayMedium, displaySmall, 
            headlineLarge, headlineMedium, headlineSmall, 
            titleLarge, titleMedium, titleSmall,
            labelLarge, labelMedium, labelSmall,
            bodyLarge, bodyMedium, bodySmall, 
            codeLarge, codeMedium, codeSmall,
            css`
                :host {
                    display: block;
                }
        
                :host([hidden]) {
                    display: none !important;
                }
        
                :host([disabled]) {
                    pointer-events: none;
                }
            `
        ];
    }

    render() {
        return html`
            <div class="typography-display-large">Display Large</div>
            <div class="typography-display-medium">Display Medium</div>
            <div class="typography-display-small">Display Small</div>

            <div class="typography-headline-large">Headline Large</div>
            <div class="typography-headline-medium">Headline Medium</div>
            <div class="typography-headline-small">Headline Small</div>

            <div class="typography-title-large">Title Large</div>
            <div class="typography-title-medium">Title Medium</div>
            <div class="typography-title-small">Title Small</div>

            <div class="typography-label-large">Label Large</div>
            <div class="typography-label-medium">Label Medium</div>
            <div class="typography-label-small">Label Small</div>

            <div class="typography-body-large">Body Large</div>
            <div class="typography-body-medium">Body Medium</div>
            <div class="typography-body-small">Body Small</div>

            <div class="typography-code-large">Code Large</div>
            <div class="typography-code-medium">Code Medium</div>
            <div class="typography-code-small">Code Small</div>
        `;
    }
}

TypographyDemo.register('typography-demo');