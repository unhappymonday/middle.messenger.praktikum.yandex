import {
  Avatar,
  Button,
  Input,
  Label,
  Link,
  Chip,
  Form,
  Modal,
} from "@/shared/Components";
import { registerComponent } from "@/shared/helpers/registerComponent";
import type { IComponentClass } from "@/shared/types";

export default function registerSharedComponents(): void {
  (
    [Avatar, Button, Input, Label, Link, Chip, Form, Modal] as IComponentClass[]
  ).forEach(registerComponent);
}
