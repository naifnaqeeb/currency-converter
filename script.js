let dropdown = document.querySelectorAll(".dropdown select");
let btn = document.querySelector("form button");
let from = document.querySelector(".from select");
let to = document.querySelector(".to select");
let msg = document.querySelector(".msg");

for (let select of dropdown) {
    for (let currCode in countryList) {
        let newOptions = document.createElement("option");
        let countryCode = countryList[currCode];
        let countryName = countryNames[countryCode] || countryCode;

        newOptions.innerText = `${currCode} - ${countryName}`;
        newOptions.value = currCode;

        if (select.name === "from" && currCode === "USD") {
            newOptions.selected = "selected";
        } else if (select.name === "to" && currCode === "INR") {
            newOptions.selected = "selected";
        }
        select.append(newOptions);
    }
    select.addEventListener("change", () => {
        changeflag(select);
    });
}

function changeflag(element) {
    let currCode = element.value;
    let countryCode = countryList[currCode];
    let newImg = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newImg;
}

async function updateExchangeRate() {
    let amount = document.querySelector(".amount input");
    let amtVal = amount.value;
    if (amtVal == "" || amtVal < 1) {
        amtVal = 1;
        amount.value = "1";
    }
    const url = `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${from.value.toLowerCase()}.json`;
    try {
        let response = await fetch(url);
        let data = await response.json();
        let rate = data[from.value.toLowerCase()][to.value.toLowerCase()];
        let finalAmount = (amtVal * rate).toFixed(2);
        msg.innerText = `${amtVal} ${from.value} = ${finalAmount} ${to.value}`;
    } catch (err) {
        msg.innerText = "Error fetching currency data.";
        console.error(err);
    }
}

btn.addEventListener("click", (evt) => {
    evt.preventDefault();
    updateExchangeRate();
});

window.addEventListener("load", updateExchangeRate);