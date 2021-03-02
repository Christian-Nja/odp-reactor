import React, { useState, useEffect } from "react";
import ViewController from "../../KnowledgeGraph/ViewController";
import { useKGCtx } from "../../../knowledgegraph/KGCtx/useKGCtx";
import useFilter from "../../../filters/FilterCtx/useFilter";
import { forEach, clone, map } from "lodash";
import { FilterPatternStrategy } from "../../../filters/filter-algorithms/FilterPatternStrategy";

export default function PatternFilter({ id = "patternPie", isActive = true }) {
    // get knowledge graph and resources to analyze
    const { knowledgeGraph } = useKGCtx();
    const patterns = knowledgeGraph.getPatterns();

    // set default filter options
    const initialFilterOptions = {
        active: isActive,
        filterCallback: filterAlgorithm,
    };
    // get filter component or create it for the first time
    const { filter, setFilterOptions } = useFilter(id, initialFilterOptions);

    // compute initial arguments for filter
    const defaultCheckboxItemPatterns = map(patterns, (p) => {
        return { uri: p.uri, checked: false, label: p.label };
    });

    // set as state first argument for filter
    const [checkboxItemPatterns, setCheckboxItemPatterns] = useState(
        (filter && filter.getOption("patterns")) || defaultCheckboxItemPatterns
    );

    // create filter strategy based on first calculated or saved arguments
    const filterAlgorithm = FilterPatternStrategy.create({
        patterns: checkboxItemPatterns,
    });

    // update filter when arguments change
    useEffect(() => {
        if (filter) {
            setFilterOptions({
                ...filter.options,
                filterCallback: filterAlgorithm,
            });
        }
    }, [checkboxItemPatterns]);

    return (
        <div style={{ marginLeft: 40, marginTop: 20 }}>
            <ViewController
                styles={{
                    checkboxContainer: {
                        marginBottom: 20,
                    },
                    checkboxLabel: {
                        fontSize: 20,
                        marginLeft: 0,
                        cursor: "pointer",
                    },
                    checkboxButton: {
                        width: 20,
                        height: 20,
                        cursor: "pointer",
                    },
                }}
                availableViews={checkboxItemPatterns}
                onViewConfigurationChange={(
                    clickedViewUri,
                    clickedViewState
                ) => {
                    const newCheckboxItemPatterns = clone(checkboxItemPatterns);
                    forEach(checkboxItemPatterns, (checkboxItem) => {
                        if (checkboxItem.uri === clickedViewUri) {
                            checkboxItem.checked = clickedViewState;
                        }
                    });
                    setCheckboxItemPatterns(newCheckboxItemPatterns);
                }}
            />
        </div>
    );
}
