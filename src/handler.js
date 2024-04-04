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
            noteId: id,
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

// fungsi editNoteByIdHandler
// Bila note dengan id yang dicari ditemukan, index akan bernilai
// array index dari objek catatan yang dicari. Namun, bila tidak
// ditemukan, index akan bernilai -1. Jadi, kita bisa menentukan
// gagal atau tidaknya permintaan dari nilai index menggunakan if
// else.

const editNoteByIdHandler = (request, h) => {
    const { id } = request.params;

    const { title, tags, body } = request.payload;
    const updatedAt = new Date().toISOString();

    const index = notes.findIndex((note) => note.id === id);

    if (index !== -1){
        notes[index] = {
            ...notes[index],
            title,
            tags,
            body,
            updatedAt,
        };

        const response = h.response ({
            status: 'success',
            message: 'Catatan berhasil diperbarui',
        });
        response.code(200);
        return response;
    }
    const response = h.response ({
        status: 'fail',
        message: 'Gagal memperbarui catatan. Id tidak ditemukan',
    });
    response.code(404);
    return response;
};

// fungsi deleteNoteByIdHandler
const deleteNoteByIdHandler = (request, h) => {
    const { id } = request.params;
    const index = notes.findIndex((note) => note.id === id);

    if (index !== -1){
        notes.splice(index, 1);
        const response = h.response({
            status: 'success',
            message: 'Catatan berhasil dihapus',
        });
        response.code(200);
        return response;
    }

    const response = h.response({
        status: 'fail',
        message: 'Catatan gagal dihapus. Id tidak ditemukan',
    });
    response.code(404);
    return response;
};

module.exports = {
    addNoteHandler,
    getAllNotesHandler,
    getNoteByIdHandler,
    editNoteByIdHandler,
    deleteNoteByIdHandler,
};
