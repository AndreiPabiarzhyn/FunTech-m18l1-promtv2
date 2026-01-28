const t1 = document.getElementById("t1");
const t2 = document.getElementById("t2");
const t3 = document.getElementById("t3");
const t4 = document.getElementById("t4");
const t5 = document.getElementById("t5");
const t6 = document.getElementById("t6");

const copyBtn = document.getElementById("copyBtn");
const copyLabel = document.getElementById("copyLabel");
const limitHint = document.getElementById("limitHint");

const MAX_LENGTH = 1200;

copyBtn.addEventListener("click", copyText);

function getPromptForAI() {
  // ✅ это именно промпт для ИИ (инструкция)
  return `Ты — писатель сказок для детей.

ВАЖНО: итоговая сказка должна быть строго не более 1100–1200 символов (включая пробелы).

Напиши короткую сказку по плану:
1) Тема: ${t1.value}
2) Главный герой: ${t2.value}, он ${t3.value}
3) Друг героя: ${t4.value}
4) Событие: ${t5.value}
5) Финал: ${t6.value}

Требования:
- 1 цельный текст, без списков и без заголовков
- дружелюбный тон, простые слова
- следи за лимитом символов`;
}

function copyText() {
  const text = getPromptForAI();

  // ✅ это ограничение уже для промпта, чтобы он не разрастался
  if (text.length > MAX_LENGTH) {
    limitHint.textContent = `Слишком длинный промпт: ${text.length} символов. Максимум — ${MAX_LENGTH}. Сократи поля.`;
    limitHint.classList.add("error");
    return;
  }

  limitHint.textContent = `Символов в промпте: ${text.length} / ${MAX_LENGTH}`;
  limitHint.classList.remove("error");

  if (navigator.clipboard && window.isSecureContext) {
    navigator.clipboard.writeText(text).then(showSuccess).catch(fallbackCopy);
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
