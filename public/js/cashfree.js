// public/js/cashfree.js
document.addEventListener("DOMContentLoaded", function() {
    const cashfreeScript = document.createElement("script");
    cashfreeScript.src = "https://sdk.cashfree.com/js/v3/cashfree.js";
    cashfreeScript.onload = async function() {
        let cashfree;
        cashfree = await Cashfree({
            mode: "PRODUCTION"
        });
        window.cashfree = cashfree;
    };
    document.head.appendChild(cashfreeScript);
});
