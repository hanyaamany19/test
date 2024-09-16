import formValidation from "../form-validation";

class NoteForm extends HTMLElement {
  constructor() {
    super();
  }

  async connectedCallback() {
    await this.render();
    formValidation(document.getElementById(this.getAttribute("form-id")));
  }

  async render() {
    this.innerHTML = ` <form
            id=${this.getAttribute("form-id")}
            class="card-body c-card form-input"
            data-aos="fade-down"
        >
            <form-control
                input-name="title"
                label="Judul Note"
                placeholder="Title"
                min-length="3"
                description="Isi dengan judul catatan (min 3 karakter)"
            ></form-control>
            <form-control
                input-name="body"
                label="Nama Penulis"
                placeholder=" Penulis"
                min-length="3"
                description="Isi dengan nama penulis catatan (min 3 karakter)"
            ></form-control>

            <div class="form-group">
              <input type="checkbox" name="archived" id="archived" />
              <label for="archived">Arsipkan Catatan</label>
            </div>

            <button class="btn btn-primary" id="save-button">Simpan</button>
        </form>`;
  }
}

customElements.define("note-form", NoteForm);
