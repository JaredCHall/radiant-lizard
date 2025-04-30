import {css, html, LitElement} from "@lit";
class AppMain extends LitElement {
    static override properties = {
        name: { type: String },
    };

    name: string;

    static override styles = css`
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

    override render() {
        return html`<div>Hello, ${this.name} 👋</div>`;
    }
}

customElements.define("app-main", AppMain);

export {};
