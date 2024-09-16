// TODO 10: Untuk penggunaan custom attribute di HTML
class FormControl extends HTMLElement {
  static observedAttributes = [
    "type",
    "input-name",
    "label",
    "placeholder",
    "description",
    "min-length",
  ];

  constructor() {
    super();
    this._type = this.getAttribute("type") || "text";
    this._inputName = this.getAttribute("input-name");
    this._label = this.getAttribute("label");
    this._placeholder = this.getAttribute("placeholder");
    this._description = this.getAttribute("description");
    this._minLength = this.getAttribute("min-length");
  }

  connectedCallback() {
    this.render();
  }

  render() {
    if (this._type === "checkbox") {
      this.innerHTML = `
        <div class="form-group form-check">
          <input
            type="checkbox"
            name="${this._inputName}"
            id="input-${this._inputName}"
            class="form-check-input"
            aria-describedby="${this._inputName}-description"
          />
          <label for="input-${this._inputName}" class="form-check-label">${this._label}</label>
        </div>
      `;
    } else {
      this.innerHTML = `
            <div class="form-group">
                <label for="input-${this._inputName}">${this._label}</label>
                <input
                    type="${this._type}"
                    name="${this._inputName}"
                    id="input-${this._inputName}"
                    class="form-control"
                    placeholder="${this._placeholder}"
                    aria-describedby="${this._inputName}-description"
                    minlength="${this._minLength}"
                    required
                />
                <p
                    id="${this._inputName}-description"
                    class="${this._inputName}-message form-text"
                    data-defaultText="${this._description}"
                >
                    ${this._description}
                </p>
            </div>
        `;
    }
  }
}

customElements.define("form-control", FormControl);
