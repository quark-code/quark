/**
@license
MIT License
Copyright (c) 2021 Paul H Mason. All rights reserved.
*/
import { QuarkElement } from '@quark-elements/core/elements';
import { html, css } from 'lit';

export class PageContainer extends QuarkElement {
    static get styles() {
        return [css`
            :host {
                /*
                --page-container-background: white; 
                --page-container-on-background: #181818;
                */
                display: block;
                overflow: hidden;
                color: var(--page-container-on-background, #181818);
                background-color: var(--page-container-background, white);
            }
    
            :host([hidden]) {
                display: none !important;
            }
    
            :host([disabled]) {
                pointer-events: none;
            }

            .header {
                overflow: hidden;
                grid-area: header;
            }

            .navigator {
                overflow: hidden;
                grid-area: navigator;
            }

            .content {
                overflow: hidden;
                grid-area: content;
            }

            .footer {
                overflow: hidden;
                grid-area: footer;
            }

            .container {
                display: grid;
                width: 100%;
                height: 100%;
                overflow: hidden;
                grid-template-columns: auto 1fr; 
                grid-template-rows:    auto 1fr auto;
                grid-template-areas: "header    header"
                                     "navigator content"
                                     "footer    footer";
            }
        `];
    }

    render() {
        return html`
            <div class="container">
                <div class="header"><slot name="header"></slot></div>
                <div class="navigator"><slot name="navigator"></slot></div>
                <div class="content"><slot name="content"></slot></div>
                <div class="footer"><slot name="footer"></slot></div>
            </div>
        `;
    }
}

PageContainer.register('page-container');