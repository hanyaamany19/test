class DetailButton extends HTMLElement {
  static observedAttributes = [
    "id",
    "title",
    "body",
    "created-at",
    "archived",
    "index",
  ];
  constructor() {
    super();

    this._id = this.getAttribute("id");
    this._title = this.getAttribute("title");
    this._body = this.getAttribute("body");
    this._archived = this.getAttribute("archived");
    this._index = this.getAttribute("index");
    this._shadowRoot = this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this._shadowRoot.innerHTML = `
            <style>
                button {
                    color: #fff;
                    background-color: #20c997;
                    width:100%;
                    padding: 6px;
                    border-radius: 4px;
                    border: none;
                    cursor: pointer;
                }
            </style>
            <button>${this._archived ? "Tidak diarsip" : "Diarsip"}</button>
        `;

    console.log(this._archived);
  }
}

customElements.define("detail-button", DetailButton);
