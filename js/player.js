class Player {

  constructor() {
    this.score = 0
    this.lifes = 3
  }

  hasNoMoreLives() {
    return this.lifes < 1
  }

  addScore(points) {
    this.score += points
  }
}
