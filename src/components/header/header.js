const header = document.querySelector('.js-header');

if (header) {
	const setHeaderHeight = () => {
		const headerHeight = header.clientHeight;

		document.body.style.setProperty('--header-height', `${headerHeight/10}rem`);
	};

	setHeaderHeight();

	window.addEventListener('resize', setHeaderHeight);

	// detect header height change (if needed)
	const observer = new MutationObserver(() => {
		setHeaderHeight();
	});

	observer.observe(header, {
		childList: true,
		subtree: true,
		attributes: true,
		characterData: true,
		characterDataOldValue: false,
		attributeOldValue: false,
	});
}
