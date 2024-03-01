const fillSection = (product) => {
  nameRef.innerText = product.name;

  product.description
    .trim()
    .split("\n")
    .forEach((element) => {
      let newLiRef = document.createElement("li");
      newLiRef.innerText = element.trim();
      descriptionRef.appendChild(newLiRef);
    });

  imageRef.setAttribute("src", product.imageUrl);
  priceRef.innerText = `${product.price} $`;
  brandRef.innerText = `${product.brand} presents`;
};

const deleteProduct = async () => {
  try {
    const response = await fetch(`${URL_PRODUCT}${eventId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${API_KEY}`,
      },
    });

    if (response.ok) {
      return false;
    } else {
      throw new Error("There was a problem deleting the product.");
    }
  } catch (error) {
    console.error(error);
    alert("There was an error. Please try again later.");
    return true;
  }
};

const fetchProduct = async () => {
  try {
    const response = await fetch(`${URL_PRODUCT}${eventId}`, {
      headers: {
        Authorization: `Bearer ${API_KEY}`,
      },
    });

    if (response.ok) {
      const product = await response.json();
      return product;
    } else {
      throw new Error("There was a problem fetching the product details.");
    }
  } catch (error) {
    console.error(error);
    alert("There was an error. Please try again later.");
    return null;
  }
};

const showButtons = (edit) => {
  if (edit) {
    editBtnRef.classList.remove("d-none");
    deleteBtnRef.classList.remove("d-none");
  } else {
    buyBtnRef.classList.remove("d-none");
    priceRef.classList.remove("d-none");
  }
};

const URL_PRODUCT = "https://striveschool-api.herokuapp.com/api/product/";
const API_KEY =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWUxYTNjNTRjNTllYzAwMTk5MGQ3MWYiLCJpYXQiOjE3MDkyODYzNDIsImV4cCI6MTcxMDQ5NTk0Mn0.7jpbwOk_mB8tp1CkRRVykzisSWh1E9kw2T8-F2t1MGI";

const queryParams = new URLSearchParams(window.location.search);
const eventId = queryParams.get("eventId");

const nameRef = document.getElementById("name");
const descriptionRef = document.getElementById("description");
const imageRef = document.getElementById("image");
const priceRef = document.getElementById("price");
const brandRef = document.getElementById("brand");

const buyBtnRef = document.getElementById("buyBtn");
const editBtnRef = document.getElementById("editBtn");
const deleteBtnRef = document.getElementById("deleteBtn");
const deleteConfBtnRef = document.getElementById("deleteConfBtn");

let product = {};

editBtnRef.addEventListener("click", (event) => {
  event.preventDefault();
  window.location.href = `./back_office.js?eventId=${product._id}&edit=1`;
});

deleteConfBtnRef.addEventListener("click", async (event) => {
  event.preventDefault();
  const error = await deleteProduct();
  if (!error) {
    window.location.href = `./Crudazone.html`;
  }
});

window.onload = async () => {
  product = await fetchProduct();
  localStorage.setItem("curr_product", JSON.stringify(product));
  fillSection(product);
  const edit = Boolean(parseInt(queryParams.get("edit")));
  showButtons(edit);
};
