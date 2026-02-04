document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("contact-modal");
  const closeBtn = document.querySelector(".close-btn");
  const sendBtn = document.getElementById("send-suggestion");
  const suggestionBox = document.getElementById("suggestion");

  const toastEl = document.getElementById("feedbackToast");
  const toast = new bootstrap.Toast(toastEl, { delay: 3000 });

  // Close modal
  closeBtn.addEventListener("click", () => {
    window.location.href = "index.html";
  });

  // Click outside to close
  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      window.location.href = "index.html";
    }
  });

  // Send feedback
  sendBtn.addEventListener("click", () => {
    const text = suggestionBox.value.trim();

    if (text === "") {
      suggestionBox.classList.add("is-invalid");
      return;
    }

    suggestionBox.classList.remove("is-invalid");

    // Show toast popup
    toast.show();

    // Reset textarea
    suggestionBox.value = "";

    // Redirect after toast
    setTimeout(() => {
      window.location.href = "index.html";
    }, 3200);
  });
});
