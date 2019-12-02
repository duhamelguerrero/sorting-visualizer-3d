export class Animator {
  constructor(frames) {
    this.frames = frames;
    this.playing = false;
  }

  play() {
    this.playing = true;
    this.playFrame(0);
  }

  playFrame(index) {
    if (!this.playing || this.frames.length - 1 < index) {
      this.stop();
      return;
    }

    this.frames[index].animations();

    setTimeout(() => {
      index++;
      this.playFrame(index);
    }, this.frames[index].time);
  }

  stop() {
    this.playing = false;
  }
}
