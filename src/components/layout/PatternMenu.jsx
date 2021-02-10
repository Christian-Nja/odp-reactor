import React, { useState, useEffect } from "react";
import { Menu, Message, Icon } from "semantic-ui-react";

import HelpIcon from "../KnowledgeGraph/HelpIcon";
import DropdownIcon from "../KnowledgeGraph/DropdownIcon";

import LayoutSelector from "../KnowledgeGraph/LayoutSelector";
import LayoutToggle from "../KnowledgeGraph/LayoutToggle";

import { useLayoutCtx } from "../../layout/LayoutCtx/useLayoutCtx";

import {
    useBinaryArrayState,
    useBinaryState,
    useHelp,
} from "../hooks/ld-ui-hooks";
import Toggle from "react-toggle";

import "react-toggle/style.css"; // for ES6 modules

import "./PatternMenu.css";

import { some } from "lodash";
import { useFilterCtx } from "../../filters/FilterCtx/useFilterCtx";
import { useHelpCtx } from "../../filters/HelpCtx/useHelpCtx";

const greenText = "#14d014";

export default function PatternMenu({ showLayoutButton = true, children }) {
    const [open, setOpen] = useBinaryArrayState([]);
    const [layoutButton, setLayoutButton] = useBinaryState();
    const [filterButton, setFilterButton] = useBinaryState();
    const [menuOpen, setMenuOpen] = useState(false);
    const filterHelp =
        "Click here to open filter panel. Every filter can be active or inactive. When active it will filter out all KG nodes outside of the filter range. Nodes without  ";
    const { setHelp } = useHelpCtx();

    const { layoutOptions, graphinLayoutHandler } = useLayoutCtx();

    const exampleMenuOpen = layoutOptions.exampleMenuOpen;
    const exampleLayoutOpen = layoutOptions.exampleLayoutOpen;
    const exampleFiltersOpen = layoutOptions.exampleFiltersOpen;
    const exampleFilterOccurencesOpen =
        layoutOptions.exampleFilterOccurencesOpen;

    console.log("Pattern Menu options", layoutOptions);

    const {
        setInvertedFilterStateById,
        filters,
        getFilterById,
    } = useFilterCtx();

    useEffect(() => {
        if (layoutButton) {
            setLayoutButton();
        }
    }, [menuOpen, exampleMenuOpen]);

    useEffect(() => {
        if (filterButton) {
            setFilterButton();
        }
    }, [menuOpen, exampleMenuOpen]);

    // we use this state variable to launch a callback opening the filter item menu
    // resulting behaviour: when activating a filter it's menu item regulator is also open
    const [lastActivatedFilter, setLastActivatedFilter] = useState(false);

    const menuStyle = {
        position: "fixed",
        top: 70,
        left: 0,
        zIndex: 10,
    };

    useEffect(() => {
        if (lastActivatedFilter) {
            // filtering
            setInvertedFilterStateById(lastActivatedFilter.filterKey);
        }
    }, [lastActivatedFilter]);
    useEffect(() => {
        if (lastActivatedFilter) {
            // filter active
            if (!lastActivatedFilter.state) {
                if (open.includes(lastActivatedFilter.filterId)) {
                    // regulator open
                    // do nothing
                } else {
                    setOpen(lastActivatedFilter.filterId);
                }
            }
            // filter not active
            if (lastActivatedFilter.state) {
                if (open.includes(lastActivatedFilter.filterId)) {
                    // regulator open
                    // close it
                    setOpen(lastActivatedFilter.filterId);
                } else {
                }
            }
        }
    }, [lastActivatedFilter]);

    // check if some filter is active and modify menu UI
    // signalling user by green color or message
    const isSomeFilterActive = some(filters, (f) => {
        return f.isActive() && !f.isNonPersistent();
    });

    return (
        <div
            style={menuStyle}
            className={`menu-main ${
                menuOpen || exampleMenuOpen ? "menu-main-over" : ""
            }`}
            onMouseOver={() => {
                setMenuOpen(true);
            }}
            onMouseLeave={() => {
                setMenuOpen(false);
            }}
        >
            <Menu vertical inverted>
                <Menu.Item className="menu-item filters-menu-button">
                    <div
                        style={{
                            cursor: "pointer",
                            color: isSomeFilterActive ? greenText : "white",
                            fontSize: 18,
                        }}
                        onClick={setFilterButton}
                    >
                        <Icon name="search" className="filters-icon" />
                        <div
                            className={`menu-main-title ${
                                menuOpen || exampleMenuOpen
                                    ? "menu-main-open"
                                    : ""
                            } filters-title`}
                        >
                            Filters
                        </div>
                        <DropdownIcon
                            style={{
                                transform:
                                    filterButton || exampleFiltersOpen
                                        ? null
                                        : "rotate(270deg)",
                                position: "relative",
                                cursor: "pointer",
                                width: "fit-content",
                                display:
                                    menuOpen || exampleMenuOpen
                                        ? "inline-block"
                                        : "none",
                                float: "right",
                            }}
                            className={
                                menuOpen || exampleMenuOpen
                                    ? "menu-dropdown menu-open-dropdown"
                                    : "menu-dropdown"
                            }
                        />
                        <HelpIcon
                            style={{ position: "absolute", left: 130, top: 15 }}
                            onMouseEnter={() => {
                                setHelp({ message: filterHelp });
                            }}
                        />
                        {isSomeFilterActive && !filterButton ? (
                            <Message
                                className="menu-item-message"
                                success
                                size="small"
                            >
                                <Icon name="alarm" />
                                <Message.Content>
                                    There are active filters
                                </Message.Content>
                            </Message>
                        ) : null}
                    </div>
                    <Menu.Menu
                        className={
                            filterButton || exampleFiltersOpen
                                ? ""
                                : "close-filter"
                        }
                    >
                        {children &&
                            React.Children.toArray(children).map((c, index) => {
                                let child;
                                if (React.isValidElement(c)) {
                                    child = React.cloneElement(c, {
                                        closeFilterMenuItem: () => {
                                            setOpen(index);
                                        },
                                    });
                                }
                                // return filters
                                return (
                                    <Menu.Item
                                        key={index}
                                        className={`menu-item filter-item filter-${child.props.id}`}
                                    >
                                        <div
                                            style={{
                                                display: "flex",
                                                justifyContent: "space-between",
                                                alignItems: "center",
                                                marginBottom: 5,
                                                paddingLeft: 30,
                                                marginTop: 10,
                                                marginBottom: 10,
                                            }}
                                        >
                                            <DropdownIcon
                                                style={{
                                                    transform: open.includes(
                                                        index
                                                    )
                                                        ? null
                                                        : "rotate(270deg)",
                                                    position: "relative",
                                                    width: "fit-content",
                                                    cursor: "pointer",
                                                }}
                                                onClick={() => {
                                                    setOpen(index);
                                                }}
                                            />
                                            <div
                                                className={
                                                    getFilterById(
                                                        child.props.id
                                                    ) &&
                                                    getFilterById(
                                                        child.props.id
                                                    ).isActive()
                                                        ? "active-filter filter-title"
                                                        : "filter-title"
                                                }
                                                onClick={() => {
                                                    setOpen(index);
                                                }}
                                                style={{
                                                    cursor: "pointer",
                                                }}
                                            >
                                                {child.props.title}
                                            </div>
                                            <Toggle
                                                id={child.props.id}
                                                checked={
                                                    getFilterById(
                                                        child.props.id
                                                    ) &&
                                                    getFilterById(
                                                        child.props.id
                                                    ).isActive()
                                                }
                                                onChange={(e) => {
                                                    // setLastToggledFilter
                                                    setLastActivatedFilter({
                                                        filterKey: e.target.id,
                                                        filterId: index,
                                                        state:
                                                            getFilterById(
                                                                child.props.id
                                                            ) &&
                                                            getFilterById(
                                                                child.props.id
                                                            ).isActive(),
                                                    });
                                                }}
                                            />
                                        </div>
                                        <Menu.Menu
                                            className={
                                                // open occurences as example filter
                                                open.includes(index) ||
                                                (exampleFilterOccurencesOpen &&
                                                    child.props.id ===
                                                        "occurences")
                                                    ? `${child.props.id}-filter-button`
                                                    : `${child.props.id}-filter-button close-filter`
                                            }
                                        >
                                            {child}
                                        </Menu.Menu>
                                    </Menu.Item>
                                );
                            })}
                    </Menu.Menu>
                </Menu.Item>
                {showLayoutButton && (
                    <Menu.Item className="menu-item layouts-menu-button">
                        <div
                            style={{
                                cursor: "pointer",
                                fontSize: 18,
                            }}
                            onClick={setLayoutButton}
                        >
                            <Icon name="picture" />
                            <div
                                className={`menu-main-title ${
                                    menuOpen || exampleMenuOpen
                                        ? "menu-main-open"
                                        : ""
                                }`}
                            >
                                Layout
                            </div>
                            <DropdownIcon
                                style={{
                                    transform:
                                        layoutButton || exampleLayoutOpen
                                            ? null
                                            : "rotate(270deg)",
                                    position: "relative",
                                    cursor: "pointer",
                                    width: "fit-content",
                                    display:
                                        menuOpen || exampleMenuOpen
                                            ? "inline-block"
                                            : "none",
                                    float: "right",
                                }}
                                className={
                                    menuOpen || exampleMenuOpen
                                        ? "menu-dropdown menu-open-dropdown"
                                        : "menu-dropdown"
                                }
                            />
                        </div>
                        {layoutButton || exampleLayoutOpen ? (
                            <Menu.Menu>
                                <LayoutToggle></LayoutToggle>
                            </Menu.Menu>
                        ) : null}
                    </Menu.Item>
                )}
                {layoutOptions.layout === "graph" && (
                    <LayoutSelector
                        value={graphinLayoutHandler.name}
                        onClick={(newLayout) => {
                            graphinLayoutHandler.setLayout(newLayout);
                        }}
                        menuOpen={menuOpen || exampleMenuOpen}
                    ></LayoutSelector>
                )}
            </Menu>
        </div>
    );
}
