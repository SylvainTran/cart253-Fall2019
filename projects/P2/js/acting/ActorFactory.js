/**
  Generates actors

*/
class ActorFactory {
  constructor(numberOfActors, avatarMale, avatarFemale) {
    this.numberOfActors = numberOfActors;
    this.actorTypeRequested = "person"; // by default
    this.avatarMale = avatarMale;
    this.avatarFemale = avatarFemale;
  }
  // Actor generation. As a safety, the factory has a "private" property of number of actors,
  // but the array is held externally in the scene itself.
  generateActors(actorTypeRequested, actorArray) {
    if (actorTypeRequested === "Zombie") {
      for (let i = 0; i < this.numberOfActors; i++) {
        let randomSex = Math.floor(random(0, 2));
        let randomAvatar;
        if (randomSex === 1) {
          randomAvatar = this.avatarFemale;
        } else {
          randomAvatar = this.avatarMale;
        }
        let newActor = new Zombie(random(0, width), random(0, height), 0.15, color(255, 255, 0), 10, randomAvatar);
        actorArray[i] = newActor;
      }
    }
    else if (actorTypeRequested === "Person") {
      // Persons
    }
    return actorArray;
  }
}
