const createCardElement = (product) => {
  const cardElement = document.createElement("div");
  cardElement.innerHTML = `
    <div class="card text-white bg-primary mb-5 px-4">
        <h1 class="card-title display-4 mt-2 text-center text-info mt-4">${product.name}</h1>
        <img src="${product.imageUrl}" alt="Product">
        <div class="card-body p-0">
            <p class="card-text">${product.description}</p>
        </div>
        <div class="d-flex justify-content-end mb-3">
            <a href="./detail.html?eventId=${product._id}&edit=1" class="card-link text-warning fs-5 mr-5">Modifica</a>
            <a href="./detail.html?eventId=${product._id}&edit=0" class="card-link text-success fs-5 mr-5">Scopri di più</a>
        </div>
    </div>
  `;
  return cardElement;
};

const fetchProducts = async () => {
  try {
    const response = await fetch(URL_PRODUCT, {
      headers: {
        Authorization: `Bearer ${API_KEY}`,
      },
    });

    if (response.ok) {
      const products = await response.json();
      return products;
    } else {
      throw new Error("There was a problem fetching the products.");
    }
  } catch (error) {
    console.error(error);

    alert("There was an error. Please try again later.");
    return null;
  }
};

const cardsSection = document.getElementById("cardsSection");
const spinner = document.querySelector(".spinner-border");
const goUp = document.getElementById("goUp");

const URL_PRODUCT = "https://striveschool-api.herokuapp.com/api/product/";
const API_KEY =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWUxYTNjNTRjNTllYzAwMTk5MGQ3MWYiLCJpYXQiOjE3MDkyODYzNDIsImV4cCI6MTcxMDQ5NTk0Mn0.7jpbwOk_mB8tp1CkRRVykzisSWh1E9kw2T8-F2t1MGI";

window.onload = async () => {
  try {
    spinner.classList.add("d-none");
    const products = await fetchProducts();

    if (products) {
      products.forEach((product) => {
        const cardElement = createCardElement(product);
        cardsSection.appendChild(cardElement);
      });
    }

    goUp.classList.remove("d-none");
  } catch (error) {
    console.error(error);
  }
};
