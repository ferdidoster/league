import axios from "axios";

const RiotService = {
  async fetchSummonerId(summonerName) {
    const response = await this.request(
      "/lol/summoner/v4/summoners/by-name/" + summonerName
    );
    return response.data;
  },

  async fetchRanks(summonerId) {
    const rankResponse = await this.request(
      "/lol/league/v4/entries/by-summoner/" + summonerId
    );

    return rankResponse.data;
  },

  async fetchMatchHistory(summonerAccountId) {
    const matchHistoryResponse = await this.request(
      "/lol/match/v4/matchlists/by-account/" + summonerAccountId
    );

    return matchHistoryResponse.data;
  },

  async fetchChampionData() {
    const championDataResponse = await axios.get(
      "http://ddragon.leagueoflegends.com/cdn/10.2.1/data/en_US/champion.json"
    );
    // eslint-disable-next-line no-console
    console.log(championDataResponse);
    return championDataResponse;
  },

  async fetchPlayerInformation() {
    await this.fetchSummonerId();
    await this.fetchRanks();
    await this.fetchMatchHistory();
  },

  async request(endpoint) {
    return axios.get(endpoint, {
      headers: {
        "X-Riot-Token": process.env.VUE_APP_API_KEY
      }
    });
  }
};

export default RiotService;
