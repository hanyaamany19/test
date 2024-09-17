class NoteDetail extends HTMLElement {
  static observedAttributes = ["id", "title", "body", "created-at","archived", "index"];

  constructor() {
    super();

    this._id = this.getAttribute("id");
    this._title = this.getAttribute("title");
    this._body = this.getAttribute("body");
    this._archived = this.getAttribute("archived");
    this._index = this.getAttribute("index");
    // console.log(this._archived);
  }

  connectedCallback() {
    this.render();
  }

  render() {
    
    this.innerHTML = `
        <div class="card" data-aos="flip-up" data-aos-duration="500" data-aos-delay="${
          50 * this._index
        }">
          <div>
            <p class="text-title">${this._title}</p>
            <p class="text-author">Penulis: ${this._body}</p>

            <p class="text-title">Status Arsip: ${this._archived}</p>
          </div>
        </div>
      `;

    const deleteButton = this.querySelector("delete-button");
    const detailButton = this.querySelector("detail-button");

    if (deleteButton) {
      deleteButton.addEventListener("click", this.handleDelete);
    }
    if (detailButton) {
      detailButton.addEventListener("click", this.handleDetail);
    }
  }

  attributeChangedCallback(name, oldValue, newValue) {
    this[`_${name}`] = newValue;
    this.render();
  }
}

customElements.define("note-detail", NoteDetail);
