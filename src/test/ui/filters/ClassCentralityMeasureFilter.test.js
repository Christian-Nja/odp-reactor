import { configure, shallow, mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import React from "react";
import ClassCentralityMeasureFilter from "../../../components/filters/facets/ClassCentralityMeasureFilter";
import mockKGCtx from "./mockKGCtx";

configure({ adapter: new Adapter() }); //enzyme - react 16 hooks support

describe("<ClassCentralityMeasureFilter />", () => {
    it("renders without explode", () => {
        mockKGCtx();
        shallow(<ClassCentralityMeasureFilter />);
    });
});
