const currentUsername = localStorage.getItem("currentUser") || "";
const registeredUsers =
  JSON.parse(localStorage.getItem("registeredUsers")) || [];
let currentUserInfo = {};
if (currentUsername) {
  // lay du lieu user dang nhap
  currentUserInfo = registeredUsers.find(
    (user) => user.username == currentUsername
  );
}

const logoutBtn = document.getElementById("logout-btn");
const loginBtn = document.getElementById("login-btn");
const signupBtn = document.getElementById("signup-btn");

// -------------------------------------------------------
// thay doi thanh nav (an hien cac nut bam)
if (location.href.includes("home.html")) {
  if (currentUsername) {
    loginBtn.style.display = "none";
    signupBtn.style.display = "none";
    logoutBtn.style.display = "block";
  } else {
    loginBtn.style.display = "block";
    signupBtn.style.display = "block";
    logoutBtn.style.display = "none";
  }
}
// -------------------------------------------------------
// bat su kien dang xuat
logoutBtn?.addEventListener("click", function () {
  localStorage.removeItem("currentUser");
  window.location.reload();
});

// -------------------------------------------------------
// chan tinh nang quoc gia yeu thich neu chua dang nhap
document.getElementById("goto-fav-btn")?.addEventListener("click", function () {
  if (!currentUsername) {
    alert("Vui lòng đăng nhập trước khi sử dụng tính năng yêu thích quốc gia");
    return;
  } else {
    this.href = "./favorites.html";
  }
});

// -------------------------------------------------------
// hien thi danh sach yeu thich
if (location.href.includes("favorites.html")) {
  const listContainer = document.getElementById("favoritesList");
  const favList = currentUserInfo.favList || [];

  if (favList.length === 0) {
    listContainer.innerHTML =
      "<p>Bạn chưa có quốc gia nào trong danh sách yêu thích.</p>";
  } else {
    favList.forEach((item) => {
      const div = document.createElement("div");
      div.className = "card";
      div.innerHTML = `
          <img src="${item.flag}" alt="Flag of ${item.name}" style="width:80px; margin-bottom:10px;" />
          <h3>${item.name}</h3>
          <button class="btn view" onclick="viewCountry('${item.name}')">🔍 Xem chi tiết</button>
          <button class="btn delete" onclick="removeFavorite('${item.name}')">🗑️ Xóa</button>
        `;
      listContainer.appendChild(div);
    });
  }

  function viewCountry(name) {
    window.location.href = `./index.html?country=${encodeURIComponent(name)}`;
  }

  function removeFavorite(name) {
    const confirmDel = confirm(
      `Bạn có chắc muốn xóa ${name} khỏi danh sách yêu thích?`
    );
    if (!confirmDel) return;

    const updated = favList.filter((item) => item.name !== name);
    // cap nhat vao thong tin user
    registeredUsers.map((user) => {
      if (user.username == currentUsername) {
        // duyet qua danh sach user de lay ra user hien tai
        user.favList = updated;
      }
      return user;
    });
    console.log(registeredUsers);

    // cap nhat local storage
    localStorage.setItem("registeredUsers", JSON.stringify(registeredUsers));
    // reload trang
    location.reload();
  }
}
