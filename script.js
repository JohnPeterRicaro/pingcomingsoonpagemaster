const validateForm = (formSelector) => {
  const formElement = document.querySelector(formSelector);

  const validateOptions = [
    {
      attribute: "emailvalid",
      isValid: (input) => {
        const patternRegex = new RegExp(
          /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
        return patternRegex.test(input.value);
      },
      errorMessage: () => `Email is an invalid format`,
    },
    {
      attribute: "required",
      isValid: (input) => input.value.trim() !== "",
      errorMessage: () => `Email is empty`,
    },
  ];

  const validateEmail = (formEmail) => {
    const input = formEmail.querySelector("#input");
    const errText = document.querySelector("#errTxt");
    const errMssg = document.querySelector("#errMssg");

    let formError = false;
    for (const option of validateOptions) {
      if (input.hasAttribute(option.attribute) && !option.isValid(input)) {
        input.classList.remove("border-gray-300");
        input.classList.remove("focus:border-blue-400");
        input.classList.add("focus:border-red-600");
        input.classList.add("border-red-600");
        errText.classList.remove("hidden");
        errMssg.textContent = option.errorMessage(errText);
        formError = true;
      }
    }
    if (!formError) {
      input.classList.add("border-gray-300");
      input.classList.add("focus:border-blue-400");
      input.classList.remove("focus:border-red-600");
      input.classList.remove("border-red-600");
      errText.classList.add("hidden");
    }
    return !formError;
  };
  
  formElement.setAttribute('novalidate', '')

  formElement.addEventListener("submit", (event) => {
    const formValid = validateEmail(formElement);

    if (!formValid) {
      event.preventDefault();
      console.log("I'm working");
    } else {
      console.log("form is valid");
    }
  });
};

validateForm("#emailForm");
