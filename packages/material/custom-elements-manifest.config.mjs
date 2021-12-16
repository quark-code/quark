import fs from 'fs';
import { parse } from 'comment-parser';

//const packageData = JSON.parse(fs.readFileSync('./package.json', 'utf8'));
//const { name, description, version, author, homepage, license } = packageData;

let done = false;

export default {
    globs: ['**/*.js'],
    exclude: ['(demo|docs-src|docs)/**/*.js'],
    litelement: true,

    /*
    overrideModuleCreation: ({ts, globs}) => {
      const program = ts.createProgram(globs, defaultCompilerOptions);
      const typeChecker = program.getTypeChecker();
  
      return program.getSourceFiles().filter(sf => globs.find(glob => sf.fileName.includes(glob)));
    },
    */


    plugins: [
        // Parse custom jsDoc tags
        {
            name: 'quark-custom-tags',
            analyzePhase({ ts, node, moduleDoc, context }) {
                switch (node.kind) {
                    case ts.SyntaxKind.ClassDeclaration: {
                        const className = node.name.getText();
                        const classDoc = moduleDoc?.declarations?.find(declaration => declaration.name === className);
                        const customClassTags = ['dependency', 'since', 'status', 'description', 'defaulttag', 'customtype', 'displayname', 'category'];
                        const customProperyTags = ['allowedvalues'];
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
                                    member.body.statements[0].expression.properties.forEach(prop => {
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

                                /* 
                                member?.jsDoc?.forEach(jsDoc => {
                                    jsDoc?.tags?.forEach(tag => {
                                        if (tag.tagName.getText() === 'foo') {
                                            const description = tag.comment;
                                            const classDeclaration = moduleDoc.declarations.find(declaration => declaration.name === className);
                                            const messageField = classDeclaration.members.find(member => member.name === memberName);

                                            messageField.foo = description
                                        }
                                    });
                                });
                                */
                            }
                        });
                    }
                }
            }
        }
    ]
};