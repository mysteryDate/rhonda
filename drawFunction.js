const easeInOutCubic = function(pos) {
  if ((pos/=0.5) < 1) return 0.5*Math.pow(pos,3);
  return 0.5 * (Math.pow((pos-2),3) + 2);
}

class DrawFunction {
  constructor(func, duration, easing=easeInOutCubic) {
    this.func = func;
    this.duration = duration;
    this.easing = easing;
    this.startTime = 0;
    this.isCancelled = false;
    this.hasRun = false;
    this.lastRequest;
  }

  run() {
    this.startTime = performance.now();
    this.draw();
    this.hasRun = true;
  }

  draw() {
    const clock = (performance.now() - this.startTime) / 1000 / this.duration;
    const t = this.easing(clock);

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    this.func(t, clock);

    if (clock <= 1.0 && !this.isCancelled)
      this.lastRequest = window.requestAnimationFrame(this.draw.bind(this));
  }

  cancel() {
    this.isCancelled = true;
    window.cancelAnimationFrame(this.lastRequest);
  }
}