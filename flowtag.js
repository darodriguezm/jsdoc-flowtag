/**
 * This is just an example.
 *
 * @module plugins/flowtag
 */
'use strict';

exports.defineTags = function (dictionary) {
    dictionary.defineTag('flow', {
        mustHaveValue: true,
        mustNotHaveDescription: false,
        canHaveType: true,
        canHaveName: false,
        onTagged: function (doclet, tag) {
            if(!doclet.flow) {
                doclet.flow = [];
            }

            doclet.flow.push({
                'type' : tag.value.type ? (tag.value.type.names.length === 1 ? tag.value.type.names[0] : tag.value.type.names ) : '',
                'description': tag.value.description || ''
            });
        }
    });
};

exports.handlers = {
    newDoclet: function (e) {
        const parameters = e.doclet.flow
        if (parameters) {
            //e.doclet.scope = 'flow'
            e.doclet.description = `${e.doclet.description || ''}
            <div class="container-params">
            <h5>flow:</h5>
        
            <table class="params">
                <thead>
                    <tr>
                        <th>name</th>
                        <th class="last">Description</th>
                    </tr>
                </thead>
        
                <tbody>
                    <tr>
                        <td class="type">
                            <span class="param-type">${parameters[0].type}</span>
                        </td>
                        <td class="description last">${parameters[0].description}
                        </td>
                    </tr>
        
                </tbody>
            </table>
        </div>`
        }
    }
};