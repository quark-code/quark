/**
@license
MIT License
Copyright (c) 2021 Paul H Mason. All rights reserved.
*/
import { expect } from '@open-wc/testing';
import { DesignToken } from '../lib/DesignToken.js';

describe('design token', () => {
    // LIGHT MODE
    it('creates a basic css variable', async () => {
        const token = new DesignToken('test-token', 'red');

        expect(token.name).to.equal('test-token');
        expect(token.light).to.equal('red');
        expect(token.dark).to.equal(token.light);
        expect(token.hasDarkValue).to.equal(false);

        expect(token.cssVariable).to.equal('--test-token');
    });

    it('creates a reference css variable', async () => {
        const token = new DesignToken('test-token', '{ref-token}');

        expect(token.name).to.equal('test-token');
        expect(token.light).to.equal('var(--ref-token)');
        expect(token.dark).to.equal(token.light);
        expect(token.hasDarkValue).to.equal(false);

        expect(token.cssVariable).to.equal('--test-token');
    });

    it('creates a reference css variable with simple default', async () => {
        const token = new DesignToken('test-token', '{ref-token:blue}');

        expect(token.name).to.equal('test-token');
        expect(token.light).to.equal('var(--ref-token, blue)');
        expect(token.dark).to.equal(token.light);
        expect(token.hasDarkValue).to.equal(false);

        expect(token.cssVariable).to.equal('--test-token');
    });
  
    /* BROKEN - Probably don't need this use case. */
    it('creates a reference css variable with reference default', async () => {
        const token = new DesignToken('test-token', '{ref-token:{another-ref-token}}');

        expect(token.name).to.equal('test-token');
        expect(token.light).to.equal('var(--ref-token, var(--another-ref-token))');
        expect(token.dark).to.equal(token.light);
        expect(token.hasDarkValue).to.equal(false);

        expect(token.cssVariable).to.equal('--test-token');
    });

    // DARK MODE
    it('creates a dark basic css variable', async () => {
        const token = new DesignToken('test-token', 'red', 'magenta');

        expect(token.name).to.equal('test-token');
        expect(token.light).to.equal('red');
        expect(token.dark).to.equal('magenta');
        expect(token.hasDarkValue).to.equal(true);

        expect(token.cssVariable).to.equal('--test-token');
    });

    it('creates a dark reference css variable', async () => {
        const token = new DesignToken('test-token', '{ref-token}', '{dark-ref-token}');

        expect(token.name).to.equal('test-token');
        expect(token.light).to.equal('var(--ref-token)');
        expect(token.dark).to.equal('var(--dark-ref-token)');
        expect(token.hasDarkValue).to.equal(true);

        expect(token.cssVariable).to.equal('--test-token');
    });
    
    it('creates a dark reference css variable with simple default', async () => {
        const token = new DesignToken('test-token', '{ref-token:blue}', '{dark-ref-token:magenta}');

        expect(token.name).to.equal('test-token');
        expect(token.light).to.equal('var(--ref-token, blue)');
        expect(token.dark).to.equal('var(--dark-ref-token, magenta)');
        expect(token.hasDarkValue).to.equal(true);

        expect(token.cssVariable).to.equal('--test-token');
    });

    /* BROKEN - Probably don't need this use case. */
    it('creates a dark reference css variable with reference default', async () => {
        const token = new DesignToken('test-token', '{ref-token:{another-ref-token}}', '{dark-ref-token:{another-dark-ref-token}}');

        expect(token.name).to.equal('test-token');
        expect(token.light).to.equal('var(--ref-token, var(--another-ref-token))');
        expect(token.dark).to.equal('var(--dark-ref-token, var(--another-dark-ref-token))');
        expect(token.hasDarkValue).to.equal(true);

        expect(token.cssVariable).to.equal('--test-token');
    });
});