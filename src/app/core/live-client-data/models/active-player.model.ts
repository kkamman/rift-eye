import { Abilities } from './abilities.model';
import { ActivePlayerRunes } from './runes.model';

export interface ChampionStats {
  abilityHaste: number;
  abilityPower: number;
  armor: number;
  armorPenetrationFlat: number;
  armorPenetrationPercent: number;
  attackDamage: number;
  attackRange: number;
  attackSpeed: number;
  bonusArmorPenetrationPercent: number;
  bonusMagicPenetrationPercent: number;
  cooldownReduction: number;
  critChance: number;
  critDamage: number;
  currentHealth: number;
  healthRegenRate: number;
  lifeSteal: number;
  magicLethality: number;
  magicPenetrationFlat: number;
  magicPenetrationPercent: number;
  magicResist: number;
  maxHealth: number;
  moveSpeed: number;
  physicalLethality: number;
  resourceMax: number;
  resourceRegenRate: number;
  resourceType: string;
  resourceValue: number;
  spellVamp: number;
  tenacity: number;
}

export interface ActivePlayer {
  abilities: Abilities;
  championStats: ChampionStats;
  currentGold: number;
  fullRunes: ActivePlayerRunes;
  level: number;
  summonerName: string;
}
