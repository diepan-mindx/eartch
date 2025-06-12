
document.addEventListener('DOMContentLoaded', () => {
    const signinForm = document.getElementById('signinForm');
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');

    // Mảng lưu trữ thông tin người dùng đã đăng ký (trong môi trường thực tế sẽ là database)
    // Tạm thời, chúng ta sẽ lưu nó trong localStorage cho đơn giản
    // Để cho ví dụ này hoạt động, hãy đảm bảo username và password khớp với những gì được lưu trong signup.js
    const registeredUsersKey = 'registeredUsers';

    signinForm.addEventListener('submit', (e) => {
        e.preventDefault(); // Ngăn chặn form gửi đi mặc định

        const username = usernameInput.value.trim();
        const password = passwordInput.value.trim();

        if (username === '' || password === '') {
            alert('Vui lòng điền đầy đủ tên đăng nhập và mật khẩu.');
            return;
        }

        // Lấy danh sách người dùng đã đăng ký từ localStorage
        const registeredUsers = JSON.parse(localStorage.getItem(registeredUsersKey)) || [];

        // Tìm người dùng trong danh sách
        const foundUser = registeredUsers.find(user => user.username === username && user.password === password);

        if (foundUser) {
            // Đăng nhập thành công
            localStorage.setItem('currentUser', username); // Lưu tên người dùng vào localStorage
            alert('Đăng nhập thành công!');
            window.location.href = 'home.html'; // Chuyển hướng về trang chủ
        } else {
            // Đăng nhập thất bại
            alert('Tên đăng nhập hoặc mật khẩu không đúng.');
        }
    });
});