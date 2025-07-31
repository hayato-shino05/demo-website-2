document.addEventListener("DOMContentLoaded", () => {
  const steps = document.querySelectorAll(".checkout-step");
  const progressSteps = document.querySelectorAll(".step");
  const nextBtns = document.querySelectorAll(".btn-next");
  const backBtns = document.querySelectorAll(".btn-back");
  const popup = document.getElementById("popup");
  const closePopup = document.getElementById("closePopup");

  let currentStep = 0;

  function updateProgress() {
    progressSteps.forEach((p, i) => {
      p.classList.remove("active", "done");
      if (i < currentStep) p.classList.add("done");
      else if (i === currentStep) p.classList.add("active");
    });
  }

  function showStep(step) {
    steps.forEach((s, i) => s.classList.toggle("active", i === step));
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

  nextBtns.forEach(btn =>
    btn.addEventListener("click", () => {
      if (validateStep(currentStep)) {
        if (currentStep < steps.length - 1) {
          currentStep++;
          showStep(currentStep);
        }
      }
    })
  );

  backBtns.forEach(btn =>
    btn.addEventListener("click", () => {
      if (currentStep > 0) {
        currentStep--;
        showStep(currentStep);
      }
    })
  );

  // Hiện form ví hoặc thẻ theo lựa chọn
  const radios = document.querySelectorAll('input[name="pay"]');
  const walletFields = document.getElementById("walletFields");
  const cardFields = document.getElementById("cardFields");

  radios.forEach(radio =>
    radio.addEventListener("change", () => {
      walletFields.classList.add("hidden");
      cardFields.classList.add("hidden");
      if (radio.value === "wallet") walletFields.classList.remove("hidden");
      if (radio.value === "card") cardFields.classList.remove("hidden");
    })
  );

  // Xử lý submit khi hoàn tất bước 3
  document.getElementById("checkoutForm").addEventListener("submit", e => {
    e.preventDefault();
    if (validateStep(currentStep)) {
      popup.classList.remove("hidden");
    }
  });

  closePopup.addEventListener("click", () => popup.classList.add("hidden"));

  showStep(currentStep);
});
