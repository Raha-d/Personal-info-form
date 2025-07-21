const avatarInput = document.getElementById("avatar");
const avatarPreview = document.getElementById("avatarPreview");
const avatarIcon = document.getElementById("avatarIcon");
const avatarText = document.getElementById("avatarText");
const avatarBox = document.getElementById("avatarBox");
const avatarMessage = document.getElementById("avatarMessage");

// وقتی روی کادر کلیک شد، ورودی فایل باز بشه
avatarBox.addEventListener("click", () => {
  avatarInput.click();
});

// وقتی تصویر انتخاب شد
avatarInput.addEventListener("change", function () {
  const file = this.files[0];

  if (!file) {
    avatarPreview.style.display = "none";
    avatarIcon.style.display = "block";
    avatarText.style.display = "block";
    avatarMessage.textContent = "";
    return;
  }

  if (!file.type.startsWith("image/")) {
    avatarMessage.textContent = "فقط فایل تصویری مجاز است ❌";
    avatarMessage.style.color = "red";
    avatarPreview.style.display = "none";
    avatarIcon.style.display = "block";
    avatarText.style.display = "block";
    return;
  }

  const reader = new FileReader();
  reader.onload = function (e) {
    avatarPreview.src = e.target.result;
    avatarPreview.style.display = "block";
    avatarIcon.style.display = "none";
    avatarText.style.display = "none";
    avatarMessage.textContent = "تصویر با موفقیت بارگذاری شد ✅";
    avatarMessage.style.color = "green";
  };
  reader.readAsDataURL(file);
});

//  چک کردن شماره وارد شده توسط کاربر

function validateMobile() {
  const input = document.getElementById("mobileInput").value;
  const message = document.getElementById("mobileMessage");

  const mobileRegex = /^09\d{9}$/;

  if (mobileRegex.test(input)) {
    message.textContent = "شماره معتبر است ✅";
    message.style.color = "green";
  } else {
    message.textContent =
      "شماره نامعتبر است لطفا با 09 شماره را آغاز نمایید ❌";
    message.style.color = "red";
  }
}

//   چک کردن شماره ملی
function validatePersonalInfo() {
  const firstName = document.getElementById("firstName").value.trim();
  const lastName = document.getElementById("lastName").value.trim();
  const nationalCode = document.getElementById("nationalCode").value.trim();
  const message = document.getElementById("personalMessage");

  if (!firstName || !lastName) {
    message.textContent = "لطفاً نام و نام خانوادگی را وارد کنید ❌";
    message.style.color = "red";
    return;
  }

  if (nationalCode && !isValidIranianNationalCode(nationalCode)) {
    message.textContent = "کد ملی وارد شده معتبر نیست ❌";
    message.style.color = "red";
    return;
  }

  message.textContent = "اطلاعات با موفقیت ثبت شد ✅";
  message.style.color = "green";
}

// تابع اعتبارسنجی کد ملی ایران
function isValidIranianNationalCode(code) {
  if (!/^\d{10}$/.test(code)) return false;
  const check = +code[9];
  const sum =
    code
      .split("")
      .slice(0, 9)
      .reduce((acc, digit, i) => acc + +digit * (10 - i), 0) % 11;
  return (sum < 2 && check === sum) || (sum >= 2 && check === 11 - sum);
}

//   اضافه کردن شهر ها
function loadCities() {
  const province = document.getElementById("province").value;
  const citySelect = document.getElementById("city");

  citySelect.innerHTML = ""; // پاک کردن گزینه‌های قبلی

  let cities = [];

  if (province === "تهران") {
    cities = ["تهران", "اسلامشهر", "شهریار", "ونک"];
  } else if (province === "اصفهان") {
    cities = ["اصفهان", "کاشان", "نجف‌آباد"];
  }

  cities.forEach((city) => {
    const option = document.createElement("option");
    option.value = city;
    option.textContent = city;
    citySelect.appendChild(option);
  });
}

function validateUserInfo() {
  const gender = document.querySelector('input[name="gender"]:checked');
  const birthdate = document.getElementById("birthdate").value.trim();
  const province = document.getElementById("province").value.trim();
  const city = document.getElementById("city").value.trim();
  const postalCode = document.getElementById("postalCode").value.trim();
  const email = document.getElementById("email").value.trim();
  const address = document.getElementById("address").value.trim();
  const message = document.getElementById("userMessage");

  if (
    !gender ||
    !birthdate ||
    !province ||
    !city ||
    !postalCode ||
    !email ||
    !address
  ) {
    message.textContent = "لطفاً همه فیلدها را پر کنید ❌";
    message.style.color = "red";
    return;
  }

  // بررسی کد پستی
  if (!/^\d{10}$/.test(postalCode)) {
    message.textContent = "کد پستی باید ۱۰ رقم عددی باشد ❌";
    message.style.color = "red";
    return;
  }

  // بررسی ایمیل
  if (!/^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/.test(email)) {
    message.textContent = "ایمیل وارد شده معتبر نیست ❌";
    message.style.color = "red";
    return;
  }

  message.textContent = "اطلاعات کاربری ثبت شد ✅";
  message.style.color = "green";
}
