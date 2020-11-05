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
  }

  run() {
    this.startTime = performance.now();
    this.draw();
    this.hasRun = true;
  }

  draw() {
    let t = (performance.now() - this.startTime) / 1000 / this.duration;
    t = this.easing(t);

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    this.func(t);

    if (t <= 1 && !this.isCancelled)
      window.requestAnimationFrame(this.draw.bind(this));
  }

  cancel() {
    this.isCancelled = true;
  }
}