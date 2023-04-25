export interface Unit {
  singular: string;
  plural: string;
  symbol?: string | null;
}

export interface UnitWithId extends Unit {
  id: string;
}

export interface Units {
  [key: string]: Unit;
}
