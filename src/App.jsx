import React, { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  AlertTriangle,
  ArrowLeft,
  ArrowUpRight,
  AudioLines,
  ChevronRight,
  Check,
  ClipboardList,
  Copy,
  Heart,
  Plus,
  Search,
  Settings,
  Flower2,
  Film,
  History,
  Image,
  User,
  Snowflake,
  Sparkles,
  Upload,
  Zap,
  Play,
  Star,
  Ticket,
  ShoppingBag,
  Coins,
  Download,
  Wand2,
  Gift,
  Send,
  Share2,
} from "lucide-react";

const filters = [
  { id: "all", label: "Все", icon: Check },
  { id: "new", label: "Новинки", icon: Star },
  { id: "popular", label: "Популярное", icon: Zap },
  { id: "photo", label: "Фото", icon: Image },
  { id: "video", label: "Видео", icon: Film },
];

const styleSections = [
  { id: "all", label: "Все" },
  { id: "march8", label: "8 марта" },
  { id: "spring", label: "Весна" },
  { id: "business", label: "Деловой" },
  { id: "street", label: "Улица" },
];

const feedSectionTemplates = [
  { id: "tiktok", label: "ТикТок тренды", audience: "84K", cardIds: [2, 5, 9, 12] },
  { id: "march8-highlight", label: "#8марта", audience: "36K", cardIds: [6, 8, 3, 4] },
  { id: "reels", label: "Рилс контент", audience: "112K", cardIds: [2, 4, 7, 12] },
  { id: "weekly-hits", label: "Хиты недели", audience: "58K", cardIds: [1, 3, 9, 10] },
  { id: "rising", label: "Набирает популярность", audience: "27K", cardIds: [8, 11, 5, 7] },
];

const tasks = [
  {
    id: 1,
    title: "Подпишись на канал",
    reward: 3,
    description: "Открой канал проекта и подпишись, чтобы получать новые стили первым.",
  },
  {
    id: 2,
    title: "Поставь лайк 3 стилям",
    reward: 2,
    description: "Отметь понравившиеся стили, чтобы персонализировать рекомендации.",
  },
  {
    id: 3,
    title: "Поделись с другом",
    reward: 5,
    description: "Отправь другу ссылку на приложение и получи бонус за приглашение.",
  },
];

const products = [
  {
    id: 1,
    subtitle: "Новичок",
    amount: 100,
    price: "199 ₽",
    badge: null,
    icon: null,
  },
  {
    id: 2,
    subtitle: "Базовый",
    amount: 25,
    price: "399 ₽",
    badge: null,
    icon: null,
  },
  {
    id: 3,
    subtitle: "✨ Стандарт",
    amount: 100,
    price: "990 ₽",
    badge: "Популярный",
    badgeColor: "bg-[#53d11f] text-white",
    featured: true,
  },
  {
    id: 4,
    subtitle: "🚀 Профи",
    amount: 250,
    price: "1 590 ₽",
    badge: "Выгодно",
    badgeColor: "bg-[#f4c430] text-[#3b2a00]",
  },
  {
    id: 5,
    subtitle: "⭐ Создатель",
    amount: 500,
    price: "2 790 ₽",
    badge: "Лучший",
    badgeColor: "bg-[#ffbf1f] text-white",
  },
];

const cards = [
  {
    id: 1,
    title: "Вечерний портрет",
    likes: 14,
    badge: "choice",
    section: "business",
    categories: ["family"],
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=900&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&w=900&q=80",
    ],
    description: "Мягкий студийный свет, аккуратная ретушь и спокойный премиальный стиль.",
  },
  {
    id: 2,
    title: "Модный образ",
    likes: 6,
    badge: "track",
    section: "street",
    categories: ["video"],
    image:
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=900&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1521119989659-a83eee488004?auto=format&fit=crop&w=900&q=80",
    ],
    description: "Глянцевый fashion-кадр с ярким светом и чистой композицией.",
  },
  {
    id: 3,
    title: "Пара в городе",
    likes: 141,
    badge: null,
    section: "street",
    categories: ["pair", "video"],
    image:
      "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?auto=format&fit=crop&w=900&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1516914943479-89db7d9ae7f2?auto=format&fit=crop&w=900&q=80",
    ],
    description: "Кинематографичный кадр для двух человек, городской фон и мягкая глубина.",
  },
  {
    id: 4,
    title: "Светлый портрет",
    likes: 14,
    badge: "popular",
    section: "spring",
    categories: ["family"],
    image:
      "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?auto=format&fit=crop&w=900&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1516914943479-89db7d9ae7f2?auto=format&fit=crop&w=900&q=80",
    ],
    description: "Лёгкий lifestyle-образ с естественным освещением и чистым фоном.",
  },
  {
    id: 5,
    title: "Street style",
    likes: 6,
    badge: null,
    section: "street",
    categories: ["video"],
    image:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=900&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1517365830460-955ce3ccd263?auto=format&fit=crop&w=900&q=80",
    ],
    description: "Уличный стиль, контрастный свет и современная подача для соцсетей.",
  },
  {
    id: 6,
    title: "Праздник вдвоём",
    likes: 141,
    badge: "free",
    section: "march8",
    categories: ["pair", "family"],
    image:
      "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=900&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=900&q=80",
    ],
    description: "Два человека обнимаются на дне рождения в большом праздничном зале.",
  },
  {
    id: 7,
    title: "Тёплый кадр",
    likes: 14,
    badge: null,
    section: "spring",
    categories: ["family"],
    image:
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=900&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1516914943479-89db7d9ae7f2?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=900&q=80",
    ],
    description: "Живой эмоциональный кадр с мягкой обработкой и тёплой палитрой.",
  },
  {
    id: 8,
    title: "Нежный стиль",
    likes: 6,
    badge: "new",
    section: "march8",
    categories: ["pair"],
    image:
      "https://images.unsplash.com/photo-1516914943479-89db7d9ae7f2?auto=format&fit=crop&w=900&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1516914943479-89db7d9ae7f2?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=900&q=80",
    ],
    description: "Светлый романтичный образ с мягким контрастом и воздушным фоном.",
  },
  {
    id: 9,
    title: "Яркий образ",
    likes: 141,
    badge: "popular",
    section: "street",
    categories: ["video"],
    image:
      "https://images.unsplash.com/photo-1517365830460-955ce3ccd263?auto=format&fit=crop&w=900&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1517365830460-955ce3ccd263?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1521119989659-a83eee488004?auto=format&fit=crop&w=900&q=80",
    ],
    description: "Выразительный кадр с акцентом на стиль, цвет и эмоцию.",
  },
  {
    id: 10,
    title: "Портрет в студии",
    likes: 23,
    badge: "choice",
    section: "business",
    categories: ["family"],
    image:
      "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&w=900&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?auto=format&fit=crop&w=900&q=80",
    ],
    description: "Студийный сетап с чистым фоном и аккуратной бьюти-обработкой.",
  },
  {
    id: 11,
    title: "Винтаж",
    likes: 58,
    badge: null,
    section: "business",
    categories: ["video"],
    image:
      "https://images.unsplash.com/photo-1521119989659-a83eee488004?auto=format&fit=crop&w=900&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1521119989659-a83eee488004?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1517365830460-955ce3ccd263?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=900&q=80",
    ],
    description: "Немного ретро, мягкое зерно и стильная цветокоррекция.",
  },
  {
    id: 12,
    title: "Лайфстайл",
    likes: 91,
    badge: "track",
    section: "spring",
    categories: ["family", "video"],
    image:
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=900&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1516914943479-89db7d9ae7f2?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=900&q=80",
    ],
    description: "Повседневный эстетичный кадр, который выглядит натурально и дорого.",
  },
];

function hasTelegramContext() {
  const tg = window.Telegram?.WebApp;
  return !!(tg && (tg.initData?.length || tg.initDataUnsafe?.user));
}

function useTelegramWebApp() {
  const [isTelegram, setIsTelegram] = useState(false);

  useEffect(() => {
    const tg = window.Telegram?.WebApp;
    if (!tg || !hasTelegramContext()) return;

    const syncViewportHeight = () => {
      const viewportHeight = tg.viewportStableHeight || tg.viewportHeight || window.innerHeight;
      document.documentElement.style.setProperty("--app-height", `${viewportHeight}px`);
    };

    setIsTelegram(true);
    tg.ready();
    syncViewportHeight();

    if (typeof tg.expand === "function") {
      tg.expand();
    }

    if (typeof tg.requestFullscreen === "function") {
      try {
        tg.requestFullscreen();
      } catch {
        // Some Telegram clients expose the method but may reject the call.
      }
    }

    if (tg.setHeaderColor) {
      tg.setHeaderColor("#ffffff");
    }
    if (tg.setBackgroundColor) {
      tg.setBackgroundColor("#ffffff");
    }

    const handleViewportChanged = () => {
      syncViewportHeight();
      if (typeof tg.expand === "function") {
        tg.expand();
      }
    };

    if (typeof tg.onEvent === "function") {
      tg.onEvent("viewportChanged", handleViewportChanged);
    }

    const delayedFullscreen = window.setTimeout(() => {
      syncViewportHeight();
      if (typeof tg.expand === "function") {
        tg.expand();
      }
      if (typeof tg.requestFullscreen === "function") {
        try {
          tg.requestFullscreen();
        } catch {
          // Ignore unsupported fullscreen attempts.
        }
      }
    }, 120);

    return () => {
      window.clearTimeout(delayedFullscreen);
      if (typeof tg.offEvent === "function") {
        tg.offEvent("viewportChanged", handleViewportChanged);
      }
      document.documentElement.style.removeProperty("--app-height");
    };
  }, []);

  return { isTelegram };
}

function CardBadge({ type }) {
  const styles = {
    new: "bg-[#3c8dff] text-white",
    popular: "bg-[#ffbf1f] text-[#463100]",
    free: "bg-[#49b8ff] text-white",
    choice: "bg-[#f4c430] text-[#3b2a00]",
    track: "bg-[#1f2430] text-white",
  };

  const labels = {
    new: "Новинка",
    popular: "Вирусное",
    free: "Бесплатно",
    choice: "Выбор NANA",
    track: "Трек",
  };

  return (
    <div
      className={`absolute left-3 top-3 rounded-full px-3 py-1.5 text-[12px] font-semibold shadow-[0_8px_16px_rgba(15,23,42,0.12)] ${styles[type] ?? "bg-white text-[#234677]"}`}
    >
      <span className="flex items-center gap-1">
        {type === "new" ? <Star className="h-3.5 w-3.5" strokeWidth={2.2} /> : null}
        {type === "popular" ? <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={2.4} /> : null}
        {type === "free" ? <Ticket className="h-3.5 w-3.5" strokeWidth={2.4} /> : null}
        {type === "choice" ? <Check className="h-3.5 w-3.5" strokeWidth={2.6} /> : null}
        {type === "track" ? <AudioLines className="h-3.5 w-3.5" strokeWidth={2.2} /> : null}
        <span>{labels[type] ?? "Стиль"}</span>
      </span>
    </div>
  );
}

function Header({ onOpenBalance, onOpenProfile, balance = 184, isBonusCounting = false }) {
  const isTelegramClient = typeof window !== "undefined" && hasTelegramContext();
  const headerTopSpacing = isTelegramClient ? "pt-[180px]" : "pt-[30px]";
  const headerRowOffset = isTelegramClient ? "mt-[-75px]" : "mt-0";

  const BalanceDigits = ({ value }) => {
    const safeValue = Math.max(0, Math.min(99, value));
    const [tens, ones] = String(safeValue).padStart(2, "0").split("").map(Number);
    const digitTrack = Array.from({ length: 10 }, (_, digit) => digit);

    const DigitWheel = ({ digit }) => (
      <span className="relative h-[18px] w-[9px] overflow-hidden">
        <motion.span
          initial={false}
          animate={{ y: `-${digit * 18}px` }}
          transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          className="absolute left-0 top-0 flex flex-col items-center"
        >
          {digitTrack.map((trackDigit) => (
            <span
              key={trackDigit}
              className="flex h-[18px] w-[9px] items-center justify-center leading-none"
            >
              {trackDigit}
            </span>
          ))}
        </motion.span>
      </span>
    );

    return (
      <span className="flex items-center">
        <DigitWheel digit={tens} />
        <DigitWheel digit={ones} />
      </span>
    );
  };

  return (
    <div className={`px-1 pb-0 ${headerTopSpacing}`}>
      <div className={`mx-auto flex w-full max-w-[516px] items-center justify-between gap-3 ${headerRowOffset}`}>
        <button
          onClick={onOpenProfile}
          className="group flex min-w-0 items-center gap-3 rounded-full border border-[rgba(219,219,212,0.92)] bg-[rgba(250,250,247,0.96)] px-2 py-1.5 text-left shadow-[0_4px_14px_rgba(43,39,28,0.04)] transition active:scale-[0.98]"
        >
          <img
            src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80"
            alt="avatar"
            className="h-12 w-12 rounded-full object-cover"
          />
          <div className="min-w-0">
            <div className="flex items-center gap-1">
              <div className="truncate text-[18px] font-semibold text-[#231f17]">Сергей</div>
              <ArrowLeft className="h-3.5 w-3.5 rotate-180 text-[#a09784] opacity-0 transition group-hover:opacity-100" />
            </div>
            <div className="text-[11px] text-[#7b7365]">Мой профиль</div>
          </div>
        </button>

        <div className="ml-auto flex items-center overflow-hidden rounded-full border border-[#ead9a4] bg-[#fff9e8] text-[#7a5a00] shadow-sm">
          <div className="flex items-center gap-1 px-3 py-1.5 text-[14px] font-semibold">
            <BalanceDigits value={balance} />
            <Sparkles className="h-3.5 w-3.5" strokeWidth={2.1} />
          </div>
          <button
            onClick={onOpenBalance}
            className="flex h-10 w-10 items-center justify-center bg-[#f4c430] text-[#3b2a00]"
          >
            <Plus className="h-4.5 w-4.5" />
          </button>
        </div>
      </div>
    </div>
  );
}

function PinnedSectionHeader({ children, className = "" }) {
  const isTelegramClient = typeof window !== "undefined" && hasTelegramContext();

  return (
    <div
      className={`sticky top-0 z-20 -mx-3 bg-[rgba(246,246,242,0.96)] px-3 pb-0 backdrop-blur-[10px] ${!isTelegramClient ? "" : ""} ${className}`}
    >
      {children}
    </div>
  );
}

function FilterBar({ activeFilter, setActiveFilter }) {
  return (
    <div className="mt-[-5px] flex gap-2 overflow-x-auto rounded-[20px] bg-[rgba(246,246,242,0.96)] px-2 py-2">
      <button
        type="button"
        className="flex h-[36px] w-[36px] shrink-0 items-center justify-center rounded-full border border-[rgba(218,218,212,0.9)] bg-[rgba(250,250,247,0.96)] text-[#27231d]"
      >
        <Search className="h-4 w-4" strokeWidth={2.2} />
      </button>
      <button
        type="button"
        className="flex h-[36px] w-[36px] shrink-0 items-center justify-center rounded-full border border-[rgba(218,218,212,0.9)] bg-[rgba(250,250,247,0.96)] text-[#27231d]"
      >
        <Heart className="h-4 w-4" strokeWidth={2.2} />
      </button>
      {filters.map((filter) => {
        const Icon = filter.icon;
        const isActive = activeFilter === filter.id;
        return (
          <button
            key={filter.id}
            onClick={() => setActiveFilter(filter.id)}
            className={`flex shrink-0 items-center gap-1.5 rounded-full px-3.5 py-2 text-[12px] font-semibold transition ${
              isActive
                ? "border border-[#3b2a00] bg-[#3b2a00] text-[#f4c430]"
                : "border border-[rgba(218,218,212,0.9)] bg-[rgba(250,250,247,0.96)] text-[#27231d]"
            }`}
          >
            <Icon className="h-4 w-4" strokeWidth={2.2} fill={filter.id === "liked" ? "currentColor" : "none"} />
            {filter.label ? <span>{filter.label}</span> : null}
          </button>
        );
      })}
    </div>
  );
}

function FeedCard({ card, onClick }) {
  const gallery = card.gallery?.length ? card.gallery : [card.image];
  const [activeSlide, setActiveSlide] = useState(0);
  const slideOffset = gallery.length > 0 ? 100 / gallery.length : 100;

  useEffect(() => {
    setActiveSlide(0);

    if (gallery.length < 2) return undefined;

    let timeoutId;

    const scheduleNextFrame = () => {
      const nextDelay = 5000 + Math.floor(Math.random() * 5001);
      timeoutId = window.setTimeout(() => {
        setActiveSlide((previousSlide) => {
          const step = 1 + Math.floor(Math.random() * Math.max(gallery.length - 1, 1));
          return (previousSlide + step) % gallery.length;
        });
        scheduleNextFrame();
      }, nextDelay);
    };

    scheduleNextFrame();

    return () => window.clearTimeout(timeoutId);
  }, [gallery]);

  return (
    <motion.button
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      onClick={() => onClick(card)}
      className="relative overflow-hidden rounded-[14px] bg-[#f1f1ee] text-left shadow-[0_6px_18px_rgba(82,103,138,0.05)]"
    >
      <div className="relative overflow-hidden rounded-[14px]">
        <div className="overflow-hidden">
          <motion.div
            animate={{ x: `-${activeSlide * slideOffset}%` }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="flex"
            style={{ width: `${gallery.length * 100}%` }}
          >
            {gallery.map((image, index) => (
              <img
                key={`${card.id}-feed-${index}`}
                src={image}
                alt={`${card.title} ${index + 1}`}
                className="aspect-[0.72] shrink-0 object-cover"
                style={{ width: `${100 / gallery.length}%` }}
              />
            ))}
          </motion.div>
        </div>
        {card.badge ? <CardBadge type={card.badge} /> : null}

        <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent px-3 pb-2 pt-10">
          <div className="max-w-[75%] text-[14px] font-semibold leading-tight text-white drop-shadow-sm">
            {card.title}
          </div>
        </div>

        <div className="pointer-events-none absolute bottom-2 right-2 flex items-center gap-1 text-white">
          <Heart className="h-5 w-5 fill-current" />
          <span className="text-[14px] font-medium leading-none">{card.likes}</span>
        </div>
      </div>
    </motion.button>
  );
}

function getTrendUsage(card) {
  const usageByCardId = {
    1: "24K",
    2: "84K",
    3: "56K",
    4: "38K",
    5: "72K",
    6: "41K",
    7: "63K",
    8: "19K",
    9: "102K",
    10: "48K",
    11: "27K",
    12: "91K",
  };

  return usageByCardId[card.id] ?? "32K";
}

function StyleScreen({ card, sectionStyles, onSelectStyle, onRepeatTrend }) {
  const [isLiked, setIsLiked] = useState(false);
  const [activeSlide, setActiveSlide] = useState(0);
  const styleGalleryRef = useRef(null);
  const galleryTouchStartRef = useRef({ x: 0, y: 0 });
  const screenTouchStartRef = useRef({ x: 0, y: 0 });
  const styleGallery = card.gallery?.length ? card.gallery : [card.image];
  const canSlideGallery = styleGallery.length > 1;
  const currentStyleIndex = Math.max(
    0,
    sectionStyles.findIndex((styleCard) => styleCard.id === card.id),
  );

  const goToStyleSlide = (index, behavior = "smooth") => {
    if (!styleGalleryRef.current) return;
    const nextIndex = Math.max(0, Math.min(index, styleGallery.length - 1));
    styleGalleryRef.current.scrollTo({
      left: styleGalleryRef.current.clientWidth * nextIndex,
      behavior,
    });
    setActiveSlide(nextIndex);
  };

  const goToAdjacentTrend = (direction) => {
    if (!sectionStyles.length) return;
    const nextIndex =
      (currentStyleIndex + direction + sectionStyles.length) % sectionStyles.length;
    onSelectStyle(sectionStyles[nextIndex]);
  };

  useEffect(() => {
    setActiveSlide(0);
    requestAnimationFrame(() => goToStyleSlide(0, "auto"));
  }, [card.id]);

  const handleGalleryScroll = (event) => {
    const { scrollLeft, clientWidth } = event.currentTarget;
    if (!clientWidth) return;
    setActiveSlide(Math.round(scrollLeft / clientWidth));
  };

  const handleGalleryTouchStart = (event) => {
    galleryTouchStartRef.current = {
      x: event.touches[0]?.clientX ?? 0,
      y: event.touches[0]?.clientY ?? 0,
    };
  };

  const handleGalleryTouchEnd = (event) => {
    if (!canSlideGallery) return;

    const touchEndX = event.changedTouches[0]?.clientX ?? 0;
    const deltaX = touchEndX - galleryTouchStartRef.current.x;
    const swipeThreshold = 45;

    if (deltaX <= -swipeThreshold && activeSlide === styleGallery.length - 1) {
      goToStyleSlide(0);
      return;
    }

    if (deltaX >= swipeThreshold && activeSlide === 0) {
      goToStyleSlide(styleGallery.length - 1);
    }
  };

  const handleScreenTouchStart = (event) => {
    screenTouchStartRef.current = {
      x: event.touches[0]?.clientX ?? 0,
      y: event.touches[0]?.clientY ?? 0,
    };
  };

  const handleScreenTouchEnd = (event) => {
    const touchEnd = event.changedTouches[0];
    if (!touchEnd) return;

    const deltaX = touchEnd.clientX - screenTouchStartRef.current.x;
    const deltaY = touchEnd.clientY - screenTouchStartRef.current.y;

    if (Math.abs(deltaY) < 60 || Math.abs(deltaY) <= Math.abs(deltaX)) return;

    if (deltaY < 0) {
      goToAdjacentTrend(1);
    } else {
      goToAdjacentTrend(-1);
    }
  };

  return (
    <div
      className="-mx-3 overflow-hidden bg-black"
      style={{ height: "var(--app-height, 100dvh)" }}
      onTouchStart={handleScreenTouchStart}
      onTouchEnd={handleScreenTouchEnd}
    >
      <div className="relative h-full w-full">
        <div
          ref={styleGalleryRef}
          onScroll={handleGalleryScroll}
          onTouchStart={handleGalleryTouchStart}
          onTouchEnd={handleGalleryTouchEnd}
          className={`flex h-full overflow-x-auto scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden ${canSlideGallery ? "snap-x snap-mandatory" : ""}`}
        >
          {styleGallery.map((image, index) => (
            <img
              key={`${card.id}-${index}`}
              src={image}
              alt={`${card.title} ${index + 1}`}
              className={`h-full w-full shrink-0 object-cover ${canSlideGallery ? "snap-start" : ""}`}
            />
          ))}
        </div>

        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/82 via-black/18 to-transparent" />

        {card.badge ? (
          <div className="absolute left-4 top-5">
            <CardBadge type={card.badge} />
          </div>
        ) : null}

        {styleGallery.length > 1 ? (
          <div className="absolute left-4 top-16 flex items-center gap-1.5">
            {styleGallery.map((_, index) => (
              <span
                key={`${card.id}-dot-${index}`}
                className={`h-1.5 rounded-full transition-all ${
                  index === activeSlide ? "w-5 bg-white" : "w-1.5 bg-white/55"
                }`}
              />
            ))}
          </div>
        ) : null}

        <div className="absolute bottom-24 right-4 flex flex-col items-center gap-4 text-white">
          <button
            onClick={() => setIsLiked((prev) => !prev)}
            className="flex flex-col items-center gap-1"
          >
            <span className="flex h-11 w-11 items-center justify-center rounded-full bg-black/28 backdrop-blur-sm">
              <Heart className="h-5 w-5" strokeWidth={2.2} fill={isLiked ? "currentColor" : "none"} />
            </span>
            <span className="text-[12px] font-semibold">{card.likes}</span>
          </button>
          <button className="flex flex-col items-center gap-1">
            <span className="flex h-11 w-11 items-center justify-center rounded-full bg-black/28 backdrop-blur-sm">
              <Share2 className="h-5 w-5" strokeWidth={2.2} />
            </span>
            <span className="text-[12px] font-semibold">Шер</span>
          </button>
        </div>

        <div className="absolute inset-x-0 bottom-0 px-4 pb-5">
          <div className="max-w-[78%]">
            <div className="text-[22px] font-semibold tracking-[-0.03em] text-white">
              {card.title}
            </div>
            <div className="mt-2 text-[14px] leading-6 text-white/86">{card.description}</div>
            <div className="mt-3 flex items-center gap-2 text-[13px] font-medium text-white/90">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/14 backdrop-blur-sm">
                <User className="h-4 w-4" strokeWidth={2.1} />
              </span>
              <span>{getTrendUsage(card)} выбрали</span>
            </div>
          </div>

          <button
            onClick={onRepeatTrend}
            className="mt-5 flex w-full items-center justify-center gap-2 rounded-[24px] bg-[linear-gradient(135deg,#ffe27a_0%,#f4c430_55%,#dba400_100%)] px-5 py-4 text-[16px] font-semibold text-[#3b2a00] shadow-[0_18px_34px_rgba(244,196,48,0.26)]"
          >
            Повторить тренд
          </button>
        </div>
      </div>
    </div>
  );
}

function CreateTrendScreen({
  card,
  onOpenBalance,
  onOpenProfile,
  balance,
  isBonusCounting,
  onCreate,
}) {
  const [hasPhoto, setHasPhoto] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [aspectRatio, setAspectRatio] = useState("9:16");
  const [quality, setQuality] = useState("excellent");
  const [duration, setDuration] = useState("10");

  const uploadedPreview =
    "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=1200&q=80";
  const isVideoTrend = card.categories?.includes("video");

  const handleUpload = () => {
    if (isUploading) return;
    setIsUploading(true);
    window.setTimeout(() => {
      setHasPhoto(true);
      setIsUploading(false);
    }, 900);
  };

  return (
    <div className="space-y-4">
      <PinnedSectionHeader className="pt-0">
        <Header
          onOpenBalance={onOpenBalance}
          onOpenProfile={onOpenProfile}
          balance={balance}
          isBonusCounting={isBonusCounting}
        />
      </PinnedSectionHeader>

      <div className="space-y-4 rounded-[28px] bg-white p-4 shadow-[0_8px_32px_rgba(70,89,122,0.08)] ring-1 ring-[#dce4f2]">
        <div>
          <div className="text-[24px] font-semibold tracking-[-0.03em] text-[#1d2333]">
            {card.title}
          </div>
          <div className="mt-2 text-[14px] leading-6 text-[#6f7d95]">
            Подготовь кадр для генерации и запусти повтор тренда в пару касаний.
          </div>
        </div>

        <div>
          {hasPhoto ? (
            <div className="relative h-[188px] overflow-hidden rounded-[22px] border border-[#ead9a4] bg-[#fff9e8]">
              <img src={uploadedPreview} alt="uploaded preview" className="h-full w-full object-cover" />
              <div className="absolute left-3 top-3 flex items-center gap-2 rounded-full bg-[#f4c430] px-3 py-1.5 text-[#3b2a00] shadow-[0_10px_20px_rgba(244,196,48,0.22)]">
                <Check className="h-4 w-4" strokeWidth={2.4} />
                <span className="text-[13px] font-semibold">Фото загружено</span>
              </div>
              <button
                onClick={() => setHasPhoto(false)}
                className="absolute right-3 top-3 rounded-full bg-white/92 px-3 py-1.5 text-[12px] font-semibold text-[#7a5a00]"
              >
                Заменить
              </button>
            </div>
          ) : (
            <button
              onClick={handleUpload}
              className="relative flex h-[188px] w-full flex-col items-center justify-center overflow-hidden rounded-[22px] border-2 border-dashed border-[#ead9a4] bg-[#fff9e8] px-4 text-center"
            >
              <motion.div
                initial={{ scaleX: 0, opacity: 0 }}
                animate={{ scaleX: isUploading ? 1 : 0, opacity: isUploading ? 1 : 0 }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
                className="absolute inset-0 z-0 origin-left bg-[#f4c430]/20"
              />
              <div className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full bg-[#f4c430] text-[#3b2a00] shadow-[0_10px_20px_rgba(244,196,48,0.18)]">
                {isUploading ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 0.8, ease: "linear" }}
                    className="h-6 w-6 rounded-full border-2 border-white/90 border-t-transparent"
                  />
                ) : (
                  <Upload className="h-6 w-6" strokeWidth={2.1} />
                )}
              </div>
              <div className="relative z-10 mt-3 text-[16px] font-semibold text-[#234677]">
                {isUploading ? "Загрузка..." : "Загрузить фото"}
              </div>
              <div className="relative z-10 mt-1 text-[13px] leading-5 text-[#7d8ca5]">
                JPG, PNG
              </div>
            </button>
          )}
        </div>

        <div className="space-y-3 rounded-[22px] bg-[#fbfcfe] p-4 ring-1 ring-[#e7edf6]">
          <div>
            <div className="text-[13px] font-semibold uppercase tracking-[0.04em] text-[#7b889f]">
              Соотношение сторон
            </div>
            <div className="mt-3 flex gap-2">
              {["9:16", "4:5", "1:1"].map((value) => (
                <button
                  key={value}
                  onClick={() => setAspectRatio(value)}
                  className={`rounded-full px-4 py-2 text-[13px] font-semibold transition ${
                    aspectRatio === value
                      ? "bg-[#f4c430] text-[#3b2a00]"
                      : "border border-[rgba(224,231,242,0.85)] bg-white text-[#5a6e90]"
                  }`}
                >
                  {value}
                </button>
              ))}
            </div>
          </div>

          <div>
            <div className="text-[13px] font-semibold uppercase tracking-[0.04em] text-[#7b889f]">
              Качество генерации
            </div>
            <div className="mt-3 flex gap-2">
              {[
                { id: "excellent", label: "Отлично" },
                { id: "super", label: "Супер" },
              ].map((option) => (
                <button
                  key={option.id}
                  onClick={() => setQuality(option.id)}
                  className={`rounded-full px-4 py-2 text-[13px] font-semibold transition ${
                    quality === option.id
                      ? "bg-[#f4c430] text-[#3b2a00]"
                      : "border border-[rgba(224,231,242,0.85)] bg-white text-[#5a6e90]"
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          {isVideoTrend ? (
            <div>
              <div className="text-[13px] font-semibold uppercase tracking-[0.04em] text-[#7b889f]">
                Длительность видео
              </div>
              <div className="mt-3 flex gap-2">
                {["5", "10", "15"].map((value) => (
                  <button
                    key={value}
                    onClick={() => setDuration(value)}
                    className={`rounded-full px-4 py-2 text-[13px] font-semibold transition ${
                      duration === value
                        ? "bg-[#f4c430] text-[#3b2a00]"
                        : "border border-[rgba(224,231,242,0.85)] bg-white text-[#5a6e90]"
                    }`}
                  >
                    {value} сек
                  </button>
                ))}
              </div>
            </div>
          ) : null}
        </div>

        <button
          onClick={() =>
            onCreate({
              previewImage: uploadedPreview,
              hasUploadedPhoto: hasPhoto,
            })
          }
          className="flex w-full items-center justify-center gap-2 rounded-[24px] bg-[linear-gradient(135deg,#ffe27a_0%,#f4c430_55%,#dba400_100%)] px-5 py-4 text-[16px] font-semibold text-[#3b2a00] shadow-[0_16px_32px_rgba(244,196,48,0.24)]"
        >
          <span>Создать за 1</span>
          <Sparkles className="h-5 w-5" strokeWidth={2.1} />
        </button>
      </div>
    </div>
  );
}

function TaskCard({ task }) {
  return (
    <div className="rounded-[22px] border border-[#dce4f2] bg-white p-4 shadow-[0_8px_24px_rgba(70,89,122,0.06)]">
      <div className="space-y-3">
        <div className="flex items-center justify-between gap-3 rounded-[14px] bg-[#fff9e8] px-3 py-2">
          <div className="min-w-0 text-[16px] font-semibold text-[#234677]">{task.title}</div>
          <div className="flex shrink-0 items-center gap-1 rounded-full bg-[#fff4c9] px-3 py-1.5 text-[13px] font-semibold text-[#7a5a00]">
            <span>+{task.reward}</span>
            <Sparkles className="h-4 w-4" strokeWidth={2.1} />
          </div>
        </div>

        <div className="flex items-end justify-between gap-3">
          <div className="max-w-[72%] text-[13px] leading-5 text-[#7d8ca5]">{task.description}</div>
          <button className="flex shrink-0 items-center justify-center gap-2 rounded-[16px] bg-[#3cc95a] px-4 py-3 text-[14px] font-semibold text-white transition hover:bg-[#31b24d]">
            <Play className="h-4 w-4" strokeWidth={2.2} />
            Начать
          </button>
        </div>
      </div>
    </div>
  );
}

function ProductCard({ product, isSelected, onSelect }) {
  const isFeatured = !!product.featured;
  const hasDiscount = Boolean(product.discountedPrice);

  return (
    <button
      onClick={() => onSelect(product.id)}
      className={`relative w-full overflow-hidden rounded-[24px] border text-left shadow-[0_8px_24px_rgba(70,89,122,0.05)] transition ${
        isFeatured
          ? "border-[rgba(184,212,247,0.9)] bg-[linear-gradient(180deg,#f0f7ff_0%,#e4f0ff_100%)]"
          : "border-[rgba(225,232,242,0.9)] bg-[rgba(248,250,253,0.96)]"
      } ${isSelected ? "ring-2 ring-[#f4c430] ring-offset-2 ring-offset-transparent" : ""}`}
    >
      <div className={`relative px-5 py-[10px] ${isFeatured ? "text-[#7a5a00]" : "text-[#1d2333]"}`}>
        {product.badge ? (
          <div
            className={`absolute right-3 top-1 rounded-[12px] px-[10px] py-[5px] text-[10px] font-semibold leading-none shadow-[0_8px_18px_rgba(15,23,42,0.08)] ${product.badgeColor}`}
          >
            {product.badge}
          </div>
        ) : null}

        <div className="flex items-end justify-between gap-4">
          <div className="min-w-0 pr-3">
            <div className={`text-[18px] font-medium ${isFeatured ? "text-[#9b7a16]" : "text-[#767f93]"}`}>
              {product.subtitle}
            </div>
            <div className={`mt-1 text-[21px] font-semibold tracking-[-0.03em] ${isFeatured ? "text-[#7a5a00]" : "text-[#161c2c]"}`}>
              {product.amount} фотографий
            </div>
          </div>
          <div className="shrink-0 text-right">
            {hasDiscount ? (
              <div className={`mb-0.5 text-[14px] font-semibold leading-none line-through ${isFeatured ? "text-[#7a8fb2]" : "text-[#8d98ad]"}`}>
                {product.price}
              </div>
            ) : null}
            <div className={`text-[21px] font-semibold tracking-[-0.03em] ${isFeatured ? "text-[#7a5a00]" : "text-[#161c2c]"}`}>
              {product.discountedPrice ?? product.price}
            </div>
          </div>
        </div>
      </div>
    </button>
  );
}

function ShopScreen({
  onBack,
  onOpenBalance,
  onOpenProfile,
  selectedProductId,
  setSelectedProductId,
  balance,
  isBonusCounting,
  showExitOffer,
  onActivateDiscount,
  onDismissExitOffer,
  discountActive,
  discountTimeLeft,
}) {
  const shopBenefits = [
    "Создавай виральный контент за минуты",
    "Забудь про фотошоп обработку",
    "Разовая оплата без подписок",
  ];

  const discountedProducts = useMemo(
    () =>
      products.map((product) => {
        if (!discountActive) return product;

        const originalPrice = Number(product.price.replace(/[^\d]/g, ""));
        const discountedPrice = Math.round(originalPrice * 0.95);

        return {
          ...product,
          discountedPrice: `${discountedPrice.toLocaleString("ru-RU")} ₽`,
        };
      }),
    [discountActive],
  );

  return (
    <div className="relative space-y-3">
      <PinnedSectionHeader className="pt-0">
        <Header
          onOpenBalance={onOpenBalance}
          onOpenProfile={onOpenProfile}
          balance={balance}
          isBonusCounting={isBonusCounting}
        />
      </PinnedSectionHeader>

      <div className="space-y-5 rounded-[30px] bg-white px-4 pb-5 pt-2 shadow-[0_8px_32px_rgba(70,89,122,0.08)] ring-1 ring-[#dce4f2]">
        {discountActive ? (
          <div className="flex items-center justify-between gap-3 overflow-hidden rounded-[16px] bg-[linear-gradient(90deg,#ff8b2c_0%,#ff5630_45%,#ff2a2a_100%)] px-4 py-1.5 text-white shadow-[0_10px_24px_rgba(255,102,56,0.18)]">
            <span className="text-[17px] font-bold uppercase tracking-[-0.03em]">
              Скидка активирована -5%
            </span>
            <span className="shrink-0 rounded-full bg-white/18 px-3 py-0.5 text-[17px] font-bold tabular-nums">
              {discountTimeLeft}
            </span>
          </div>
        ) : null}

        {!discountActive ? (
          <div className="space-y-3 px-1 pt-[5px]">
            <div className="text-[22px] font-semibold leading-[1.02] tracking-[-0.04em] text-[#161c2c]">
              Твои идеальные фото за 1 минуту
            </div>
          </div>
        ) : null}

        <div className="space-y-2.5">
          {discountedProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              isSelected={selectedProductId === product.id}
              onSelect={setSelectedProductId}
            />
          ))}
        </div>

        <div className="space-y-3 px-2 pt-1">
          {shopBenefits.map((benefit) => (
            <div key={benefit} className="flex items-start gap-3 text-[16px] font-medium leading-6 text-[#667389]">
              <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#f4c430] text-[#3b2a00] shadow-[0_8px_18px_rgba(244,196,48,0.2)]">
                <Check className="h-4 w-4" strokeWidth={3} />
              </div>
              <div>{benefit}</div>
            </div>
          ))}
        </div>

        <div className="pt-2">
          <button className="flex w-full items-center justify-center rounded-[28px] bg-[linear-gradient(135deg,#5bc2ff_0%,#2b7de9_52%,#1f63c9_100%)] px-5 py-4 text-[17px] font-semibold text-white shadow-[0_18px_34px_rgba(43,125,233,0.22)]">
            Перейти к оплате
          </button>
        </div>
      </div>

      {showExitOffer ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/35 px-5">
          <div className="w-full max-w-[420px] rounded-[28px] bg-white px-6 pb-5 pt-7 text-center shadow-[0_24px_70px_rgba(15,23,42,0.26)]">
            <div className="text-[70px] leading-none">💔</div>
            <div className="mt-4 text-[22px] font-semibold tracking-[-0.04em] text-[#1d2333]">
              Так быстро уходите?
            </div>
            <div className="mt-4 text-[17px] leading-7 text-[#6f7d95]">
              Мы для вас подготовили персональную скидку. Она сгорит через 10 минут 🙈
            </div>
            <button
              onClick={onActivateDiscount}
              className="mt-6 flex w-full items-center justify-center rounded-[24px] bg-[linear-gradient(135deg,#ffe27a_0%,#f4c430_55%,#dba400_100%)] px-5 py-4 text-[17px] font-semibold text-[#3b2a00] shadow-[0_16px_34px_rgba(244,196,48,0.22)]"
            >
              Активировать скидку
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}

function ProfileScreen({ onBack, onOpenBalance, onOpenProfile, balance, isBonusCounting }) {
  const [profileTab, setProfileTab] = useState("tasks");

  return (
    <div className="space-y-3">
      <PinnedSectionHeader className="pt-0">
        <Header
          onOpenBalance={onOpenBalance}
          onOpenProfile={onOpenProfile}
          balance={balance}
          isBonusCounting={isBonusCounting}
        />

        <div className="px-0 pt-0">
          <div className="mt-[-5px] overflow-x-auto rounded-[20px] bg-[rgba(246,246,242,0.96)] px-2 py-2 pr-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            <div className="flex items-center gap-2 pr-2">
              {[
                { id: "settings", label: "", icon: Settings },
                { id: "tasks", label: "Задания", icon: ClipboardList },
                { id: "bonus", label: "Бонус", icon: Gift },
                { id: "photos", label: "Фотографии", icon: Image },
                { id: "history", label: "История", icon: History },
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => setProfileTab(item.id)}
                    className={`flex shrink-0 items-center gap-1.5 rounded-full px-3.5 py-2 text-[12px] font-semibold transition ${
                      profileTab === item.id
                        ? "border border-[#3b2a00] bg-[#3b2a00] text-[#f4c430]"
                        : "border border-[rgba(218,218,212,0.9)] bg-[rgba(250,250,247,0.96)] text-[#27231d]"
                    }`}
                  >
                    <Icon className="h-4 w-4" strokeWidth={2.2} />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </PinnedSectionHeader>

      {profileTab === "settings" ? (
        <div className="space-y-2.5">
          {[
            { label: "Уведомления", value: "Включены" },
            { label: "Язык интерфейса", value: "Русский" },
            { label: "Автосохранение фото", value: "Включено" },
            { label: "Поддержка", value: "Написать" },
          ].map((item) => (
            <button
              key={item.label}
              className="flex w-full items-center justify-between gap-4 rounded-[18px] border border-[#dce4f2] bg-white px-4 py-4 text-left shadow-[0_6px_22px_rgba(82,103,138,0.06)]"
            >
              <div className="min-w-0 flex-1">
                <div className="text-[15px] font-semibold text-[#234677]">{item.label}</div>
              </div>
              <div className="shrink-0 text-[13px] font-medium text-[#8a97ad]">{item.value}</div>
            </button>
          ))}
        </div>
      ) : profileTab === "tasks" ? (
        <div className="space-y-2.5">
          {tasks.map((task) => (
            <TaskCard key={task.id} task={task} />
          ))}
        </div>
      ) : profileTab === "bonus" ? (
        <div className="space-y-3">
          <div className="rounded-[22px] border border-[#dce4f2] bg-white p-4 shadow-[0_8px_24px_rgba(70,89,122,0.06)]">
            <div className="flex items-center justify-between gap-3 rounded-[16px] bg-[#fff9e8] px-4 py-3">
              <div>
                <div className="text-[15px] font-semibold text-[#234677]">Ежедневный бонус</div>
                <div className="mt-1 text-[13px] leading-5 text-[#7d8ca5]">
                  Заходи каждый день и получай дополнительные фотографии на баланс.
                </div>
              </div>
              <div className="flex h-11 min-w-[88px] items-center justify-center gap-2 rounded-full bg-[#fff4c9] px-4 text-[#7a5a00]">
                <span className="text-[14px] font-semibold">+5</span>
                <Sparkles className="h-4 w-4" strokeWidth={2.1} />
              </div>
            </div>
          </div>

          <div className="rounded-[22px] border border-[#dce4f2] bg-white p-4 shadow-[0_8px_24px_rgba(70,89,122,0.06)]">
            <div className="text-[15px] font-semibold text-[#234677]">Приглашай друзей</div>
            <div className="mt-2 text-[13px] leading-5 text-[#7d8ca5]">
              За каждого нового друга можно получать бонусные фотографии и ускорять генерацию.
            </div>
            <div className="mt-4 grid grid-cols-2 gap-2">
              <button className="flex items-center justify-center gap-2 rounded-[16px] bg-[#3cc95a] px-4 py-3 text-[14px] font-semibold text-white transition hover:bg-[#31b24d]">
                <Send className="h-4 w-4" strokeWidth={2.2} />
                Отправить
              </button>
              <button className="flex items-center justify-center gap-2 rounded-[16px] bg-[#fff4c9] px-4 py-3 text-[14px] font-semibold text-[#7a5a00] transition hover:bg-[#ffeaa0]">
                <Copy className="h-4 w-4" strokeWidth={2.2} />
                Скопировать
              </button>
            </div>
          </div>
        </div>
      ) : profileTab === "photos" ? (
        <div className="grid grid-cols-2 gap-2">
          {cards.slice(0, 6).map((card) => (
            <div
              key={card.id}
              className="relative overflow-hidden rounded-[18px] border border-[#dbe4f2] bg-white shadow-[0_6px_22px_rgba(82,103,138,0.06)]"
            >
              <img
                src={card.image}
                alt={card.title}
                className="aspect-[0.92] w-full object-cover"
              />
              <button className="absolute bottom-3 right-3 flex h-12 w-12 items-center justify-center rounded-full bg-[#f4c430] text-[#3b2a00] shadow-[0_10px_22px_rgba(244,196,48,0.28)]">
                <Download className="h-6 w-6" strokeWidth={2.2} />
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-2.5">
          {[
            { text: "Создан стиль «Пара в городе»", time: "2 часа назад" },
            { text: "Куплен пакет 100 изображений", time: "вчера" },
            { text: "Выполнено задание «Подпишись на канал»", time: "2 дня назад" },
          ].map((item) => (
            <div
              key={item.text}
              className="flex items-center justify-between gap-4 rounded-[18px] border border-[#dce4f2] bg-white px-4 py-4 text-[14px] font-medium text-[#607394] shadow-[0_6px_22px_rgba(82,103,138,0.06)]"
            >
              <div className="min-w-0 flex-1 text-[#607394]">{item.text}</div>
              <div className="shrink-0 text-right text-[13px] text-[#9aa8bf]">
                {item.time}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function LoadingScreen({
  card,
  previewImage,
  hasUploadedPhoto,
  onOpenBalance,
  onOpenProfile,
  onComplete,
  balance,
  isBonusCounting,
}) {
  const loadingImage = hasUploadedPhoto ? previewImage : card.image;

  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, 2200);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="space-y-3">
      <PinnedSectionHeader className="pt-0">
        <Header
          onOpenBalance={onOpenBalance}
          onOpenProfile={onOpenProfile}
          balance={balance}
          isBonusCounting={isBonusCounting}
        />
      </PinnedSectionHeader>

      <div className="rounded-[22px] bg-[#f6f6f2] px-4 pb-4 pt-4 ring-1 ring-[#e4e1d9]">
        <div className="text-center">
          <div className="flex items-center justify-center gap-2 text-[18px] font-semibold tracking-[-0.02em] text-[#234677]">
            <Sparkles className="h-5 w-5 text-[#dba400]" strokeWidth={2.2} />
            <span>Создание фото</span>
          </div>

          <div className="mt-3 rounded-[18px] bg-white/88 px-4 py-3 shadow-[0_8px_20px_rgba(42,36,24,0.06)]">
            <div className="flex items-center justify-between">
              <div className="text-[12px] font-semibold text-[#234677]">87%</div>
            </div>
            <div className="mt-2 h-2 overflow-hidden rounded-full bg-[#ebe8df]">
              <motion.div
                initial={{ width: "12%" }}
                animate={{ width: ["12%", "48%", "72%", "87%"] }}
                transition={{ duration: 2.4, ease: "easeInOut" }}
                className="h-full rounded-full bg-[linear-gradient(90deg,#ffe27a_0%,#f4c430_55%,#dba400_100%)]"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="overflow-hidden rounded-[28px] bg-white p-3.5 shadow-[0_8px_32px_rgba(70,89,122,0.08)] ring-1 ring-[#dce4f2]">
        <div className="relative overflow-hidden rounded-[24px]">
          <img
            src={loadingImage}
            alt={card.title}
            className={`aspect-[1.08] w-full object-cover transition ${
              hasUploadedPhoto ? "scale-[0.96] opacity-60 blur-[1px]" : ""
            }`}
          />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(50,39,19,0.06)_0%,rgba(59,42,0,0.18)_100%)]" />

          <div className="absolute inset-0 flex items-center justify-center">
            <div className="flex items-center gap-2 rounded-full bg-white/90 px-5 py-3 text-[#7a5a00] shadow-[0_12px_28px_rgba(244,196,48,0.16)] backdrop-blur-sm">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                className="flex h-5 w-5 items-center justify-center"
              >
                <Wand2 className="h-4.5 w-4.5" strokeWidth={2.2} />
              </motion.div>
            </div>
          </div>

          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/50 to-transparent px-5 pb-5 pt-10 text-white">
            <div className="text-[13px] leading-5 text-white/85">
              Подготавливаем финальное изображение
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ResultScreen({ card, onBack, onOpenBalance, onOpenProfile, balance, isBonusCounting }) {
  const [rating, setRating] = useState(5);

  return (
    <div className="space-y-3">
      <PinnedSectionHeader className="pt-0">
        <Header
          onOpenBalance={onOpenBalance}
          onOpenProfile={onOpenProfile}
          balance={balance}
          isBonusCounting={isBonusCounting}
        />
      </PinnedSectionHeader>

      <div className="rounded-[22px] bg-[#f6f6f2] px-4 pb-4 pt-4 ring-1 ring-[#e4e1d9]">
        <div className="text-center">
          <div className="flex items-center justify-center gap-2 text-[18px] font-semibold tracking-[-0.02em] text-[#234677]">
            <Check className="h-5 w-5 text-[#3cc95a]" strokeWidth={2.6} />
            <span>Фото готово</span>
          </div>
        </div>
      </div>

      <div className="overflow-hidden rounded-[28px] bg-white p-3.5 shadow-[0_8px_32px_rgba(70,89,122,0.08)] ring-1 ring-[#dce4f2]">
        <div className="relative overflow-hidden rounded-[24px]">
          <img src={card.image} alt={card.title} className="aspect-[1.08] w-full object-cover" />

          <button className="absolute bottom-4 right-4 flex items-center gap-2 rounded-full bg-[#f4c430] px-4 py-3 text-[#3b2a00] shadow-[0_12px_24px_rgba(244,196,48,0.24)]">
            <Download className="h-5 w-5" strokeWidth={2.2} />
            <span className="text-[13px] font-semibold">Скачать</span>
          </button>
        </div>

        <div className="mt-3 flex items-center justify-between gap-2 rounded-[18px] bg-[#f3f1eb] px-4 py-3">
          <div className="flex min-w-0 flex-1 items-center gap-2">
            <span className="shrink-0 text-[13px] font-semibold text-[#7d8ca5]">Поставь оценку</span>
            <div className="flex min-w-0 items-center gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onClick={() => setRating(star)}
                  className="shrink-0 text-[22px] leading-none transition active:scale-[0.92]"
                >
                  <span className={star <= rating ? "text-[#ffbf1f]" : "text-[#d7d2c6]"}>
                    {star <= rating ? "★" : "☆"}
                  </span>
                </button>
              ))}
            </div>
          </div>

          <button className="ml-2 shrink-0 rounded-full bg-[#ebe7dd] px-3 py-1.5 text-[11px] font-semibold text-[#5f5748] shadow-[0_6px_14px_rgba(91,79,56,0.08)]">
            Отправить
          </button>
        </div>
      </div>

      <div className="space-y-2">
        <button className="flex w-full items-center justify-center gap-2 rounded-[22px] bg-[#3cc95a] px-5 py-4 text-[15px] font-semibold text-white shadow-[0_14px_28px_rgba(60,201,90,0.24)]">
          <Plus className="h-5 w-5" strokeWidth={2.2} />
          Опубликовать в Сторис
        </button>
        <button className="flex w-full items-center justify-center gap-2 rounded-[22px] bg-[#f4c430] px-5 py-4 text-[15px] font-semibold text-[#3b2a00] shadow-[0_14px_28px_rgba(244,196,48,0.24)]">
          <Send className="h-5 w-5" strokeWidth={2.2} />
          Отправить в чат
        </button>
      </div>
    </div>
  );
}

function ErrorScreen({ onRetry, onOpenBalance, onOpenProfile, balance, isBonusCounting }) {
  return (
    <div className="space-y-3">
      <PinnedSectionHeader className="pt-0">
        <Header
          onOpenBalance={onOpenBalance}
          onOpenProfile={onOpenProfile}
          balance={balance}
          isBonusCounting={isBonusCounting}
        />
      </PinnedSectionHeader>

      <div className="rounded-[24px] bg-[#fff7f7] px-4 pb-5 pt-5 ring-1 ring-[#f3d7d7]">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#ffefe9] text-[#ef5b47] shadow-[0_12px_24px_rgba(239,91,71,0.14)]">
          <AlertTriangle className="h-7 w-7" strokeWidth={2.2} />
        </div>

        <div className="mt-4 text-center">
          <div className="text-[24px] font-semibold tracking-[-0.03em] text-[#243247]">Ошибка</div>
          <div className="mt-2 text-[16px] font-medium text-[#4f617e]">Что-то пошло не так</div>
          <div className="mt-3 text-[14px] leading-6 text-[#7b889f]">
            Мы вернули токены на ваш баланс
          </div>
        </div>
      </div>

      <button
        onClick={onRetry}
        className="flex w-full items-center justify-center gap-2 rounded-[22px] bg-[#f4c430] px-5 py-4 text-[16px] font-semibold text-[#3b2a00] shadow-[0_14px_28px_rgba(244,196,48,0.24)]"
      >
        <Wand2 className="h-5 w-5" strokeWidth={2.2} />
        Попробовать еще раз
      </button>
    </div>
  );
}

function SectionPanel({ section, onSelectCard }) {
  if (!section) {
    return <div className="w-full shrink-0" />;
  }

  return (
    <div className="space-y-3 bg-white px-2 pb-6">
      <div className="grid grid-cols-2 gap-2">
        {section.cards.map((card) => (
          <FeedCard key={card.id} card={card} onClick={() => onSelectCard(card, section)} />
        ))}
      </div>
    </div>
  );
}

function SectionScreen({
  section,
  sections,
  onChangeSection,
  onSelectCard,
  onOpenBalance,
  onOpenProfile,
  balance,
  isBonusCounting,
}) {
  return (
    <div className="space-y-4">
      <PinnedSectionHeader className="pt-0">
        <Header
          onOpenBalance={onOpenBalance}
          onOpenProfile={onOpenProfile}
          balance={balance}
          isBonusCounting={isBonusCounting}
        />

        <div className="mt-[-5px] overflow-x-auto rounded-[20px] bg-[rgba(246,246,242,0.96)] px-2 py-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <div className="flex items-center gap-2 pr-2">
            {sections.map((item) => (
              <button
                key={item.id}
                onClick={() => onChangeSection(item)}
                className={`shrink-0 rounded-full px-3.5 py-2 text-[12px] font-semibold transition ${
                  item.id === section.id
                    ? "border border-[#3b2a00] bg-[#3b2a00] text-[#f4c430]"
                    : "border border-[rgba(218,218,212,0.9)] bg-[rgba(250,250,247,0.96)] text-[#27231d]"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </PinnedSectionHeader>

      <SectionPanel section={section} onSelectCard={onSelectCard} />
    </div>
  );
}

function FeedScreen({
  activeFilter,
  setActiveFilter,
  visibleCards,
  onOpenSection,
  onSelectCard,
  onOpenBalance,
  onOpenProfile,
  balance,
  isBonusCounting,
}) {
  const feedSections = feedSectionTemplates
    .map((section) => ({
      ...section,
      cards: section.cardIds
        .map((cardId) => visibleCards.find((card) => card.id === cardId))
        .filter(Boolean),
    }))
    .filter((section) => section.cards.length > 0);

  return (
    <>
      <PinnedSectionHeader className="pt-0">
        <Header
          onOpenBalance={onOpenBalance}
          onOpenProfile={onOpenProfile}
          balance={balance}
          isBonusCounting={isBonusCounting}
        />
        <FilterBar activeFilter={activeFilter} setActiveFilter={setActiveFilter} />
      </PinnedSectionHeader>

      <div className="-mr-3 space-y-[0px] bg-white pb-3 pt-[18px]">
        {feedSections.map((section) => (
          <section key={section.id} className="space-y-0.5 pt-5">
            <div className="flex items-center justify-between gap-3 px-2">
              <button
                onClick={() => onOpenSection(section)}
                className="flex w-full items-center justify-between gap-3 px-1 py-1 text-left"
              >
                <h2 className="text-[16px] font-medium tracking-[-0.02em] text-[#101418]">
                  {section.label}
                </h2>
                <span className="flex shrink-0 items-center gap-1.5 text-[13px] font-medium text-[#6d7a90]">
                  <User className="h-4 w-4" strokeWidth={2.1} />
                  <span>{section.audience}</span>
                </span>
              </button>
            </div>

            <div className="flex gap-2 overflow-x-auto px-2 pb-1 pr-0">
              {section.cards.map((card) => (
                <div key={card.id} className="w-[168px] shrink-0">
                  <FeedCard card={card} onClick={() => onSelectCard(card, section)} />
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>
    </>
  );
}

export default function App() {
  const { isTelegram } = useTelegramWebApp();
  const appShellRef = useRef(null);
  const [activeFilter, setActiveFilter] = useState("all");
  const [screen, setScreen] = useState("feed");
  const [selectedCard, setSelectedCard] = useState(cards[0]);
  const [selectedSection, setSelectedSection] = useState(null);
  const [selectedProductId, setSelectedProductId] = useState(3);
  const [loadingPreviewImage, setLoadingPreviewImage] = useState(cards[0].image);
  const [hasUploadedPhotoForLoading, setHasUploadedPhotoForLoading] = useState(false);
  const [resultImage, setResultImage] = useState(cards[0].image);
  const [generationOutcome, setGenerationOutcome] = useState("result");
  const [showWelcomeBonus, setShowWelcomeBonus] = useState(true);
  const [balance, setBalance] = useState(0);
  const [isBonusCounting, setIsBonusCounting] = useState(false);
  const [isBonusClaimClosing, setIsBonusClaimClosing] = useState(false);
  const [shopDiscountActive, setShopDiscountActive] = useState(false);
  const [showShopExitOffer, setShowShopExitOffer] = useState(false);
  const [pendingScreenAfterShop, setPendingScreenAfterShop] = useState("feed");
  const [shopDiscountEndsAt, setShopDiscountEndsAt] = useState(null);
  const [discountTimeLeft, setDiscountTimeLeft] = useState("10:00");

  const visibleCards = useMemo(() => {
    let filteredCards = cards;

    if (activeFilter === "popular") filteredCards = cards.filter((card) => card.badge === "popular");
    else if (activeFilter === "new") filteredCards = cards.filter((card) => card.badge === "new");
    else if (activeFilter === "photo")
      filteredCards = cards.filter((card) => !card.categories?.includes("video"));
    else if (activeFilter === "video") filteredCards = cards.filter((card) => card.categories?.includes("video"));

    return filteredCards;
  }, [activeFilter]);

  const availableSections = useMemo(
    () =>
      feedSectionTemplates
        .map((section) => ({
          ...section,
          cards: section.cardIds
            .map((cardId) => visibleCards.find((card) => card.id === cardId))
            .filter(Boolean),
        }))
        .filter((section) => section.cards.length > 0),
    [visibleCards],
  );

  const currentSectionStyles = useMemo(
    () =>
      selectedSection?.cards?.some((item) => item.id === selectedCard.id)
        ? selectedSection.cards
        : cards.filter((item) => item.section === selectedCard.section),
    [selectedCard, selectedSection],
  );

  const currentStyleSection = useMemo(
    () =>
      selectedSection?.cards?.some((item) => item.id === selectedCard.id)
        ? selectedSection
        : availableSections.find((section) => section.id === selectedCard.section) ??
      styleSections.find((section) => section.id === selectedCard.section) ??
      selectedSection,
    [availableSections, selectedCard, selectedSection],
  );

  const handleSelectCard = (card, sectionOverride) => {
    setSelectedCard(card);
    const nextSection =
      sectionOverride ??
      availableSections.find((section) => section.cards?.some((item) => item.id === card.id)) ??
      styleSections.find((section) => section.id === card.section);
    if (nextSection) setSelectedSection(nextSection);
    setResultImage(card.image);
    setScreen("style");
  };

  const handleOpenSection = (section) => {
    setSelectedSection(section);
    setScreen("section");
  };

  const handleOpenBalance = () => {
    setScreen("shop");
  };

  const handleOpenProfile = () => {
    setScreen("profile");
  };

  const requestShopExit = (nextScreen = "feed") => {
    if (shopDiscountActive) {
      setScreen(nextScreen);
      return;
    }

    setPendingScreenAfterShop(nextScreen);
    setShowShopExitOffer(true);
  };

  useEffect(() => {
    if (!shopDiscountActive || !shopDiscountEndsAt) return undefined;

    const tick = () => {
      const remainingMs = Math.max(0, shopDiscountEndsAt - Date.now());
      const totalSeconds = Math.ceil(remainingMs / 1000);
      const minutes = String(Math.floor(totalSeconds / 60)).padStart(2, "0");
      const seconds = String(totalSeconds % 60).padStart(2, "0");
      setDiscountTimeLeft(`${minutes}:${seconds}`);

      if (remainingMs <= 0) {
        setShopDiscountActive(false);
        setShopDiscountEndsAt(null);
        setDiscountTimeLeft("10:00");
      }
    };

    tick();
    const intervalId = window.setInterval(tick, 1000);

    return () => window.clearInterval(intervalId);
  }, [shopDiscountActive, shopDiscountEndsAt]);

  useEffect(() => {
    const backButton = window.Telegram?.WebApp?.BackButton;
    if (!backButton) return undefined;

    const handleBack = () => {
      setScreen((currentScreen) => {
        if (currentScreen === "feed") return currentScreen;
        if (currentScreen === "create") return "style";
        if (currentScreen === "style") return selectedSection ? "section" : "feed";
        if (currentScreen === "section") return "feed";
        if (currentScreen === "profile") return "feed";
        if (currentScreen === "loading") return "create";
        if (currentScreen === "error") return "create";
        if (currentScreen === "result") return "feed";
        if (currentScreen === "shop") {
          if (!shopDiscountActive) {
            setPendingScreenAfterShop("feed");
            setShowShopExitOffer(true);
            return currentScreen;
          }
          return "feed";
        }
        return "feed";
      });
    };

    if (screen === "feed") {
      backButton.hide();
      backButton.offClick(handleBack);
      return undefined;
    }

    backButton.show();
    backButton.onClick(handleBack);

    return () => {
      backButton.offClick(handleBack);
    };
  }, [screen, shopDiscountActive, selectedSection]);

  const claimWelcomeBonus = () => {
    if (isBonusCounting || isBonusClaimClosing) return;
    setIsBonusClaimClosing(true);

    const duration = 900;
    const total = 20;
    const closeDelay = 280;

    setTimeout(() => {
      setShowWelcomeBonus(false);
      setBalance(0);
      setIsBonusCounting(true);

      const start = performance.now();

      const tick = (now) => {
        const progress = Math.min((now - start) / duration, 1);
        setBalance(Math.round(total * progress));
        if (progress < 1) {
          requestAnimationFrame(tick);
        } else {
          setTimeout(() => {
            setIsBonusCounting(false);
            setIsBonusClaimClosing(false);
          }, 180);
        }
      };

      requestAnimationFrame(tick);
    }, closeDelay);
  };

  useEffect(() => {
    if (!isTelegram || !appShellRef.current) return undefined;

    const handleButtonHaptic = (event) => {
      const target = event.target;
      if (!(target instanceof Element)) return;

      const button = target.closest("button");
      if (!(button instanceof HTMLButtonElement) || button.disabled) return;

      const haptic = window.Telegram?.WebApp?.HapticFeedback;
      if (!haptic?.impactOccurred) return;

      haptic.impactOccurred("light");
    };

    const shell = appShellRef.current;
    shell.addEventListener("click", handleButtonHaptic, true);

    return () => {
      shell.removeEventListener("click", handleButtonHaptic, true);
    };
  }, [isTelegram]);

  return (
    <div
      ref={appShellRef}
      className="relative overflow-hidden bg-white text-[#1b1d22]"
      style={{ height: "var(--app-height, 100dvh)" }}
    >
      <div
        className="mx-auto w-full max-w-[516px] overflow-y-auto overscroll-y-contain px-3 pb-10 pt-0"
        style={{ height: "var(--app-height, 100dvh)" }}
      >
        {screen === "feed" ? (
          <FeedScreen
            activeFilter={activeFilter}
            setActiveFilter={setActiveFilter}
            visibleCards={visibleCards}
            onOpenSection={handleOpenSection}
            onSelectCard={handleSelectCard}
            onOpenBalance={handleOpenBalance}
            onOpenProfile={handleOpenProfile}
            balance={balance}
            isBonusCounting={isBonusCounting}
          />
        ) : screen === "section" ? (
          <SectionScreen
            section={selectedSection}
            sections={availableSections}
            onChangeSection={setSelectedSection}
            onSelectCard={handleSelectCard}
            onOpenBalance={handleOpenBalance}
            onOpenProfile={handleOpenProfile}
            balance={balance}
            isBonusCounting={isBonusCounting}
          />
        ) : screen === "style" ? (
          <StyleScreen
            card={selectedCard}
            sectionStyles={currentSectionStyles}
            onSelectStyle={(card) => {
              setSelectedCard(card);
              const nextSection =
                availableSections.find((section) => section.cards?.some((item) => item.id === card.id)) ??
                selectedSection;
              if (nextSection) setSelectedSection(nextSection);
            }}
            onRepeatTrend={() => setScreen("create")}
          />
        ) : screen === "create" ? (
          <CreateTrendScreen
            card={selectedCard}
            onOpenBalance={handleOpenBalance}
            onOpenProfile={handleOpenProfile}
            balance={balance}
            isBonusCounting={isBonusCounting}
            onCreate={({ previewImage, hasUploadedPhoto }) => {
              setLoadingPreviewImage(previewImage);
              setHasUploadedPhotoForLoading(hasUploadedPhoto);
              setResultImage(selectedCard.image);
              setGenerationOutcome("result");
              setScreen("loading");
            }}
          />
        ) : screen === "loading" ? (
          <LoadingScreen
            card={selectedCard}
            previewImage={loadingPreviewImage}
            hasUploadedPhoto={hasUploadedPhotoForLoading}
            onOpenBalance={handleOpenBalance}
            onOpenProfile={handleOpenProfile}
            onComplete={() => setScreen(generationOutcome === "error" ? "error" : "result")}
            balance={balance}
            isBonusCounting={isBonusCounting}
          />
        ) : screen === "result" ? (
          <ResultScreen
            card={{ ...selectedCard, image: resultImage }}
            onBack={() => setScreen("feed")}
            onOpenBalance={handleOpenBalance}
            onOpenProfile={handleOpenProfile}
            balance={balance}
            isBonusCounting={isBonusCounting}
          />
        ) : screen === "error" ? (
          <ErrorScreen
            onRetry={() => setScreen("loading")}
            onOpenBalance={handleOpenBalance}
            onOpenProfile={handleOpenProfile}
            balance={balance}
            isBonusCounting={isBonusCounting}
          />
        ) : screen === "shop" ? (
          <ShopScreen
            onBack={() => requestShopExit("feed")}
            onOpenBalance={handleOpenBalance}
            onOpenProfile={() => requestShopExit("profile")}
            selectedProductId={selectedProductId}
            setSelectedProductId={setSelectedProductId}
            balance={balance}
            isBonusCounting={isBonusCounting}
            showExitOffer={showShopExitOffer}
            onActivateDiscount={() => {
              setShopDiscountActive(true);
              setShopDiscountEndsAt(Date.now() + 10 * 60 * 1000);
              setDiscountTimeLeft("10:00");
              setShowShopExitOffer(false);
            }}
            onDismissExitOffer={() => {
              setShowShopExitOffer(false);
              setScreen(pendingScreenAfterShop);
            }}
            discountActive={shopDiscountActive}
            discountTimeLeft={discountTimeLeft}
          />
        ) : (
          <ProfileScreen
            onBack={() => setScreen("feed")}
            onOpenBalance={handleOpenBalance}
            onOpenProfile={handleOpenProfile}
            balance={balance}
            isBonusCounting={isBonusCounting}
          />
        )}

      </div>

      {showWelcomeBonus ? (
        <div className="absolute inset-0 z-50 flex items-start justify-center bg-[#0f172a]/35 px-4 pt-[300px] backdrop-blur-[3px]">
          <motion.div
            initial={false}
            animate={{
              opacity: isBonusClaimClosing ? 0 : 1,
              y: isBonusClaimClosing ? 24 : 0,
              scale: isBonusClaimClosing ? 0.94 : 1,
            }}
            transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
            className="w-full max-w-[388px] rounded-[30px] bg-white px-4 py-4 shadow-[0_30px_80px_rgba(15,23,42,0.24)] ring-1 ring-[#dce4f2]"
          >
            <div className="mt-1 text-center">
              <div className="flex items-center justify-center gap-2 text-[24px] font-semibold tracking-[-0.03em] text-[#234677]">
                <Gift className="h-6 w-6 text-[#dba400]" strokeWidth={2.1} />
                <span>Подарок</span>
              </div>
            </div>

            <div className="mt-3 rounded-[22px] bg-white px-3 py-3 ring-1 ring-[#e6eef9] shadow-[0_10px_24px_rgba(70,89,122,0.08)]">
              <div className="flex items-center justify-between rounded-[18px] bg-white px-4 py-3">
                <div>
                  <div className="text-[13px] font-medium text-[#7d8ca5]">Стартовый бонус</div>
                  <div className="mt-1 text-[22px] font-semibold tracking-[-0.03em] text-[#234677]">2 фотографии</div>
                </div>
                <div className="flex h-12 min-w-[92px] items-center justify-center gap-2 rounded-full bg-[#fff4c9] px-4 text-[#7a5a00]">
                  <span className="text-[14px] font-semibold">20</span>
                  <Sparkles className="h-4.5 w-4.5" strokeWidth={2.1} />
                </div>
              </div>
            </div>

            <button
              onClick={claimWelcomeBonus}
              disabled={isBonusClaimClosing || isBonusCounting}
              className="mt-4 flex w-full items-center justify-center gap-2 rounded-[22px] bg-[#f4c430] px-5 py-3.5 text-[16px] font-semibold text-[#3b2a00] shadow-[0_14px_28px_rgba(244,196,48,0.24)]"
            >
              <span>Забрать 20</span>
              <Sparkles className="h-5 w-5" strokeWidth={2.1} />
            </button>
          </motion.div>
        </div>
      ) : null}
    </div>
  );
}
