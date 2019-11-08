/**
  Generates actors on demand, depending on the type requested.
  Only zombies are implemented for now.

*/
class ActorFactory {
  constructor(numberOfActors, avatarMale, avatarFemale) {
    this.numberOfActors = numberOfActors;
    this.actorTypeRequested = "Person"; // by default
    this.avatarMale = avatarMale;
    this.avatarFemale = avatarFemale;
    this.randomAvatar = null; // To be assigned in generateActors() randomly per each call
  }
  // Actor generation. As a safety, the factory has a "private" property of number of actors,
  // but the array is held externally in the scene itself. I did not assign variables to all elements here
  // because of the overhead of allocating variables repeatedly.
  generateActors(actorTypeRequested, actorArray) {
    if (actorTypeRequested === "Zombie") {
      for (let i = 0; i < this.numberOfActors; i++) {
        if (Math.floor(random(0, 2)) === 1) {
          this.randomAvatar = this.avatarFemale;
        } else {
          this.randomAvatar = this.avatarMale;
        }
        actorArray[i] = new Zombie(random(0, width), random(0, height), 0.15, color(255, 255, 0), 10, this.randomAvatar);
      }
    } else if (actorTypeRequested === "Person") {
      // Persons.
    }
    return actorArray;
  }
}
