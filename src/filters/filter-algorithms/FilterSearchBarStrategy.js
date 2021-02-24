import { find } from "lodash";

export class FilterSearchBarStrategy {
    constructor(searchTerm, filteredResources) {
        this.searchTerm = searchTerm;
        this.filteredResources = filteredResources;
        this.class = this.constructor.name;
    }
    static create({ filteredResources, searchTerm }) {
        return new FilterSearchBarStrategy(searchTerm, filteredResources);
    }
    filter(node) {
        if (this.searchTerm === "") {
            return true;
        }
        if (this.searchTerm !== "") {
            if (
                find(this.filteredResources, (f) => {
                    return f.getUri() === node.getUri();
                })
            ) {
                return true;
            }
        }
    }
}
