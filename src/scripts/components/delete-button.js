// TODO 6 : Buatkan Component Delete Button
class DeleteButton extends HTMLElement {
  constructor() {
    super();
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
                    background-color: #d9534f;
                    border-color: #d43f3a;
                    width:100%;
                    padding: 6px;
                    border-radius: 4px;
                    border: none;
                    cursor: pointer;
                }
            </style>
            <button>Hapus Catatan</button>
        `;
  }
}

customElements.define("delete-button", DeleteButton);
