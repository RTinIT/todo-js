import { Component } from "../common/Component";

export class Title extends Component {
  constructor(parent, text, tag = "h1", className = "title") {
    super(parent, tag, className, text);
  }
}
