const url = "https://api.escuelajs.co/api/v1/products";

let allProducts = [];
let filteredProducts = [];

let currentPage = 1;
let pageSize = 10;

async function loadProducts() {
    const res = await fetch(url);
    allProducts = await res.json();
    filteredProducts = allProducts;

    render();
}

function render() {
    renderTable();
    renderPagination();
}

function renderTable() {
    const tbody = document.getElementById('productBody');
    tbody.innerHTML = "";

    const start = (currentPage - 1) * pageSize;
    const end = start + pageSize;

    const pageItems = filteredProducts.slice(start, end);

    pageItems.forEach(p => {
        const allImages = p.images
            .map(img => `<img src="${img}" alt=""/>`)
            .join('');

        const categoryImage = `<img src="${p.category.image}" alt=""/>`;

        tbody.innerHTML += `
      <tr>
        <td>${p.id}</td>
        <td>${p.title}</td>
        <td>$${p.price}</td>
        <td>${categoryImage}</td>
        <td>${allImages}</td>
      </tr>
    `;
    });
}

function renderPagination() {
    const totalPages = Math.ceil(filteredProducts.length / pageSize);
    const container = document.getElementById('pagination');
    container.innerHTML = "";

    for (let i = 1; i <= totalPages; i++) {
        container.innerHTML += `
      <button onclick="goToPage(${i})">${i}</button>
    `;
    }
}

function goToPage(page) {
    currentPage = page;
    renderTable();
}

// Search
document.getElementById('searchInput').addEventListener('input', (e) => {
    const keyword = e.target.value.toLowerCase();

    filteredProducts = allProducts.filter(p =>
        p.title.toLowerCase().includes(keyword)
    );

    currentPage = 1;
    render();
});

// Page size change
document.getElementById('pageSize').addEventListener('change', (e) => {
    pageSize = parseInt(e.target.value);
    currentPage = 1;
    render();
});
function sortByPriceAsc() {
    filteredProducts.sort((a, b) => a.price - b.price);
    currentPage = 1;
    render();
}

function sortByPriceDesc() {
    filteredProducts.sort((a, b) => b.price - a.price);
    currentPage = 1;
    render();
}

function sortByTitleAsc() {
    filteredProducts.sort((a, b) =>
        a.title.localeCompare(b.title)
    );
    currentPage = 1;
    render();
}

function sortByTitleDesc() {
    filteredProducts.sort((a, b) =>
        b.title.localeCompare(a.title)
    );
    currentPage = 1;
    render();
}

loadProducts();
