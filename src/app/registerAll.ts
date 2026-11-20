import registerChatComponents from "@/features/Chat/register";
import registerUserSettingsComponents from "@/features/UserSettings/register";
import registerFormCardComponents from "@/features/FormCard/register";
import registerSharedComponents from "@/shared/Components/register";

export default function registerComponents(): void {
  registerSharedComponents();
  registerChatComponents();
  registerUserSettingsComponents();
  registerFormCardComponents();
}
