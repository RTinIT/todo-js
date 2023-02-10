import { Component } from "../common/Component";
import { random } from "../common/utils";

const defaultOptions = {
  messages: [
    "Congratulations!",
    "You're on roll!",
    "Amazing!",
    "Good job, sir!",
    "Wow! Perfect!",
  ],
  duration: 4000,
  onClose: false,
  progressBar: true,
};

export class Toast extends Component {
  constructor(parent, options) {
    super(parent, "div", "toast");
    Object.entries({ ...defaultOptions, ...options }).forEach(
      ([key, value]) => {
        this[key] = value;
      }
    );

    const btnClose = new Component(
      this.node,
      "button",
      "toast-close-btn",
      "&times;"
    );
    btnClose.node.onclick = () => this.destroy();

    const textContainer = new Component(this.node, "div", "toast-text-wrapper");
    const img = new Component(textContainer.node, "img", "toast-img");
    img.node.setAttribute("src", "/todo-js/confetti.png");
    const text = new Component(
      textContainer.node,
      "span",
      "toast-text",
      this.messages[random(0, 4)]
    );

    if (!this.onClose) setTimeout(() => this.destroy(), this.duration);

    if (this.progressBar) {
      const progressBar = new Component(this.node, "div", "progress-bar");
      const bg = new Component(progressBar.node, "div", "progress-bar-bg");
      bg.node.style.animation = `progress-animate ${this.duration}ms linear`;
    }
  }
}
