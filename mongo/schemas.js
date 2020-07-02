const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const user = new Schema({
  userName: { type: String, required: true, lowercase: true },
  password: { type: String, required: true },
});
mongoose.model("user", user);
const id = new Schema(
  {
    id: String,
  },
  { _id: false }
);
mongoose.model("id", id);
const anime = new Schema({
  title: String,
  episodes: [id],
  genres: [String],
  img: String,
  otherName: String,
  released: String,
  status: String,
  synopsis: String,
  totalEpisodes: Number,
});
const Animes = new Schema({
  name: String,
  episodes: [],
});
const favorites = new Schema({
  anime: [anime],
  owner: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: "user",
  },
});

const keeper = new Schema({
  anime: anime,
  episode: String,
  num: Number,
});
const keep = new Schema({
  keeper: [keeper],
  owner: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: "user",
  },
});
const watched = new Schema({
  owner: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: "user",
  },
  episodes: [String],
});
mongoose.model("anime", anime);
mongoose.model("keeper", keeper);
mongoose.model("favorites", favorites);
mongoose.model("keep", keep);
mongoose.model("watched", watched);
mongoose.model("Animes", Animes);

module.exports = {
  favorites,
  keep,
  watched,
  anime,
  user,
  Animes,
};
