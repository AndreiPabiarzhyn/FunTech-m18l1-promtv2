// script.js
const t1 = document.getElementById("t1");
const t2 = document.getElementById("t2");
const t3 = document.getElementById("t3");
const t4 = document.getElementById("t4");
const t5 = document.getElementById("t5");
const t6 = document.getElementById("t6");

const copyBtn = document.getElementById("copyBtn");
const copyLabel = document.getElementById("copyLabel");

copyBtn.addEventListener("click", copyText);

function getStoryText() {
  return `ВАЖНО: итоговая сказка должна быть не более 1100–1200 символов.

Придумай сказку на тему ${t1.value}.
Главный герой — ${t2.value}, он ${t3.value}.
Его друг — ${t4.value}.
Однажды с ними произошло ${t5.value}.
В конце истории всё закончилось так: ${t6.value}.`;
}

function copyText() {
  const text = getStoryText();

  // Современный Clipboard API (работает на HTTPS / localhost)
  if (navigator.clipboard && window.isSecureContext) {
    navigator.clipboard.writeText(text)
      .then(showSuccess)
      .catch(() => fallbackCopy(text));
  } else {
    fallbackCopy(text);
  }
}

function fallbackCopy(text) {
  const textarea = document.createElement("textarea");
  textarea.value = text;

  textarea.style.position = "fixed";
  textarea.style.opacity = "0";

  document.body.appendChild(textarea);
  textarea.focus();
  textarea.select();

  try {
    document.execCommand("copy");
    showSuccess();
  } catch (err) {
    alert("Копирование не поддерживается в этой среде");
  }

  document.body.removeChild(textarea);
}

function showSuccess() {
  copyBtn.classList.add("success");
  setTimeout(() => copyBtn.classList.remove("success"), 600);

  copyLabel.classList.add("show");
  setTimeout(() => copyLabel.classList.remove("show"), 2000);
}
