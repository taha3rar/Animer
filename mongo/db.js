const mongoose = require("mongoose");
const connect = async () => {
  const MONGOL =
    "mongodb+srv://Taha:KD20102015@animec-vxuzp.mongodb.net/AnimeDB?retryWrites=true&w=majority";
  await mongoose.connect(MONGOL, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  });
  require("./schemas");
  const Anime = mongoose.model("anime");
};
mongoose.connection.on("connected", () => {
  console.log("mognodb connected");
});

module.exports = { connect };
