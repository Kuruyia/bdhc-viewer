import { fx32ToFloat } from "../../utils.ts";
import { Vec3D } from "../Vec3D.ts";
import { BDHCHeader } from "./BDHCHeader.ts";
import { BDHCPlate } from "./BDHCPlate.ts";
import { BDHCPoint, calculateBDHCPointRectSize } from "./BDHCPoint.ts";
import { BDHCStrip } from "./BDHCStrip.ts";

export class BDHC {
  private readonly _header: BDHCHeader;
  private readonly _points: BDHCPoint[];
  private readonly _normals: Vec3D[];
  private readonly _constants: number[];
  private readonly _plates: BDHCPlate[];
  private readonly _strips: BDHCStrip[];
  private readonly _accessList: number[];

  public constructor() {
    this._header = {
      magic: "",
      pointsCount: 0,
      normalsCount: 0,
      constantsCount: 0,
      platesCount: 0,
      stripsCount: 0,
      accessListCount: 0,
    };

    this._points = [];
    this._normals = [];
    this._constants = [];
    this._plates = [];
    this._strips = [];
    this._accessList = [];
  }

  public async load(dataView: DataView) {
    await this.loadHeader(dataView);
    let offset = 16;

    // Load points
    for (let i = 0; i < this._header.pointsCount; i++) {
      const point = {
        x: fx32ToFloat(dataView.getInt32(offset, true)),
        y: fx32ToFloat(dataView.getInt32(offset + 4, true)),
      };

      this._points.push(point);
      offset += 8;
    }

    // Load normal vectors
    for (let i = 0; i < this._header.normalsCount; i++) {
      const normal = {
        x: fx32ToFloat(dataView.getInt32(offset, true)),
        y: fx32ToFloat(dataView.getInt32(offset + 4, true)),
        z: fx32ToFloat(dataView.getInt32(offset + 8, true)),
      } satisfies Vec3D;

      this._normals.push(normal);
      offset += 12;
    }

    // Load constants
    for (let i = 0; i < this._header.constantsCount; i++) {
      this._constants.push(fx32ToFloat(dataView.getInt32(offset, true)));
      offset += 4;
    }

    // Load plates
    for (let i = 0; i < this._header.platesCount; i++) {
      const firstPointIndex = dataView.getUint16(offset, true);
      const secondPointIndex = dataView.getUint16(offset + 2, true);
      const normalIndex = dataView.getUint16(offset + 4, true);
      const constantIndex = dataView.getUint16(offset + 6, true);

      const firstPoint = this._points[firstPointIndex];
      const secondPoint = this._points[secondPointIndex];

      const plate = {
        firstPointIndex,
        secondPointIndex,
        normalIndex,
        constantIndex,
        index: i,
        firstPoint,
        secondPoint,
        normal: this._normals[normalIndex],
        constant: this._constants[constantIndex],
        size: calculateBDHCPointRectSize(firstPoint, secondPoint),
      } satisfies BDHCPlate;

      this._plates.push(plate);
      offset += 8;
    }

    // Load strips
    for (let i = 0; i < this._header.stripsCount; i++) {
      const accessListElementCount = dataView.getUint16(offset + 4, true);
      const accessListStartIndex = dataView.getUint16(offset + 6, true);

      const strip = {
        lowerBound: fx32ToFloat(dataView.getInt32(offset, true)),
        accessListElementCount,
        accessListStartIndex,
        plates: [],
        accessListEndIndex: accessListStartIndex + accessListElementCount,
      } satisfies BDHCStrip;

      this._strips.push(strip);
      offset += 8;
    }

    // Load access list
    for (let i = 0; i < this._header.accessListCount; i++) {
      this._accessList.push(dataView.getUint16(offset, true));
      offset += 2;
    }

    // Fix strips calculated values
    for (const strip of this._strips) {
      for (let i = 0; i < strip.accessListElementCount; i++) {
        const plateIndex = this._accessList[strip.accessListStartIndex + i];
        strip.plates.push(this._plates[plateIndex]);
      }
    }
  }

  private async loadHeader(dataView: DataView) {
    for (let i = 0; i < 4; i++) {
      this._header.magic += String.fromCharCode(dataView.getUint8(i));
    }

    if (this._header.magic !== "BDHC") {
      throw new Error("Invalid BDHC file");
    }

    this._header.pointsCount = dataView.getUint16(4, true);
    this._header.normalsCount = dataView.getUint16(6, true);
    this._header.constantsCount = dataView.getUint16(8, true);
    this._header.platesCount = dataView.getUint16(10, true);
    this._header.stripsCount = dataView.getUint16(12, true);
    this._header.accessListCount = dataView.getUint16(14, true);
  }

  public get header() {
    return this._header;
  }

  public get points() {
    return this._points;
  }

  public get normals() {
    return this._normals;
  }

  public get constants() {
    return this._constants;
  }

  public get plates() {
    return this._plates;
  }

  public get strips() {
    return this._strips;
  }

  public get accessList() {
    return this._accessList;
  }
}
