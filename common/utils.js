const uid = () => {
  return Math.floor(Date.now() * Math.random());
};

const toggleVisible = (p, input, param) => {
  if (param === "hide") {
    p.classList.add("hidden");
    p.classList.remove("visible");
    input.classList.remove("hidden");
    input.classList.add("visible");
  } else {
    input.classList.add("hidden");
    input.classList.remove("visible");
    p.classList.remove("hidden");
    p.classList.add("visible");
  }
};

const animateRemove = (elem, callback = (it) => it) => {
  elem.classList.add("animate-remove");
  setTimeout(() => {
    callback();
  }, 300);
};

const animateEnter = (elem) => {
  elem.classList.add("animate-enter");
  setTimeout(() => {
    elem.classList.remove("animate-enter");
  }, 500);
};

export { uid, toggleVisible, animateRemove, animateEnter };
