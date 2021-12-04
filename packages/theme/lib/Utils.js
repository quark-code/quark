/**
@license
MIT License
Copyright (c) 2021 Paul H Mason. All rights reserved.
*/
const adoptStyles = (renderRoot, styles) => {
    if (supportsAdoptingStyleSheets) {
        renderRoot.adoptedStyleSheets = styles.map((s) => s instanceof CSSStyleSheet ? s : s.styleSheet);
    }
    else {
        renderRoot.querySelectorAll('style[q-theme]').forEach((s) => renderRoot.removeChild(s));

        styles.forEach((s) => {
            const style = document.createElement('style');
            const nonce = window['litNonce'];

            if (nonce !== undefined) {
                style.setAttribute('nonce', nonce);
            }

            style.setAttribute('q-theme', '');
            style.textContent = s.cssText;
            renderRoot.appendChild(style);
        });
    }
};

export { adoptStyles }