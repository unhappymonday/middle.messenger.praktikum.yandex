import { Page } from "@/pages/Page";
import registrationPage from "./registrationPage.hbs?raw";
import { REGISTRATION_CARD } from "@/pages/constants";

export class RegistrationPage extends Page {
  protected template = registrationPage;

  protected getContext() {
    return REGISTRATION_CARD;
  }
}
