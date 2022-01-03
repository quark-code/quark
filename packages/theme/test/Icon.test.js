/**
@license
MIT License
Copyright (c) 2021 Paul H Mason. All rights reserved.
*/
import { expect } from '@open-wc/testing';
import { Icon } from '../lib/Icon.js';

describe('icon', () => {
    it('creates a basic icon', async () => {
        const icon = new Icon('test-icon', '<path></path>');
        const svg = '<svg viewBox="0 0 24 24"><path></path></svg>';

        expect(icon.name).to.equal('test-icon');
        expect(icon.defaultVariant).to.equal('default');
        expect(icon.variants.length).to.equal(1);
        expect(icon.variants[0]).to.equal('default');
        expect(icon.getContent()).to.equal(svg);
        expect(icon.getContent('default')).to.equal(svg);
        expect(icon.getContent('does_not_exist')).to.equal(svg);
    });

    it('creates a basic icon with custom size', async () => {
        const value = {
            icon: '<path></path>',
            size: 48
        }

        const icon = new Icon('test-icon', value);
        const svg = '<svg viewBox="0 0 48 48"><path></path></svg>';

        expect(icon.name).to.equal('test-icon');
        expect(icon.defaultVariant).to.equal('default');
        expect(icon.variants.length).to.equal(1);
        expect(icon.variants[0]).to.equal('default');
        expect(icon.getContent()).to.equal(svg);
        expect(icon.getContent('default')).to.equal(svg);
        expect(icon.getContent('does_not_exist')).to.equal(svg);
    });

    it('creates icon variants with default', async () => {
        const value = {
            default: 'variant_1',
            variants: {
                variant_1: '<path>1</path>',
                variant_2: {
                    icon: '<path>2</path>',
                },
                variant_3: {
                    icon: '<path>3</path>',
                    size: 48
                }
            }
        }

        const icon = new Icon('test-icon', value);
        const svg1 = '<svg viewBox="0 0 24 24"><path>1</path></svg>';
        const svg2 = '<svg viewBox="0 0 24 24"><path>2</path></svg>';
        const svg3 = '<svg viewBox="0 0 48 48"><path>3</path></svg>';
        
        expect(icon.name).to.equal('test-icon');
        expect(icon.defaultVariant).to.equal('variant_1');
        expect(icon.variants.length).to.equal(3);
        expect(icon.variants.includes('default')).to.equal(false);
        expect(icon.variants.includes('variant_1')).to.equal(true);
        expect(icon.variants.includes('variant_2')).to.equal(true);
        expect(icon.variants.includes('variant_3')).to.equal(true);
        expect(icon.getContent()).to.equal(svg1);
        expect(icon.getContent('default')).to.equal(svg1);
        expect(icon.getContent('does_not_exist')).to.equal(svg1);
        expect(icon.getContent('variant_1')).to.equal(svg1);
        expect(icon.getContent('variant_2')).to.equal(svg2);
        expect(icon.getContent('variant_3')).to.equal(svg3);
    });

    it('creates icon variants without default', async () => {
        const value = {
            variants: {
                variant_1: '<path>1</path>',
                variant_2: {
                    icon: '<path>2</path>',
                },
                variant_3: {
                    icon: '<path>3</path>',
                    size: 48
                }
            }
        }

        const icon = new Icon('test-icon', value);
        const svg1 = '<svg viewBox="0 0 24 24"><path>1</path></svg>';
        const svg2 = '<svg viewBox="0 0 24 24"><path>2</path></svg>';
        const svg3 = '<svg viewBox="0 0 48 48"><path>3</path></svg>';
        
        expect(icon.name).to.equal('test-icon');
        expect(icon.defaultVariant).to.equal('default');
        expect(icon.variants.length).to.equal(3);
        expect(icon.variants.includes('default')).to.equal(false);
        expect(icon.variants.includes('variant_1')).to.equal(true);
        expect(icon.variants.includes('variant_2')).to.equal(true);
        expect(icon.variants.includes('variant_3')).to.equal(true);
        expect(icon.getContent()).to.equal(null);
        expect(icon.getContent('default')).to.equal(null);
        expect(icon.getContent('does_not_exist')).to.equal(null);
        expect(icon.getContent('variant_1')).to.equal(svg1);
        expect(icon.getContent('variant_2')).to.equal(svg2);
        expect(icon.getContent('variant_3')).to.equal(svg3);
    });

    it('throws an exception if no icon data is provided', async () => {
        expect(() => new Icon('test-icon')).to.throw('Invalid icon definition.');
    });
});