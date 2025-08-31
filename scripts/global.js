async function loadPart(id, file) {
  const host = document.getElementById(id);
  if (!host) return null;

  try {
    const resp = await fetch(file, { cache: "no-store" });
    if (!resp.ok) {
      console.error(`[loadPart] ${file} ${resp.status}`);
      return host;
    }

    const html = (await resp.text()).trim();

    // Güvenli parse
    const tpl = document.createElement("template");
    tpl.innerHTML = html;

    // Sadece element node'ları ekle (yorum/metin düğümleri hariç)
    const frag = document.createDocumentFragment();
    [...tpl.content.childNodes].forEach((n) => {
      if (n.nodeType === Node.ELEMENT_NODE) frag.appendChild(n);
    });

    host.replaceChildren(frag); // host'un içinde güvenle değiştir
    return host;
  } catch (e) {
    console.error("[loadPart]", e);
    return host;
  }
}

function markActiveNav(root) {
  if (!root) return;
  const links = root.querySelectorAll("nav a[href]");
  const url = new URL(window.location.href);
  let current = url.pathname.split("/").pop();
  if (!current || current === "/") current = "index.html";

  links.forEach((a) => {
    a.classList.remove("is-active", "active");
    a.removeAttribute("aria-current");
    const href = a.getAttribute("href").split(/[?#]/)[0];
    if (href === current || href.endsWith("/" + current)) {
      a.classList.add("is-active");
      a.setAttribute("aria-current", "page");
    }
  });
}

document.addEventListener("DOMContentLoaded", async () => {
  const headerEl = await loadPart("header", "/layout/header.html"); // ABSOLUTE PATH
  markActiveNav(headerEl);

  await loadPart("footer", "/layout/footer.html"); // ABSOLUTE PATH
});
