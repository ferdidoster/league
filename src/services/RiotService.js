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

  async fetchMatchhistory(accountId) {
    const matchHistoryResponse = await this.request(
      "/lol/match/v4/matchlists/by-account/" + accountId
    );
    return matchHistoryResponse.data;
  },
  async fetchPlayerInformation() {
    await this.fetchSummonerId();
    await this.fetchRanks();
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
