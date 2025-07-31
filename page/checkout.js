document.addEventListener("DOMContentLoaded", () => {
  const steps = document.querySelectorAll(".checkout-step");
  const progressSteps = document.querySelectorAll(".step");
  const nextBtns = document.querySelectorAll(".btn-next");
  const backBtns = document.querySelectorAll(".btn-back");
  const popup = document.getElementById("popup");
  const closePopup = document.getElementById("closePopup");

  // Selects for location
  const provinceSelect = document.getElementById("province");
  const districtSelect = document.getElementById("district");
  const wardSelect = document.getElementById("ward");

  // Data structure for locations
  const locations = {
    "Hà Nội": {
      "Ba Đình": ["Phúc Xá", "Trúc Bạch", "Vĩnh Phúc", "Cống Vị", "Liễu Giai", "Nguyễn Trung Trực", "Quán Thánh", "Thành Công"],
      "Hoàn Kiếm": ["Chương Dương", "Cửa Đông", "Cửa Nam", "Đồng Xuân", "Hàng Bạc", "Hàng Bài", "Hàng Bồ", "Hàng Buồm"],
      "Tây Hồ": ["Bưởi", "Thụy Khuê", "Yên Phụ", "Tứ Liên", "Quảng An", "Nhật Tân", "Xuân La"],
      "Long Biên": ["Bồ Đề", "Sài Đồng", "Long Biên", "Thạch Bàn", "Phúc Đồng", "Việt Hưng", "Gia Thụy"],
    },
    "TP.HCM": {
      "Quận 1": ["Bến Nghé", "Bến Thành", "Cầu Kho", "Cầu Ông Lãnh", "Cô Giang", "Đa Kao", "Nguyễn Cư Trinh"],
      "Quận 3": ["Võ Thị Sáu", "Phường 1", "Phường 2", "Phường 3", "Phường 4", "Phường 5"],
      "Bình Thạnh": ["Phường 1", "Phường 2", "Phường 3", "Phường 5", "Phường 6", "Phường 7"],
      "Thủ Đức": ["Linh Xuân", "Bình Chiểu", "Linh Trung", "Tam Bình", "Tam Phú", "Hiệp Bình Phước"],
    },
  };

  // Event handler for province selection
  provinceSelect.addEventListener("change", () => {
    const selectedProvince = provinceSelect.value;
    districtSelect.innerHTML = '<option value="">Quận/Huyện</option>';
    wardSelect.innerHTML = '<option value="">Phường/Xã</option>';

    if (selectedProvince && locations[selectedProvince]) {
      Object.keys(locations[selectedProvince]).forEach((district) => {
        const option = new Option(district, district);
        districtSelect.add(option);
      });
    }
  });

  // Event handler for district selection
  districtSelect.addEventListener("change", () => {
    const selectedProvince = provinceSelect.value;
    const selectedDistrict = districtSelect.value;
    wardSelect.innerHTML = '<option value="">Phường/Xã</option>';

    if (selectedProvince && selectedDistrict && locations[selectedProvince][selectedDistrict]) {
      locations[selectedProvince][selectedDistrict].forEach((ward) => {
        const option = new Option(ward, ward);
        wardSelect.add(option);
      });
    }
  });

  let currentStep = 0;

  function updateProgress() {
    progressSteps.forEach((p, i) => {
      p.classList.remove("active", "done");
      if (i < currentStep) p.classList.add("done");
      else if (i === currentStep) p.classList.add("active");
    });
  }

  function showStep(step) {
    steps.forEach((s, i) => {
      if (i === step) {
        s.classList.add("active");
        s.classList.add("fade-in");
        setTimeout(() => s.classList.remove("fade-in"), 400);
      } else {
        s.classList.remove("active");
      }
    });
    updateProgress();
  }

  function validateStep(stepIndex) {
    const activeStep = steps[stepIndex];
    const inputs = activeStep.querySelectorAll("input[required], select[required]");
    for (let input of inputs) {
      if (!input.value.trim()) {
        input.focus();
        return false;
      }
    }
    return true;
  }

  nextBtns.forEach((btn) =>
    btn.addEventListener("click", () => {
      if (validateStep(currentStep)) {
        if (currentStep < steps.length - 1) {
          currentStep++;
          showStep(currentStep);
        }
      }
    })
  );

  backBtns.forEach((btn) =>
    btn.addEventListener("click", () => {
      if (currentStep > 0) {
        currentStep--;
        showStep(currentStep);
      }
    })
  );

  // ==== Hiển thị form theo phương thức thanh toán ====
  const radios = document.querySelectorAll('input[name="pay"]');
  const walletFields = document.getElementById("walletFields");
  const cardFields = document.getElementById("cardFields");

  // Ẩn cả 2 form lúc load
  walletFields.classList.add("hidden");
  cardFields.classList.add("hidden");

  radios.forEach((radio) =>
    radio.addEventListener("change", () => {
      walletFields.classList.add("hidden");
      cardFields.classList.add("hidden");

      if (radio.checked && radio.value === "wallet") {
        walletFields.classList.remove("hidden");
      }
      if (radio.checked && radio.value === "card") {
        cardFields.classList.remove("hidden");
      }
    })
  );

  // Xử lý submit khi hoàn tất bước 3
  document.getElementById("checkoutForm").addEventListener("submit", (e) => {
    e.preventDefault();
    if (validateStep(currentStep)) {
      popup.classList.remove("hidden");
    }
  });

  closePopup.addEventListener("click", () => popup.classList.add("hidden"));

  showStep(currentStep);
});
