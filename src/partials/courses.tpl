<section id="courses" class="section">
  <div class="container">
    <div class="section-head section-head--split">
      <h2 class="section-title">Các khóa học theo mục tiêu đầu ra</h2>
      <p class="section-desc">
        Lọc theo chứng chỉ hoặc tìm theo band điểm. Bạn có thể lưu các khóa đang cân nhắc để xem
        lại học phí và lịch học trước khi đăng ký.
      </p>
    </div>

    <div class="courses-toolbar">
      <div id="course-tabs" class="filter-tabs" role="tablist" aria-label="Phân loại khóa học"></div>

      <div class="search-box">
        <label for="course-search" class="sr-only">Tìm kiếm khóa học</label>
        <svg class="search-box__icon" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
        <input
          type="search"
          id="course-search"
          class="search-box__input"
          placeholder="Tìm tên khóa, band điểm, VSTEP..."
          autocomplete="off"
        >
        <button
          type="button"
          id="course-search-clear"
          class="search-box__clear"
          aria-label="Xóa từ khóa tìm kiếm"
          hidden
        >
          ×
        </button>
      </div>
    </div>

    <p id="course-results-status" class="results-status" aria-live="polite"></p>

    <div id="course-grid" class="course-grid"></div>
  </div>
</section>
