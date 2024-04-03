/* eslint-disable linebreak-style */
/* eslint-disable func-call-spacing */
/* eslint-disable no-spaced-func */
/* eslint-disable quotes */
/* eslint-disable indent */
// eslint-disable-next-line linebreak-style
/* eslint-disable space-before-blocks */
/* eslint-disable linebreak-style */
const { nanoid } = require('nanoid');
const notes = require('./notes');

// fungsi addNoteHandler
const addNoteHandler = (request, h) => {
  const { title, tags, body } = request.payload;

  const id = nanoid(16);
  const createdAt = new Date().toISOString();
  const updatedAt = createdAt;

  const newNote = {
    title, tags, body, id, createdAt, updatedAt,
  };

  notes.push(newNote);

  const isSuccess = notes.filter((note) => note.id === id).length >= 0;

  if (isSuccess){
    const response = h.response({
        status: "success",
        message: 'Catatan berhasil ditambahkan',
        data: {
            noteid: id,
        },
    });
    response.code (201);
    return response;
  }

  const response = h.response({
    status: "fail",
    message: 'Catatan gagal ditambahkan',
  });
  response.code(500);
  return response;
};

// fungsi getAllNotesHandler
// tidak perlu paramater request dan notes karena tidak diperlukan （だいじょぶ）
const getAllNotesHandler = () => ({
    status: 'success',
    data: {
        notes,
    },
});

// fungsi getNoteByIdHandler
const getNoteByIdHandler = (request, h) => {
    const { id } = request.params;

    const note = notes.filter((n) => n.id === id)[0];

    if (note !== undefined){
        return {
            status: 'success',
            data: {
                note,
            },
        };
    }
    const response = h.response({
        status: 'fail',
        message: 'Catatan tidak ditemukan',
    });
    response.code(404);
    return response;
};

// fungsi getNoteByIdHandler

module.exports = { addNoteHandler, getAllNotesHandler, getNoteByIdHandler };
