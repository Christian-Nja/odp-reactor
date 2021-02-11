export default class Filter {
    constructor(id, options) {
        this.id = id;
        this.options = options;
    }
    static create({ id, options }) {
        const defaultOptions = {
            active: true,
            filterCallback: (d) => {
                return d;
            },
        };
        return new Filter(id, { ...defaultOptions, ...options });
    }
    getOption(optionName) {
        if (this.options) return this.options[optionName];
    }
    setOptions(options) {
        this.options = options;
    }
    filter(data) {
        if (this.isActive() && this.options.filterCallback) {
            return this.options.filterCallback(data);
        } else {
            return data;
        }
    }
    invertState() {
        this.options.active = !this.options.active;
    }
    isActive() {
        if (this.options) {
            return this.options.active;
        } else {
            return undefined;
        }
    }
    isNonPersistent() {
        if (this.options) {
            return this.options.nonPersistent;
        } else {
            return undefined;
        }
    }
    hasResourcesToFilter() {
        if (this.options) {
            return this.options.hasResourcesToFilter;
        } else {
            return undefined;
        }
    }
    getId() {
        return this.id;
    }
    getDescription() {
        return this.getOption("description");
    }
}
