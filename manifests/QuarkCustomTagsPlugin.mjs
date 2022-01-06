//import fs from 'fs';
import { parse } from 'comment-parser';
//let done = false;

export const QuarkCustomTagsPlugin = {
    name: 'quark-custom-tags',
    analyzePhase({ ts, node, moduleDoc, context }) {
        switch (node.kind) {
            // Processes decorators.
            case ts.SyntaxKind.FunctionDeclaration: {
                const packageName = moduleDoc.path.split('/')[1];
                const functionName = node.name.getText();
                const funcDoc = moduleDoc?.declarations?.find(declaration => declaration.name === functionName);
                const customTags = ['customtype', 'displayname', 'category', 'designsystem'];
                funcDoc['packageName'] = packageName;

                node.jsDoc?.forEach(jsDoc => {
                    jsDoc?.tags?.forEach(tag => {
                        const tagName = tag.tagName.getText();
                        
                        if (customTags.includes(tagName)) {
                            switch (tagName) {
                                case 'customtype': {
                                    funcDoc['type'] = {
                                        'text': tag.comment
                                    };
                                    break;
                                }

                                default: {
                                    funcDoc[tagName] = tag.comment;
                                }
                            }
                        }
                    });
                });

                break;
            }

            case ts.SyntaxKind.ClassDeclaration: {
                const packageName = moduleDoc.path.split('/')[1];
                const className = node.name.getText();

                const classDoc = moduleDoc?.declarations?.find(declaration => declaration.name === className);
                const customClassTags = ['dependency', 'since', 'status', 'defaulttag', 'customtype', 'displayname', 'category', 'designsystem'];
                const customProperyTags = ['allowedvalues', 'default', 'readonly', 'attribute'];
                let customComments = '/**';

                node.jsDoc?.forEach(jsDoc => {
                    jsDoc?.tags?.forEach(tag => {
                        const tagName = tag.tagName.getText();

                        if (customClassTags.includes(tagName)) {
                            customComments += `\n * @${tagName} ${tag.comment}`;
                        }
                    });
                });

                classDoc['packageName'] = packageName;

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
                                            let description = tag.comment;

                                            try {
                                                description = JSON.parse(description);
                                            } catch { }

                                            const propField = classDoc.members.find(member => member.name === propName);
                                            const attrField = classDoc.attributes.find(member => member.name === propName);

                                            if (propField) {
                                                propField[propTagName] = description;
                                            }

                                            if (attrField) {
                                                attrField[propTagName] = description;
                                            }
                                        }
                                    });
                                });
                            });
                        }
                    } else {
                        // TypeScript Property Decorator
                        member.body.statements.forEach(s => {
                            const mName = s.expression?.left?.name?.escapedText;

                            if (mName && s.jsDoc) {
                                s.jsDoc[0].tags?.forEach(tag => {
                                    const propTagName = tag.tagName.getText();

                                    if (customProperyTags.includes(propTagName)) {
                                        let description = tag.comment;

                                        try {
                                            description = JSON.parse(description);
                                        } catch { }

                                        const propField = classDoc.members.find(member => member.name === mName);
                                        const attrField = classDoc.attributes.find(member => member.name === mName);


                                        if (propField) {
                                            propField[propTagName] = description;
                                        }

                                        if (attrField) {
                                            attrField[propTagName] = description;
                                        }
                                    }
                                });
                            }
                        });
                    }
                });

                break;
            }
        }
    }
}

