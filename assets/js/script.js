'use strict';

/* =========================
   COMMON TOGGLE FUNCTION
========================= */
const elementToggleFunc = function (elem) {
  elem.classList.toggle("active");
};


/* =========================
   SIDEBAR TOGGLE (MOBILE)
========================= */
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

if (sidebarBtn) {
  sidebarBtn.addEventListener("click", function () {
    elementToggleFunc(sidebar);
  });
}


/* =========================
   TESTIMONIALS MODAL
========================= */
const testimonialsItem = document.querySelectorAll("[data-testimonials-item]");
const modalContainer = document.querySelector("[data-modal-container]");
const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
const overlay = document.querySelector("[data-overlay]");
const modalImg = document.querySelector("[data-modal-img]");
const modalTitle = document.querySelector("[data-modal-title]");
const modalText = document.querySelector("[data-modal-text]");

const testimonialsModalFunc = function () {
  modalContainer?.classList.toggle("active");
  overlay?.classList.toggle("active");
};

testimonialsItem.forEach(item => {
  item.addEventListener("click", function () {
    const avatar = this.querySelector("[data-testimonials-avatar]");
    modalImg.src = avatar?.src || "";
    modalImg.alt = avatar?.alt || "";
    modalTitle.innerHTML = this.querySelector("[data-testimonials-title]").innerHTML;
    modalText.innerHTML = this.querySelector("[data-testimonials-text]").innerHTML;
    testimonialsModalFunc();
  });
});

modalCloseBtn?.addEventListener("click", testimonialsModalFunc);
overlay?.addEventListener("click", testimonialsModalFunc);


/* =========================
   CUSTOM SELECT + FILTER
========================= */
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-selecct-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");
const filterItems = document.querySelectorAll("[data-filter-item]");

select?.addEventListener("click", function () {
  elementToggleFunc(this);
});

const filterFunc = function (selectedValue) {
  const value = selectedValue.trim().toLowerCase(); // lowercase + trim
  filterItems.forEach(item => {
    const category = item.dataset.category.trim().toLowerCase(); // lowercase + trim
    if (value === "all" || category === value) {
      item.classList.add("active");
    } else {
      item.classList.remove("active");
    }
  });
};

// Custom select items
selectItems.forEach(item => {
  item.addEventListener("click", function () {
    const selectedValue = this.innerText.trim().toLowerCase();
    selectValue.innerText = this.innerText;
    elementToggleFunc(select);
    filterFunc(selectedValue);
  });
});

// Filter buttons
let lastClickedBtn = filterBtn[0];

filterBtn.forEach(btn => {
  btn.addEventListener("click", function () {
    const selectedValue = this.innerText.trim().toLowerCase();
    selectValue.innerText = this.innerText;
    filterFunc(selectedValue);

    lastClickedBtn.classList.remove("active");
    this.classList.add("active");
    lastClickedBtn = this;
  });
});


/* =========================
   CONTACT FORM VALIDATION
========================= */
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

formInputs.forEach(input => {
  input.addEventListener("input", function () {
    if (form.checkValidity()) {
      formBtn.removeAttribute("disabled");
    } else {
      formBtn.setAttribute("disabled", "");
    }
  });
});


/* =========================
   PAGE NAVIGATION (FIXED)
========================= */
const navLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

navLinks.forEach(link => {
  link.addEventListener("click", function () {

    const targetPage = this.innerText.trim().toLowerCase();

    pages.forEach(page => {
      page.classList.remove("active");
      if (page.dataset.page === targetPage) {
        page.classList.add("active");
      }
    });

    navLinks.forEach(nav => nav.classList.remove("active"));
    this.classList.add("active");

    window.scrollTo(0, 0);
  });
});
