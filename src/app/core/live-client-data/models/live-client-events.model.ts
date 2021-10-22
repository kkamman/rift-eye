import { DragonType } from './dragon-type.model';
import { Team } from './team.model';

export enum LiveClientEventType {
  GameStart = 'GameStart',
  MinionsSpawning = 'MinionsSpawning',
  FirstBrick = 'FirstBrick',
  TurretKilled = 'TurretKilled',
  InhibKilled = 'InhibKilled',
  DragonKill = 'DragonKill',
  HeraldKill = 'HeraldKill',
  BaronKill = 'BaronKill',
  ChampionKill = 'ChampionKill',
  Multikill = 'Multikill',
  Ace = 'Ace',
}

export type LiveClientEvent =
  | GameStartLiveClientEvent
  | MinionsSpawningLiveClientEvent
  | FirstBrickLiveClientEvent
  | TurretKilledLiveClientEvent
  | InhibKilledLiveClientEvent
  | DragonKillLiveClientEvent
  | HeraldKillLiveClientEvent
  | BaronKillLiveClientEvent
  | ChampionKillLiveClientEvent
  | MultikillLiveClientEvent
  | AceLiveClientEvent;

interface BaseLiveClientEvent {
  EventId: number;
  EventName: LiveClientEventType;
  EventTime: number;
}

export interface GameStartLiveClientEvent extends BaseLiveClientEvent {
  EventName: LiveClientEventType.GameStart;
}

export interface MinionsSpawningLiveClientEvent extends BaseLiveClientEvent {
  EventName: LiveClientEventType.MinionsSpawning;
}

export interface FirstBrickLiveClientEvent extends BaseLiveClientEvent {
  EventName: LiveClientEventType.FirstBrick;
  KillerName: string;
}

export interface TurretKilledLiveClientEvent extends BaseLiveClientEvent {
  EventName: LiveClientEventType.TurretKilled;
  TurretKilled: string;
  KillerName: string;
  Assisters: string[];
}

export interface InhibKilledLiveClientEvent extends BaseLiveClientEvent {
  EventName: LiveClientEventType.InhibKilled;
  InhibKilled: string;
  KillerName: string;
  Assisters: string[];
}

export interface DragonKillLiveClientEvent extends BaseLiveClientEvent {
  EventName: LiveClientEventType.DragonKill;
  DragonType: DragonType;
  Stolen: boolean;
  KillerName: string;
  Assisters: string[];
}

export interface HeraldKillLiveClientEvent extends BaseLiveClientEvent {
  EventName: LiveClientEventType.HeraldKill;
  Stolen: boolean;
  KillerName: string;
  Assisters: string[];
}

export interface BaronKillLiveClientEvent extends BaseLiveClientEvent {
  EventName: LiveClientEventType.BaronKill;
  Stolen: boolean;
  KillerName: string;
  Assisters: string[];
}

export interface ChampionKillLiveClientEvent extends BaseLiveClientEvent {
  EventName: LiveClientEventType.ChampionKill;
  VictimName: string;
  KillerName: string;
  Assisters: string[];
}

export interface MultikillLiveClientEvent extends BaseLiveClientEvent {
  EventName: LiveClientEventType.Multikill;
  KillerName: string;
  KillStreak: number;
}

export interface AceLiveClientEvent extends BaseLiveClientEvent {
  EventName: LiveClientEventType.Ace;
  Acer: string;
  AcingTeam: Team;
}
