const checkFieldValue = (fieldRef) => {
  const fieldValue = fieldRef.value.trim();
  const isValid = fieldValue !== "";

  fieldRef.classList.remove(isValid ? "is-invalid" : "is-valid");
  fieldRef.classList.add(isValid ? "is-valid" : "is-invalid");

  return !isValid;
};

const checkPriceValue = () => {
  const price = priceFormRef.value.trim();

  if (!price) {
    priceInvalidRef.innerText = "Insert Price!";
    return true;
  }

  if (!Number.isInteger(Number(price))) {
    priceInvalidRef.innerText = "Price must be an integer!";
    return true;
  }

  priceFormRef.classList.remove("is-invalid");
  priceFormRef.classList.add("is-valid");
  return false;
};

const checkFormValues = () => {
  const errors = [
    checkFieldValue(nameFormRef),
    checkFieldValue(descriptionFormRef),
    checkFieldValue(imageUrlFormRef),
    checkFieldValue(brandFormRef),
    checkPriceValue(),
  ];

  return !errors.some((error) => error);
};

const fillForm = () => {
  nameFormRef.value = product.name;
  descriptionFormRef.value = product.description.trim();
  imageUrlFormRef.value = product.imageUrl;
  brandFormRef.value = product.brand;
  priceFormRef.value = product.price;
};

const saveProduct = async (newProduct) => {
  try {
    const url = eventId ? `${URL_PRODUCT}${eventId}` : URL_PRODUCT;
    const response = await fetch(url, {
      method: eventId ? "PUT" : "POST",
      body: JSON.stringify(newProduct),
      headers: {
        Authorization: `Bearer ${API_KEY}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("There was a problem saving the product.");
    }

    return false;
  } catch (error) {
    console.error(error);
    alert("There was an error. Please try again later.");
    return true;
  }
};

const formRef = document.getElementById("formProduct");
const submitBtnRef = document.getElementById("submitBtn");
const resetFormRef = document.getElementById("resetForm");

formRef.addEventListener("submit", async (event) => {
  event.preventDefault();
  const isFormValid = checkFormValues();

  if (!isFormValid) {
    return;
  }

  const newProduct = {
    name: nameFormRef.value,
    description: descriptionFormRef.value,
    imageUrl: imageUrlFormRef.value,
    brand: brandFormRef.value,
    price: parseInt(priceFormRef.value),
  };

  const errSave = await saveProduct(newProduct);

  if (!errSave) {
    formRef.reset();
    window.location.href = "Crudazone.html";
  }
});

resetFormRef.addEventListener("click", (event) => {
  event.preventDefault();
  formRef.reset();
});

window.onload = () => {
  formRef.reset();

  if (edit) {
    fillForm();
    submitBtnRef.innerText = "Update Product";
  }
};
