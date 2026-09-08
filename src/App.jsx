import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// TELEGRAM BOT SOZLAMALARI
const TOKEN = "8887326747:AAEd1KCDpbgwoSICBzePyHwnhL8Phke8nVM"; // O'zingizning bot tokeningiz
const CHAT_ID = "8805463428"; // Siz bergan Telegram ID
// asdfgoihfiorhg
// asdf

const content = {
  uz: {
    nav: {
      about: "Men haqimda",
      skills: "Ko'nikmalar",
      certs: "Sertifikat",
      contact: "Bog'lanish",
    },
    hero: {
      greeting: "Salom! Men",
      name: "Muhammadrizo Turg'unov",
      title: "Frontend Dasturchi (PRO Level)",
      sub: "14 yoshli veb-dasturchi. MARS IT School o'quv markazi bitiruvchisi.",
      btnContact: "Bog'lanish",
      btnCert: "Sertifikatni ko'rish",
    },
    about: {
      title: "Men haqimda",
      desc: "Zamonaviy va qulay veb-saytlar yarataman. MARS IT School markazida Frontend yo'nalishini muvaffaqiyatli tugatganman.",
      age: "Yosh:",
      school: "O'quv markaz:",
      direction: "Yo'nalish:",
      level: "Daraja:",
    },
    skills: { title: "Mening ko'nikmalarim" },
    certs: {
      title: "Sertifikatim",
      certTitle: "MARS IT School — Frontend Kursi",
      idLabel: "Sertifikat ID:",
      dateLabel: "Berilgan sana:",
      viewBtn: "Kattalashtirish",
    },
    contact: {
      title: "Men bilan bog'laning",
      socialsTitle: "Ijtimoiy tarmoqlarim",
      namePlaceholder: "Ismingiz",
      msgPlaceholder: "Xabaringiz...",
      sendBtn: "Yuborish",
    },
  },
  ru: {
    nav: {
      about: "Обо мне",
      skills: "Навыки",
      certs: "Сертификат",
      contact: "Контакты",
    },
    hero: {
      greeting: "Привет! Я",
      name: "Мухаммадризо Тургунов",
      title: "Frontend Разработчик (PRO Level)",
      sub: "14-летний веб-разработчик. Выпускник MARS IT School.",
      btnContact: "Связаться",
      btnCert: "Посмотреть сертификат",
    },
    about: {
      title: "Обо мне",
      desc: "Создаю современные и удобные веб-сайты. Успешно окончил курс Frontend в MARS IT School.",
      age: "Возраст:",
      school: "Учебный центр:",
      direction: "Направление:",
      level: "Уровень:",
    },
    skills: { title: "Мои навыки" },
    certs: {
      title: "Мой Сертификат",
      certTitle: "MARS IT School — Курс Frontend",
      idLabel: "ID Сертификата:",
      dateLabel: "Дата выдачи:",
      viewBtn: "Увеличить",
    },
    contact: {
      title: "Связаться со мной",
      socialsTitle: "Мои соцсети",
      namePlaceholder: "Ваше имя",
      msgPlaceholder: "Ваше сообщение...",
      sendBtn: "Отправить",
    },
  },
  en: {
    nav: {
      about: "About",
      skills: "Skills",
      certs: "Certificate",
      contact: "Contact",
    },
    hero: {
      greeting: "Hello! I'm",
      name: "Muhammadrizo Turgunov",
      title: "Frontend Developer (PRO Level)",
      sub: "14-year-old web developer. Graduate of MARS IT School.",
      btnContact: "Get in Touch",
      btnCert: "View Certificate",
    },
    about: {
      title: "About Me",
      desc: "I build modern and user-friendly websites. Successfully completed the Frontend course at MARS IT School.",
      age: "Age:",
      school: "School:",
      direction: "Field:",
      level: "Level:",
    },
    skills: { title: "My Skills" },
    certs: {
      title: "My Certificate",
      certTitle: "MARS IT School — Frontend Course",
      idLabel: "Certificate ID:",
      dateLabel: "Issued Date:",
      viewBtn: "Enlarge View",
    },
    contact: {
      title: "Contact Me",
      socialsTitle: "My Socials",
      namePlaceholder: "Your Name",
      msgPlaceholder: "Your Message...",
      sendBtn: "Send Message",
    },
  },
};

export default function App() {
  const [lang, setLang] = useState("uz");
  const [darkMode, setDarkMode] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);

  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const t = content[lang];

  // TELEGRAM BOTGA XABAR YUBORISH FUNKSIYASI
  const sendToTelegram = async (e) => {
    e.preventDefault();

    if (!name.trim() || !message.trim()) {
      toast.warning("⚠️ Iltimos, ismingiz va xabaringizni to'liq kiriting!", {
        style: {
          borderRadius: "14px",
          background: darkMode ? "#111827" : "#ffffff",
          color: darkMode ? "#ffffff" : "#111827",
          border: "1px solid #f59e0b",
        },
      });
      return;
    }

    setLoading(true);

    const text = `🔔 *Portfoliodan yangi xabar!*\n\n👤 *Ism:* ${name}\n💬 *Xabar:* ${message}`;
    const url = `https://api.telegram.org/bot${TOKEN}/sendMessage`;

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          chat_id: CHAT_ID,
          text: text,
          parse_mode: "Markdown",
        }),
      });

      if (response.ok) {
        toast.success("🚀 Xabaringiz muvaffaqiyatli yuborildi!", {
          style: {
            borderRadius: "14px",
            background: darkMode ? "#111827" : "#ffffff",
            color: darkMode ? "#ffffff" : "#111827",
            border: "1px solid #22c55e",
            boxShadow: "0 10px 25px -5px rgba(34, 197, 94, 0.25)",
            fontWeight: "600",
          },
        });
        setName("");
        setMessage("");
      } else {
        toast.error(
          "❌ Xatolik yuz berdi. Telegram botingizga /start bosganingizni tekshiring.",
          {
            style: {
              borderRadius: "14px",
              background: darkMode ? "#111827" : "#ffffff",
              color: darkMode ? "#ffffff" : "#111827",
              border: "1px solid #ef4444",
            },
          }
        );
      }
    } catch (error) {
      toast.error("🌐 Internet bilan muammo yoki xatolik yuz berdi.", {
        style: {
          borderRadius: "14px",
          background: darkMode ? "#111827" : "#ffffff",
          color: darkMode ? "#ffffff" : "#111827",
          border: "1px solid #ef4444",
        },
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={`w-full min-h-screen overflow-x-hidden transition-colors duration-300 font-sans ${darkMode ? "bg-gray-950 text-white" : "bg-gray-50 text-gray-900"}`}
    >
      {/* TOAST NOTIFICATION CONTAINER */}
      <ToastContainer
        position="top-right"
        autoClose={3500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme={darkMode ? "dark" : "light"}
      />

      {/* NAVBAR */}
      <nav
        className={`fixed top-0 left-0 w-full z-40 backdrop-blur-md border-b ${darkMode ? "bg-gray-950/90 border-gray-800" : "bg-white/90 border-gray-200"}`}
      >
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <a
            href="#"
            className="text-xl font-black text-red-500 flex items-center gap-2"
          >
            <span className="bg-red-500 text-white px-2 py-0.5 rounded-lg text-sm">
              MARS
            </span>{" "}
            M. TURGUNOV
          </a>

          <div className="hidden md:flex gap-6 font-medium text-sm">
            <a href="#about" className="hover:text-red-500 transition">
              {t.nav.about}
            </a>
            <a href="#skills" className="hover:text-red-500 transition">
              {t.nav.skills}
            </a>
            <a href="#certs" className="hover:text-red-500 transition">
              {t.nav.certs}
            </a>
            <a href="#contact" className="hover:text-red-500 transition">
              {t.nav.contact}
            </a>
          </div>

          <div className="flex items-center gap-3">
            <div
              className={`flex rounded-lg p-1 text-xs font-semibold ${darkMode ? "bg-gray-800" : "bg-gray-200"}`}
            >
              <button
                onClick={() => setLang("uz")}
                className={`px-2 py-1 rounded transition ${lang === "uz" ? "bg-red-500 text-white" : "opacity-70"}`}
              >
                UZ
              </button>
              <button
                onClick={() => setLang("ru")}
                className={`px-2 py-1 rounded transition ${lang === "ru" ? "bg-red-500 text-white" : "opacity-70"}`}
              >
                RU
              </button>
              <button
                onClick={() => setLang("en")}
                className={`px-2 py-1 rounded transition ${lang === "en" ? "bg-red-500 text-white" : "opacity-70"}`}
              >
                EN
              </button>
            </div>

            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`p-2 rounded-lg border transition ${darkMode ? "bg-gray-800 border-gray-700 text-yellow-400" : "bg-gray-100 border-gray-300 text-gray-800"}`}
            >
              {darkMode ? "☀️" : "🌙"}
            </button>
          </div>
        </div>
      </nav>

      {/* HERO SECTION */}
      <section className="pt-32 pb-20 px-4 max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-12">
        <div className="flex-1 space-y-6 text-center md:text-left">
          <span className="inline-block px-3 py-1 bg-red-500/10 text-red-500 rounded-full text-sm font-semibold border border-red-500/20">
            PRO FRONTEND DEVELOPER
          </span>
          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">
            {t.hero.greeting} <br />
            <span className="bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">
              {t.hero.name}
            </span>
          </h1>
          <p
            className={`text-lg max-w-xl ${darkMode ? "text-gray-400" : "text-gray-600"}`}
          >
            {t.hero.sub}
          </p>

          <div className="flex flex-wrap gap-4 justify-center md:justify-start items-center">
            <a
              href="#contact"
              className="px-6 py-3 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-xl shadow-lg shadow-red-500/30 transition"
            >
              {t.hero.btnContact}
            </a>
            <a
              href="#certs"
              className={`px-6 py-3 font-semibold rounded-xl border transition ${darkMode ? "border-gray-700 hover:bg-gray-800" : "border-gray-300 hover:bg-gray-200"}`}
            >
              {t.hero.btnCert}
            </a>
          </div>

          <div className="flex justify-center md:justify-start gap-3 pt-2">
            <a
              href="https://t.me/MR_70502"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-500/10 border border-blue-500/30 text-blue-400 hover:bg-blue-500 hover:text-white transition font-medium text-sm"
            >
              ✈️ Telegram
            </a>
            <a
              href="https://instagram.com/turgunov_123._"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-pink-500/10 border border-pink-500/30 text-pink-400 hover:bg-pink-500 hover:text-white transition font-medium text-sm"
            >
              📸 Instagram
            </a>
          </div>
        </div>

        <div className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-red-500 to-orange-500 rounded-2xl blur opacity-30 group-hover:opacity-75 transition duration-500"></div>
          <img
            src="/profile.png"
            alt="Muhammadrizo Turgunov"
            className="relative w-72 h-96 object-cover rounded-2xl shadow-2xl border-2 border-red-500/30"
          />
        </div>
      </section>

      {/* ABOUT SECTION */}
      <section
        id="about"
        className={`py-16 border-t ${darkMode ? "bg-gray-900/50 border-gray-800" : "bg-white border-gray-200"}`}
      >
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            {t.about.title}
          </h2>
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div
              className={`p-6 rounded-2xl border ${darkMode ? "bg-gray-950 border-gray-800" : "bg-gray-50 border-gray-200"}`}
            >
              <p className="text-lg leading-relaxed mb-6">{t.about.desc}</p>
              <div className="grid grid-cols-2 gap-4 text-sm font-semibold">
                <div>
                  <span className="opacity-60">{t.about.age}</span> 14
                </div>
                <div>
                  <span className="opacity-60">{t.about.school}</span> MARS IT
                  School
                </div>
                <div>
                  <span className="opacity-60">{t.about.direction}</span>{" "}
                  Frontend
                </div>
                <div>
                  <span className="opacity-60">{t.about.level}</span> PRO
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-6 rounded-2xl bg-gradient-to-br from-red-500 to-orange-500 text-white font-bold text-center">
                <div className="text-4xl mb-2">14</div>
                <div className="text-xs uppercase">Yosh</div>
              </div>
              <div
                className={`p-6 rounded-2xl border text-center font-bold ${darkMode ? "bg-gray-950 border-gray-800" : "bg-gray-50 border-gray-200"}`}
              >
                <div className="text-4xl text-red-500 mb-2">PRO</div>
                <div className="text-xs uppercase">Daraja</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SKILLS SECTION */}
      <section id="skills" className="py-16 max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">
          {t.skills.title}
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            "React.js",
            "JavaScript",
            "HTML & CSS",
            "Tailwind CSS",
            "Git & GitHub",
            "Responsive Design",
            "REST API",
            "Figma to Code",
          ].map((skill, index) => (
            <div
              key={index}
              className={`p-5 rounded-xl border text-center font-semibold transition hover:scale-105 ${darkMode ? "bg-gray-900 border-gray-800 text-gray-200" : "bg-white border-gray-200 text-gray-800"}`}
            >
              <span className="text-red-500 text-xl block mb-2">⚡</span>
              {skill}
            </div>
          ))}
        </div>
      </section>

      {/* CERTIFICATE SECTION */}
      <section
        id="certs"
        className={`py-16 border-t ${darkMode ? "bg-gray-900/50 border-gray-800" : "bg-white border-gray-200"}`}
      >
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-12">{t.certs.title}</h2>
          <div className="max-w-2xl mx-auto bg-gradient-to-b from-red-500/10 to-transparent p-6 rounded-3xl border border-red-500/20">
            <div
              className="relative group cursor-pointer overflow-hidden rounded-2xl mb-6"
              onClick={() => setModalOpen(true)}
            >
              <img
                src="/cert.png"
                alt="MARS IT School Frontend Certificate"
                className="w-full h-auto rounded-2xl transition duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition flex items-center justify-center text-white font-bold">
                🔍 {t.certs.viewBtn}
              </div>
            </div>
            <h3 className="text-xl font-bold mb-2">{t.certs.certTitle}</h3>
            <div className="flex justify-center gap-6 text-sm font-medium opacity-80">
              <p>
                📜 {t.certs.idLabel}{" "}
                <span className="font-mono text-red-500 font-bold">28413</span>
              </p>
              <p>
                📅 {t.certs.dateLabel}{" "}
                <span className="font-mono font-bold">30.06.2026</span>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* MODAL */}
      {modalOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setModalOpen(false)}
        >
          <div className="relative max-w-4xl w-full">
            <button
              className="absolute -top-10 right-0 text-white text-2xl font-bold"
              onClick={() => setModalOpen(false)}
            >
              ✕
            </button>
            <img
              src="/cert.png"
              alt="Certificate Full"
              className="w-full h-auto rounded-xl border border-gray-700"
            />
          </div>
        </div>
      )}

      {/* CONTACT SECTION */}
      <section id="contact" className="py-16 max-w-4xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-6">
          {t.contact.title}
        </h2>

        <div className="mb-10 text-center">
          <p className="text-sm opacity-60 mb-4">{t.contact.socialsTitle}</p>
          <div className="flex justify-center gap-4 flex-wrap">
            <a
              href="https://t.me/MR_70502"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-3 px-6 py-3 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold transition shadow-lg shadow-blue-500/20"
            >
              <span>✈️</span> Telegram (@MR_70502)
            </a>
            <a
              href="https://instagram.com/turgunov_123._"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-3 px-6 py-3 rounded-2xl bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 hover:opacity-90 text-white font-bold transition shadow-lg shadow-pink-500/20"
            >
              <span>📸</span> Instagram (turgunov_123._)
            </a>
          </div>
        </div>

        <form className="space-y-4" onSubmit={sendToTelegram}>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder={t.contact.namePlaceholder}
            className={`w-full p-4 rounded-xl border focus:outline-none focus:border-red-500 ${darkMode ? "bg-gray-900 border-gray-800" : "bg-white border-gray-300"}`}
          />
          <textarea
            rows="4"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder={t.contact.msgPlaceholder}
            className={`w-full p-4 rounded-xl border focus:outline-none focus:border-red-500 ${darkMode ? "bg-gray-900 border-gray-800" : "bg-white border-gray-300"}`}
          ></textarea>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-4 font-bold rounded-xl shadow-lg transition ${loading ? "bg-gray-500 cursor-not-allowed" : "bg-red-500 hover:bg-red-600 text-white"}`}
          >
            {loading ? "Yuborilmoqda..." : t.contact.sendBtn}
          </button>
        </form>
      </section>

      <footer
        className={`py-6 border-t text-center text-xs opacity-60 ${darkMode ? "border-gray-800" : "border-gray-200"}`}
      >
        © 2026 Muhammadrizo Turgunov. MARS IT School.
      </footer>
    </div>
  );
}