const phoneInput = document.getElementById("phone");
const status = document.getElementById("status");

document.querySelectorAll(".digit").forEach(btn => {
  btn.addEventListener("click", () => {
    phoneInput.value += btn.textContent;
  });
});

document.getElementById("clearBtn").addEventListener("click", () => {
  phoneInput.value = "";
  status.textContent = "";
});

document.getElementById("callBtn").addEventListener("click", async () => {
  const phone = phoneInput.value.trim();
  if (!phone.startsWith("+")) {
    status.textContent = "❌ Number must start with + (country code).";
    return;
  }

  status.textContent = "Calling...";
  try {
    const res = await fetch("/call", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ to: phone })
    });
    const data = await res.json();
    if (data.success) {
      status.textContent = `✅ Call started! SID: ${data.sid}`;
    } else {
      status.textContent = `❌ ${data.error}`;
    }
  } catch (err) {
    status.textContent = "❌ " + err.message;
  }
});

// Allow typing directly
phoneInput.addEventListener("input", () => {
  // Keep only digits, +, *, #
  phoneInput.value = phoneInput.value.replace(/[^\d+*#]/g, "");
});
