<template>
  <div id="app">
    <main>
      <div class="search-box">
        <input
          type="text"
          class="search-bar"
          placeholder="Search for champion or Summoner..."
          v-model="query"
          @keypress.enter="fetchSummonerId"
        />
      </div>

      <div class="summoner-name">
        <h3>{{ summoner_name }}</h3>
        <h6>{{ summoner_level }}</h6>
      </div>

      <div class="summoner-rank">
        <h4>Ranked</h4>
        <h6>Solo</h6>
        <h6>Flex</h6>
      </div>

      <div class="summoner-champions">
        <h4>Champion-pool</h4>
      </div>

      <div class="summoner-matches">
        <h4>Match history</h4>
        <div class="history">213</div>
      </div>
      
    </main>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "app",
  components: {},
  data() {
    return {
      query:'',
      result: '',
      api_key: "RGAPI-706d8a62-ef3c-4e4b-876c-30d45263fc4d",
      summoner_id: '',
      summoner_name: '',
      summoner_level: '',
      url_base: ''
    };
  },
  methods: {
    // async fetchMasteryScore() {
    //   const response = await axios.get(
    //     "/lol/champion-mastery/v4/scores/by-summoner/" + this.summoner_id,
    //     {
    //       headers: {
    //         "X-Riot-Token": this.api_key
    //       }
    //     }
    //   );
    //   return response.data;
    // },
    async fetchSummonerId() {
      const response = await axios.get(
        "/lol/summoner/v4/summoners/by-name/" + this.query,
        {
          headers: {
            "X-Riot-Token": this.api_key
          }
        }
      );
      this.summoner_id = response.data.id;
      this.summoner_name = response.data.name;
      this.summoner_level = response.data.summonerLevel;
      return response.data;
    }
  },
  // async created() {
  //   this.result = await this.fetchMasteryScore();
  // }
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: "montserrat", sans-serif;
}

h4{
  text-align: center;
}

#app {
  background-size: cover;
  background-position: bottom;
  transition: 0.5s;
  color: white;
}

main {
  min-height: 100vh;
  padding: 25px;
  /* background-image: linear-gradient(
    to bottom,
    rgba(31, 87, 119, 0.25),
    rgba(136, 211, 255, 0.75)
  ); */
  background-color: rgb(26, 28, 44);
}

.search-box {
  width: 100%;
  margin-bottom: 30px;
  align-content: center;
}

.search-box .search-bar {
  display: block;
  width: 100%;
  padding: 15px;
  color: #313131;
  font-size: 20px;
  appearance: none;
  border: none;
  outline: none;
  background: none;
  background-color: rgba(255, 255, 255, 0.5);
  border-radius: 16px 16px 16px 16px;
  transition: 0.5s;
}

.search-box .search-bar:focus {
  box-shadow: 0px 0px 6px rgba(0, 0, 0, 0.25);
  background-color: rgba(255, 255, 255, 0.75);
  border-radius: 0px 0px 0px 0px;
}

.search-bar {
  max-width: 600px;
  margin: 0 auto;
}

.summoner-name, .summoner-rank, .summoner-champions, .summoner-matches{
  background-color:rgb(51, 55, 85);
  box-shadow: 0px 0px 6px rgba(0, 0, 0, 0.5);
  border-radius: 8px 8px 8px 8px;
  padding: 16px;
  margin: 8px;
}

.summoner-name{
  align-content: center;
  align-items: center;
  text-align: center;
}

.history{
  background-color: rgb(26, 28, 44);

}
</style>
