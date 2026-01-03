import { DC } from "../constants";
export const destructionUpgradesUniversal = [
  {
    name: "The destruction begins",
    id: 1,
    cost: 1,
    requirement: "Reach infinity",
    hasFailed: () => !(player.infinities.gte(1)),
    checkRequirement: () => player.infinities.gte(1),
    checkEvent: GAME_EVENT.BIG_CRUNCH_AFTER,
    canLock: false,
    lockEvent: "None",
    description: "x10 Antimatter Dimensions mults, x3 Infinity Points, and x3 infinities",
    effect: () => 1 + Replicanti.galaxies.total / 50,
    formatEffect: value => formatX(value, 2, 2)
  },
  {
    name: "The endless torment",
    id: 2,
    cost: 1,
    requirement: "Reach infinity without sacrificing",
    hasFailed: () => !(player.sacrificed <= 1),
    checkRequirement: () => player.sacrificed <= 1,
    checkEvent: GAME_EVENT.BIG_CRUNCH_BEFORE,
    canLock: true,
    lockEvent: "sacrifice",
    description: "",
    effect: () => Decimal.add(1, Decimal.log10(player.records.totalAntimatter)),
    formatEffect: value => formatX(value, 2, 2)
  },
  {
    name: "The fintite infinity",
    id: 3,
    cost: 1,
    requirement: "Infinity with at most 4 dimension boosts",
    hasFailed: () => !player.dimensionBoosts<=4,
    checkRequirement: () => player.dimensionBoosts<=4,
    checkEvent: GAME_EVENT.BIG_CRUNCH_BEFORE,
    canLock: true,
    lockEvent: "gain another dimension boost",
    description: "Dimension boost multiplier is multiplied based on total antimatter",
    effect: () => Math.sqrt(Math.log2(Decimal.log10(player.records.totalAntimatter))),
    formatEffect: value => formatX(value, 2, 2)
  },
  {
    name: "Heat Death",
    id: 4,
    cost: 1,
    requirement: () => `Reach infinity without galaxies`,
    hasFailed: () => {!player.galaxies<=0},
    checkRequirement: () => player.galaxies<=0,
    checkEvent: GAME_EVENT.ETERNITY_RESET_AFTER,
    canLock: true,
    // There are two locking events - equipping a glyph with too low a level, and equipping a second glyph
    description: "Increase galaxy strength by 25%",
    effect: () => 1
  },
  {
    name: "Existentially Prolong",
    id: 5,
    cost: 15,
    requirement: () => `Complete your first manual Eternity with at least ${formatPostBreak(DC.E400)} Infinity Points`,
    hasFailed: () => !player.requirementChecks.reality.noEternities,
    checkRequirement: () => Currency.infinityPoints.exponent >= 400 &&
      player.requirementChecks.reality.noEternities,
    checkEvent: GAME_EVENT.ETERNITY_RESET_BEFORE,
    canLock: true,
    lockEvent: "Eternity",
    bypassLock: () => Currency.infinityPoints.exponent >= 400,
    description: () => `Start every Reality with ${formatInt(100)} Eternities (also applies to current Reality)`,
    automatorPoints: 15,
    shortDescription: () => `Start with ${formatInt(100)} Eternities`,
    effect: () => 100
  },
  {
    name: "The Boundless Flow",
    id: 6,
    cost: 50,
    requirement: () => `${format(Currency.infinitiesBanked.value, 2)}/${format(DC.E12)} Banked Infinities`,
    checkRequirement: () => Currency.infinitiesBanked.exponent >= 12,
    checkEvent: [GAME_EVENT.ETERNITY_RESET_AFTER, GAME_EVENT.REALITY_FIRST_UNLOCKED],
    description: "Every second, gain 10% of the Infinities you would normally gain by Infinitying",
    automatorPoints: 5,
    shortDescription: () => `Continuous Infinity generation`,
    effect: () => gainedInfinities().times(0.1),
    formatEffect: value => `${format(value)} per second`
  },
  {
    name: "The Knowing Existence",
    id: 7,
    cost: 50,
    requirement: () => `Eternity for ${format(DC.E70)} Eternity Points without completing Eternity Challenge 1`,
    hasFailed: () => EternityChallenge(1).completions !== 0,
    checkRequirement: () => Currency.eternityPoints.exponent >= 70 && EternityChallenge(1).completions === 0,
    checkEvent: GAME_EVENT.ETERNITY_RESET_AFTER,
    canLock: true,
    lockEvent: "complete Eternity Challenge 1",
    description: "Eternity Point multiplier based on Reality and Time Theorem count",
    effect: () => Currency.timeTheorems.value
      .minus(DC.E3).clampMin(2)
      .pow(Math.log2(Math.min(Currency.realities.value, 1e4))).clampMin(1),
    formatEffect: value => formatX(value, 2, 2)
  },
  {
    name: "The Telemechanical Process",
    id: 8,
    cost: 50,
    requirement: () => `Eternity for ${format(DC.E4000)} Eternity Points without Time Dim. 5-8`,
    hasFailed: () => !Array.range(5, 4).every(i => TimeDimension(i).amount.equals(0)),
    checkRequirement: () => Currency.eternityPoints.exponent >= 4000 &&
      Array.range(5, 4).every(i => TimeDimension(i).amount.equals(0)),
    checkEvent: GAME_EVENT.ETERNITY_RESET_AFTER,
    canLock: true,
    lockEvent: "purchase a Time Dimension above the 4th TD",
    description: () => `Improve Eternity Autobuyer and unlock autobuyers for Time Dimensions and ${formatX(5)} EP`,
    automatorPoints: 10,
    shortDescription: () => `TD and ${formatX(5)} EP Autobuyers, improved Eternity Autobuyer`,
  }
];
