import fs from 'fs';
import { parse } from 'comment-parser';

//const packageData = JSON.parse(fs.readFileSync('./package.json', 'utf8'));
//const { name, description, version, author, homepage, license } = packageData;

let done = false;

export default {
    globs: ['../core/**/*.js'],
    exclude: ['../core/(node_modules|demo|test|manifests)/**/*.js'],
    outdir: '/manifests/core',
    litelement: true,
    dev: false,

    plugins: [
        // Parse custom jsDoc tags
        {
            name: 'quark-custom-tags',
            analyzePhase({ ts, node, moduleDoc, context }) {
                switch (node.kind) {
                    case ts.SyntaxKind.ClassDeclaration: {
                        const className = node.name.getText();

                        const classDoc = moduleDoc?.declarations?.find(declaration => declaration.name === className);
                        const customClassTags = ['dependency', 'since', 'status', 'description', 'defaulttag', 'customtype', 'displayname', 'category', 'designsystem'];
                        const customProperyTags = ['allowedvalues', 'default', 'readonly'];
                        let customComments = '/**';

                        node.jsDoc?.forEach(jsDoc => {
                            jsDoc?.tags?.forEach(tag => {
                                const tagName = tag.tagName.getText();

                                if (customClassTags.includes(tagName)) {
                                    customComments += `\n * @${tagName} ${tag.comment}`;
                                }
                            });
                        });

                        const parsed = parse(customComments + '\n */');

                        if (parsed && parsed.length > 0) {
                            parsed[0].tags?.map(t => {
                                switch (t.tag) {
                                    case 'defaulttag': {
                                        classDoc['tagName'] = t.name;
                                        classDoc['customElement'] = true;
                                        break;
                                    }

                                    case 'designsystem': {
                                        classDoc['designsystem'] = `${t.name} ${t.description}`;
                                        break;
                                    }

                                    case 'description': {
                                        classDoc['description'] = t.description;
                                        break;
                                    }

                                    case 'displayname': {
                                        classDoc['displayname'] = `${t.name} ${t.description}`;
                                        break;
                                    }

                                    case 'category': {
                                        classDoc['category'] = `${t.name} ${t.description}`;
                                        break;
                                    }

                                    case 'customtype': {
                                        classDoc['type'] = {
                                            'text': t.name
                                        };
                                        break;
                                    }

                                    // Dependencies
                                    case 'dependency': {
                                        if (!Array.isArray(classDoc['dependencies'])) {
                                            classDoc['dependencies'] = [];
                                        }

                                        classDoc['dependencies'].push(t.name);
                                        break;
                                    }

                                    // Value-only metadata tags
                                    case 'since':
                                    case 'status': {
                                        classDoc[t.tag] = t.name;
                                        break;
                                    }

                                    // All other tags
                                    default: {
                                        if (!Array.isArray(classDoc[t.tag])) {
                                            classDoc[t.tag] = [];
                                        }

                                        classDoc[t.tag].push({
                                            name: t.name,
                                            description: t.description,
                                            type: t.type || undefined
                                        });
                                    }
                                }
                            });
                        }

                        node.members?.forEach(member => {
                            const memberName = member.name?.getText();

                            if (memberName) {
                                if (memberName === 'properties') { 
                                    const properties = member.body ? member.body.statements[0].expression.properties : member.initializer.properties;
                                    properties.forEach(prop => {
                                        const propName = prop.name.getText();

                                        prop?.jsDoc?.forEach(jsDoc => {
                                            jsDoc?.tags?.forEach(tag => {
                                                const propTagName = tag.tagName.getText();

                                                if (customProperyTags.includes(propTagName)) {
                                                    const description = tag.comment;
                                                    const propField = classDoc.members.find(member => member.name === propName);
                                                    const attrField = classDoc.attributes.find(member => member.name === propName);

                                                    propField[propTagName] = JSON.parse(description);
                                                    attrField[propTagName] = propField[propTagName];
                                                }
                                            });
                                        });
                                    });
                                }
                            }
                        });
                    }
                }
            }
        }
    ]
};