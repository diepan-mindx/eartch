// signup.js
// document.addEventListener('DOMContentLoaded', function() {
//     const themeToggleBtn = document.getElementById('theme-toggle');
//     const body = document.body;

//     // 1. Kiểm tra trạng thái lưu trữ trong localStorage khi tải trang
//     const savedTheme = localStorage.getItem('theme');
//     if (savedTheme === 'dark') {
//         body.classList.add('dark-mode');
//     } else {
//         // Mặc định là light mode hoặc nếu không có gì trong localStorage
//         body.classList.remove('dark-mode');
//     }

//     // 2. Xử lý sự kiện click nút chuyển đổi
//     themeToggleBtn.addEventListener('click', function() {
//         body.classList.toggle('dark-mode'); // Thêm hoặc gỡ bỏ class 'dark-mode'

//         // Lưu trạng thái hiện tại vào localStorage
//         if (body.classList.contains('dark-mode')) {
//             localStorage.setItem('theme', 'dark');
//         } else {
//             localStorage.setItem('theme', 'light');
//         }
//     });
// });
document.addEventListener("DOMContentLoaded", () => {
  const signupForm = document.getElementById("signupForm");
  const newUsernameInput = document.getElementById("newUsername");
  const newPasswordInput = document.getElementById("newPassword");
  const confirmPasswordInput = document.getElementById("confirmPassword");

  // Key để lưu danh sách người dùng đã đăng ký
  const registeredUsersKey = "registeredUsers";

  signupForm.addEventListener("submit", (e) => {
    e.preventDefault(); // Ngăn chặn form gửi đi mặc định

    const newUsername = newUsernameInput.value.trim();
    const newPassword = newPasswordInput.value.trim();
    const confirmPassword = confirmPasswordInput.value.trim();

    if (newUsername === "" || newPassword === "" || confirmPassword === "") {
      alert("Vui lòng điền đầy đủ thông tin.");
      return;
    }

    if (newPassword !== confirmPassword) {
      alert("Mật khẩu và xác nhận mật khẩu không khớp.");
      return;
    }

    // Kiểm tra độ dài mật khẩu (ví dụ đơn giản)
    if (newPassword.length < 6) {
      alert("Mật khẩu phải có ít nhất 6 ký tự.");
      return;
    }

    // Lấy danh sách người dùng đã đăng ký hiện có từ localStorage
    let registeredUsers =
      JSON.parse(localStorage.getItem(registeredUsersKey)) || [];

    // Kiểm tra xem tên đăng nhập đã tồn tại chưa
    if (registeredUsers.some((user) => user.username === newUsername)) {
      alert("Tên đăng nhập đã tồn tại. Vui lòng chọn tên khác.");
      return;
    }

    // Thêm người dùng mới vào danh sách
    registeredUsers.push({ username: newUsername, password: newPassword }); // Lưu username và password (KHÔNG AN TOÀN TRONG THỰC TẾ)
    localStorage.setItem(registeredUsersKey, JSON.stringify(registeredUsers));

    alert("Đăng ký thành công! Bây giờ bạn có thể đăng nhập.");
    window.location.href = "signin.html"; // Chuyển hướng về trang đăng nhập
  });
});
