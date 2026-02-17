<script>
import RealityUpgradeButton from "./UniversalUpgradeButton";

export default {
  name: "UniversalUpgradesTab",
  components: {
    RealityUpgradeButton
  },
  data() {
    return {
    frUn: new Decimal(),
  };
    },
  computed: {
    upgrades: () => UniversalUpgrades.all,
    costScalingTooltip: () => `Prices start increasing faster above ${format(1e30)} RM and then even faster
      above ${format(Decimal.NUMBER_MAX_VALUE, 1)} RM`,
    possibleTooltip: () => `Checkered upgrades are impossible to unlock this Reality. Striped upgrades are
      still possible.`,
    lockTooltip: () => `This will only function if you have not already failed the condition or
      unlocked the upgrade.`,
  },
  methods: {
    update() {
      this.frUn.copyFrom(player.destruction.fracturedUniverses);
    },
    id(row, column) {
      return (row - 1) * 4 + column - 1;
    }
  }
};
</script>

<template>
  <div class="l-reality-upgrade-grid">
    <div> you have {{ format(frUn) }} Fractured Universes.</div>
    <br>
    <div
      v-for="row in 2"
      :key="row"
      class="l-reality-upgrade-grid__row"
    >
      <RealityUpgradeButton
        v-for="column in 4"
        :key="id(row, column)"
        :upgrade="upgrades[id(row, column)]"
      />
    </div>
  </div>
</template>

<style scoped>
.c-reality-upgrade-infotext {
  color: var(--color-text);
  margin: -1rem 0 1.5rem;
}
</style>
