import {
  Avatar,
  Button,
  Input,
  Label,
  Link,
  Chip,
  Form,
  Modal,
  Select,
} from "@/shared/Components";
import { registerComponent } from "@/shared/helpers/registerComponent";
import type { IComponentClass } from "@/shared/types";

export default function registerSharedComponents(): void {
  (
    [
      Avatar,
      Button,
      Input,
      Label,
      Link,
      Chip,
      Form,
      Modal,
      Select,
    ] as IComponentClass[]
  ).forEach(registerComponent);
}
