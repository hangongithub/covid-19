import React from 'react';
import { withRouter } from 'react-router-dom'
import * as USCounty from "./USCountyInfo.js";
import { BasicGraphNewCases } from "./GraphNewCases.js"
import { BasicGraphRecoveryAndDeath } from "./GraphRecoveryAndDeath.js"
import { GraphUSTesting } from "./GraphTestingEffort"
import { withHeader } from "./Header.js"
import { MyTabs } from "./MyTabs.js"
import * as Util from "./Util.js"
import { USInfoTopWidget } from './USInfoTopWidget.js'
import { GraphUSHospitalization } from './GraphHospitalization.js'
import { ListAllStates, ListAllStatesPerCapita } from "./ListAllStates.js"

import { logger } from "./AppModule"

const GraphTabIndex = {
    "/US/Recovery": 1,
}

const GraphSectionUS = withRouter((props) => {
    let graphdata = USCounty.getUSDataForGrapth();
    let tabIndex = GraphTabIndex[props.match.url];

    const tabs = [
        <BasicGraphNewCases data={graphdata} logScale={false} />,
        <BasicGraphRecoveryAndDeath data={graphdata} logScale={false} />,
        <GraphUSTesting />,
        <GraphUSHospitalization />,
    ]
    let graphlistSection = <MyTabs
        labels={["Cases", `Recovery & Death`, `Testing`, "Hospitalization"]}
        tabs={tabs}
        startTab={tabIndex}
    />;
    return graphlistSection;
});

const PageUS = withHeader((props) => {
    const default_county_info = Util.getDefaultCounty();
    logger.logEvent("PageUS");

    const metro = USCounty.getMetroNameFromCounty(
        default_county_info.state,
        default_county_info.county);

    const tabs = [
        <ListAllStates />,
        <ListAllStatesPerCapita />
    ];
    return (
        <>
            <USInfoTopWidget
                county={default_county_info.county}
                state={default_county_info.state}
                metro={metro}
                selectedTab={"usa"}
            />
            <GraphSectionUS />
            <MyTabs
                labels={["States of USA", "Capita"]}
                tabs={tabs}
            />
        </>
    );
});

export { PageUS }
