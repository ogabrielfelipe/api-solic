export class MaxNumberCheckInsError extends Error {
  constructor() {
    super('You have already checked in today.')
  }
}
