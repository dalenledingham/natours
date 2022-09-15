const $1491b5ca3b179d81$export$4c5dd147b21b9176 = (locations)=>{
    mapboxgl.accessToken = "pk.eyJ1IjoiZGFsZW5sZWRpbmdoYW0iLCJhIjoiY2w3cXd6c2JpMDI0aDNvbnk4NmRoMzBrdCJ9.oKMgUDYQpJmKzpO_ljDB2Q";
    const map = new mapboxgl.Map({
        container: "map",
        style: "mapbox://styles/dalenledingham/cl7qxk6z7002h15p0uzto6mo2",
        scrollZoom: false
    });
    const bounds = new mapboxgl.LngLatBounds();
    locations.forEach((location)=>{
        // Create marker
        const element = document.createElement("div");
        element.className = "marker";
        // Add marker
        new mapboxgl.Marker({
            element: element,
            anchor: "bottom"
        }).setLngLat(location.coordinates).addTo(map);
        // Create popup
        new mapboxgl.Popup({
            offset: 30
        }).setLngLat(location.coordinates).setHTML(`<p>Day ${location.day}: ${location.description}</p>`).addTo(map);
        // Extend map bounds to include location
        bounds.extend(location.coordinates);
    });
    // Add padding to map bounds
    map.fitBounds(bounds, {
        padding: {
            top: 200,
            bottom: 150,
            left: 100,
            right: 100
        }
    });
};


const $98b5a4a3c5ad9cae$export$516836c6a9dfc573 = ()=>{
    const element = document.querySelector(".alert");
    if (element) element.parentElement.removeChild(element);
};
const $98b5a4a3c5ad9cae$export$de026b00723010c1 = (type, message, time = 7)=>{
    $98b5a4a3c5ad9cae$export$516836c6a9dfc573();
    const markup = `<div class="alert alert--${type}">${message}</div>`;
    document.querySelector("body").insertAdjacentHTML("afterbegin", markup);
    window.setTimeout($98b5a4a3c5ad9cae$export$516836c6a9dfc573, time * 1000);
};


const $52873e4aaa37751f$export$596d806903d1f59e = async (email, password)=>{
    try {
        const res = await axios({
            method: "POST",
            url: "/api/v1/users/login",
            data: {
                email: email,
                password: password
            }
        });
        if (res.data.status === "success") {
            (0, $98b5a4a3c5ad9cae$export$de026b00723010c1)("success", "Logged in successfully");
            window.setTimeout(()=>{
                location.assign("/");
            }, 1500);
        }
    } catch (err) {
        (0, $98b5a4a3c5ad9cae$export$de026b00723010c1)("error", err.response.data.message);
    }
};
const $52873e4aaa37751f$export$a0973bcfe11b05c9 = async ()=>{
    try {
        const res = await axios({
            method: "GET",
            url: "/api/v1/users/logout"
        });
        if (res.data.status === "success") {
            (0, $98b5a4a3c5ad9cae$export$de026b00723010c1)("success", "Logging you out");
            window.setTimeout(()=>{
                location.assign("/login");
            }, 1500);
        }
    } catch (err) {
        (0, $98b5a4a3c5ad9cae$export$de026b00723010c1)("error", "Error logging out");
    }
};



const $90681208c17c3f06$export$f558026a994b6051 = async (data, type)=>{
    try {
        const url = type === "password" ? "/api/v1/users/update-my-password" : "/api/v1/users/update-me";
        const res = await axios({
            method: "PATCH",
            url: url,
            data: data
        });
        if (res.data.status === "success") (0, $98b5a4a3c5ad9cae$export$de026b00723010c1)("success", `${type.charAt(0).toUpperCase() + type.slice(1)} updated successfully`);
    } catch (err) {
        (0, $98b5a4a3c5ad9cae$export$de026b00723010c1)("error", err.response.data.message);
    }
};



const $2466a8251d260de7$export$8d5bdbf26681c0c2 = async (tourId)=>{
    const stripe = Stripe("pk_test_51LhKX5EzAeShbKw4oK9pZbja6LornjXvGZTTgPej7mjK72yCwWoMGFh9bUV84QUw6CcwQSbjSVNdHLL5lA2Plmjj00hkEVPy45");
    try {
        // Get checkout session from API
        const session = await axios(`/api/v1/bookings/checkout-session/${tourId}`);
        // Create checkout form + charge credit card
        await stripe.redirectToCheckout({
            sessionId: session.data.session.id
        });
    } catch (err) {
        (0, $98b5a4a3c5ad9cae$export$de026b00723010c1)("error", err.response.data.message);
    }
};



// DOM ELEMENTS
const $b17ce35f8fcc8b73$var$mapBox = document.querySelector("#map");
const $b17ce35f8fcc8b73$var$loginForm = document.querySelector(".form--login");
const $b17ce35f8fcc8b73$var$logoutButton = document.querySelector(".nav__el--logout");
const $b17ce35f8fcc8b73$var$userDataForm = document.querySelector(".form-user-data");
const $b17ce35f8fcc8b73$var$userPasswordForm = document.querySelector(".form-user-password");
const $b17ce35f8fcc8b73$var$bookButton = document.querySelector("#book-tour");
// VALUES
// DELEGATION
if ($b17ce35f8fcc8b73$var$mapBox) {
    const locations = JSON.parse($b17ce35f8fcc8b73$var$mapBox.dataset.locations);
    (0, $1491b5ca3b179d81$export$4c5dd147b21b9176)(locations);
}
if ($b17ce35f8fcc8b73$var$loginForm) $b17ce35f8fcc8b73$var$loginForm.addEventListener("submit", (event)=>{
    event.preventDefault();
    const email = document.querySelector("#email").value;
    const password = document.querySelector("#password").value;
    (0, $52873e4aaa37751f$export$596d806903d1f59e)(email, password);
});
if ($b17ce35f8fcc8b73$var$logoutButton) $b17ce35f8fcc8b73$var$logoutButton.addEventListener("click", (0, $52873e4aaa37751f$export$a0973bcfe11b05c9));
if ($b17ce35f8fcc8b73$var$userDataForm) $b17ce35f8fcc8b73$var$userDataForm.addEventListener("submit", (event)=>{
    event.preventDefault();
    const form = new FormData();
    form.append("name", document.querySelector("#name").value);
    form.append("email", document.querySelector("#email").value);
    form.append("photo", document.querySelector("#photo").files[0]);
    (0, $90681208c17c3f06$export$f558026a994b6051)(form, "data");
});
if ($b17ce35f8fcc8b73$var$userPasswordForm) $b17ce35f8fcc8b73$var$userPasswordForm.addEventListener("submit", (event)=>{
    event.preventDefault();
    document.querySelector(".btn--save-password").textContent = "Updating...";
    const passwordCurrent = document.querySelector("#password-current").value;
    const password = document.querySelector("#password").value;
    const passwordConfirm = document.querySelector("#password-confirm").value;
    (0, $90681208c17c3f06$export$f558026a994b6051)({
        passwordCurrent: passwordCurrent,
        password: password,
        passwordConfirm: passwordConfirm
    }, "password");
    document.querySelector(".btn--save-password").textContent = "Save password";
    document.querySelector("#password-current").value = "";
    document.querySelector("#password").value = "";
    document.querySelector("#password-confirm").value = "";
});
if ($b17ce35f8fcc8b73$var$bookButton) $b17ce35f8fcc8b73$var$bookButton.addEventListener("click", (event)=>{
    event.target.textContent = "Processing...";
    const { tourId: tourId  } = event.target.dataset;
    (0, $2466a8251d260de7$export$8d5bdbf26681c0c2)(tourId);
});
const $b17ce35f8fcc8b73$var$alertMessage = document.querySelector("body").dataset.alert;
if ($b17ce35f8fcc8b73$var$alertMessage) (0, $98b5a4a3c5ad9cae$export$de026b00723010c1)("success", $b17ce35f8fcc8b73$var$alertMessage, 20);


//# sourceMappingURL=bundle.js.map
