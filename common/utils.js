export const uid = () => {
  return Math.floor(Date.now() * Math.random());
};

export const toggleVisible = (p, input, param) => {
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
