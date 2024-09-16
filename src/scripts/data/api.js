import Swal from "sweetalert2";
const BASE_URL = "https://notes-api.dicoding.dev/v2";

function showAlert(error) {
  Swal.fire({
    title: "Oops...",
    text: error.message,
    icon: "error",
    confirmButtonColor: "#3085d6",
    confirmButtonText: "OK",
  });
}
async function createNote({ title, body }) {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title, body }),
  };
  try {
    const response = await fetch(`${BASE_URL}/notes`, options);
    console.log(response);
    const responseJSON = await response.json();
    return responseJSON;
  } catch (err) {
    showAlert(err);
    throw err;
  }
}

async function getNotes() {
  const response = await fetch(`${BASE_URL}/notes`);

  const responseJSON = await response.json();
  return responseJSON.data;
}

async function getArchivedNotes() {
  const response = await fetch(`${BASE_URL}/notes/archived`);
  const responseJSON = await response.json();
  return responseJSON.data;
}

async function getNoteById(noteId) {
  const response = await fetch(`${BASE_URL}/notes/${noteId}`);
  const responseJSON = await response.json();
  return responseJSON.data;
}

async function archiveNote(noteId) {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(noteId),
  };
  
  const response = await fetch(`${BASE_URL}/notes/${noteId}/archive`, options);
  const responseJSON = await response.json();
  return responseJSON;
}

async function unarchiveNote(noteId) {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(noteId),
  };

  const response = await fetch(
    `${BASE_URL}/notes/${noteId}/unarchive`,
    options,
  );
  const responseJSON = await response.json();
  return responseJSON;
}

async function deleteNote(noteId) {
  return fetch(`${BASE_URL}/notes/${noteId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => data.books)
    .catch((err) => showAlert(err));
}

export {
  createNote,
  getNotes,
  getArchivedNotes,
  deleteNote,
  unarchiveNote,
  archiveNote,
  getNoteById,
};
