import { COURSES } from '../../data/mockData.js';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE_REGEX = /^(0|\+84)[35789]\d{8}$/;

export function initContactForm({ showToast }) {
  const form = document.getElementById('consult-form');
  const nameInput = document.getElementById('consult-name');
  const emailInput = document.getElementById('consult-email');
  const phoneInput = document.getElementById('consult-phone');
  const courseSelect = document.getElementById('consult-course');
  const noteInput = document.getElementById('consult-note');
  const submitBtn = document.getElementById('consult-submit');
  const submitText = document.getElementById('consult-submit-text');

  if (!form) return { selectCourse: () => {} };

  if (courseSelect) {
    const fragment = document.createDocumentFragment();
    const defaultOpt = document.createElement('option');
    defaultOpt.value = '';
    defaultOpt.textContent = '-- Chọn khóa học bạn quan tâm --';
    fragment.appendChild(defaultOpt);

    COURSES.forEach((course) => {
      const opt = document.createElement('option');
      opt.value = course.id;
      opt.textContent = `${course.title} (${course.target})`;
      fragment.appendChild(opt);
    });
    courseSelect.replaceChildren(fragment);
  }

  const formState = {
    name: '',
    email: '',
    phone: '',
    courseId: '',
    note: '',
  };

  let isSubmitting = false;

  const setFieldError = (inputEl, errorId, message) => {
    const errorEl = document.getElementById(errorId);
    if (!inputEl || !errorEl) return;

    if (message) {
      inputEl.classList.add('is-invalid');
      inputEl.setAttribute('aria-invalid', 'true');
      errorEl.textContent = message;
      errorEl.hidden = false;
    } else {
      inputEl.classList.remove('is-invalid');
      inputEl.removeAttribute('aria-invalid');
      errorEl.textContent = '';
      errorEl.hidden = true;
    }
  };

  const validateField = (field) => {
    if (field === 'name') {
      const val = formState.name.trim();
      if (!val) {
        setFieldError(nameInput, 'error-name', 'Vui lòng nhập họ và tên của bạn.');
        return false;
      }
      if (val.length < 2) {
        setFieldError(nameInput, 'error-name', 'Họ và tên cần có ít nhất 2 ký tự.');
        return false;
      }
      setFieldError(nameInput, 'error-name', '');
      return true;
    }

    if (field === 'email') {
      const val = formState.email.trim();
      if (!val) {
        setFieldError(emailInput, 'error-email', 'Vui lòng nhập địa chỉ email.');
        return false;
      }
      if (!EMAIL_REGEX.test(val)) {
        setFieldError(emailInput, 'error-email', 'Email chưa đúng định dạng (ví dụ: ten@domain.com).');
        return false;
      }
      setFieldError(emailInput, 'error-email', '');
      return true;
    }

    if (field === 'phone') {
      const val = formState.phone.replace(/\s+/g, '');
      if (!val) {
        setFieldError(phoneInput, 'error-phone', 'Vui lòng nhập số điện thoại liên hệ.');
        return false;
      }
      if (!PHONE_REGEX.test(val)) {
        setFieldError(phoneInput, 'error-phone', 'Số điện thoại không hợp lệ (gồm 10 số, bắt đầu bằng 0 hoặc +84).');
        return false;
      }
      setFieldError(phoneInput, 'error-phone', '');
      return true;
    }

    return true;
  };

  const validateAll = () => {
    const okName = validateField('name');
    const okEmail = validateField('email');
    const okPhone = validateField('phone');
    return okName && okEmail && okPhone;
  };

  const resetFormState = () => {
    formState.name = '';
    formState.email = '';
    formState.phone = '';
    formState.courseId = '';
    formState.note = '';
    form.reset();
    setFieldError(nameInput, 'error-name', '');
    setFieldError(emailInput, 'error-email', '');
    setFieldError(phoneInput, 'error-phone', '');
  };

  const setLoadingState = (loading) => {
    isSubmitting = loading;
    if (!submitBtn) return;
    submitBtn.disabled = loading;
    submitBtn.classList.toggle('is-loading', loading);
    if (submitText) {
      submitText.textContent = loading ? 'Đang gửi yêu cầu...' : 'Gửi đăng ký kiểm tra';
    }
  };

  nameInput?.addEventListener('input', (e) => {
    formState.name = e.target.value;
    if (nameInput.classList.contains('is-invalid')) validateField('name');
  });
  nameInput?.addEventListener('blur', () => validateField('name'));

  emailInput?.addEventListener('input', (e) => {
    formState.email = e.target.value;
    if (emailInput.classList.contains('is-invalid')) validateField('email');
  });
  emailInput?.addEventListener('blur', () => validateField('email'));

  phoneInput?.addEventListener('input', (e) => {
    formState.phone = e.target.value;
    if (phoneInput.classList.contains('is-invalid')) validateField('phone');
  });
  phoneInput?.addEventListener('blur', () => validateField('phone'));

  courseSelect?.addEventListener('change', (e) => {
    formState.courseId = e.target.value;
  });

  noteInput?.addEventListener('input', (e) => {
    formState.note = e.target.value;
  });

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    if (isSubmitting) return;

    if (!validateAll()) {
      const firstInvalid = form.querySelector('.is-invalid');
      if (firstInvalid instanceof HTMLElement) {
        firstInvalid.focus();
      }
      return;
    }

    setLoadingState(true);

    window.setTimeout(() => {
      const submittedName = formState.name.trim();
      setLoadingState(false);
      resetFormState();
      showToast(
        `Đã nhận đăng ký của ${submittedName}! Chuyên viên học thuật sẽ liên hệ trong vòng 30 phút.`
      );
    }, 1500);
  });

  return {
    selectCourse(courseId) {
      if (courseSelect) {
        courseSelect.value = courseId;
        formState.courseId = courseId;
      }
      const contactSection = document.getElementById('contact');
      contactSection?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      window.setTimeout(() => {
        nameInput?.focus({ preventScroll: true });
      }, 350);
    },
  };
}
