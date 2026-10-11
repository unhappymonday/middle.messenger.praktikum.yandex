import { Page } from "@/pages/Page";
import settingsPage from "./settingsPage.hbs?raw";
import type { TSettingsMode } from "@/pages/types";
import { SETTINGS_FIELDS } from "@/pages/constants";

export class SettingsPage extends Page {
  protected template = settingsPage;
  private mode: TSettingsMode = "profile";
  private root: HTMLElement | null = null;

  protected getContext() {
    return {
      mode: this.mode,
      avatar: "",
      displayName: "Иван",
      formId: `settings-${this.mode}`,
      fields: SETTINGS_FIELDS[this.mode].map((f) => ({
        ...f,
        disabled: this.mode === "profile",
      })),
    };
  }

  afterRender(root: HTMLElement): void {
    this.root = root;
    root.addEventListener("click", this.handleClick);
    root.addEventListener("submit", this.handleSubmit);
  }

  private handleClick = (event: Event) => {
    const el = (event.target as HTMLElement).closest<HTMLElement>(
      "[data-action]",
    );
    const action = el?.dataset.action;
    if (action !== "edit-data" && action !== "edit-password") return;

    event.preventDefault();
    this.setMode(action);
  };

  private handleSubmit = (event: Event) => {
    event.preventDefault();
    const data = Object.fromEntries(
      new FormData(event.target as HTMLFormElement),
    );
    console.log("settings submit", data);
    this.setMode("profile");
  };

  private setMode(mode: TSettingsMode) {
    this.mode = mode;
    if (this.root) this.root.innerHTML = this.render();
  }

  destroy(): void {
    this.root?.removeEventListener("click", this.handleClick);
    this.root?.removeEventListener("submit", this.handleSubmit);
    this.root = null;
    this.mode = "profile";
  }
}
