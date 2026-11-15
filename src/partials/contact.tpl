<section id="contact" class="section">
  <div class="container contact-layout">
    <div class="contact-info">
      <h2 class="section-title">Đặt lịch kiểm tra đầu vào</h2>
      <p class="section-desc">
        Để lại thông tin bên dưới. Tư vấn viên học thuật sẽ liên hệ xếp lịch kiểm tra 4 kỹ năng
        (30 phút) và gửi bạn lịch khai giảng phù hợp.
      </p>

      <dl class="contact-details">
        <div class="contact-details__item">
          <dt>Đơn vị tài trợ &amp; chủ quản</dt>
          <dd>Google Developer Groups on Campus - DUT</dd>
        </div>
        <div class="contact-details__item">
          <dt>Địa điểm học trực tiếp</dt>
          <dd>54 Nguyễn Lương Bằng, P. Hòa Khánh Bắc, Q. Liên Chiểu, TP. Đà Nẵng (ĐH Bách Khoa - ĐH Đà Nẵng)</dd>
        </div>
        <div class="contact-details__item">
          <dt>Điện thoại văn phòng</dt>
          <dd>1900 6868 (08:00 – 21:00 hằng ngày)</dd>
        </div>
        <div class="contact-details__item">
          <dt>Email</dt>
          <dd>tuvan@gdglexi.edu.vn</dd>
        </div>
      </dl>
    </div>

    <form id="consult-form" class="consult-form" novalidate>
      <div class="form-group">
        <label for="consult-name" class="form-label">
          Họ và tên <span class="required-mark" aria-hidden="true">*</span>
        </label>
        <input
          type="text"
          id="consult-name"
          name="name"
          class="form-input"
          placeholder="Ví dụ: Nguyễn Minh Tuấn"
          autocomplete="name"
          required
        >
        <p id="error-name" class="form-error" role="alert" hidden></p>
      </div>

      <div class="form-row">
        <div class="form-group">
          <label for="consult-email" class="form-label">
            Email <span class="required-mark" aria-hidden="true">*</span>
          </label>
          <input
            type="email"
            id="consult-email"
            name="email"
            class="form-input"
            placeholder="ten@example.com"
            autocomplete="email"
            required
          >
          <p id="error-email" class="form-error" role="alert" hidden></p>
        </div>

        <div class="form-group">
          <label for="consult-phone" class="form-label">
            Số điện thoại <span class="required-mark" aria-hidden="true">*</span>
          </label>
          <input
            type="tel"
            id="consult-phone"
            name="phone"
            class="form-input"
            placeholder="0912345678"
            autocomplete="tel"
            required
          >
          <p id="error-phone" class="form-error" role="alert" hidden></p>
        </div>
      </div>

      <div class="form-group">
        <label for="consult-course" class="form-label">Khóa học quan tâm</label>
        <select id="consult-course" name="courseId" class="form-input"></select>
      </div>

      <div class="form-group">
        <label for="consult-note" class="form-label">Mục tiêu điểm số &amp; Thời gian dự kiến thi</label>
        <textarea
          id="consult-note"
          name="note"
          rows="3"
          class="form-input form-textarea"
          placeholder="Ví dụ: Cần VSTEP B2 trước tháng 12 để xét tốt nghiệp..."
        ></textarea>
      </div>

      <button type="submit" id="consult-submit" class="btn btn--primary btn--lg btn--full">
        <span class="btn-spinner" aria-hidden="true"></span>
        <span id="consult-submit-text">Gửi đăng ký kiểm tra</span>
      </button>
    </form>
  </div>
</section>
