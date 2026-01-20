const loader = document.querySelector(".loader");
const preloder = document.getElementById("preloder");

function loadfn() {
    if (loader) {
        loader.style.display = "none";
    }

    if (preloder) {
        setTimeout(function () {
            preloder.style.opacity = "0";

            setTimeout(function () {
                preloder.style.display = "none";
            }, 600);
        }, 200);
    }
    let counter = 0;
    let target = 220000;
    let users = document.getElementById("counter")
    let interval_1 = setInterval(function () {
        counter = counter + 1000;

        if (counter >= target) {
            clearInterval(interval_1);
        }
        users.textContent = counter;
    }, 20);

    const buttons = document.querySelectorAll("#tabs .title");
    const box = document.querySelectorAll(".box");

    let current_index = 0;
    let interval = "";

    function switch_tab(index) {
        for (let i = 0; i < buttons.length; i++) {
            if (i === index) {
                buttons[i].classList.add("active");
                box[i].classList.add("active");
            } else {
                buttons[i].classList.remove("active");
                box[i].classList.remove("active");
            }
        }
        current_index = index;
    }

    function start_auto() {
        interval = setInterval(function () {
            let next_index = current_index + 1;
            if (next_index >= buttons.length) {
                next_index = 0;
            }
            switch_tab(next_index);
        }, 5000);
    }


    function stop_auto() {
        clearInterval(interval);
        interval = "";
    }

    for (let i = 0; i < buttons.length; i++) {
        buttons[i].addEventListener("click", function () {
            switch_tab(i);
            stop_auto()
            start_auto();
        });
    }
    switch_tab(0);
    start_auto();
}

window.addEventListener("load", loadfn);


const menu_btn = document.querySelector(".menu-btn");
const menu = document.querySelector("header .menu");

function menu_btn_check() {
    if (menu.classList.contains("active")) {
        menu.classList.remove("active");
        menu_btn.classList.remove("active");
    } else {
        menu.classList.add("active");
        menu_btn.classList.add("active");
    }
}

menu_btn.addEventListener("click", menu_btn_check);


const nav = document.querySelector("nav");

function scroll() {
    if (window.scrollY > 50) {
        nav.classList.add("scrolled")
    } else {
        nav.classList.remove("scrolled")
    }
}
window.addEventListener("scroll", scroll)


for (let i = 0; i < 100; i++) {
    let header = document.getElementById("header")
    const p = document.createElement("div");
    p.classList.add("particle")
    p.style.left = `${Math.random() * 100}%`;
    p.style.top = `${Math.random() * 100}%`;
    p.style.transform = `scale(${0.5 + Math.random()})`;
    p.style.opacity = 0.3 + Math.random() * 0.4;
    header.appendChild(p);
}

const accordeons = document.querySelectorAll(".accordeon");
const previews = document.querySelectorAll(".right-side .content")

for (let i = 0; i < accordeons.length; i++) {
    accordeons[i].addEventListener("click", show_info);
}

function show_info() {
    const index = this.dataset.id
    for (let i = 0; i < accordeons.length; i++) {
        accordeons[i].classList.remove("active");
        accordeons[i].querySelector(".content").style.height = "";
    }

    for (let i = 0; i < previews.length; i++) {
        previews[i].classList.remove("active")
    }

    this.classList.add("active");
    for (let i = 0; i < previews.length; i++) {
        if (previews[i].dataset.id === index) {
            previews[i].classList.add("active");
        }
    }
}

const cards = document.querySelectorAll(".slider-container .card");
let active_index = 0;
let slider_timer = "";

function show(index) {
    let active = document.querySelector(".slider-container .card.active");
    if (active) {
        active.classList.remove("active");
        active.classList.add("inactive");
        let progress = active.querySelector(".progress-bar");
        if (progress) progress.style.width = "0%";
    }

    let next_card = cards[index];
    next_card.classList.remove("inactive");
    next_card.classList.add("active");
    let progress = next_card.querySelector(".progress-bar");
    if (progress) progress.style.width = "0%";

    setTimeout(function () {
        if (progress) {
            progress.style.width = "100%";
        }
    }, 10);
    active_index = index;
}

function next() {
    let next_index = active_index + 1;
    if (next_index >= cards.length) {
        next_index = 0;
    }
    show(next_index);
    restart();
}

function restart() {
    clearInterval(slider_timer);
    if (window.innerWidth > 640) {
        slider_timer = setInterval(next, 5000);
    }
}


show(active_index);
restart();

for (let i = 0; i < cards.length; i++) {
    cards[i].addEventListener("click", function () {
        if (i !== active_index) {
            show(i);
            restart();
        }
    });
}

let prev_btn = document.getElementById("prev-btn");
prev_btn.addEventListener("click", function () {
    let prev_index = active_index - 1;
    if (prev_index < 0) {
        prev_index = cards.length - 1;
    }
    show(prev_index);
    restart();
});

let next_btn = document.getElementById("next-btn");
next_btn.addEventListener("click", function () {
    next();
});

window.addEventListener('resize', function () {
    restart();
});


let accordions = document.querySelectorAll('.accordion');
for (let i = 0; i < accordions.length; i++) {
    accordions[i].addEventListener("click", show_answer)
}

function show_answer() {
    accordions = document.querySelectorAll('.accordion');

    for (let i = 0; i < accordions.length; i++) {
        if (accordions[i] !== this) {
            accordions[i].classList.remove('open');
        }
    }

    if (this.classList.contains('open')) {
        this.classList.remove('open');
    } else {
        this.classList.add('open');
    }
}

const card = document.getElementById("cards");
const show_more = document.getElementById("show_more");
const show_all = document.getElementById("show_all");

show_more.addEventListener("click", show_card);
show_all.addEventListener("click", show_all_card);

function show_card() {
    if (card.classList.contains("active")) {
        card.classList.remove("active");
        card.classList.remove("height");
        card.style.height = "460px";
        show_more.textContent = "Показать больше";
        show_all.textContent = "Показать всё";
        return;
    }

    if (!card.classList.contains("height")) {
        card.classList.add("height");
        card.style.height = "1000px";
        show_more.textContent = "Показать меньше";
    } else {
        card.classList.remove("height");
        card.style.height = "460px";
        show_more.textContent = "Показать больше";
    }
}

function show_all_card() {
    if (!card.classList.contains("active")) {
        card.classList.add("active");
        card.classList.remove("height");
        card.style.height = "auto";
        show_more.textContent = "Показать меньше";
        show_all.textContent = "Скрыть";
    } else {
        card.classList.remove("active");
        card.classList.remove("height");
        card.style.height = "460px";
        show_more.textContent = "Показать больше";
        show_all.textContent = "Показать всё";
    }
}


function tabs(section) {
    let container = section.querySelector(".tabs");
    let tabs = section.querySelectorAll(".tab");
    let containers = section.querySelectorAll(".tab-container");

    container.addEventListener("click", function (e) {
        if (e.target.classList.contains("tab")) {
            let id = e.target.dataset.id;

            for (let i = 0; i < tabs.length; i++) {
                if (tabs[i].dataset.id === id) {
                    tabs[i].classList.add("active");
                    containers[i].classList.add("active");
                } else {
                    tabs[i].classList.remove("active");
                    containers[i].classList.remove("active");
                }
            }
        }
    });
}

let containers = document.querySelectorAll(".tabs-container");
for (let i = 0; i < containers.length; i++) {
    tabs(containers[i]);
}


const cards_container = document.querySelector("#cards");
const columns = document.querySelectorAll("#cards .left, #cards .center, #cards .right");


const url = "https://68b052923b8db1ae9c039412.mockapi.io/cars";

const loading = document.createElement("div");
loading.className = "loading";
loading.textContent = "Идёт загрузка";
cards_container.prepend(loading);

const obr_reviews = async () => {
    loading.style.display = "block";
    try {
        const resp = await fetch(url);
        if (!resp.ok) throw new Error("Ошибка сервера");
        const data = await resp.json();
        return data;
    } catch (err) {
        cards_container.innerHTML = `<p class="error">Ошибка загрузки</p>`;
        console.error(err);
    } finally {
        loading.style.display = "none";
    }
};

const pokaz_reviews = (list) => {
    for (let i = 0; i < columns.length; i++) {
        columns[i].innerHTML = "";
    }
    while (list.length < 12) {
        list = list.concat(list);
    }
    let col_index = 0;
    for (let i = 0; i < list.length; i++) {
        const review = list[i];
        const card = document.createElement("div");
        card.className = "card";
        card.innerHTML = `
            <div class="user">
                <img src="${review.avatar}" alt="${review.name}">
                <div class="info">
                    <p>${review.name}</p>
                    <p>${review.age} лет</p>
                </div>
            </div>
            <p>${review.text}</p>
        `;
        columns[col_index].appendChild(card);
        col_index++;
        if (col_index === columns.length) col_index = 0;
    }
};


const start = async () => {
    const data = await obr_reviews();
    if (data && data.length > 0) {
        pokaz_reviews(data);
    } else {
        cards_container.innerHTML = "<p>Нет данных для отображения</p>";
    }
};

start();
