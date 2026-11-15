<div id="mobile-drawer-backdrop" class="backdrop" hidden></div>
<aside
  id="mobile-drawer"
  class="drawer"
  role="dialog"
  aria-modal="true"
  aria-label="Menu điều hướng di động"
  hidden
>
  <div class="drawer__header">
    <span class="drawer__title">Điều hướng</span>
    <button type="button" id="mobile-drawer-close" class="icon-btn" aria-label="Đóng menu">
      <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" aria-hidden="true">
        <line x1="18" y1="6" x2="6" y2="18" />
        <line x1="6" y1="6" x2="18" y2="18" />
      </svg>
    </button>
  </div>
  <nav class="drawer__nav" aria-label="Liên kết di động">
    <a href="#courses" class="drawer__link">Khóa học IELTS &amp; VSTEP</a>
    <a href="#methodology" class="drawer__link">Phương pháp 4 bước</a>
    <a href="#testimonials" class="drawer__link">Kết quả học viên</a>
    <a href="#faq" class="drawer__link">Câu hỏi thường gặp</a>
    <a href="#contact" class="drawer__link">Đăng ký tư vấn</a>
  </nav>
  <div class="drawer__footer">
    <button type="button" class="btn btn--outline drawer__theme-btn" data-theme-toggle aria-pressed="false">
      <span data-theme-label>Chế độ tối</span>
    </button>
    <a href="#contact" class="btn btn--primary drawer__cta">Đặt lịch kiểm tra 1:1</a>
  </div>
</aside>

<div id="wishlist-backdrop" class="backdrop" hidden></div>
<aside
  id="wishlist-drawer"
  class="drawer"
  role="dialog"
  aria-modal="true"
  aria-labelledby="wishlist-drawer-title"
  hidden
>
  <div class="drawer__header">
    <h2 id="wishlist-drawer-title" class="drawer__title">Khóa học đã lưu</h2>
    <button type="button" id="wishlist-close-btn" class="icon-btn" aria-label="Đóng danh sách đã lưu">
      <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" aria-hidden="true">
        <line x1="18" y1="6" x2="6" y2="18" />
        <line x1="6" y1="6" x2="18" y2="18" />
      </svg>
    </button>
  </div>
  <div id="wishlist-items" class="wishlist-list"></div>
  <div class="drawer__footer">
    <button type="button" id="wishlist-clear-btn" class="btn btn--outline" hidden>
      Xóa tất cả
    </button>
    <a href="#contact" class="btn btn--primary" id="wishlist-consult-link">
      Nhận tư vấn lộ trình
    </a>
  </div>
</aside>

<div id="course-modal-backdrop" class="backdrop" hidden></div>
<div
  id="course-modal"
  class="modal"
  role="dialog"
  aria-modal="true"
  aria-labelledby="modal-course-title"
  hidden
>
  <div class="modal__header">
    <div>
      <span id="modal-course-badge" class="course-badge"></span>
      <h2 id="modal-course-title" class="modal__title"></h2>
    </div>
    <button type="button" id="course-modal-close" class="icon-btn" aria-label="Đóng chi tiết khóa học">
      <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" aria-hidden="true">
        <line x1="18" y1="6" x2="6" y2="18" />
        <line x1="6" y1="6" x2="18" y2="18" />
      </svg>
    </button>
  </div>

  <div class="modal__body">
    <p id="modal-course-summary" class="modal__summary"></p>

    <dl class="modal__specs">
      <div class="spec-item">
        <dt>Mục tiêu đầu ra</dt>
        <dd id="modal-course-target"></dd>
      </div>
      <div class="spec-item">
        <dt>Thời lượng</dt>
        <dd id="modal-course-duration"></dd>
      </div>
      <div class="spec-item">
        <dt>Lịch học dự kiến</dt>
        <dd id="modal-course-schedule"></dd>
      </div>
      <div class="spec-item">
        <dt>Hình thức</dt>
        <dd id="modal-course-format"></dd>
      </div>
      <div class="spec-item">
        <dt>Giảng viên</dt>
        <dd id="modal-course-instructor"></dd>
      </div>
      <div class="spec-item">
        <dt>Học phí trọn khóa</dt>
        <dd id="modal-course-price" class="spec-item__price"></dd>
      </div>
    </dl>

    <div class="modal__highlights-wrap">
      <h3 class="modal__subtitle">Khóa học phù hợp với ai</h3>
      <p id="modal-course-suitable" class="modal__summary"></p>
    </div>

    <div class="modal__highlights-wrap">
      <h3 class="modal__subtitle">Nội dung học theo chặng</h3>
      <ul id="modal-course-curriculum" class="modal__highlights"></ul>
    </div>

    <div class="modal__highlights-wrap">
      <h3 class="modal__subtitle">Quyền lợi trong khóa học</h3>
      <ul id="modal-course-highlights" class="modal__highlights"></ul>
    </div>
  </div>

  <div class="modal__footer">
    <button type="button" id="modal-course-wishlist" class="btn btn--outline" aria-pressed="false">
      Lưu vào quan tâm
    </button>
    <button type="button" id="modal-course-consult" class="btn btn--primary">
      Đăng ký khóa này
    </button>
  </div>
</div>

<div id="toast" class="toast" role="status" aria-live="polite" hidden>
  <svg class="toast__icon" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
    <polyline points="22 4 12 14.01 9 11.01" />
  </svg>
  <p id="toast-message" class="toast__message"></p>
  <button type="button" id="toast-close" class="toast__close" aria-label="Đóng thông báo">×</button>
</div>
