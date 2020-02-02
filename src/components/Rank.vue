<template>
  <div class="ranked">
    <h4>Ranked</h4>
    <h4>Solo:{{ rankSolo }}{{ divisionSolo }}</h4>
    <h4>Points:{{ pointsSolo }} {{ winsSolo }}wins {{ lossSolo }}losses</h4>
    <br />
    <h4>Flex:{{ rankFlex }}{{ divisionFlex }}</h4>
    <h4>Points:{{ pointsFlex }} {{ winsFlex }}wins {{ lossFlex }}losses</h4>
  </div>
</template>

<script>
import RiotService from "../services/RiotService";

export default {
  name: "rank",
  props: ["summonerId"],
  data() {
    return {
      rankSolo: "",
      divisionSolo: "",
      winsSolo: "",
      lossSolo: "",
      pointsSolo: "",
      rankFlex: "",
      divisionFlex: "",
      winsFlex: "",
      lossFlex: "",
      pointsFlex: ""
    };
  },
  methods: {
    async fetchRanks(summonerId) {
      const rankResponse = await RiotService.fetchRanks(summonerId);
      for (let element of rankResponse) {
        if (element.queueType === "RANKED_SOLO_5x5") {
          this.rankSolo = element.tier;
          this.divisionSolo = element.rank;
          this.winsSolo = element.wins;
          this.lossSolo = element.losses;
          this.pointsSolo = element.leaguePoints;
        } else if (element.queueType === "RANKED_FLEX_SR") {
          this.rankFlex = element.tier;
          this.divisionFlex = element.rank;
          this.winsFlex = element.wins;
          this.lossFlex = element.losses;
          this.pointsFlex = element.leaguePoints;
        }
      }
    }
  },
  async created() {
    await this.fetchRanks(this.summonerId);
  }
};
</script>
