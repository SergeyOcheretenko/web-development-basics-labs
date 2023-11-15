const nameValidationRegEx = /^[А-ЩЮЯЇІЄҐ][а-щьюяїієґ]*([-][А-ЩЮЯЇІЄҐа-щьюяїієґ]+)*\s([А-ЩЮЯЇІЄҐ]{1}.){2}$/;
const facultyValidationRegEx = /^[А-ЩЮЯЇІЄҐ[а-щьюяїієґ]+$/;
const idCardValidationRegEx = /^[А-ЩЮЯЇІЄҐ]{2} №\d{6}$/;
const dateValidationRegEx =
  /^(0[1-9]|[12][0-9]|3[01]).(0[1-9]|1[012]).(19|20)\d\d$/;
const addressValidationRegEx = /^м. [А-ЩЮЯЇІЄҐа-щьюяїієґ]+$/

function validate(id, regEx) {
  const input = document.getElementById(id);
  const updatedInputValue = input.value;
  const isValid = regEx.test(updatedInputValue);

  if (isValid) {
    input.style.boxShadow = '0 0 7px rgb(23, 197, 0)';
    return;
  }

  input.style.boxShadow = '0 0 7px red';
};

function addValidateEvents(id, regEx) {
  const input = document.getElementById(id);
  if (!!input.value) {
    validate(id, regEx);
  }

  input.onload = () => validate(id, regEx);
  input.oninput = () => validate(id, regEx);
}

addValidateEvents('name-input', nameValidationRegEx);
addValidateEvents('faculty-input', facultyValidationRegEx);
addValidateEvents('id-card-input', idCardValidationRegEx);
addValidateEvents('date-input', dateValidationRegEx);
addValidateEvents('address-input', addressValidationRegEx);