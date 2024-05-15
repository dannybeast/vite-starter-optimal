(() => {
	const classFocusVisible = 'focus-visible';

	function removeFocusedClass() {
		const previouslyFocusedElement = document.getElementsByClassName(classFocusVisible)[0];
		if (previouslyFocusedElement) previouslyFocusedElement.classList.remove(classFocusVisible);
	}

	document.addEventListener('keyup', event => {
		if (event.key !== 'Tab') return;

		removeFocusedClass();
		document.activeElement?.classList.add(classFocusVisible);
	});
	document.addEventListener('click', removeFocusedClass);
	document.addEventListener('focusout', removeFocusedClass);
})();
