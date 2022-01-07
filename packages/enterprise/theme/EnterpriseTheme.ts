/**
@license
MIT License
Copyright (c) 2021 Paul H Mason. All rights reserved.
*/
import { Theme } from '@quark-elements/core/providers/DesignSystemProvider.js';

 /**
  * @customtype theme
  * @summary The enterprise theme definition.
  * @displayname Enterprise Theme
  */
export class EnterpriseTheme extends Theme {
    static get tokens() {
        return {
        }
    }

    static get icons() {
        return {
        }
    }

    constructor(name: string) {
        super(name);
    }
}