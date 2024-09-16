import axios from "axios";
import Swal from "sweetalert2";

const BASE_URL = "https://notes-api.dicoding.dev/v2";

// Membuat instance axios
const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Menambahkan interceptor untuk request
apiClient.interceptors.request.use(
  (config) => {
    // Menambahkan X-Auth-Token ke setiap request
    config.headers[
      "Content-Type"] = "application/json";
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// Menambahkan interceptor untuk response
apiClient.interceptors.response.use(
  (response) => {
    // Bisa menambahkan logika tambahan jika diperlukan
    return response;
  },
  (error) => {
    Swal.fire({
      title: "Oops...",
      text: error.message,
      icon: "error",
      confirmButtonColor: "#3085d6",
      confirmButtonText: "OK",
    });

    return Promise.reject(error);
  },
);

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
  };
  const response = await fetch(`${BASE_URL}/notes/${noteId}/archive`, options);
  const responseJSON = await response.json();
  return responseJSON;
}

async function unarchiveNote(noteId) {
  const options = {
    method: "POST",
  };
  const response = await fetch(
    `${BASE_URL}/notes/${noteId}/unarchive`,
    options,
  );
  const responseJSON = await response.json();
  return responseJSON;
}

async function deleteNote(noteId) {
  const options = {
    method: "DELETE",
  };
  const response = await fetch(`${BASE_URL}/notes/${noteId}`, options);
  const responseJSON = await response.json();
  return responseJSON;
}

export {
  getNotes,
  getArchivedNotes,
  deleteNote,
  unarchiveNote,
  archiveNote,
  getNoteById,
};
