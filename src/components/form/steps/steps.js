const emailReg = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const steps = document.querySelector('.js-steps');
const step = document.querySelectorAll('.js-step');
const stepDot = document.querySelectorAll('.js-step-dot');
const nextStepButton = document.querySelector('.js-step-next');
const prevStepButton = document.querySelector('.js-step-prev');
const firstStep = document.querySelector('.js-step:first-child');
const lastStep = document.querySelector('.js-step:last-child');
const activeStepClass = 'is-show';
const hideStepClass = 'is-hide';
const lastStepClass = 'is-last';
const titleButtonStep = 'Next step';
const titleButtonStepLast = 'Start now';
let index = 0;


const getRes = async (url) => {
	const res = await fetch(url);

	return await res.json();
};

const showSteps = (index) => {
	step.forEach(item => {
		item.classList.remove(activeStepClass);
		item.classList.add(hideStepClass);

		const translation = index * 100;
		item.style.transform = `translateX(-${translation}%)`;
	});

	step[index].classList.remove(hideStepClass);
	step[index].classList.add(activeStepClass);
};

const toggleButtonActivity = () => {
	if (firstStep.classList.contains(activeStepClass)) {
		prevStepButton.disabled = true;
	} else {
		prevStepButton.disabled = false;
	}

	if (lastStep.classList.contains(activeStepClass)) {
		nextStepButton.classList.add(lastStepClass);
		nextStepButton.textContent = titleButtonStepLast;
	} else {
		nextStepButton.textContent = titleButtonStep;
		nextStepButton.classList.remove(lastStepClass);
	}
};

const removeErrorActivateButton = () => {
	nextStepButton.disabled = false;
	steps.querySelectorAll('.form-error').forEach(item => item.classList.remove('is-active'));
};

const nextStep = () => {
	if (index !== step.length - 1) {
		index++;

		stepDot.forEach((item, dot) => {
			if (index === dot) {
				item.classList.add('is-active');
			}
		});
	}

	showSteps(index);
	toggleButtonActivity();
};

const prevStep = () => {
	index--;

	if (index < 0) {
		index = step.length - 1;
	}

	stepDot.forEach((item, dot) => {
		if (index === dot - 1) {
			item.classList.remove('is-active');
		}
	});

	removeErrorActivateButton();

	showSteps(index);
	toggleButtonActivity();
};

nextStepButton.addEventListener('click', () => {
	const age = document.querySelector('#age');
	const locat = document.querySelector('#location');
	const email = document.querySelector('#email');
	const password = document.querySelector('#password');

	const ageValidation = age.textContent === '' && age.closest('.js-step').classList.contains('is-show');
	const locationValidation = locat.value === '' && locat.closest('.js-step').classList.contains('is-show');
	const emailValidation = email.value === '' && email.closest('.js-step').classList.contains('is-show') ||
				!emailReg.test(email.value) && email.closest('.js-step').classList.contains('is-show');
	const passwordValidation = password.value === '' && password.closest('.js-step').classList.contains('is-show');

	if (ageValidation || locationValidation || emailValidation || passwordValidation) {

		nextStepButton.disabled = true;

		getRes('https://www.mocky.io/v2/5dfcef48310000ee0ed2c281')
			.then(data => {

				Object.keys(data.errors).forEach(item => {

					const id = document.querySelector('.is-show').querySelector('.js-data');

					if (data.errors[item].name === id.getAttribute('id')) {

						const errorField = id.closest('.js-step').querySelector('.form-error');

						errorField.textContent = data.errors[item].message;
						errorField.classList.add('is-active');

						const observer = new MutationObserver(() => {
							removeErrorActivateButton();
						});

						observer.observe(id, {
							childList: true,
						});

						id.addEventListener('input', () => {
							if (!ageValidation || !locationValidation || !emailValidation || !passwordValidation) {
								removeErrorActivateButton();
							}
						});

					}

				});
			});

	} else {
		nextStep();
	}

});

prevStepButton.addEventListener('click', prevStep);
