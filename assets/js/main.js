/* =========================================================
   الشراره المضيئة — Landing page behaviour
   - Renders the VW catalogue index (grouped by model family)
   - Part finder: builds a WhatsApp request from model + part
   ========================================================= */
(function () {
  "use strict";

  // Sales & marketing line receives every WhatsApp enquiry from the page.
  var SALES_WA = "218917025011";

  // Images were cropped from the supplier's VW catalogue (assets/img/cars).
  var FAMILIES = [
    { id: "touareg", ar: "طوارق", en: "Touareg" },
    { id: "phaeton", ar: "فايتون", en: "Phaeton" },
    { id: "scirocco", ar: "سيروكو", en: "Scirocco" },
    { id: "beetle", ar: "بيتل", en: "Beetle" },
    { id: "sharan", ar: "شاران", en: "Sharan" }
  ];

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
  var PARTS = ["صدّام أمامي", "صدّام خلفي", "شبكة أمامية", "مصابيح", "إطار ضباب", "جنح سفلي", "أشرطة كروم", OTHER_PART];

  function familyOf(model) {
    return FAMILIES.filter(function (f) { return f.id === model.family; })[0];
  }

  // Human-readable model name, e.g. "فولكس فاجن طوارق R-Line 2019+"
  function modelLabel(model) {
    var fam = familyOf(model);
    return "فولكس فاجن " + fam.ar + (model.trim ? " " + model.trim : "") + " " + model.years;
  }

  function waLink(text) {
    return "https://wa.me/" + SALES_WA + "?text=" + encodeURIComponent(text);
  }

  function escapeHtml(s) {
    return String(s).replace(/[&<>"]/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c];
    });
  }

  /* ---------- Catalogue index ---------- */
  function renderModels() {
    var root = document.getElementById("modelGroups");
    if (!root) return;

    root.innerHTML = FAMILIES.map(function (fam) {
      var items = MODELS.filter(function (m) { return m.family === fam.id; });
      var cards = items.map(function (m) {
        var label = modelLabel(m);
        return (
          '<li><a class="model" href="' + waLink("السلام عليكم، أبحث عن قطع غيار لسيارة " + label) + '" target="_blank" rel="noopener">' +
            '<img src="assets/img/cars/' + m.img + '" alt="' + escapeHtml(label) + '" loading="lazy" width="611" height="312">' +
            '<span class="model__body">' +
              '<span class="model__years">' + m.years + "</span>" +
              (m.trim ? '<span class="model__trim">' + escapeHtml(m.trim) + "</span>" : "") +
            "</span>" +
            '<span class="model__ask">اسأل عن قطعه عبر واتساب</span>' +
          "</a></li>"
        );
      }).join("");

      return (
        '<section class="family" aria-labelledby="fam-' + fam.id + '">' +
          '<div class="family__head">' +
            '<h3 id="fam-' + fam.id + '">' + fam.ar + "</h3>" +
            '<span class="family__en">' + fam.en + "</span>" +
            '<span class="family__count">' + items.length + (items.length > 2 ? " طرازات" : " طراز") + "</span>" +
          "</div>" +
          '<ul class="models">' + cards + "</ul>" +
        "</section>"
      );
    }).join("");
  }

  /* ---------- Part finder ---------- */
  function initFinder() {
    var form = document.getElementById("finder");
    var select = document.getElementById("finderModel");
    var partsBox = document.getElementById("finderParts");
    var error = document.getElementById("finderError");
    if (!form || !select || !partsBox) return;

    FAMILIES.forEach(function (fam) {
      var group = document.createElement("optgroup");
      group.label = fam.ar + " — " + fam.en;
      MODELS.forEach(function (m, i) {
        if (m.family !== fam.id) return;
        var opt = document.createElement("option");
        opt.value = String(i);
        opt.textContent = fam.ar + (m.trim ? " " + m.trim : "") + " (" + m.years + ")";
        group.appendChild(opt);
      });
      select.appendChild(group);
    });
    var audi = document.createElement("optgroup");
    audi.label = "أودي";
    var audiOpt = document.createElement("option");
    audiOpt.value = "audi";
    audiOpt.textContent = "أودي (اكتب الطراز في المحادثة)";
    audi.appendChild(audiOpt);
    select.appendChild(audi);

    partsBox.innerHTML = PARTS.map(function (p, i) {
      return '<label class="pill"><input type="radio" name="part" value="' + escapeHtml(p) + '"' + (i === 0 ? " checked" : "") + "><span>" + escapeHtml(p) + "</span></label>";
    }).join("");

    select.addEventListener("change", function () {
      if (select.value) {
        error.hidden = true;
        select.removeAttribute("aria-invalid");
      }
    });

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (!select.value) {
        error.hidden = false;
        select.setAttribute("aria-invalid", "true");
        select.focus();
        return;
      }
      var car = select.value === "audi" ? "أودي" : modelLabel(MODELS[Number(select.value)]);
      var part = (form.querySelector('input[name="part"]:checked') || {}).value || "";
      if (!part || part === OTHER_PART) part = "قطعة";
      var msg = "السلام عليكم، أبحث عن " + part + " لسيارة " + car + ". هل هي متوفرة، وكم السعر؟";
      window.open(waLink(msg), "_blank", "noopener");
    });
  }

  renderModels();
  initFinder();

  var year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();
})();
