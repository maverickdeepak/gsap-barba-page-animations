const timelineLeave = gsap.timeline({
  defaults: { duration: 0.75, ease: "Power2.easeOut" },
});
const timelineEnter = gsap.timeline({
  defaults: { duration: 0.75, ease: "Power2.easeOut" },
});

// functions for timeline leave and enter animations
const leaveAnimation = (current, done) => {
  const product = current.querySelector(".image-container");
  const text = current.querySelector(".showcase-text");
  const circles = current.querySelectorAll(".circle");
  const arrow = current.querySelector(".showcase-arrow");
  return (
    timelineLeave.fromTo(
      arrow,
      { opacity: 1, y: 0 },
      { opacity: 0, y: 50, onComplete: done }
    ),
    timelineEnter.fromTo(
      product,
      { y: 0, opacity: 1 },
      { y: 100, opacity: 0, onComplete: done },
      "<"
    ),
    timelineLeave.fromTo(
      text,
      { y: 0, opacity: 1 },
      { y: 100, opacity: 0, onComplete: done },
      "<"
    ),
    timelineLeave.fromTo(
      circles,
      { y: 0, opacity: 1 },
      {
        y: -200,
        opacity: 0,
        stagger: 0.15,
        ease: "back.out(1.7)",
        duration: 1,
        onComplete: done,
      },
      "<"
    )
  );
};

const enterAnimation = (current, done, gradient) => {
  const product = current.querySelector(".image-container");
  const text = current.querySelector(".showcase-text");
  const circles = current.querySelectorAll(".circle");
  const arrow = current.querySelector(".showcase-arrow");
  return (
    timelineEnter.fromTo(
      arrow,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, onComplete: done }
    ),
    timelineEnter.fromTo(
      product,
      { y: -100, opacity: 0 },
      { y: 0, opacity: 1, onComplete: done },
      "<"
    ),
    timelineEnter.fromTo(
      text,
      { y: 100, opacity: 0 },
      { y: 0, opacity: 1, onComplete: done },
      "<"
    ),
    timelineEnter.fromTo(
      circles,
      { y: -200, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        stagger: 0.15,
        ease: "back.out(1.7)",
        duration: 1,
        onComplete: done,
      },
      "<"
    ),
    timelineEnter.to("body", { background: gradient }, "<")
  );
};
// Barba Animations
barba.init({
  preventRunning: true,
  transitions: [
    // transitions
    {
      name: "default-transition",
      once(data) {
        const done = this.async();
        let next = data.next.container;
        let gradient = getGradient(data.next.namespace);
        gsap.set("body", { background: gradient });
        enterAnimation(next, done, gradient);
      },
      leave(data) {
        const done = this.async();
        let current = data.current.container;
        leaveAnimation(current, done);
      },
      enter(data) {
        const done = this.async();
        let current = data.next.container;
        let gradient = getGradient(data.next.namespace);
        console.log(gradient);
        enterAnimation(current, done, gradient);
      },
    },
    // product page animations
    {
      name: "product-animations",
      sync: true,
      from: {
        namespace: ["handbag", "product"],
      },
      to: {
        namespace: ["product", "handbag"],
      },
      enter(data) {
        const done = this.async();
        let next = data.next.container;
        productEnterAnimation(next, done);
      },
      leave(data) {
        const done = this.async();
        const current = data.current.container;
        productLeaveAnimation(current, done);
      },
    },
  ],
});

// gradient change on showcase page
function getGradient(name) {
  switch (name) {
    case "handbag":
      return "linear-gradient(260deg, #b75d62, #754d4f)";
    case "boot":
      return "linear-gradient(260deg, #5d8cb7, #4c4f70)";
    case "hat":
      return "linear-gradient(260deg, #b27a5c, #7f5450)";
  }
}

// product enter animations
function productEnterAnimation(next, done) {
  timelineEnter.fromTo(next, { y: "100%" }, { y: "0%" });
  timelineEnter.fromTo(
    ".card",
    { opacity: 0, y: 50 },
    { opacity: 1, y: 0, stagger: 0.1, onComplete: done }
  );
}

function productLeaveAnimation(current, done) {
  timelineLeave.fromTo(current, { y: "0%" }, { y: "100%", onComplete: done });
}
