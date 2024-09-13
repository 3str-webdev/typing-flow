export const addManyClasses = (htmlNode: HTMLElement, classes: string[]) => {
	for (let i = 0; i < classes.length; i++) {
		htmlNode.classList.add(classes[i]);
	}
};

export const choiceFirstTruthful = <T>(...values: (T | [unknown, T])[]) => {
	for (const value of values) {
		if (Array.isArray(value)) {
			if (value[0]) {
				return value[1];
			}
		} else if (value) {
			return value;
		}
	}

	return null;
};

export const callFunctionsArray = <T>(...fns: (() => void)[]) => {
	for (const fn of fns) {
		fn();
	}
};
