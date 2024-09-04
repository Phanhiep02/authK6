import { config } from "../js/config.js";
const { SERVER_AUTH_API } = config;

const root = document.querySelector("#root");
const loginHtml = `
    <div class="w-50 mx-auto py-3">
    <div class="alert-error"></div>
    <h2 class = "text-center">Đăng nhập</h2>
      <form action="" class = "login">
        <div class="mb-3">
          <label for="">Email</label>
          <input
            type="email"
            class="form-control"
            name="email"
            placeholder="Email..."
            required
          />
        </div>
        <div class="mb-3">
          <label for="">Mật khẩu</label>
          <input
            type="password"
            class="form-control"
            name="password"
            placeholder="password..."
            required
          />
        </div>
        <div class="d-grid">
          <button class="btn btn-primary btn-login" >Đăng nhập</button>
        </div>
      </form>
    </div>
`;
const profileHtml = `
    <div class="w-75 mx-auto py-3">
      <h2>Chào mừng bạn quay trở lại</h2>
      <ul class="list-unstyled d-flex gap-3 profile">
        <li>Chào bạn : Hoàng an</li>
        <li><a href="#">Tài khoản</a></li>
        <li><a href="#">Đăng xuất</a></li>
      </ul>
    </div>
`;
let isLogin = false;

const render = () => {
  // check kiểm tra nếu có tokens thì sẽ hiển thị
  isLogin = localStorage.getItem("login_token") ? true : false;

  root.innerHTML = isLogin ? profileHtml : loginHtml;
};
render();

root.addEventListener("submit", (e) => {
  e.preventDefault();
  if (e.target.classList.contains("login")) {
    handleLogin(e.target);
  }
});
const alertEl = document.querySelector(".alert-error");
const handleLogin = async (form) => {
  const btn = document.querySelector(".btn-login");
  btn.disabled = true;
  btn.innerHTML = `
      <span class="spinner-border spinner-border-sm" aria-hidden="true"></span> Loading...
    `;
  const data = Object.fromEntries(new FormData(form));
  const response = await fetch(`${SERVER_AUTH_API}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  btn.disabled = false;
  btn.innerText = `Đăng nhập`;
  if (!response.ok) {
    alertEl.innerHTML = `
    <div class="alert alert-danger" role="alert">
  Sai tên tài khoản hoặc mật khẩu
</div>
    `;

    return;
  }
  const tokens = await response.json();
  //   console.log(tokens);
  // lưu tokens vào bộ nhớ trình duyệt : LocalStorage , cookie,...
  localStorage.setItem("login_token", JSON.stringify(tokens));
  // gọi lại render để update giao diện
  render();
};
