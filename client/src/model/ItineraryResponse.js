// models/TravelItinerary.js
export class TravelItinerary {
  constructor({
    id = null,
    object = null,
    created = null,
    model = null,
    choices = [],
    usage = null,
    system_fingerprint = null,
    x_groq = null
  } = {}) {
    this.id = id;
    this.object = object;
    this.created = created;
    this.model = model;
    this.choices = choices.map(choice => new Choice(choice));
    this.usage = usage;
    this.system_fingerprint = system_fingerprint;
    this.x_groq = x_groq;
  }
}

class Choice {
  constructor({
    index = null,
    message = {},
    logprobs = null,
    finish_reason = null
  } = {}) {
    this.index = index;
    this.message = new Message(message);
    this.logprobs = logprobs;
    this.finish_reason = finish_reason;
  }
}

class Message {
  constructor({
    role = null,
    content = null
  } = {}) {
    this.role = role;
    this.content = content;
  }
}
