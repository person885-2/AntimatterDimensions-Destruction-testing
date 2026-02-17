import { BitPurchasableMechanicState , RebuyableMechanicState } from "./game-mechanics";

class UniversalUpgradeState extends BitPurchasableMechanicState {
  constructor(config) {
    super(config);
    this.registerEvents(config.checkEvent, () => this.tryUnlock());
  }

  get automatorPoints() {
    return this.config.automatorPoints ? this.config.automatorPoints : 0;
  }

  get name() {
    return this.config.name;
  }

  get shortDescription() {
    return this.config.shortDescription ? this.config.shortDescription() : "";
  }

  get requirement() {
    return typeof this.config.requirement === "function" ? this.config.requirement() : this.config.requirement;
  }

  get lockEvent() {
    return typeof this.config.lockEvent === "function" ? this.config.lockEvent() : this.config.lockEvent;
  }

  get currency() {
    return Currency.fracturedUniverses;
  }

  get bitIndex() {
    return this.id;
  }

  get bits() {
    return player.universal.upgradeBits;
  }

  set bits(value) {
    player.universal.upgradeBits = value;
  }

  get hasPlayerLock() {
    return (player.universal.reqLock & (1 << this.bitIndex)) !== 0;
  }

  set hasPlayerLock(value) {
    if (value) player.universal.reqLock |= 1 << this.bitIndex;
    else player.universal.reqLock &= ~(1 << this.bitIndex);
  }

  get isLockingMechanics() {
    const shouldBypass = this.config.bypassLock?.() ?? false;
    return this.hasPlayerLock && this.isPossible && !shouldBypass && !this.isAvailableForPurchase;
  }

  // Required to be changed this way to avoid direct prop mutation in Vue components
  setMechanicLock(value) {
    this.hasPlayerLock = value;
  }

  toggleMechanicLock() {
    this.hasPlayerLock = !this.hasPlayerLock;
  }

  // Note we don't actually show the modal if we already failed or unlocked it
  tryShowWarningModal(specialLockText) {
    if (this.isPossible && !this.isAvailableForPurchase) {
      Modal.upgradeLock.show({ upgrade: this, isImaginary: false, specialLockText });
    }
  }

  get isAvailableForPurchase() {
    return (player.universal.upgReqs & (1 << this.id)) !== 0;
  }

  get isPossible() {
    return this.config.hasFailed ? !this.config.hasFailed() : true;
  }

  tryUnlock() {
    const infinityReached = PlayerProgress.infinityUnlocked;
    if (!infinityReached || this.isAvailableForPurchase || !this.config.checkRequirement()) return;
    player.universal.upgReqs |= (1 << this.id);
    GameUI.notify.reality(`You've unlocked a Universal Upgrade: ${this.config.name}`);
    this.hasPlayerLock = false;
  }

  onPurchased() {
    EventHub.dispatch(GAME_EVENT.UNIVERSAL_UPGRADE_BOUGHT);
    const id = this.id;
    if(id==5){
      Achievement(35).unlock()
      Achievement(43).unlock()
      Achievement(76).unlock()
    }
}
}
UniversalUpgradeState.index = mapGameData(
  GameDatabase.destructionUpgradesUniversal,
  config => new UniversalUpgradeState(config));

/**
 * @param {number} id
 * @return {UniversalUpgradeState}
 */
export const UniversalUpgrade = id => UniversalUpgradeState.index[id];

export const UniversalUpgrades = {
  /**
   * @type {(UniversalUpgradeState)[]}
   */
  all: UniversalUpgradeState.index.compact(),
  /*get allBought() {
    return (player.universal.upgradeBits) + 1 === 1 << (GameDatabase.reality.upgrades.length);
  }*/
};
