export class Modal {
  constructor({
    rootSelector,
    selectors = {},
    activeClass = '',
    bodyClass = '',
    onOpen = () => {},
    onClose = () => {},
  }) {
    this.activeClass = activeClass;
    this.refs = this.getRefs(rootSelector, selectors);
    this.bodyClass = bodyClass;
    this.onOpen = onOpen;
    this.onClose = onClose;

    this.handleEscapeKey = this.handleEscapeKey.bind(this);
    this.handleOverlayClick = this.handleOverlayClick.bind(this);
    this.handleCloseClick = this.close.bind(this);
  }

  getRefs(rootSelector, selectors) {
    const root = document.querySelector(rootSelector);
    const refs = {
      container: root,
      ...Object.fromEntries(
        Object.entries(selectors).map(([key, selector]) => [
          key,
          root.querySelector(selector),
        ])
      ),
    };
    return refs;
  }
  open(arg) {
    this.removeEventListeners();

    this.refs.container.classList.remove(this.activeClass);
    if (this.bodyClass) {
      document.body.classList.add(this.bodyClass);
    }

    this.addEventListeners();
    this.onOpen(arg);
  }

  close(arg) {
    this.refs.container.classList.add(this.activeClass);
    if (this.bodyClass) {
      document.body.classList.remove(this.bodyClass);
    }
    this.removeEventListeners();
    this.onClose(arg);
  }

  addEventListeners() {
    this.refs.closeBtn?.addEventListener('click', this.handleCloseClick);
    this.refs.container?.addEventListener('click', this.handleOverlayClick);
    document.addEventListener('keydown', this.handleEscapeKey);
  }

  removeEventListeners() {
    this.refs.closeBtn?.removeEventListener('click', this.handleCloseClick);
    this.refs.container?.removeEventListener('click', this.handleOverlayClick);
    document.removeEventListener('keydown', this.handleEscapeKey);
  }

  handleOverlayClick(e) {
    if (e.currentTarget === e.target) {
      this.close();
    }
  }
  handleEscapeKey(e) {
    if (e.key === 'Escape') {
      this.close();
    }
  }
}
