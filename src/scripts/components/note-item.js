//  TODO 3 : Selesaikan pembuatan BookItem ini
class NoteItem extends HTMLElement {
  static observedAttributes = [
    "id",
    "title",
    "body",
    "created-at",
    "index",
    "archived",
  ];

  constructor() {
    super();

    this._id = this.getAttribute("id");
    this._title = this.getAttribute("title");
    this._body = this.getAttribute("body");
    this._index = this.getAttribute("index");
    this._archived = this.getAttribute("archived");
  }
  handleDelete() {
    this.dispatchEvent(
      new CustomEvent("note-delete", {
        detail: {
          id: this._id,
        },
        bubbles: true,
      }),
    );
  }
  handleUpdate() {
    this.dispatchEvent(
      new CustomEvent("note-detail", {
        detail: {
          id: this._id,
        },
        bubbles: true,
      }),
    );
  }
  connectedCallback() {
    this.render();
    const deleteButton = this.querySelector("delete-button");
    if (deleteButton) {
      deleteButton.addEventListener("click", this.handleDelete);
    }
  }

  disconnectedCallback() {
    const deleteButton = this.querySelector("delete-button");

    deleteButton.removeEventListener("click", this.handleDelete);
  }

  render() {
    const createdAtDate = new Date(this.getAttribute("created-at"));
    const formattedDate = isNaN(createdAtDate)
      ? "Unknown Date"
      : createdAtDate.toLocaleDateString("id-ID", { dateStyle: "full" });
    const formattedTime = isNaN(createdAtDate)
      ? "Unknown Date"
      : createdAtDate.toLocaleTimeString("id-ID", { timeStyle: "short" });
    this.innerHTML = `
        <div class="card" data-aos="flip-up" data-aos-duration="500" data-aos-delay="${
          50 * this._index
        }">
          <div>
              <p class="text-title">${this._title}</p>
              <p class="text-author">Penulis: ${this._body}</p>
              <p class="text-small">
                  Tanggal diperbarui: ${formattedDate}
              </p>
              <p class="text-small">
                  Jam diperbarui: ${formattedTime}
              </p>
                </div>
                <delete-button data-id=${this._id}></delete-button>
                <detail-button data-id=${this._id} archived=${this._archived} 
        
        index="1"></detail-button>
                
                </div>
                `;
    // console.log(this._archived); 
    const deleteButton = this.querySelector("delete-button");
    const detailButton = this.querySelector("detail-button");

    if (deleteButton) {
      deleteButton.addEventListener("click", this.handleDelete);
    }
    if (detailButton) {
      detailButton.addEventListener("click", this.handleUpdate);
    }
  }

  attributeChangedCallback(name, oldValue, newValue) {
    this[`_${name}`] = newValue;
    this.render();
  }
}

customElements.define("note-item", NoteItem);
