async function loadPart(id, file) {
  const el = document.getElementById(id);
  if (!el) return null;
  const resp = await fetch(file);
  el.innerHTML = await resp.text();
  return el;
}

function markActiveNav(root) {
  if (!root) return;

  // Bul: header içindeki tüm nav linkleri
  const links = root.querySelectorAll("nav a[href]");

  // Geçerli sayfanın dosya adı ("/" veya boş ise index.html say)
  const url = new URL(window.location.href);
  let current = url.pathname.split("/").pop();
  if (!current || current === "/") current = "index.html";

  // Önce mevcut işaretleri temizle
  links.forEach((a) => {
    a.classList.remove("is-active", "active");
    a.removeAttribute("aria-current");
  });

  // Eşleştir: href’in sonu current ile bitiyorsa işaretle
  links.forEach((a) => {
    const href = a.getAttribute("href").split("?")[0].split("#")[0];
    if (href === current || href.endsWith("/" + current)) {
      a.classList.add("is-active"); // CSS bunu kullanacak
      a.setAttribute("aria-current", "page"); // erişilebilirlik
    }
  });
}

document.addEventListener("DOMContentLoaded", async () => {
  const headerEl = await loadPart("header", "layout/header.html");
  markActiveNav(headerEl);
  //loadPart("header", "layout/header.html");
  loadPart("footer", "layout/footer.html");
});
