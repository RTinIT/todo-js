import { Component } from "../common/Component";
import { animateRemove } from "../common/utils";
import { Input } from "./Input";

export class Checkbox extends Component {
  constructor(parentNode, onChange, idOrTask, checked = "") {
    super(parentNode, "label", "checkbox-container");

    const checkboxInput = new Input(this.node, "", {
      type: "checkbox",
    });
    if (checked) {
      checkboxInput.node.setAttribute("checked", "checked");
    }
    checkboxInput.node.addEventListener("change", () => {
      animateRemove(parentNode, () => onChange(parentNode, idOrTask));
    });

    const checkboxMarker = new Component(
      this.node,
      "div",
      "checkbox-checkmark"
    );
  }
}
