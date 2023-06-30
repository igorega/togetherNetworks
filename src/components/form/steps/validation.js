export const validationCondition = () => {
	const emailReg = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	const age = document.querySelector('#age');
	const locat = document.querySelector('#location');
	const email = document.querySelector('#email');
	const password = document.querySelector('#password');

	const ageValidation = age.textContent === '' && age.closest('.js-step').classList.contains('is-show');
	const locationValidation = locat.value === '' && locat.closest('.js-step').classList.contains('is-show');
	const emailValidation = email.value === '' && email.closest('.js-step').classList.contains('is-show') ||
				!emailReg.test(email.value) && email.closest('.js-step').classList.contains('is-show');
	const passwordValidation = password.value === '' && password.closest('.js-step').classList.contains('is-show');

	const condition = ageValidation || locationValidation || emailValidation || passwordValidation;

	return condition;
};
