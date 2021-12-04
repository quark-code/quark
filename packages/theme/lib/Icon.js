/**
@license
MIT License
Copyright (c) 2021 Paul H Mason. All rights reserved.
*/
export class Icon {
    constructor(name, content, size = 24) {
        this._name = name;
        this._content = `<svg viewBox="0 0 ${size} ${size}">${content}</svg>`
    }

    get name() {
        return this._name;
    }

    get content() {
        return this._content;
    }
}