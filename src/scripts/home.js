import "./components/index.js";
import formValidation from "./form-validation.js";
import NOTES_DUMMY from "../Notes.js";
import * as AOS from "aos";
import Sweetalert2 from "sweetalert2";
import "aos/dist/aos.css";
import "../styles/style.css";

import {
  createNote,
  getNotes,
  getArchivedNotes,
  deleteNote,
  unarchiveNote,
  archiveNote,
  getNoteById,
} from "./data/api.js";

const RENDER_EVENT = "RENDER_EVENT";

const formInput = document.getElementById("add-form");

formInput.addEventListener("submit", async (e) => {
  e.preventDefault();
  document.body.appendChild(document.createElement("loading-overlay"));
  const title = formInput.elements.title.value;
  const body = formInput.elements.body.value;

  const newNote = {
    id: +new Date(),
    title,
    body,
    createdAt: new Date().toISOString(),
    archived: formInput.elements.archived.checked,
  };

  try {
    await createNote(newNote);

    Sweetalert2.fire({
      title: "Note berhasil ditambahkan",
      icon: "success",
      confirmButtonText: "OK",
    });
  } finally {
    setTimeout(() => {
      document.querySelector("loading-overlay").remove();
      formInput.reset();
    }, 500);
  }

  document.dispatchEvent(new Event(RENDER_EVENT));
});
function deleteNoteHandler(noteId) {
  Sweetalert2.fire({
    title: "Anda Yakin?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Ya",
    cancelButtonText: "Batal",
    cancelButtonColor: "red",
    confirmButtonColor: "blue",
  }).then(async (result) => {
    if (result.isConfirmed) {
      document.body.appendChild(document.createElement("loading-overlay"));
      await deleteNote(noteId);
      setTimeout(() => {
        document.querySelector("loading-overlay").remove();
        formInput.reset();
      }, 500);
      Sweetalert2.fire({
        title: "Note berhasil dihapus",
        icon: "success",
        showConfirmButton: false,
        timer: 3000,
        position: "top-end",
      });
      document.dispatchEvent(new Event(RENDER_EVENT));
    }
  });
}

async function detailNote(noteId, title, body, archived) {
  const note = await getNoteById(noteId);

  if (!note) {
    Sweetalert2.fire({
      title: "Error",
      text: "Failed to retrieve note details.",
      icon: "error",
      confirmButtonText: "OK",
    });
    return;
  }
  await Sweetalert2.fire({
    title: "Detail Catatan",
    html: `
    <note-detail id="${noteId}" 
        title="${title}" 
        body="${body}" 
        created-at="${new Date().toISOString()}"
        archived=${archived ? "Diarsipkan" : "Tidak"} 
        
        index="1"></note-detail>
  `,
    focusConfirm: false,

    customClass: {
      htmlContainer: "align-left",
    },
    showConfirmButton: false,
  });
}

async function handleUnarchive(noteId) {
  const result = await unarchiveNote(noteId);

  if (result.status === "success") {
    Sweetalert2.fire({
      title: "Catatan Berhasil Di-unarchive",
      text: "Catatan telah di-unarchive.",
      icon: "success",
      confirmButtonText: "OK",
    });

    document.dispatchEvent(new Event(RENDER_EVENT));
  } else {
    Sweetalert2.fire({
      title: "Error",
      text: "Gagal melakukan unarchive catatan.",
      icon: "error",
      confirmButtonText: "OK",
    });
  }
}

function createnoteElement(noteItem, index) {
  const noteElement = document.createElement("note-item");
  noteElement.setAttribute("id", noteItem.id);
  noteElement.setAttribute("title", noteItem.title);
  noteElement.setAttribute("body", noteItem.body);
  noteElement.setAttribute("created-at", noteItem.createdAt);
  noteElement.setAttribute("archived", noteItem.archived);
  noteElement.setAttribute("index", index);

  noteElement.addEventListener("note-delete", (event) => {
    const noteId = noteItem.id;
    deleteNoteHandler(noteId);
  });
  noteElement.addEventListener("note-detail", (event) => {
    detailNote(noteItem.id, noteItem.title, noteItem.body, noteItem.archived);
  });
  return noteElement;
}

document.addEventListener(RENDER_EVENT, async function () {
  const noteList = document.getElementById("note-lists");

  const loadingIndicator = document.createElement("loading-indicator");
  noteList.innerHTML = "";
  noteList.parentElement.insertBefore(loadingIndicator, noteList);
  try {
    const NOTES = await getNotes();
    let index = 1;
    for (const noteItem of NOTES) {
      noteList.append(createnoteElement(noteItem, index));
      index++;
    }
  } finally {
    setTimeout(() => {
      loadingIndicator.setAttribute("display", "none");
    }, 500);
  }
});

document.addEventListener("DOMContentLoaded", async () => {
  AOS.init();
  // TODO 2 : Import data dummy dari noteS js
  document.dispatchEvent(new Event(RENDER_EVENT));
});
