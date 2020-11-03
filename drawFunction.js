class DrawFunction {
  constructor(func, duration, easing) {
    this.func = func;
    this.duration = duration;
    this.easing = easing;
    this.startTime = 0;
  }

  run() {
    this.startTime = performance.now();
    this.draw();
  }

  draw() {
    let t = (performance.now() - this.startTime) / 1000;
    t = this.easing(t);

    this.func(t);

    if (t <= 1)
      window.requestAnimationFrame(this.draw.bind(this));
  }
}