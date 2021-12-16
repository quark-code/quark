/**
@license
MIT License
Copyright (c) 2021 Paul H Mason. All rights reserved.
*/
export class IconValues {
    constructor(values) {
        if (!values) {
            throw 'Invalid icon definition.';
        }

        this._desktopSize = 24;
        this._mobileSize = this._desktopSize;

        if (typeof values === 'string') {
            this._desktopContent = values;
            this._mobileContent = this._desktopContent;
        } else {
            if (values.icon) {
                this._desktopContent = values.icon;
                this._mobileContent = this._desktopContent;

                if (values.size) {
                    this._desktopSize = values.size;
                    this._mobileSize = this._desktopSize;
                }
            } else {
                if (values.desktop && values.desktop.icon) {
                    this._desktopContent = values.desktop.icon;

                    if (values.desktop.size) {
                        this._desktopSize = values.desktop.size;
                    }
                }

                if (values.mobile && values.mobile.icon) {
                    this._mobileContent = values.mobile.icon;

                    if (values.mobile.size) {
                        this._mobileSize = values.mobile.size;
                    }
                }
            }
        }

        this._mobile = `<svg viewBox="0 0 ${this._mobileSize} ${this._mobileSize}">${this._mobileContent }</svg>`;
        this._desktop = `<svg viewBox="0 0 ${this._desktopSize} ${this._desktopSize}">${this._desktopContent }</svg>`;
    }

    get mobile() {
        return this._mobile;
    }

    get desktop() {
        return this._desktop;
    }
}

export class Icon {
    constructor(name, values, deviceType) {
        this._name = name;
        this.deviceType = deviceType;
        this._content = new IconValues(values);
    }

    get name() {
        return this._name;
    }

    get content() {
        return (this.deviceType === 'mobile') ? this._content.mobile : this._content.desktop;
    }
}