import React, { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ChevronRight,
  Check,
  ClipboardList,
  Copy,
  Heart,
  Plus,
  Search,
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
} from "lucide-react";

const filters = [
  { id: "liked", label: "", icon: Heart },
  { id: "all", label: "Все", icon: Check },
  { id: "popular", label: "Тренд", icon: Zap },
  { id: "new", label: "Новый", icon: Star },
  { id: "free", label: "Бесплатно", icon: Ticket },
];

const styleSections = [
  { id: "all", label: "Все" },
  { id: "march8", label: "8 марта" },
  { id: "spring", label: "Весна" },
  { id: "business", label: "Деловой" },
  { id: "street", label: "Улица" },
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
    amount: 10,
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
    subtitle: "🙈 Стандарт",
    amount: 100,
    price: "899 ₽",
    badge: "Рекомендуем",
    badgeColor: "bg-[#53d11f] text-white",
    featured: true,
  },
  {
    id: 4,
    subtitle: "🔥 Продвинутый",
    amount: 250,
    price: "1 499 ₽",
    badge: "Удобно",
    badgeColor: "bg-[#2fb8ff] text-white",
  },
  {
    id: 5,
    subtitle: "💎 Генератор",
    amount: 500,
    price: "2 499 ₽",
    badge: "VIP",
    badgeColor: "bg-[#ffbf1f] text-white",
  },
];

const cards = [
  {
    id: 1,
    title: "Вечерний портрет",
    likes: 14,
    badge: null,
    section: "business",
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
    badge: "new",
    section: "street",
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
    badge: null,
    section: "business",
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
    badge: null,
    section: "spring",
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

function useTelegramWebApp() {
  const [isTelegram, setIsTelegram] = useState(false);

  useEffect(() => {
    const tg = window.Telegram?.WebApp;
    if (!tg) return;

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
    new: "bg-[#2b7de9] text-white",
    popular: "bg-[#ffbf1f] text-[#463100]",
    free: "bg-[#3cc95a] text-white",
  };

  const labels = {
    new: "Новый",
    popular: "Тренд",
    free: "Бесплатно",
  };

  return (
    <div
      className={`absolute left-3 top-3 rounded-full px-3 py-1.5 text-[12px] font-semibold shadow-[0_8px_16px_rgba(15,23,42,0.12)] ${styles[type] ?? "bg-white text-[#234677]"}`}
    >
      <span className="flex items-center gap-1">
        {type === "new" ? <Star className="h-3.5 w-3.5" strokeWidth={2.4} /> : null}
        {type === "popular" ? <Zap className="h-3.5 w-3.5" strokeWidth={2.4} /> : null}
        {type === "free" ? <Ticket className="h-3.5 w-3.5" strokeWidth={2.4} /> : null}
        <span>{labels[type] ?? "Стиль"}</span>
      </span>
    </div>
  );
}

function Header({ onOpenBalance, onOpenProfile, balance = 184, isBonusCounting = false }) {
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
    <div className="px-1 pb-0 pt-[180px]">
      <div className="mx-auto mt-[-75px] flex w-full max-w-[516px] items-center justify-between gap-3">
        <button
          onClick={onOpenProfile}
          className="group flex min-w-0 items-center gap-3 rounded-[16px] border border-[rgba(232,238,248,0.78)] bg-[rgba(255,255,255,0.72)] px-1 py-1 text-left transition active:scale-[0.98]"
        >
          <img
            src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80"
            alt="avatar"
            className="h-12 w-12 rounded-full object-cover"
          />
          <div className="min-w-0">
            <div className="flex items-center gap-1">
              <div className="truncate text-[18px] font-semibold text-[#1f3b67]">Сергей</div>
              <ArrowLeft className="h-3.5 w-3.5 rotate-180 text-[#9bb0d0] opacity-0 transition group-hover:opacity-100" />
            </div>
            <div className="text-[13px] text-[#7e8ba3]">Мой профиль</div>
          </div>
        </button>

        <div className="ml-auto flex items-center overflow-hidden rounded-full border border-[#d7e3f8] bg-[#f7faff] text-[#2e5fa7] shadow-sm">
          <div className="flex items-center gap-1 px-3 py-1.5 text-[14px] font-semibold">
            <BalanceDigits value={balance} />
            <Sparkles className="h-3.5 w-3.5" strokeWidth={2.1} />
          </div>
          <button
            onClick={onOpenBalance}
            className="flex h-10 w-10 items-center justify-center bg-[#2b7de9] text-white"
          >
            <Plus className="h-4.5 w-4.5" />
          </button>
        </div>
      </div>
    </div>
  );
}

function PinnedSectionHeader({ children, className = "" }) {
  return (
    <div className={`sticky top-0 z-20 -mx-3 bg-[rgba(244,247,252,0.94)] px-3 pb-0 backdrop-blur-[10px] ${className}`}>
      {children}
    </div>
  );
}

function FilterBar({ activeFilter, setActiveFilter }) {
  return (
    <div className="mt-[-5px] flex gap-2 overflow-x-auto rounded-[20px] bg-[rgba(248,250,253,0.82)] px-2 py-2">
      {filters.map((filter) => {
        const Icon = filter.icon;
        const isActive = activeFilter === filter.id;
        return (
          <button
            key={filter.id}
            onClick={() => setActiveFilter(filter.id)}
            className={`flex shrink-0 items-center gap-1.5 rounded-full px-3.5 py-2 text-[12px] font-semibold transition ${
              isActive
                ? "bg-[rgba(43,125,233,0.92)] text-white"
                : "bg-[rgba(245,247,251,0.82)] text-[#5a6e90]"
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
      className="relative overflow-hidden rounded-[18px] bg-[#edf2f8] text-left shadow-[0_6px_18px_rgba(82,103,138,0.05)]"
    >
      <div className="relative overflow-hidden rounded-[18px]">
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
                className="aspect-[0.78] shrink-0 object-cover"
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

function StyleScreen({
  card,
  sectionStyles,
  onSelectStyle,
  onBack,
  onOpenBalance,
  onOpenProfile,
  onCreate,
  balance,
  isBonusCounting,
}) {
  const [isLiked, setIsLiked] = useState(false);
  const isPairStyle = card.title === "Пара в городе";
  const [hasPhoto, setHasPhoto] = useState(false);
  const [hasSecondPhoto, setHasSecondPhoto] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [isUploadingSecond, setIsUploadingSecond] = useState(false);
  const [activeSlide, setActiveSlide] = useState(0);
  const styleGalleryRef = useRef(null);
  const touchStartXRef = useRef(0);
  const uploadedPreview =
    "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=1200&q=80";
  const styleGallery = card.gallery?.length ? card.gallery : [card.image];
  const canSlideGallery = styleGallery.length > 1;

  const goToStyleSlide = (index, behavior = "smooth") => {
    if (!styleGalleryRef.current) return;
    const nextIndex = Math.max(0, Math.min(index, styleGallery.length - 1));
    styleGalleryRef.current.scrollTo({
      left: styleGalleryRef.current.clientWidth * nextIndex,
      behavior,
    });
    setActiveSlide(nextIndex);
  };

  useEffect(() => {
    setActiveSlide(0);
    goToStyleSlide(0, "auto");
  }, [card.id]);

  const handleGalleryScroll = (event) => {
    const { scrollLeft, clientWidth } = event.currentTarget;
    if (!clientWidth) return;
    setActiveSlide(Math.round(scrollLeft / clientWidth));
  };

  const handleGalleryTouchStart = (event) => {
    touchStartXRef.current = event.touches[0]?.clientX ?? 0;
  };

  const handleGalleryTouchEnd = (event) => {
    if (!canSlideGallery) return;

    const touchEndX = event.changedTouches[0]?.clientX ?? 0;
    const deltaX = touchEndX - touchStartXRef.current;
    const swipeThreshold = 45;

    if (deltaX <= -swipeThreshold && activeSlide === styleGallery.length - 1) {
      goToStyleSlide(0);
      return;
    }

    if (deltaX >= swipeThreshold && activeSlide === 0) {
      goToStyleSlide(styleGallery.length - 1);
    }
  };

  const handleUpload = () => {
    setIsUploading(true);
    setTimeout(() => {
      setHasPhoto(true);
      setIsUploading(false);
    }, 900);
  };

  const handleSecondUpload = () => {
    setIsUploadingSecond(true);
    setTimeout(() => {
      setHasSecondPhoto(true);
      setIsUploadingSecond(false);
    }, 900);
  };

  const UploadTile = ({ hasImage, isBusy, onUpload, onReset, label }) =>
    hasImage ? (
      <div className="relative h-[168px] overflow-hidden rounded-[20px] border border-[#d9e5f5] bg-[#f4f9ff]">
        <img src={uploadedPreview} alt="uploaded preview" className="h-full w-full object-cover" />
        <div className="absolute left-3 top-3 flex items-center gap-2 rounded-full bg-[#2b7de9] px-3 py-1.5 text-white shadow-[0_10px_20px_rgba(43,125,233,0.22)]">
          <Check className="h-4 w-4" strokeWidth={2.4} />
          <span className="text-[13px] font-semibold">Загружено</span>
        </div>
        <button
          onClick={onReset}
          className="absolute right-3 top-3 rounded-full bg-white/90 px-3 py-1.5 text-[12px] font-semibold text-[#2b7de9] backdrop-blur-sm"
        >
          Заменить
        </button>
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/45 to-transparent px-4 pb-3 pt-10">
          <div className="text-[13px] font-medium text-white/95">{label}</div>
        </div>
      </div>
    ) : (
      <button
        onClick={isBusy ? undefined : onUpload}
        className="relative flex h-[168px] w-full flex-col items-center justify-center overflow-hidden rounded-[20px] border-2 border-dashed border-[#d9e5f5] bg-[#f4f9ff] px-4 py-4 text-center transition hover:bg-[#f4f9ff]"
      >
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: isBusy ? 1 : 0, opacity: isBusy ? 1 : 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="absolute inset-0 z-0 origin-left bg-[#2b7de9]/20"
        />
        <div className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full bg-[#2b7de9] text-white shadow-[0_10px_20px_rgba(43,125,233,0.18)]">
          {isBusy ? (
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 0.8, ease: "linear" }}
              className="h-6 w-6 rounded-full border-2 border-white/90 border-t-transparent"
            />
          ) : (
            <Upload className="h-6 w-6" strokeWidth={2.1} />
          )}
        </div>
        <div className="relative z-10 mt-2.5 text-[15px] font-semibold text-[#234677]">
          {isBusy ? "Загрузка..." : "Выбрать фото"}
        </div>
        <div className="relative z-10 mt-1 text-[12px] leading-5 text-[#7d8ca5]">
          {isBusy ? "Подготавливаем изображение" : "JPG, PNG"}
        </div>
      </button>
    );

  return (
    <div className="space-y-3">
      <PinnedSectionHeader className="pb-1 pt-0">
        <Header
          onOpenBalance={onOpenBalance}
          onOpenProfile={onOpenProfile}
          balance={balance}
          isBonusCounting={isBonusCounting}
        />

        {sectionStyles?.length ? (
          <div className="mt-[-5px] overflow-x-auto rounded-[20px] bg-[rgba(248,250,253,0.82)] px-2 py-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            <div className="flex items-center gap-2 pr-2">
              {sectionStyles.map((styleCard) => (
                <button
                  key={styleCard.id}
                  onClick={() => onSelectStyle(styleCard)}
                  className={`shrink-0 rounded-full px-3.5 py-2 text-[12px] font-semibold transition ${
                    styleCard.id === card.id
                      ? "bg-[rgba(43,125,233,0.92)] text-white"
                      : "bg-[rgba(245,247,251,0.82)] text-[#5a6e90]"
                  }`}
                >
                  {styleCard.title}
                </button>
              ))}
            </div>
          </div>
        ) : null}
      </PinnedSectionHeader>

      <div className="overflow-hidden rounded-[28px] bg-white shadow-[0_8px_32px_rgba(70,89,122,0.08)] ring-1 ring-[#dce4f2]">
        <div className="relative">
          <div
            ref={styleGalleryRef}
            onScroll={handleGalleryScroll}
            onTouchStart={handleGalleryTouchStart}
            onTouchEnd={handleGalleryTouchEnd}
            className={`flex overflow-x-auto scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden ${canSlideGallery ? "snap-x snap-mandatory" : ""}`}
          >
              {styleGallery.map((image, index) => (
                <img
                  key={`${card.id}-${index}`}
                  src={image}
                  alt={`${card.title} ${index + 1}`}
                  className={`aspect-[1.08] w-full shrink-0 object-cover ${canSlideGallery ? "snap-start" : ""}`}
                />
              ))}
          </div>
          {card.badge ? <CardBadge type={card.badge} /> : null}
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsLiked((prev) => !prev)}
            className={`absolute right-4 top-4 flex h-12 w-12 items-center justify-center rounded-full backdrop-blur-sm transition ${
              isLiked ? "bg-[#2b7de9]/85 text-white" : "bg-black/15 text-white"
            }`}
          >
            <motion.div
              key={isLiked ? "liked" : "idle"}
              initial={{ scale: 0.8, opacity: 0.8 }}
              animate={{ scale: isLiked ? [1, 1.28, 1.08] : 1, opacity: 1 }}
              transition={{ duration: 0.28 }}
            >
              <Heart className="h-5 w-5" strokeWidth={2.1} fill={isLiked ? "currentColor" : "none"} />
            </motion.div>
          </motion.button>
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/45 to-transparent px-5 pb-5 pt-10 text-white">
            <div className="mt-2 flex items-center gap-2 text-[12px] font-medium text-white/90">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/15 backdrop-blur-sm">
                <User className="h-3.5 w-3.5" strokeWidth={2.2} />
              </span>
              <span className="flex items-center gap-1.5">
                <span>1.2K</span>
                <span>выбрали</span>
              </span>
            </div>
            <div className="mt-2 max-w-[85%] text-[15px] leading-6 text-white/85">{card.description}</div>
          </div>
          {styleGallery.length > 1 ? (
            <div className="absolute bottom-3 left-5 flex items-center gap-1.5">
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
        </div>
      </div>

      <div className="rounded-[28px] bg-white p-3.5 shadow-[0_8px_32px_rgba(70,89,122,0.08)] ring-1 ring-[#dce4f2]">
        {isPairStyle ? (
          <div className="grid grid-cols-2 gap-0 overflow-hidden rounded-[22px] border border-[#d9e5f5]">
            <div className="border-r border-[#d9e5f5]">
              <UploadTile
                hasImage={hasPhoto}
                isBusy={isUploading}
                onUpload={handleUpload}
                onReset={() => setHasPhoto(false)}
                label="Первое фото загружено"
              />
            </div>
            <div>
              <UploadTile
                hasImage={hasSecondPhoto}
                isBusy={isUploadingSecond}
                onUpload={handleSecondUpload}
                onReset={() => setHasSecondPhoto(false)}
                label="Второе фото загружено"
              />
            </div>
          </div>
        ) : (
          <UploadTile
            hasImage={hasPhoto}
            isBusy={isUploading}
            onUpload={handleUpload}
            onReset={() => setHasPhoto(false)}
            label="Твое фото готово к генерации"
          />
        )}
      </div>

      <div>
        <button
          onClick={() =>
            onCreate({
              previewImage: uploadedPreview,
              hasUploadedPhoto: isPairStyle ? hasPhoto || hasSecondPhoto : hasPhoto,
            })
          }
          className="flex w-full items-center justify-center gap-2 rounded-[22px] bg-[#2b7de9] px-5 py-4 text-[16px] font-semibold text-white shadow-[0_14px_28px_rgba(43,125,233,0.28)] transition hover:bg-[#246fd1]"
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
        <div className="flex items-center justify-between gap-3 rounded-[14px] bg-[#f4f9ff] px-3 py-2">
          <div className="min-w-0 text-[16px] font-semibold text-[#234677]">{task.title}</div>
          <div className="flex shrink-0 items-center gap-1 rounded-full bg-[#eef5ff] px-3 py-1.5 text-[13px] font-semibold text-[#2b7de9]">
            <span>+{task.reward}</span>
            <Sparkles className="h-4 w-4" strokeWidth={2.1} />
          </div>
        </div>

        <div className="flex items-end justify-between gap-3">
          <div className="max-w-[72%] text-[13px] leading-5 text-[#7d8ca5]">{task.description}</div>
          <button className="flex shrink-0 items-center justify-center gap-2 rounded-[16px] bg-[#2b7de9] px-4 py-3 text-[14px] font-semibold text-white transition hover:bg-[#246fd1]">
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

  return (
    <button
      onClick={() => onSelect(product.id)}
      className={`relative w-full overflow-hidden rounded-[24px] text-left transition ${
        isFeatured
          ? "bg-[linear-gradient(180deg,#2a2d3b_0%,#212432_100%)]"
          : "bg-[#f3f5fb]"
      } ${isSelected ? "ring-2 ring-[#2b7de9] ring-offset-2 ring-offset-transparent" : ""}`}
    >
      <div className={`relative px-5 py-4 ${isFeatured ? "text-white" : "text-[#1d2333]"}`}>
        {product.badge ? (
          <div
            className={`absolute right-5 top-4 rounded-[12px] px-3 py-1.5 text-[11px] font-semibold leading-none ${product.badgeColor}`}
          >
            {product.badge}
          </div>
        ) : null}

        <div className="flex items-center justify-between gap-4">
          <div className="min-w-0 pr-3">
            <div className={`text-[18px] font-medium ${isFeatured ? "text-white/78" : "text-[#767f93]"}`}>
              {product.subtitle}
            </div>
            <div className={`mt-1.5 text-[16px] font-semibold tracking-[-0.03em] ${isFeatured ? "text-white" : "text-[#161c2c]"}`}>
              {product.amount} фотографий
            </div>
          </div>
          <div className={`shrink-0 text-right text-[17px] font-semibold tracking-[-0.03em] ${isFeatured ? "text-white" : "text-[#161c2c]"}`}>
            {product.price}
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
}) {
  const shopBenefits = [
    "Создавай виральный контент за минуты",
    "Забудь про обработку: идеальный свет и кожа на каждом кадре",
    "Выгляди на миллион: премиальные образы без затрат на стилистов",
    "Разовая оплата, без подписок и автоматических списаний",
  ];

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

      <div className="space-y-6 rounded-[30px] bg-white px-4 pb-28 pt-2 shadow-[0_8px_32px_rgba(70,89,122,0.08)] ring-1 ring-[#dce4f2]">
        <div className="space-y-3 px-1">
          <div className="max-w-[320px] text-[34px] font-semibold leading-[0.95] tracking-[-0.055em] text-[#161c2c]">
            Твоя идеальная съемка за 1 минуту
          </div>
          <div className="text-[17px] leading-6 text-[#707b90]">
            Фотографии, которыми хочется делиться
          </div>
        </div>

        <div className="space-y-3">
          {products.map((product) => (
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
              <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#25b4ff] text-white shadow-[0_8px_18px_rgba(37,180,255,0.2)]">
                <Check className="h-4 w-4" strokeWidth={3} />
              </div>
              <div>{benefit}</div>
            </div>
          ))}
        </div>

      </div>

      <div className="sticky bottom-3 z-20 px-1">
        <button className="flex w-full items-center justify-center rounded-[28px] bg-[linear-gradient(135deg,#2fb7ff_0%,#1d9fff_45%,#0b7cff_100%)] px-5 py-5 text-[17px] font-semibold text-white shadow-[0_18px_34px_rgba(27,145,255,0.28)]">
          Перейти к оплате
        </button>
      </div>
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
          <div className="mt-[-5px] overflow-x-auto rounded-[20px] bg-[rgba(248,250,253,0.82)] px-2 py-2 pr-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            <div className="flex items-center gap-2 pr-2">
              {[
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
                        ? "bg-[rgba(43,125,233,0.92)] text-white"
                        : "bg-[rgba(245,247,251,0.82)] text-[#5a6e90]"
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

      {profileTab === "tasks" ? (
        <div className="space-y-2.5">
          {tasks.map((task) => (
            <TaskCard key={task.id} task={task} />
          ))}
        </div>
      ) : profileTab === "bonus" ? (
        <div className="space-y-3">
          <div className="rounded-[22px] border border-[#dce4f2] bg-white p-4 shadow-[0_8px_24px_rgba(70,89,122,0.06)]">
            <div className="flex items-center justify-between gap-3 rounded-[16px] bg-[#f4f9ff] px-4 py-3">
              <div>
                <div className="text-[15px] font-semibold text-[#234677]">Ежедневный бонус</div>
                <div className="mt-1 text-[13px] leading-5 text-[#7d8ca5]">
                  Заходи каждый день и получай дополнительные фотографии на баланс.
                </div>
              </div>
              <div className="flex h-11 min-w-[88px] items-center justify-center gap-2 rounded-full bg-[#eef5ff] px-4 text-[#2b7de9]">
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
              <button className="flex items-center justify-center gap-2 rounded-[16px] bg-[#2b7de9] px-4 py-3 text-[14px] font-semibold text-white transition hover:bg-[#246fd1]">
                <Send className="h-4 w-4" strokeWidth={2.2} />
                Отправить
              </button>
              <button className="flex items-center justify-center gap-2 rounded-[16px] bg-[#eef5ff] px-4 py-3 text-[14px] font-semibold text-[#2b7de9] transition hover:bg-[#e1ecff]">
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
              <button className="absolute bottom-3 right-3 flex h-12 w-12 items-center justify-center rounded-full bg-[#2b7de9] text-white shadow-[0_10px_22px_rgba(43,125,233,0.28)]">
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

      <div className="rounded-[22px] bg-[#f8fbff] px-4 pb-4 pt-4 ring-1 ring-[#e3ebf7]">
        <div className="text-center">
          <div className="flex items-center justify-center gap-2 text-[18px] font-semibold tracking-[-0.02em] text-[#234677]">
            <Sparkles className="h-5 w-5 text-[#2b7de9]" strokeWidth={2.2} />
            <span>Создание фото</span>
          </div>

          <div className="mt-3 rounded-[18px] bg-white/80 px-4 py-3 shadow-[0_8px_20px_rgba(43,125,233,0.08)]">
            <div className="flex items-center justify-between">
              <div className="text-[12px] font-semibold text-[#234677]">87%</div>
            </div>
            <div className="mt-2 h-2 overflow-hidden rounded-full bg-[#edf4ff]">
              <motion.div
                initial={{ width: "12%" }}
                animate={{ width: ["12%", "48%", "72%", "87%"] }}
                transition={{ duration: 2.4, ease: "easeInOut" }}
                className="h-full rounded-full bg-[linear-gradient(90deg,#5bc2ff_0%,#2b7de9_100%)]"
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
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(30,64,175,0.10)_0%,rgba(43,125,233,0.24)_100%)]" />

          <div className="absolute inset-0 flex items-center justify-center">
            <div className="flex items-center gap-2 rounded-full bg-white/90 px-5 py-3 text-[#2b7de9] shadow-[0_12px_28px_rgba(43,125,233,0.16)] backdrop-blur-sm">
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

      <div className="rounded-[22px] bg-[#f8fbff] px-4 pb-4 pt-4 ring-1 ring-[#e3ebf7]">
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

          <button className="absolute bottom-4 right-4 flex items-center gap-2 rounded-full bg-[#2b7de9] px-4 py-3 text-white shadow-[0_12px_24px_rgba(43,125,233,0.24)]">
            <Download className="h-5 w-5" strokeWidth={2.2} />
            <span className="text-[13px] font-semibold">Скачать</span>
          </button>
        </div>

        <div className="mt-3 flex items-center justify-between gap-2 rounded-[18px] bg-[#f7fbff] px-4 py-3">
          <div className="flex min-w-0 flex-1 items-center gap-2">
            <span className="shrink-0 text-[13px] font-semibold text-[#7d8ca5]">Поставь оценку</span>
            <div className="flex min-w-0 items-center gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onClick={() => setRating(star)}
                  className="shrink-0 text-[22px] leading-none transition active:scale-[0.92]"
                >
                  <span className={star <= rating ? "text-[#ffbf1f]" : "text-[#cfd9ea]"}>
                    {star <= rating ? "★" : "☆"}
                  </span>
                </button>
              ))}
            </div>
          </div>

          <button className="ml-2 shrink-0 rounded-full bg-[#dfe9f9] px-3 py-1.5 text-[11px] font-semibold text-[#5a6e90] shadow-[0_6px_14px_rgba(133,155,191,0.16)]">
            Отправить
          </button>
        </div>
      </div>

      <div className="space-y-2">
        <button className="flex w-full items-center justify-center gap-2 rounded-[22px] bg-[#3cc95a] px-5 py-4 text-[15px] font-semibold text-white shadow-[0_14px_28px_rgba(60,201,90,0.24)]">
          <Plus className="h-5 w-5" strokeWidth={2.2} />
          Опубликовать в Сторис
        </button>
        <button className="flex w-full items-center justify-center gap-2 rounded-[22px] bg-[#2b7de9] px-5 py-4 text-[15px] font-semibold text-white shadow-[0_14px_28px_rgba(43,125,233,0.24)]">
          <Send className="h-5 w-5" strokeWidth={2.2} />
          Отправить в чат
        </button>
      </div>
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
          <FeedCard key={card.id} card={card} onClick={onSelectCard} />
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

        <div className="mt-[-5px] overflow-x-auto rounded-[20px] bg-[rgba(248,250,253,0.82)] px-2 py-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <div className="flex items-center gap-2 pr-2">
            {sections.map((item) => (
              <button
                key={item.id}
                onClick={() => onChangeSection(item)}
                className={`shrink-0 rounded-full px-3.5 py-2 text-[12px] font-semibold transition ${
                  item.id === section.id
                    ? "bg-[rgba(43,125,233,0.92)] text-white"
                    : "bg-[rgba(245,247,251,0.82)] text-[#5a6e90]"
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
  const feedSections = styleSections
    .filter((section) => section.id !== "all")
    .map((section) => ({
      ...section,
      cards: visibleCards.filter((card) => card.section === section.id),
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
          <section key={section.id} className="space-y-1.5">
            <div className="flex items-center justify-between gap-3 px-2">
              <button
                onClick={() => onOpenSection(section)}
                className="inline-flex items-center gap-1.5 rounded-full bg-[rgba(238,244,251,0.8)] px-3 py-1.5 text-[#6f87ab]"
              >
                <h2 className="text-[15px] font-semibold tracking-[-0.03em] text-[#1c2b45]">
                  {section.label}
                </h2>
                <ChevronRight className="h-4 w-4 text-[#9eb2ce]" strokeWidth={2.4} />
              </button>
            </div>

            <div className="flex gap-3 overflow-x-auto px-2 pb-1 pr-0">
              {section.cards.map((card) => (
                <div key={card.id} className="w-[168px] shrink-0">
                  <FeedCard card={card} onClick={onSelectCard} />
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
  const [selectedSection, setSelectedSection] = useState(styleSections[1]);
  const [selectedProductId, setSelectedProductId] = useState(3);
  const [loadingPreviewImage, setLoadingPreviewImage] = useState(cards[0].image);
  const [hasUploadedPhotoForLoading, setHasUploadedPhotoForLoading] = useState(false);
  const [resultImage, setResultImage] = useState(cards[0].image);
  const [showWelcomeBonus, setShowWelcomeBonus] = useState(true);
  const [balance, setBalance] = useState(0);
  const [isBonusCounting, setIsBonusCounting] = useState(false);
  const [isBonusClaimClosing, setIsBonusClaimClosing] = useState(false);

  const visibleCards = useMemo(() => {
    let filteredCards = cards;

    if (activeFilter === "liked") filteredCards = cards.filter((card) => card.likes >= 50);
    else if (activeFilter === "popular") filteredCards = cards.filter((card) => card.badge === "popular");
    else if (activeFilter === "new") filteredCards = cards.filter((card) => card.badge === "new");
    else if (activeFilter === "free") filteredCards = cards.filter((card) => card.badge === "free");

    return filteredCards;
  }, [activeFilter]);

  const availableSections = useMemo(
    () =>
      styleSections
        .filter((section) => section.id !== "all")
        .map((section) => ({
          ...section,
          cards: visibleCards.filter((card) => card.section === section.id),
        }))
        .filter((section) => section.cards.length > 0),
    [visibleCards],
  );

  const currentSectionStyles = useMemo(
    () => cards.filter((item) => item.section === selectedCard.section),
    [selectedCard],
  );

  const handleSelectCard = (card) => {
    setSelectedCard(card);
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

  useEffect(() => {
    const backButton = window.Telegram?.WebApp?.BackButton;
    if (!backButton) return undefined;

    const handleBack = () => {
      setScreen((currentScreen) => {
        if (currentScreen === "feed") return currentScreen;
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
  }, [screen]);

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
      {!isTelegram ? (
        <div className="sticky top-0 z-[70] px-3 pt-3">
          <div className="mx-auto max-w-[516px] rounded-[18px] bg-[#1f6feb] px-4 py-3 text-[13px] font-medium text-white shadow-[0_14px_28px_rgba(31,111,235,0.22)]">
            Предпросмотр открыт вне Telegram. После деплоя этот интерфейс будет работать как Mini App внутри бота.
          </div>
        </div>
      ) : null}

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
            onSelectStyle={setSelectedCard}
            onBack={() => setScreen("feed")}
            onOpenBalance={handleOpenBalance}
            onOpenProfile={handleOpenProfile}
            balance={balance}
            isBonusCounting={isBonusCounting}
            onCreate={({ previewImage, hasUploadedPhoto }) => {
              setLoadingPreviewImage(previewImage);
              setHasUploadedPhotoForLoading(hasUploadedPhoto);
              setResultImage(selectedCard.image);
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
            onComplete={() => setScreen("result")}
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
        ) : screen === "shop" ? (
          <ShopScreen
            onBack={() => setScreen("feed")}
            onOpenBalance={handleOpenBalance}
            onOpenProfile={handleOpenProfile}
            selectedProductId={selectedProductId}
            setSelectedProductId={setSelectedProductId}
            balance={balance}
            isBonusCounting={isBonusCounting}
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
                <Gift className="h-6 w-6 text-[#2b7de9]" strokeWidth={2.1} />
                <span>Подарок</span>
              </div>
            </div>

            <div className="mt-3 rounded-[22px] bg-white px-3 py-3 ring-1 ring-[#e6eef9] shadow-[0_10px_24px_rgba(70,89,122,0.08)]">
              <div className="flex items-center justify-between rounded-[18px] bg-white px-4 py-3">
                <div>
                  <div className="text-[13px] font-medium text-[#7d8ca5]">Стартовый бонус</div>
                  <div className="mt-1 text-[22px] font-semibold tracking-[-0.03em] text-[#234677]">2 фотографии</div>
                </div>
                <div className="flex h-12 min-w-[92px] items-center justify-center gap-2 rounded-full bg-[#eef5ff] px-4 text-[#2b7de9]">
                  <span className="text-[14px] font-semibold">20</span>
                  <Sparkles className="h-4.5 w-4.5" strokeWidth={2.1} />
                </div>
              </div>
            </div>

            <button
              onClick={claimWelcomeBonus}
              disabled={isBonusClaimClosing || isBonusCounting}
              className="mt-4 flex w-full items-center justify-center gap-2 rounded-[22px] bg-[#2b7de9] px-5 py-3.5 text-[16px] font-semibold text-white shadow-[0_14px_28px_rgba(43,125,233,0.24)]"
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
