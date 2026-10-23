/* =========================================================
   الشراره المضيئة — Landing page behaviour
   - Hero part finder: builds a WhatsApp request from model + part
   - Model explorer: family tabs → generation list → photo + enquiry link
   - Click-to-load map for the head office
   ========================================================= */
(function () {
  "use strict";

  // Sales & marketing line receives every WhatsApp enquiry from the page.
  var SALES_WA = "218917025011";

  // Head office (السبعة, Tripoli) — pin supplied by the client.
  var MAP_EMBED = "https://maps.google.com/maps?q=32.858848571777344,13.261788368225098&z=17&hl=ar&output=embed";

  var FAMILIES = [
    { id: "touareg", ar: "طوارق", en: "Touareg" },
    { id: "phaeton", ar: "فايتون", en: "Phaeton" },
    { id: "scirocco", ar: "سيروكو", en: "Scirocco" },
    { id: "beetle", ar: "بيتل", en: "Beetle" },
    { id: "sharan", ar: "شاران", en: "Sharan" }
  ];

  // Images were cropped from the supplier's VW catalogue (assets/img/cars).
  var MODELS = [
    { family: "touareg", years: "2019+", trim: "الفئة العادية", img: "touareg-19-normal.jpg" },
    { family: "touareg", years: "2019+", trim: "R-Line", img: "touareg-19-rline.jpg" },
    { family: "touareg", years: "2015–2018", trim: "الفئة العادية", img: "touareg-15-18.jpg" },
    { family: "touareg", years: "2015–2018", trim: "R-Line", img: "touareg-15-18-rline.jpg" },
    { family: "touareg", years: "2011–2014", trim: "", img: "touareg-11-14.jpg" },
    { family: "touareg", years: "2007–2010", trim: "", img: "touareg-07-10.jpg" },
    { family: "touareg", years: "2007–2010", trim: "R50", img: "touareg-07-10-r50.jpg" },
    { family: "touareg", years: "2003–2006", trim: "", img: "touareg-03-06.jpg" },
    { family: "phaeton", years: "2014", trim: "", img: "phaeton-14.jpg" },
    { family: "phaeton", years: "2011–2013", trim: "", img: "phaeton-11-13.jpg" },
    { family: "phaeton", years: "2003–2010", trim: "", img: "phaeton-03-10.jpg" },
    { family: "scirocco", years: "2015", trim: "", img: "scirocco-15.jpg" },
    { family: "scirocco", years: "2009", trim: "", img: "scirocco-09.jpg" },
    { family: "beetle", years: "2017+", trim: "", img: "beetle-17.jpg" },
    { family: "beetle", years: "2011–2016", trim: "", img: "beetle-11-16.jpg" },
    { family: "beetle", years: "2005–2010", trim: "", img: "beetle-05-10.jpg" },
    { family: "sharan", years: "2011", trim: "", img: "sharan-11.jpg" }
  ];

  var OTHER_PART = "قطعة أخرى";
  var PARTS = ["صدّام أمامي", "صدّام خلفي", "شبكة أمامية", "مصابيح أمامية", "مصابيح خلفية", "إطار مصباح الضباب", "جنح سفلي", "أشرطة كروم", OTHER_PART];

  function familyOf(model) {
    return FAMILIES.filter(function (f) { return f.id === model.family; })[0];
  }

  // e.g. "فولكس فاجن طوارق R-Line 2019+"
  function modelLabel(model) {
    var fam = familyOf(model);
    return "فولكس فاجن " + fam.ar + (model.trim ? " " + model.trim : "") + " " + model.years;
  }

  function waLink(text) {
    return "https://wa.me/" + SALES_WA + "?text=" + encodeURIComponent(text);
  }

  /* ---------- Hero part finder ---------- */
  function initFinder() {
    var form = document.getElementById("finder");
    var modelSel = document.getElementById("finderModel");
    var partSel = document.getElementById("finderPart");
    var error = document.getElementById("finderError");
    if (!form || !modelSel || !partSel) return;

    FAMILIES.forEach(function (fam) {
      var group = document.createElement("optgroup");
      group.label = fam.ar + " (" + fam.en + ")";
      MODELS.forEach(function (m, i) {
        if (m.family !== fam.id) return;
        group.appendChild(new Option(fam.ar + (m.trim ? " " + m.trim : "") + " " + m.years, String(i)));
      });
      modelSel.appendChild(group);
    });
    var audi = document.createElement("optgroup");
    audi.label = "أودي";
    audi.appendChild(new Option("أودي (اكتب الطراز في المحادثة)", "audi"));
    modelSel.appendChild(audi);

    PARTS.forEach(function (p) { partSel.appendChild(new Option(p, p)); });

    modelSel.addEventListener("change", function () {
      if (!modelSel.value) return;
      error.hidden = true;
      modelSel.removeAttribute("aria-invalid");
    });

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (!modelSel.value) {
        error.hidden = false;
        modelSel.setAttribute("aria-invalid", "true");
        modelSel.focus();
        return;
      }
      var car = modelSel.value === "audi" ? "أودي" : modelLabel(MODELS[Number(modelSel.value)]);
      var part = partSel.value === OTHER_PART ? "قطعة" : partSel.value;
      window.open(waLink("السلام عليكم، أبحث عن " + part + " لسيارة " + car + ". هل هي متوفرة، وكم السعر؟"), "_blank", "noopener");
    });
  }

  /* ---------- Model explorer ---------- */
  function initExplorer() {
    var tabsEl = document.getElementById("explorerTabs");
    var gensEl = document.getElementById("explorerGens");
    var img = document.getElementById("explorerImg");
    var nameEl = document.getElementById("explorerName");
    var ask = document.getElementById("explorerAsk");
    if (!tabsEl || !gensEl || !img) return;
    var wanted = img.getAttribute("src");

    function showModel(index) {
      var m = MODELS[index];
      var fam = familyOf(m);
      gensEl.querySelectorAll(".gen").forEach(function (b) {
        b.setAttribute("aria-checked", b.dataset.index === String(index) ? "true" : "false");
      });
      nameEl.innerHTML = "<b>" + fam.ar + "</b> " + (m.trim ? m.trim + " " : "") + '<span dir="ltr">' + m.years + "</span>";
      ask.href = waLink("السلام عليكم، أبحث عن قطع غيار لسيارة " + modelLabel(m));
      img.alt = modelLabel(m);

      var src = "assets/img/cars/" + m.img;
      wanted = src;
      if (img.getAttribute("src") === src) {
        img.classList.remove("is-swapping");
        return;
      }
      // Crossfade: fade out, swap once the new image is ready, fade in.
      // Only the latest selection may swap, so fast clicks can't leave a stale photo.
      img.classList.add("is-swapping");
      var next = new Image();
      next.onload = next.onerror = function () {
        if (wanted !== src) return;
        img.src = src;
        img.classList.remove("is-swapping");
      };
      next.src = src;
    }

    function showFamily(famId) {
      tabsEl.querySelectorAll(".tab").forEach(function (t) {
        var on = t.dataset.family === famId;
        t.setAttribute("aria-selected", on ? "true" : "false");
        t.tabIndex = on ? 0 : -1;
      });
      var first = -1;
      gensEl.innerHTML = "";
      MODELS.forEach(function (m, i) {
        if (m.family !== famId) return;
        if (first < 0) first = i;
        var b = document.createElement("button");
        b.type = "button";
        b.className = "gen";
        b.setAttribute("role", "radio");
        b.dataset.index = String(i);
        b.innerHTML = '<span class="gen__years">' + m.years + '</span><span class="gen__trim">' + (m.trim || "جميع الفئات") + "</span>";
        b.addEventListener("click", function () { showModel(i); });
        gensEl.appendChild(b);
      });
      showModel(first);
    }

    FAMILIES.forEach(function (fam) {
      var count = MODELS.filter(function (m) { return m.family === fam.id; }).length;
      var t = document.createElement("button");
      t.type = "button";
      t.className = "tab";
      t.setAttribute("role", "tab");
      t.setAttribute("aria-controls", "explorerGens");
      t.dataset.family = fam.id;
      t.innerHTML = fam.ar + "<small>" + count + "</small>";
      t.addEventListener("click", function () { showFamily(fam.id); });
      tabsEl.appendChild(t);
    });

    // Arrow keys move between tabs (RTL: right arrow goes to the previous tab)
    tabsEl.addEventListener("keydown", function (e) {
      if (e.key !== "ArrowLeft" && e.key !== "ArrowRight") return;
      var tabs = Array.prototype.slice.call(tabsEl.querySelectorAll(".tab"));
      var i = tabs.indexOf(document.activeElement);
      if (i < 0) return;
      var step = e.key === "ArrowLeft" ? 1 : -1;
      var next = tabs[(i + step + tabs.length) % tabs.length];
      next.focus();
      next.click();
    });

    showFamily(FAMILIES[0].id);
  }

  /* ---------- Map (click-to-load, no Google request until asked) ---------- */
  function initMap() {
    var btn = document.getElementById("mapLoad");
    var box = document.getElementById("map");
    if (!btn || !box) return;
    btn.addEventListener("click", function () {
      var frame = document.createElement("iframe");
      frame.src = MAP_EMBED;
      frame.title = "موقع الإدارة العامة على خريطة Google";
      frame.loading = "lazy";
      frame.referrerPolicy = "no-referrer-when-downgrade";
      box.replaceChildren(frame);
    });
  }

  initFinder();
  initExplorer();
  initMap();

  var year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();
})();
