module.exports = {
  devServer: {
    proxy: {
      "^/lol": {
        target: "https://euw1.api.riotgames.com/",
      }
    }
  }
};
