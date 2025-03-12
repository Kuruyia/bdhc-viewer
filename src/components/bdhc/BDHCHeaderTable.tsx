import { CSSProperties } from "react";
import * as React from "react";

import { BDHCHeader } from "../../data/bdhc/BDHCHeader.ts";

export type BDHCHeaderTableProps = {
  header: BDHCHeader;
};

const leftColumnStyle: CSSProperties = {
  fontWeight: "bold",
  paddingRight: "8px",
  textAlign: "right",
};

const BDHCHeaderTable: React.FC<BDHCHeaderTableProps> = (props) => {
  return (
    <table>
      <tbody>
        <tr>
          <td style={leftColumnStyle}>Magic</td>
          <td>“{props.header.magic}”</td>
        </tr>
        <tr>
          <td style={leftColumnStyle}>Points count</td>
          <td>{props.header.pointsCount}</td>
        </tr>
        <tr>
          <td style={leftColumnStyle}>Slopes count</td>
          <td>{props.header.slopesCount}</td>
        </tr>
        <tr>
          <td style={leftColumnStyle}>Heights count</td>
          <td>{props.header.heightsCount}</td>
        </tr>
        <tr>
          <td style={leftColumnStyle}>Plates count</td>
          <td>{props.header.platesCount}</td>
        </tr>
        <tr>
          <td style={leftColumnStyle}>Strips count</td>
          <td>{props.header.stripsCount}</td>
        </tr>
        <tr>
          <td style={leftColumnStyle}>Access list count</td>
          <td>{props.header.accessListCount}</td>
        </tr>
      </tbody>
    </table>
  );
};

export default BDHCHeaderTable;
