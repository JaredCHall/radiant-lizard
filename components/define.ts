interface Taggable extends CustomElementConstructor {
  tag: string;
}

export function define(tagClass: Taggable) {
  const tagName = tagClass.tag;

  if (!tagName.includes('-')) {
    throw new Error(`Invalid custom element name: '${tagName}' must contain a dash (-)`);
  }

  if (!customElements.get(tagName)) {
    customElements.define(tagName, tagClass);
  } else {
    console.warn(`Custom element '${tagName}' is already defined.`);
  }
}