/**
 * @jest-environment jsdom
 */

import Popover from "../app";

describe("Popover", () => {
  beforeEach(() => {
    document.body.innerHTML = "";
  });

  test("init", () => {
    document.body.innerHTML = `
      <button 
        data-toggle="popover" 
        data-title="Test Title" 
        data-content="Test Content"
        data-placement="top">
        Click me
      </button>
    `;

    const popover = new Popover();

    const button = document.querySelector('[data-toggle="popover"]');
    button.click();

    const popoverEl = document.querySelector(".popover");
    expect(popoverEl).not.toBeNull();
    expect(popoverEl.textContent).toContain("Test Title");
    expect(popoverEl.textContent).toContain("Test Content");

    button.click();
    expect(document.querySelector(".popover")).toBeNull();
  });
});
