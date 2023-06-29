const dropdownBtn = document.querySelectorAll('.js-dropdown-btn');
const dropdownList = document.querySelectorAll('.js-dropdown-list');
const dropdownSelect = document.querySelectorAll('.js-dropdown-select');

dropdownBtn.forEach(item => {
	item.addEventListener('click', () => {
		item.parentElement.classList.toggle('is-open');
	});

	// close dropdown outside
	document.addEventListener('click', (e) => {
		if (e.target !== item && e.target !== item.nextElementSibling && item.parentElement.classList.contains('is-open')) {
			item.parentElement.classList.remove('is-open');
		}
	});

	// close dropdown keyboard
	document.addEventListener('keydown', (e) => {
		if (e.code === 'Escape' && item.parentElement.classList.contains('is-open')) {
			item.parentElement.classList.remove('is-open');
		}
	});
});

dropdownList.forEach(item => {
	item.addEventListener('click', (e) => {
		if (e.target !== item) {
			const selectedItem = e.target.parentElement.parentElement.previousElementSibling;
			const targetItem = selectedItem.textContent;

			selectedItem.textContent = e.target.textContent;
			e.target.textContent = targetItem;

			selectedItem.parentElement.classList.remove('is-open');
		}
	});
});

dropdownSelect.forEach(item => {
	item.addEventListener('click', (e) => {
		if (e.target !== item) {
			const selectedItem = e.target.parentElement.parentElement.previousElementSibling;

			selectedItem.textContent = e.target.textContent;

			selectedItem.parentElement.classList.remove('is-open');
		}
	});
});
