const url = "https://api.escuelajs.co/api/v1/products";

let allProducts = [];
let filteredProducts = [];

let currentPage = 1;
let pageSize = 10;

async function loadProducts() {
    const res = await fetch(url);
    allProducts = await res.json();
    filteredProducts = [...allProducts];
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
        const images = p.images.map(i => `<img src="${i}" />`).join('');
        const cateImg = `<img src="${p.category.image}" />`;

        tbody.innerHTML += `
        <tr>
            <td>${p.id}</td>
            <td>${p.title}</td>
            <td>$${p.price}</td>
            <td>${cateImg}</td>
            <td>${images}</td>
        </tr>`;
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

/* SEARCH */
document.getElementById('searchInput').addEventListener('input', (e) => {
    const keyword = e.target.value.toLowerCase();
    filteredProducts = allProducts.filter(p =>
        p.title.toLowerCase().includes(keyword)
    );
    currentPage = 1;
    render();
});

/* PAGE SIZE */
document.getElementById('pageSize').addEventListener('change', (e) => {
    pageSize = parseInt(e.target.value);
    currentPage = 1;
    render();
});

/* SORT */
function sortByPriceAsc() {
    filteredProducts.sort((a, b) => a.price - b.price);
    render();
}

function sortByPriceDesc() {
    filteredProducts.sort((a, b) => b.price - a.price);
    render();
}

function sortByTitleAsc() {
    filteredProducts.sort((a, b) => a.title.localeCompare(b.title));
    render();
}

function sortByTitleDesc() {
    filteredProducts.sort((a, b) => b.title.localeCompare(a.title));
    render();
}

loadProducts();
