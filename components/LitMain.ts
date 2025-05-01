import { define } from "./define.ts";
import { css, html, LitElement } from "@lit";

class LitMain extends LitElement {
  static tag = "lit-main";

  static override properties = {};

  static override styles = css`
      :host {
          height: 100vh;
          width: 100vw;
          margin: 0;
          padding: 0;
          display: flex;
          justify-content: center;
          align-items: center;
      }

      .container {
          display: flex;
          flex-direction: row;
          align-items: center;
          gap: 2rem;
          text-align: left;
      }

      img {
          max-width: 300px;
          height: 90vh;
      }

      h1 {
          font-family: sans-serif;
          font-size: 2rem;
          color: darkslateblue;
          margin: 0;
      }
  `;

  override render() {
    return html`
        <div class="container">
            <img src="./images/angry-lizard.png" alt="Logo" />
            <div>
                <h1>👋 Hello, Friend</h1>
                <p>Your Application is live!</p>
            </div>
        </div>
    `;
  }
}

define(LitMain);

export {};
