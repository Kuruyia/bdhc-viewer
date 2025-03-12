export type BDHCHeader = {
  magic: string;
  pointsCount: number;
  slopesCount: number;
  heightsCount: number;
  platesCount: number;
  stripsCount: number;
  accessListCount: number;
};
