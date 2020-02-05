<template>
  <div id="app">
    <main>
      <div class="search-box">
        <input
          type="text"
          class="search-bar"
          placeholder="Search for champion or Summoner..."
          v-model="query"
          @keypress.enter="fetchPlayerInformation"
        />
      </div>

      <div class="summoner-name">
        <h3>{{ summonerName }}</h3>
        <h6>{{ summonerLevel }}</h6>
      </div>

      <div class="summoner-rank">
        <rank v-if="summonerId" :summoner-id="summonerId" :champions="champions"/>
      </div>

      <div class="summoner-champions">
        <championpool/>
      </div>

      <div class="summoner-matches">
        <matchhistory v-if="summonerAccountId" :summoner-account-id="summonerAccountId" :champions="champions"/>
      </div>
    </main>
  </div> 
</template>

<script>
import rank from "./components/Rank.vue";
import matchhistory from "./components/Matchhistory.vue";
import championpool from "./components/Championpool.vue";
import RiotService from './services/RiotService';

export default {
  name: "app",
  components: {
    rank,
    matchhistory,
    championpool,
  },
  data() {
    return {
      query: "",
      result: "",
      api_key: process.env.VUE_APP_API_KEY,
      summonerId: "",
      summonerName: "",
      summonerLevel: "",
      summonerAccountId:"",

      champions:[],
    };
  },
  methods: {
    async fetchSummonerId() {
      const response = await RiotService.fetchSummonerId(this.query)
      this.summonerId = response.id;
      this.summonerName = response.name;
      this.summonerLevel = response.summonerLevel;
      this.summonerAccountId = response.accountId;
      // eslint-disable-next-line no-console
      console.log(this.summonerId);
    },
    async fetchChampionData(){
      const championData = await RiotService.fetchChampionData();
      this.champions = championData.data.data;
      // eslint-disable-next-line no-console
      console.log(this.champions);
    },
    async fetchPlayerInformation() {
      await this.fetchSummonerId();
      await this.fetchChampionData();
    }
  }
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

h4 {
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

.summoner-name,
.summoner-rank,
.summoner-champions,
.summoner-matches {
  background-color: rgb(51, 55, 85);
  box-shadow: 0px 0px 6px rgba(0, 0, 0, 0.5);
  border-radius: 8px 8px 8px 8px;
  padding: 16px;
  margin: 8px;
}

.summoner-name {
  align-content: center;
  align-items: center;
  text-align: center;
}

.history {
  background-color: rgb(26, 28, 44);
}
</style>
