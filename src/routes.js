/* eslint-disable linebreak-style */
/* eslint-disable eol-last */
/* eslint-disable arrow-spacing */
// eslint-disable-next-line linebreak-style
// eslint-disable-next-line linebreak-style
/* eslint-disable key-spacing */
/* eslint-disable indent */
/* eslint-disable linebreak-style */
// eslint-disable-next-line linebreak-style
const { addNoteHandler, getAllNotesHandler, getNoteByIdHandler } = require('./handler');

const routes = [
    {
        method:'POST',
        path:'/notes',
        handler: addNoteHandler,
    },
    {
        method:'GET',
        path:'/notes',
        handler: getAllNotesHandler,
    },
    {
        method:'GET',
        path:'/notes/{id}',
        handler: getNoteByIdHandler,
    },
    {
        method: 'PUT',
        path: '/notes/{id}',
        handler: () => {},
    },
];

module.exports = routes;