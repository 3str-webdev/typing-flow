export const addManyClasses = (htmlNode: HTMLElement, classes: string[]) => {
	for (let i = 0; i < classes.length; i++) {
		htmlNode.classList.add(classes[i]);
	}
};
