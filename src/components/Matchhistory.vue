<template>
  <div>
    <div v-for="match in matches" :key="match.matchId">
      lane: {{ match.matchLane }} champion: {{ match.matchChampion }}
      championname: {{getChampionKey(match.matchChampion)}}
    </div>
  </div>
</template>

<script>
import RiotService from "../services/RiotService";

export default {
  name: "machthistory",
  props: {
    summonerAccountId: String,
    champions: Object,
  },
  data() {
    return {
      matches: []
    };
  },
  methods: {
    async fetchMatchHistory(summonerAccountId) {
      const matchHistoryResponse = await RiotService.fetchMatchHistory(
        summonerAccountId
      );

      matchHistoryResponse.matches
        .filter((element, index) => index < 20)
        .forEach(entry =>
          this.matches.push({
            matchLane: entry.lane,
            matchId: entry.gameId,
            matchChampion: entry.champion
          }),
        );
    },
    getChampionKey(matchChampion){
        for (let element of this.champions){
            if (element.key === matchChampion){
                // eslint-disable-next-line no-console
                console.log(element.id);
            }
        }
    }

  },
  async created() {
    await this.fetchMatchHistory(this.summonerAccountId);
  }
};
</script>
