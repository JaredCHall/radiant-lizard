import {
    css,
    html,
    LitElement,
} from "https://cdn.jsdelivr.net/gh/lit/dist@3/core/lit-core.min.js";
class MyGreeting extends LitElement {
    static properties = {
        name: { type: String },
    };

    name: string;

    static styles = css`
    div {
      font-family: sans-serif;
      font-size: 1.5rem;
      color: darkslateblue;
      text-align: center;
      margin-top: 2rem;
    }
  `;

    constructor() {
        super();
        this.name = "Friend";
    }

    //@ts-ignore: render() override type mismatch with CDS module, but works correctly
    override render() {
        return html`<div>Hello, ${this.name} 👋</div>`;
    }
}

customElements.define("my-greeting", MyGreeting);

export {};
