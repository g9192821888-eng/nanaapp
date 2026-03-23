import React, { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { animate, motion, useMotionValue } from "framer-motion";
import {
  AlertTriangle,
  ArrowLeft,
  ArrowUpRight,
  AudioLines,
  Bookmark,
  CornerUpRight,
  ChevronRight,
  Check,
  ClipboardList,
  Copy,
  Heart,
  Plus,
  Search,
  Settings,
  Share,
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
  { id: "all", label: "Все" },
  { id: "march8", label: "8 марта" },
  { id: "spring", label: "Весна" },
  { id: "business", label: "Деловой" },
  { id: "street", label: "Улица" },
];

const sectionLabels = {
  all: "Все",
  march8: "8 марта",
  spring: "Весна",
  business: "Деловой",
  street: "Улица",
};

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
    badgeColor: "bg-[#1f1d18] text-[#f4c430]",
    featured: true,
  },
  {
    id: 4,
    subtitle: "🚀 Профи",
    amount: 250,
    price: "1 590 ₽",
    badge: "Выгодно",
    badgeColor: "bg-[#1f1d18] text-[#f4c430]",
  },
  {
    id: 5,
    subtitle: "⭐ Создатель",
    amount: 500,
    price: "2 790 ₽",
    badge: "Лучший",
    badgeColor: "bg-[#1f1d18] text-[#f4c430]",
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

function getTelegramClientType() {
  if (typeof window === "undefined") return "browser";

  const tg = window.Telegram?.WebApp;
  if (!(tg && (tg.initData?.length || tg.initDataUnsafe?.user))) return "browser";

  const platform = String(tg.platform || "").toLowerCase();

  if (platform === "android" || platform === "ios") return "mobile";
  if (platform === "tdesktop" || platform === "macos" || platform === "unigram") return "desktop";
  if (platform.startsWith("web")) return "web";

  const userAgent = window.navigator.userAgent.toLowerCase();

  if (/iphone|ipad|ipod|android|mobile/.test(userAgent)) return "mobile";
  if (/macintosh|windows|linux/.test(userAgent)) return "desktop";

  return "web";
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
  const labels = {
    new: "Новинка",
    popular: "Вирусное",
    free: "Бесплатно",
    choice: "Выбор NANA",
    track: "Трек",
  };

  return (
    <div
      className="inline-flex h-6 items-center gap-1 rounded-full border border-[rgba(93,112,146,0.12)] bg-[rgba(255,255,255,0.92)] px-[10px] text-[10px] font-medium tracking-[0.01em] text-[#4e5f7e] backdrop-blur-[8px]"
    >
      {type === "new" ? <Star className="h-3 w-3" strokeWidth={2.2} /> : null}
      {type === "popular" ? <ArrowUpRight className="h-3 w-3" strokeWidth={2.4} /> : null}
      {type === "free" ? <Ticket className="h-3 w-3" strokeWidth={2.4} /> : null}
      {type === "choice" ? <Check className="h-3 w-3" strokeWidth={2.6} /> : null}
      {type === "track" ? <AudioLines className="h-3 w-3" strokeWidth={2.2} /> : null}
      <span>{labels[type] ?? "Стиль"}</span>
    </div>
  );
}

function getCardCategoryLabel(card) {
  return sectionLabels[card.section] ?? card.categories?.[0] ?? "Стиль";
}

function Header({ onOpenBalance, onOpenProfile, balance = 184, isBonusCounting = false }) {
  const telegramClientType = getTelegramClientType();
  const isTelegramMobile = telegramClientType === "mobile";
  const headerTopSpacing = isTelegramMobile ? "pt-[180px]" : "pt-[10px]";
  const headerRowOffset = isTelegramMobile ? "mt-[-75px]" : "mt-0";

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
      <div
        className={`mx-auto flex w-full max-w-[516px] items-center gap-3 px-3 py-2 ${headerRowOffset}`}
      >
        <button
          onClick={onOpenProfile}
          className="group flex min-w-0 flex-1 items-center gap-2.5 rounded-[18px] px-1 py-1 text-left transition active:scale-[0.99]"
        >
          <img
            src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80"
            alt="avatar"
            className="h-10 w-10 rounded-full object-cover"
          />
          <div className="min-w-0">
            <div className="flex items-center gap-1">
              <div className="truncate text-[16px] font-semibold tracking-[-0.02em] text-[#111827]">Сергей</div>
              <ArrowLeft className="h-3.5 w-3.5 rotate-180 text-[#9aa3b2] opacity-0 transition group-hover:opacity-100" />
            </div>
            <div className="text-[12px] text-[#6b7280]">Профиль</div>
          </div>
        </button>

        <button
          onClick={onOpenBalance}
          className="ml-auto flex items-center gap-2 px-1 py-2 text-[#111827] transition active:scale-[0.99]"
        >
          <div className="flex items-center gap-1 text-[14px] font-semibold">
            <BalanceDigits value={balance} />
            <Sparkles className={`h-3.5 w-3.5 ${isBonusCounting ? "text-[#4f46e5]" : "text-[#94a3b8]"}`} strokeWidth={2.1} />
          </div>
          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#eef2ff] text-[#4f46e5]">
            <Plus className="h-4 w-4" />
          </div>
        </button>
      </div>
    </div>
  );
}

function PinnedSectionHeader({ children, className = "" }) {
  return (
    <div
      className={`sticky top-0 z-20 -mx-3 bg-[rgba(250,250,248,0.94)] px-3 pb-0 backdrop-blur-[14px] ${className}`}
    >
      {children}
    </div>
  );
}

function FilterBar({ activeFilter, setActiveFilter }) {
  return (
    <div className="overflow-x-auto px-2 pb-1 pt-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      <div className="flex items-end gap-4 pr-2">
      {filters.map((filter) => {
        const isActive = activeFilter === filter.id;
        return (
          <button
            key={filter.id}
            onClick={() => setActiveFilter(filter.id)}
            className={`relative shrink-0 pb-2 text-[15px] transition ${
              isActive
                ? "font-semibold text-[#16130f]"
                : "font-normal text-[#9ca3af]"
            }`}
          >
            <span>{filter.label}</span>
            {isActive ? (
              <motion.span
                layoutId="search-filter-underline"
                className="absolute bottom-0 left-0 h-[2.5px] w-full rounded-full bg-[#16130f]"
              />
            ) : null}
          </button>
        );
      })}
      </div>
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
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.28 }}
      onClick={() => onClick(card)}
      className="group relative overflow-hidden rounded-[24px] border border-[rgba(148,163,184,0.14)] bg-white text-left shadow-[0_10px_24px_rgba(15,23,42,0.04)]"
    >
      <div className="relative overflow-hidden rounded-[24px]">
        <div className="overflow-hidden rounded-[20px]">
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
                className="aspect-[1.03] shrink-0 object-cover transition duration-500 group-hover:scale-[1.02]"
                style={{ width: `${100 / gallery.length}%` }}
              />
            ))}
          </motion.div>
        </div>
        {card.badge ? <div className="absolute left-2 top-2"><CardBadge type={card.badge} /></div> : null}
      </div>

      <div className="px-3 pb-3 pt-3">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <div className="truncate text-[14px] font-medium leading-none tracking-[-0.01em] text-[#111827]">
              {card.title}
            </div>
          </div>
          <div className="flex shrink-0 items-center gap-1 text-[13px] font-medium text-[#6b7280]">
            <Heart className="h-4 w-4" strokeWidth={2} />
            <span>{card.likes}</span>
          </div>
        </div>
      </div>
    </motion.button>
  );
}

function SearchMode({
  query,
  setQuery,
  activeFilter,
  setActiveFilter,
  results,
  onClose,
  onSelectCard,
}) {
  return (
    <div className="space-y-5 px-1 pb-6 pt-4">
      <div className="flex items-center gap-2">
        <div className="flex h-11 flex-1 items-center gap-2 rounded-[18px] border border-[rgba(148,163,184,0.16)] bg-white px-3 text-[#111827] shadow-[0_8px_18px_rgba(15,23,42,0.03)]">
          <Search className="h-4 w-4 text-[#9ca3af]" strokeWidth={2.2} />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Поиск по трендам"
            className="w-full bg-transparent text-[14px] font-medium text-[#111827] outline-none placeholder:text-[#9ca3af]"
          />
        </div>
        <button
          onClick={onClose}
          className="text-[14px] font-medium text-[#6b7280]"
        >
          Отмена
        </button>
      </div>

      <div>
        <FilterBar activeFilter={activeFilter} setActiveFilter={setActiveFilter} />
      </div>

      <div className="space-y-4">
        <div className="px-1 text-[12px] font-semibold uppercase tracking-[0.08em] text-[#9ca3af]">
          Найдено {results.length}
        </div>
        <div className="grid grid-cols-2 gap-3">
          {results.map((card) => (
            <FeedCard key={card.id} card={card} onClick={onSelectCard} />
          ))}
        </div>
      </div>
    </div>
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
  const screenFrameRef = useRef(null);
  const styleGallery = card.gallery?.length ? card.gallery : [card.image];
  const canSlideGallery = styleGallery.length > 1;
  const [screenHeight, setScreenHeight] = useState(0);
  const stackY = useMotionValue(0);
  const currentStyleIndex = Math.max(
    0,
    sectionStyles.findIndex((styleCard) => styleCard.id === card.id),
  );

  const previousTrend = sectionStyles[(currentStyleIndex - 1 + sectionStyles.length) % sectionStyles.length] ?? card;
  const nextTrend = sectionStyles[(currentStyleIndex + 1) % sectionStyles.length] ?? card;

  const syncScreenHeight = () => {
    const nextHeight = screenFrameRef.current?.clientHeight ?? 0;
    if (!nextHeight) return;
    setScreenHeight(nextHeight);
    stackY.set(-nextHeight);
  };

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

  useLayoutEffect(() => {
    syncScreenHeight();
    window.addEventListener("resize", syncScreenHeight);
    return () => window.removeEventListener("resize", syncScreenHeight);
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

  const handleTrendDragEnd = async (_, info) => {
    if (!screenHeight) return;

    const threshold = Math.max(90, screenHeight * 0.12);

    if (info.offset.y <= -threshold) {
      await animate(stackY, -screenHeight * 2, {
        type: "spring",
        stiffness: 260,
        damping: 30,
      });
      goToAdjacentTrend(1);
      return;
    }

    if (info.offset.y >= threshold) {
      await animate(stackY, 0, {
        type: "spring",
        stiffness: 260,
        damping: 30,
      });
      goToAdjacentTrend(-1);
      return;
    }

    animate(stackY, -screenHeight, {
      type: "spring",
      stiffness: 320,
      damping: 34,
    });
  };

  const renderTrendPanel = (trend, panelType) => {
    const trendGallery = trend.gallery?.length ? trend.gallery : [trend.image];
    const isCurrent = panelType === "current";
    const usage = getTrendUsage(trend);

    return (
      <div className="relative h-full w-full overflow-hidden">
        {isCurrent ? (
          <div
            ref={styleGalleryRef}
            onScroll={handleGalleryScroll}
            onTouchStart={handleGalleryTouchStart}
            onTouchEnd={handleGalleryTouchEnd}
            className={`flex h-full overflow-x-auto scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden ${canSlideGallery ? "snap-x snap-mandatory" : ""}`}
          >
            {styleGallery.map((image, index) => (
              <img
                key={`${trend.id}-${index}`}
                src={image}
                alt={`${trend.title} ${index + 1}`}
                className={`h-full w-full shrink-0 object-cover ${canSlideGallery ? "snap-start" : ""}`}
              />
            ))}
          </div>
        ) : (
          <img src={trendGallery[0]} alt={trend.title} className="h-full w-full object-cover" />
        )}

        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/82 via-black/18 to-transparent" />

        {trend.badge ? (
          <div className="absolute left-4 top-5">
            <CardBadge type={trend.badge} />
          </div>
        ) : null}

        <div className="pointer-events-none absolute inset-x-0 top-5 px-5">
          <div className="text-center text-[23px] font-semibold tracking-[-0.03em] text-white drop-shadow-[0_1px_8px_rgba(0,0,0,0.28)]">
            {trend.title}
          </div>
        </div>

        {isCurrent ? (
          <>
            <div className="absolute inset-x-0 bottom-0 px-4 pb-5">
              <div className="max-w-[78%]">
                <div className="mt-3 flex items-center gap-2 text-[13px] font-medium text-white/90">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/14 backdrop-blur-sm">
                    <User className="h-4 w-4" strokeWidth={2.1} />
                  </span>
                  <span>{usage} выбрали</span>
                </div>
              </div>

              <button
                onClick={onRepeatTrend}
                className="mt-4 flex w-full items-center justify-center gap-2 rounded-[24px] bg-[linear-gradient(135deg,#7dd8ff_0%,#52b7ff_52%,#2b7de9_100%)] px-5 py-4 text-[16px] font-semibold text-white shadow-[0_18px_34px_rgba(82,183,255,0.24)]"
              >
                Повторить тренд
              </button>

              {styleGallery.length > 1 ? (
                <div className="mt-4 flex items-center justify-center gap-1.5">
                  {styleGallery.map((_, index) => (
                    <span
                      key={`${trend.id}-dot-${index}`}
                      className={`h-1.5 rounded-full transition-all ${
                        index === activeSlide ? "w-5 bg-white" : "w-1.5 bg-white/55"
                      }`}
                    />
                  ))}
                </div>
              ) : null}
            </div>

            <div className="absolute right-4 top-1/2 z-10 flex -translate-y-1/2 flex-col items-center gap-6 text-white">
              <button
                onClick={() => setIsLiked((prev) => !prev)}
                className="flex flex-col items-center gap-2"
              >
                <span className="flex h-14 w-14 items-center justify-center rounded-full bg-black/28 backdrop-blur-sm">
                  <Heart className="h-9 w-9" strokeWidth={2.1} fill={isLiked ? "currentColor" : "none"} />
                </span>
                <span className="text-[14px] font-semibold leading-none">{trend.likes}</span>
              </button>
              <button className="flex flex-col items-center gap-2">
                <span className="flex h-14 w-14 items-center justify-center rounded-full bg-black/28 backdrop-blur-sm">
                  <Send className="h-9 w-9" strokeWidth={2.1} />
                </span>
                <span className="text-[14px] font-semibold leading-none">
                  {Math.max(12, Math.round(trend.likes / 3))}
                </span>
              </button>
              <button className="flex flex-col items-center gap-2">
                <span className="flex h-14 w-14 items-center justify-center rounded-full bg-black/28 backdrop-blur-sm">
                  <Bookmark className="h-9 w-9" strokeWidth={2.1} />
                </span>
                <span className="text-[14px] font-semibold leading-none">
                  {Math.max(5, Math.round(trend.likes / 5))}
                </span>
              </button>
            </div>
          </>
        ) : null}
      </div>
    );
  };

  return (
    <div
      ref={screenFrameRef}
      className="-mx-3 overflow-hidden bg-black"
      style={{ height: "var(--app-height, 100dvh)" }}
    >
      <div className="relative h-full w-full">
        <motion.div
          drag="y"
          dragDirectionLock
          dragElastic={0.12}
          dragMomentum={false}
          dragConstraints={{ top: -screenHeight * 2, bottom: 0 }}
          onDragEnd={handleTrendDragEnd}
          style={{ y: stackY }}
          className="absolute inset-0"
        >
          {[previousTrend, card, nextTrend].map((trend, index) => (
            <div
              key={`${trend.id}-${index}`}
              className="relative w-full"
              style={{ height: screenHeight || undefined }}
            >
              {renderTrendPanel(trend, index === 1 ? "current" : "preview")}
            </div>
          ))}
        </motion.div>
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

      <div className="space-y-4 rounded-[28px] bg-white p-4 shadow-[0_8px_32px_rgba(70,89,122,0.08)] ring-1 ring-[#e3dfd5]">
        <div>
          <div className="text-[24px] font-semibold tracking-[-0.03em] text-[#1e1b16]">
            {card.title}
          </div>
        </div>

        <div>
          {hasPhoto ? (
            <div className="relative h-[188px] overflow-hidden rounded-[22px] border border-[#d8d4cb] bg-[#f7f5ef]">
              <img src={uploadedPreview} alt="uploaded preview" className="h-full w-full object-cover" />
              <div className="absolute left-3 top-3 flex items-center gap-2 rounded-full bg-[#1f1d18] px-3 py-1.5 text-[#f4c430] shadow-[0_10px_20px_rgba(31,29,24,0.18)]">
                <Check className="h-4 w-4" strokeWidth={2.4} />
                <span className="text-[13px] font-semibold">Фото загружено</span>
              </div>
              <button
                onClick={() => setHasPhoto(false)}
                className="absolute right-3 top-3 rounded-full bg-white/92 px-3 py-1.5 text-[12px] font-semibold text-[#3d372d]"
              >
                Заменить
              </button>
            </div>
          ) : (
            <button
              onClick={handleUpload}
              className="relative flex h-[188px] w-full flex-col items-center justify-center overflow-hidden rounded-[22px] border-2 border-dashed border-[#d8d4cb] bg-[#f7f5ef] px-4 text-center"
            >
              <motion.div
                initial={{ scaleX: 0, opacity: 0 }}
                animate={{ scaleX: isUploading ? 1 : 0, opacity: isUploading ? 1 : 0 }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
                className="absolute inset-0 z-0 origin-left bg-[#52b7ff]/12"
              />
              <div className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full bg-[#52b7ff] text-white shadow-[0_10px_20px_rgba(82,183,255,0.18)]">
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
              <div className="relative z-10 mt-3 text-[16px] font-semibold text-[#1f1b15]">
                {isUploading ? "Загрузка..." : "Загрузить фото"}
              </div>
              <div className="relative z-10 mt-1 text-[13px] leading-5 text-[#746e62]">
                JPG, PNG
              </div>
            </button>
          )}
        </div>

        <div className="space-y-3 rounded-[22px] bg-[#f7f5ef] p-4 ring-1 ring-[#e6e0d4]">
          <div>
            <div className="text-[13px] font-semibold uppercase tracking-[0.04em] text-[#7a7267]">
              Соотношение сторон
            </div>
            <div className="mt-3 flex gap-2">
              {["9:16", "4:5", "1:1"].map((value) => (
                <button
                  key={value}
                  onClick={() => setAspectRatio(value)}
                  className={`rounded-full px-4 py-2 text-[13px] font-semibold transition ${
                    aspectRatio === value
                      ? "bg-[#52b7ff] text-white"
                      : "border border-[rgba(219,216,207,0.95)] bg-white text-[#2a2620]"
                  }`}
                >
                  {value}
                </button>
              ))}
            </div>
          </div>

          <div>
            <div className="text-[13px] font-semibold uppercase tracking-[0.04em] text-[#7a7267]">
              Качество генерации
            </div>
            <div className="mt-3 flex gap-2">
              {[
                { id: "excellent", label: "Обычное" },
                { id: "super", label: "Супер x2" },
              ].map((option) => (
                <button
                  key={option.id}
                  onClick={() => setQuality(option.id)}
                  className={`rounded-full px-4 py-2 text-[13px] font-semibold transition ${
                    quality === option.id
                      ? "bg-[#52b7ff] text-white"
                      : "border border-[rgba(219,216,207,0.95)] bg-white text-[#2a2620]"
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          {isVideoTrend ? (
            <div>
              <div className="text-[13px] font-semibold uppercase tracking-[0.04em] text-[#7a7267]">
                Длительность видео
              </div>
              <div className="mt-3 flex gap-2">
                {["5", "10", "15"].map((value) => (
                  <button
                    key={value}
                    onClick={() => setDuration(value)}
                    className={`rounded-full px-4 py-2 text-[13px] font-semibold transition ${
                      duration === value
                        ? "bg-[#52b7ff] text-white"
                        : "border border-[rgba(219,216,207,0.95)] bg-white text-[#2a2620]"
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
          className="flex w-full items-center justify-center gap-2 rounded-[24px] bg-[linear-gradient(135deg,#7dd8ff_0%,#52b7ff_52%,#2b7de9_100%)] px-5 py-4 text-[16px] font-semibold text-white shadow-[0_16px_32px_rgba(82,183,255,0.24)]"
        >
          <span>Создать за 10</span>
          <Sparkles className="h-5 w-5" strokeWidth={2.1} />
        </button>
      </div>
    </div>
  );
}

function TaskCard({ task }) {
  return (
    <div className="rounded-[22px] border border-[#e3dfd5] bg-white p-4 shadow-[0_8px_24px_rgba(70,89,122,0.06)]">
      <div className="space-y-3">
        <div className="flex items-center justify-between gap-3 rounded-[14px] bg-[#fff9e8] px-3 py-2">
          <div className="min-w-0 text-[16px] font-semibold text-[#1f1b15]">{task.title}</div>
          <div className="flex shrink-0 items-center gap-1 rounded-full bg-[#fff4c9] px-3 py-1.5 text-[13px] font-semibold text-[#7a5a00]">
            <span>+{task.reward}</span>
            <Sparkles className="h-4 w-4" strokeWidth={2.1} />
          </div>
        </div>

        <div className="flex items-end justify-between gap-3">
          <div className="max-w-[72%] text-[13px] leading-5 text-[#6f6a61]">{task.description}</div>
          <button className="flex shrink-0 items-center justify-center gap-2 rounded-[16px] bg-[#52b7ff] px-4 py-3 text-[14px] font-semibold text-white transition hover:bg-[#3ea7f2]">
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
          ? "border-[rgba(35,32,26,0.95)] bg-[linear-gradient(180deg,#23201a_0%,#181510_100%)]"
          : "border-[rgba(227,223,213,0.96)] bg-[rgba(250,250,247,0.98)]"
      } ${isSelected ? "ring-2 ring-[#2b7de9] ring-offset-2 ring-offset-transparent" : ""}`}
    >
      <div className={`relative px-5 py-[10px] ${isFeatured ? "text-[#f4c430]" : "text-[#1d2333]"}`}>
        {product.badge ? (
          <div
            className={`absolute right-3 top-1 rounded-[12px] px-[10px] py-[5px] text-[10px] font-semibold leading-none shadow-[0_8px_18px_rgba(15,23,42,0.08)] ${product.badgeColor}`}
          >
            {product.badge}
          </div>
        ) : null}

        <div className="flex items-end justify-between gap-4">
          <div className="min-w-0 pr-3">
            <div className={`text-[18px] font-medium ${isFeatured ? "text-[#9b7a16]" : "text-[#6f695c]"}`}>
              {product.subtitle}
            </div>
            <div className={`mt-1 text-[21px] font-semibold tracking-[-0.03em] ${isFeatured ? "text-[#f4c430]" : "text-[#161c2c]"}`}>
              {product.amount} фотографий
            </div>
          </div>
          <div className="shrink-0 text-right">
            {hasDiscount ? (
              <div className={`mb-0.5 text-[14px] font-semibold leading-none line-through ${isFeatured ? "text-[#a49b83]" : "text-[#8d8679]"}`}>
                {product.price}
              </div>
            ) : null}
            <div className={`text-[21px] font-semibold tracking-[-0.03em] ${isFeatured ? "text-[#f4c430]" : "text-[#161c2c]"}`}>
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

      <div className="space-y-5 rounded-[30px] bg-white px-4 pb-5 pt-2 shadow-[0_8px_32px_rgba(70,89,122,0.08)] ring-1 ring-[#e3dfd5]">
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
            <div className="text-[22px] font-semibold leading-[1.02] tracking-[-0.04em] text-[#1e1b16]">
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
            <div key={benefit} className="flex items-start gap-3 text-[16px] font-medium leading-6 text-[#615a50]">
              <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#1f1d18] text-[#f4c430] shadow-[0_8px_18px_rgba(31,29,24,0.12)]">
                <Check className="h-4 w-4" strokeWidth={3} />
              </div>
              <div>{benefit}</div>
            </div>
          ))}
        </div>

        <div className="pt-2">
          <button className="flex w-full items-center justify-center rounded-[28px] bg-[linear-gradient(135deg,#7dd8ff_0%,#52b7ff_52%,#2b7de9_100%)] px-5 py-4 text-[17px] font-semibold text-white shadow-[0_18px_34px_rgba(82,183,255,0.22)]">
            Перейти к оплате
          </button>
        </div>
      </div>

      {showExitOffer ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/35 px-5">
          <div className="w-full max-w-[420px] rounded-[28px] bg-white px-6 pb-5 pt-7 text-center shadow-[0_24px_70px_rgba(15,23,42,0.26)]">
            <div className="text-[70px] leading-none">💔</div>
            <div className="mt-4 text-[22px] font-semibold tracking-[-0.04em] text-[#1e1b16]">
              Так быстро уходите?
            </div>
            <div className="mt-4 text-[17px] leading-7 text-[#6f6a61]">
              Мы для вас подготовили персональную скидку. Она сгорит через 10 минут 🙈
            </div>
            <button
              onClick={onActivateDiscount}
              className="mt-6 flex w-full items-center justify-center rounded-[24px] bg-[linear-gradient(135deg,#7dd8ff_0%,#52b7ff_52%,#2b7de9_100%)] px-5 py-4 text-[17px] font-semibold text-white shadow-[0_16px_34px_rgba(82,183,255,0.22)]"
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
          <div className="mt-[-5px] overflow-x-auto px-2 pb-1 pt-2 pr-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            <div className="flex items-end gap-4 pr-2">
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
                    className={`relative flex shrink-0 items-center gap-1.5 pb-2 text-[15px] transition ${
                      profileTab === item.id
                        ? "font-semibold text-[#16130f]"
                        : "font-normal text-[#9ca3af]"
                    }`}
                  >
                    <Icon
                      className={`stroke-current ${item.id === "settings" ? "h-[18px] w-[18px] translate-y-[1px]" : "h-4 w-4"}`}
                      strokeWidth={2.2}
                    />
                    {item.label ? <span>{item.label}</span> : null}
                    {profileTab === item.id ? (
                      <motion.span
                        layoutId="profile-tab-underline"
                        className="absolute bottom-0 left-0 h-[2.5px] w-full rounded-full bg-[#16130f]"
                      />
                    ) : null}
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
              className="flex w-full items-center justify-between gap-4 rounded-[18px] border border-[#e3dfd5] bg-white px-4 py-4 text-left shadow-[0_6px_22px_rgba(82,103,138,0.06)]"
            >
              <div className="min-w-0 flex-1">
                <div className="text-[15px] font-semibold text-[#1f1b15]">{item.label}</div>
              </div>
              <div className="shrink-0 text-[13px] font-medium text-[#7a7367]">{item.value}</div>
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
          <div className="rounded-[22px] border border-[#e3dfd5] bg-white p-4 shadow-[0_8px_24px_rgba(70,89,122,0.06)]">
            <div className="flex items-center justify-between gap-3 rounded-[16px] bg-[#fff9e8] px-4 py-3">
              <div>
                <div className="text-[15px] font-semibold text-[#1f1b15]">Ежедневный бонус</div>
                <div className="mt-1 text-[13px] leading-5 text-[#6f6a61]">
                  Заходи каждый день и получай дополнительные фотографии на баланс.
                </div>
              </div>
              <div className="flex h-11 min-w-[88px] items-center justify-center gap-2 rounded-full bg-[#fff4c9] px-4 text-[#7a5a00]">
                <span className="text-[14px] font-semibold">+5</span>
                <Sparkles className="h-4 w-4" strokeWidth={2.1} />
              </div>
            </div>
          </div>

          <div className="rounded-[22px] border border-[#e3dfd5] bg-white p-4 shadow-[0_8px_24px_rgba(70,89,122,0.06)]">
            <div className="text-[15px] font-semibold text-[#1f1b15]">Приглашай друзей</div>
            <div className="mt-2 text-[13px] leading-5 text-[#6f6a61]">
              За каждого нового друга можно получать бонусные фотографии и ускорять генерацию.
            </div>
            <div className="mt-4 grid grid-cols-2 gap-2">
              <button className="flex items-center justify-center gap-2 rounded-[16px] bg-[#52b7ff] px-4 py-3 text-[14px] font-semibold text-white transition hover:bg-[#3ea7f2]">
                <Send className="h-4 w-4" strokeWidth={2.2} />
                Отправить
              </button>
              <button className="flex items-center justify-center gap-2 rounded-[16px] bg-[#1f1d18] px-4 py-3 text-[14px] font-semibold text-[#f4c430] transition hover:bg-[#16140f]">
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
              className="relative overflow-hidden rounded-[18px] border border-[#e3dfd5] bg-white shadow-[0_6px_22px_rgba(82,103,138,0.06)]"
            >
              <img
                src={card.image}
                alt={card.title}
                className="aspect-[0.92] w-full object-cover"
              />
              <button className="absolute bottom-3 right-3 flex h-12 w-12 items-center justify-center rounded-full bg-[#1f1d18] text-[#f4c430] shadow-[0_10px_22px_rgba(31,29,24,0.2)]">
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
              className="flex items-center justify-between gap-4 rounded-[18px] border border-[#e3dfd5] bg-white px-4 py-4 text-[14px] font-medium text-[#60594e] shadow-[0_6px_22px_rgba(82,103,138,0.06)]"
            >
              <div className="min-w-0 flex-1 text-[#60594e]">{item.text}</div>
              <div className="shrink-0 text-right text-[13px] text-[#8a8275]">
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
          <div className="flex items-center justify-center gap-2 text-[18px] font-semibold tracking-[-0.02em] text-[#1f1b15]">
            <Sparkles className="h-5 w-5 text-[#dba400]" strokeWidth={2.2} />
            <span>Создание фото</span>
          </div>

          <div className="mt-3 rounded-[18px] bg-white/88 px-4 py-3 shadow-[0_8px_20px_rgba(42,36,24,0.06)]">
            <div className="flex items-center justify-between">
              <div className="text-[12px] font-semibold text-[#1f1b15]">87%</div>
            </div>
            <div className="mt-2 h-2 overflow-hidden rounded-full bg-[#ebe8df]">
              <motion.div
                initial={{ width: "12%" }}
                animate={{ width: ["12%", "48%", "72%", "87%"] }}
                transition={{ duration: 2.4, ease: "easeInOut" }}
                className="h-full rounded-full bg-[linear-gradient(90deg,#7dd8ff_0%,#52b7ff_52%,#2b7de9_100%)]"
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
            <div className="flex items-center gap-2 rounded-full bg-white/90 px-5 py-3 text-[#2b7de9] shadow-[0_12px_28px_rgba(43,125,233,0.12)] backdrop-blur-sm">
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
          <div className="flex items-center justify-center gap-2 text-[18px] font-semibold tracking-[-0.02em] text-[#1f1b15]">
            <Check className="h-5 w-5 text-[#2b7de9]" strokeWidth={2.6} />
            <span>Фото готово</span>
          </div>
        </div>
      </div>

      <div className="overflow-hidden rounded-[28px] bg-white p-3.5 shadow-[0_8px_32px_rgba(70,89,122,0.08)] ring-1 ring-[#dce4f2]">
        <div className="relative overflow-hidden rounded-[24px]">
          <img src={card.image} alt={card.title} className="aspect-[1.08] w-full object-cover" />

          <button className="absolute bottom-4 right-4 flex items-center gap-2 rounded-full bg-[#1f1d18] px-4 py-3 text-[#f4c430] shadow-[0_12px_24px_rgba(31,29,24,0.18)]">
            <Download className="h-5 w-5" strokeWidth={2.2} />
            <span className="text-[13px] font-semibold">Скачать</span>
          </button>
        </div>

        <div className="mt-3 flex items-center justify-between gap-2 rounded-[18px] bg-[#f3f1eb] px-4 py-3">
          <div className="flex min-w-0 flex-1 items-center gap-2">
            <span className="shrink-0 text-[13px] font-semibold text-[#655d50]">Поставь оценку</span>
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
        <button className="flex w-full items-center justify-center gap-2 rounded-[22px] bg-[linear-gradient(135deg,#7dd8ff_0%,#52b7ff_52%,#2b7de9_100%)] px-5 py-4 text-[15px] font-semibold text-white shadow-[0_14px_28px_rgba(82,183,255,0.22)]">
          <Plus className="h-5 w-5" strokeWidth={2.2} />
          Опубликовать в Сторис
        </button>
        <button className="flex w-full items-center justify-center gap-2 rounded-[22px] bg-[#1f1d18] px-5 py-4 text-[15px] font-semibold text-[#f4c430] shadow-[0_14px_28px_rgba(31,29,24,0.18)]">
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
          <div className="text-[24px] font-semibold tracking-[-0.03em] text-[#1f1b15]">Ошибка</div>
          <div className="mt-2 text-[16px] font-medium text-[#4f433b]">Что-то пошло не так</div>
          <div className="mt-3 text-[14px] leading-6 text-[#786f65]">
            Мы вернули токены на ваш баланс
          </div>
        </div>
      </div>

      <button
        onClick={onRetry}
        className="flex w-full items-center justify-center gap-2 rounded-[22px] bg-[linear-gradient(135deg,#7dd8ff_0%,#52b7ff_52%,#2b7de9_100%)] px-5 py-4 text-[16px] font-semibold text-white shadow-[0_14px_28px_rgba(82,183,255,0.22)]"
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

        <div className="mt-[-5px] overflow-x-auto px-2 pb-1 pt-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <div className="flex items-end gap-4 pr-2">
            {sections.map((item) => (
              <button
                key={item.id}
                onClick={() => onChangeSection(item)}
                className={`relative shrink-0 pb-2 text-[15px] transition ${
                  item.id === section.id
                    ? "font-semibold text-[#16130f]"
                    : "font-normal text-[#7a7366]"
                }`}
              >
                {item.label}
                {item.id === section.id ? (
                  <motion.span
                    layoutId="section-tab-underline"
                    className="absolute bottom-0 left-0 h-[2.5px] w-full rounded-full bg-[#16130f]"
                  />
                ) : null}
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
  onSelectCard,
  onOpenBalance,
  onOpenProfile,
  balance,
  isBonusCounting,
}) {
  const [isSearchMode, setIsSearchMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);

  const feedCards = useMemo(() => {
    if (!showFavoritesOnly) return visibleCards;
    return visibleCards.filter((card) => card.badge === "choice");
  }, [showFavoritesOnly, visibleCards]);

  const searchResults = useMemo(() => {
    const normalizedQuery = searchQuery.trim().toLowerCase();
    if (!normalizedQuery) return feedCards;

    return feedCards.filter((card) => {
      const searchableText = [
        card.title,
        card.description,
        getCardCategoryLabel(card),
        ...(card.categories ?? []),
      ]
        .join(" ")
        .toLowerCase();

      return searchableText.includes(normalizedQuery);
    });
  }, [feedCards, searchQuery]);

  const closeSearchMode = () => {
    setIsSearchMode(false);
    setSearchQuery("");
    setActiveFilter("all");
  };

  return (
    <>
      <PinnedSectionHeader className="pt-0">
        <Header
          onOpenBalance={onOpenBalance}
          onOpenProfile={onOpenProfile}
          balance={balance}
          isBonusCounting={isBonusCounting}
        />
      </PinnedSectionHeader>

      {isSearchMode ? (
        <SearchMode
          query={searchQuery}
          setQuery={setSearchQuery}
          activeFilter={activeFilter}
          setActiveFilter={setActiveFilter}
          results={searchResults}
          onClose={closeSearchMode}
          onSelectCard={(card) => onSelectCard(card)}
        />
      ) : (
        <div className="space-y-6 bg-white pb-6 pt-5">
          <div className="space-y-3 px-1">
            <div className="flex items-center justify-between gap-3">
              <div>
                <h1 className="text-[30px] font-semibold leading-[1.02] tracking-[-0.05em] text-[#111827]">
                  Повтори тот самый тренд
                </h1>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsSearchMode(true)}
                className="flex h-12 flex-1 items-center gap-3 rounded-[20px] border border-[rgba(148,163,184,0.16)] bg-[rgba(249,250,251,0.9)] px-4 text-left text-[14px] font-medium text-[#9ca3af]"
              >
                <Search className="h-4 w-4" strokeWidth={2.2} />
                <span>Поиск по стилям и категориям</span>
              </button>
              <button
                onClick={() => setShowFavoritesOnly((current) => !current)}
                className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-[20px] border transition ${
                  showFavoritesOnly
                    ? "border-[rgba(79,70,229,0.14)] bg-[#eef2ff] text-[#4f46e5]"
                    : "border-[rgba(148,163,184,0.16)] bg-white text-[#6b7280]"
                }`}
              >
                <Bookmark className="h-4 w-4" strokeWidth={2.1} />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 px-1">
            {feedCards.map((card) => (
              <FeedCard key={card.id} card={card} onClick={() => onSelectCard(card)} />
            ))}
          </div>
        </div>
      )}
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
    if (activeFilter === "all") return cards;
    return cards.filter((card) => card.section === activeFilter);
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
            className="w-full max-w-[388px] rounded-[30px] bg-white px-4 py-4 shadow-[0_30px_80px_rgba(15,23,42,0.24)] ring-1 ring-[#e2ddd2]"
          >
            <div className="mt-1 text-center">
              <div className="flex items-center justify-center gap-2 text-[24px] font-semibold tracking-[-0.03em] text-[#1f1b15]">
                <Gift className="h-6 w-6 text-[#dba400]" strokeWidth={2.1} />
                <span>Подарок</span>
              </div>
            </div>

            <div className="mt-3 rounded-[22px] bg-white px-3 py-3 ring-1 ring-[#e7e1d6] shadow-[0_10px_24px_rgba(42,36,24,0.08)]">
              <div className="flex items-center justify-between rounded-[18px] bg-white px-4 py-3">
                <div>
                  <div className="text-[13px] font-medium text-[#7a7267]">Стартовый бонус</div>
                  <div className="mt-1 text-[22px] font-semibold tracking-[-0.03em] text-[#1f1b15]">2 фотографии</div>
                </div>
                <div className="flex h-12 min-w-[92px] items-center justify-center gap-2 rounded-full border border-[rgba(219,219,212,0.92)] bg-[rgba(246,246,242,0.96)] px-4 text-[#1f1b15]">
                  <span className="text-[14px] font-semibold">20</span>
                  <Sparkles className="h-4.5 w-4.5 text-[#dba400]" strokeWidth={2.1} />
                </div>
              </div>
            </div>

            <button
              onClick={claimWelcomeBonus}
              disabled={isBonusClaimClosing || isBonusCounting}
              className="mt-4 flex w-full items-center justify-center gap-2 rounded-[22px] bg-[linear-gradient(135deg,#7dd8ff_0%,#52b7ff_52%,#2b7de9_100%)] px-5 py-3.5 text-[16px] font-semibold text-white shadow-[0_14px_28px_rgba(82,183,255,0.22)]"
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
