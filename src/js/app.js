export default class Popover {
  constructor() {
    this.popovers = new Map();
    this.id = 0;
    this.init();
    this.bindEvents();
  }

  init() {
    const elements = document.querySelectorAll('[data-toggle="popover"]');

    elements.forEach((el) => {
      const popoverId = this.id++;
      el.dataset.popoverId = popoverId;

      this.popovers.set(popoverId, {
        id: popoverId,
        el: el,
        isOpen: false,
        popoverEl: null,
        options: this.getOptions(el),
      });
    });

    console.log(this.popovers);
  }

  bindEvents() {
    document.addEventListener("click", (e) => {
      const trigger = e.target.closest('[data-toggle="popover"]');

      if (trigger) {
        const id = Number(trigger.dataset.popoverId);
        const popoverData = this.popovers.get(id);

        if (!popoverData) return;

        if (popoverData.isOpen) {
          this.removePopover(id);
        } else {
          this.closeAll();
          this.createPopover(trigger);
        }
        return;
      }

      this.closeAll();
    });
  }

  getOptions(el) {
    return {
      title: el.getAttribute("data-title") || "",
      content: el.getAttribute("data-content") || "",
      placement: el.getAttribute("data-placement") || "top",
    };
  }

  calcPosition(el, popoverEl, placement) {
    const rect = el.getBoundingClientRect();
    const popoverWidth = popoverEl.offsetWidth;
    const popoverHeight = popoverEl.offsetHeight;
    const offset = 8;

    let top = 0,
      left = 0;

    switch (placement) {
      case "top":
        top = rect.top + window.scrollY - popoverHeight - offset;
        left = rect.left + window.scrollX + rect.width / 2 - popoverWidth / 2;
        break;
      case "bottom":
        top = rect.bottom + window.scrollY + offset;
        left = rect.left + window.scrollX + rect.width / 2 - popoverWidth / 2;
        break;
      case "left":
        top = rect.top + window.scrollY + rect.height / 2 - popoverHeight / 2;
        left = rect.left + window.scrollX - popoverWidth - offset;
        break;
      case "right":
        top = rect.top + window.scrollY + rect.height / 2 - popoverHeight / 2;
        left = rect.right + window.scrollX + offset;
        break;
    }

    if (left < 8) left = 8;
    if (left + popoverWidth > window.innerWidth)
      left = window.innerWidth - popoverWidth - 8;
    if (top < 8) top = 8;
    if (top + popoverHeight > window.innerHeight)
      top = window.innerHeight - popoverHeight - 8;

    popoverEl.style.position = "absolute";
    popoverEl.style.top = `${top}px`;
    popoverEl.style.left = `${left}px`;
  }

  createPopover(el) {
    const id = Number(el.dataset.popoverId);
    const popoverData = this.popovers.get(id);
    if (!popoverData) return;

    const popoverEl = document.createElement("div");
    popoverEl.className = "popover show";
    popoverEl.setAttribute("role", "tooltip");
    popoverEl.dataset.placement = popoverData.options.placement;

    const arrowEl = document.createElement("div");
    arrowEl.className = "popover-arrow";
    popoverEl.append(arrowEl);

    if (popoverData.options.title) {
      const headerEl = document.createElement("div");
      headerEl.className = "popover-header";
      headerEl.textContent = popoverData.options.title;
      popoverEl.append(headerEl);
    }

    const bodyEl = document.createElement("div");
    bodyEl.className = "popover-body";
    bodyEl.textContent = popoverData.options.content;
    popoverEl.append(bodyEl);

    document.body.append(popoverEl);
    popoverData.popoverEl = popoverEl;
    popoverData.isOpen = true;

    this.calcPosition(el, popoverEl, popoverData.options.placement);
  }

  removePopover(id) {
    const popoverData = this.popovers.get(id);
    if (!popoverData || !popoverData.popoverEl) return;

    popoverData.popoverEl.remove();
    popoverData.popoverEl = null;
    popoverData.isOpen = false;
  }

  closeAll() {
    this.popovers.forEach((popoverData) => {
      if (popoverData.isOpen) {
        this.removePopover(popoverData.id);
      }
    });
  }
}
