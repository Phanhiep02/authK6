2. token-Based Authentication

- User Request Login ==> Server kiểm tra thông tin ==> lưu thong tin đăng nhập vào Token ==> trả token vê phía Client (Trạng thái ở dạng Response Body)
- User Request Authorization ==> token sẽ được đính kèm vào request Header ==> Server nhận được Token từ Header ==> Server kiểm tra token hợp lệ hay không ?

* không hợp lệ : Đăng xuất
* Hợp lệ : Giai mã token (decode) để lấy thông tin

Giải pháp Token

- tạo token bằng 1 chuỗi ngẫu nhiên ==> lưu token vào server kèm thông tin cần lưu trữ
- Lưu toàn bộ thông tin vào token thông qua các thuật toán mã hóa(không lưu ở server) ==> chọn kỹ thuật mã hóa bảo mật cao , nếu không dễ bị hack ==> JWT

- giải pháp bảo mật
- hạ thời gian giống của token => phiền
- tạo token mới khi hết hạn ==> sinh ra 2 loại token

* access Token
* refresh token
