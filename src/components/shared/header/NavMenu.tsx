"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import ChevronIcon from "@/components/shared/icons/ChevronIcon";
import {
  navMenuList,
  getActiveIndex,
  SOLUTIONS_INDEX,
} from "@/constants/navMenu";
import { localizePath, type Locale } from "@/i18n/config";
import { useTranslations } from "@/i18n/I18nProvider";
import { splitLocalePath } from "@/utils/localePathname";
import LanguageSwitcher from "./LanguageSwitcher";

export default function NavMenu({ locale }: { locale: Locale }) {
  const t = useTranslations("nav");
  const rawPathname = usePathname();
  const { path: pathname } = splitLocalePath(rawPathname);
  const activeIndex = getActiveIndex(pathname);
  const [solutionsOpen, setSolutionsOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const itemRefs = useRef<(HTMLAnchorElement | HTMLButtonElement | null)[]>([]);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [pillStyle, setPillStyle] = useState<{
    left: number;
    top: number;
    width: number;
    height: number;
  } | null>(null);
  const [pillScale, setPillScale] = useState(0);
  const hasAnimatedInitial = useRef(false);

  // При відкритому Solutions pill лишається на ньому; інакше — за pathname
  const pillActiveIndex = solutionsOpen ? SOLUTIONS_INDEX : activeIndex;

  const updatePill = useCallback(() => {
    const el = itemRefs.current[pillActiveIndex];
    const nav = navRef.current;
    if (!el || !nav) return;
    const navRect = nav.getBoundingClientRect();
    const elRect = el.getBoundingClientRect();
    if (elRect.width <= 0 || elRect.height <= 0) return;
    setPillStyle({
      left: elRect.left - navRect.left,
      top: elRect.top - navRect.top,
      width: elRect.width,
      height: elRect.height,
    });
  }, [pillActiveIndex]);

  // Оновлення позиції pill: useLayoutEffect + rAF щоб layout встиг відмалюватись (шрифти, контейнер)
  useLayoutEffect(() => {
    const run = () => updatePill();
    const raf = requestAnimationFrame(() => {
      run();
      // Додатковий rAF для надійності при холодному завантаженні (шрифти ще завантажуються)
      requestAnimationFrame(run);
    });
    const nav = navRef.current;
    const ro = nav ? new ResizeObserver(run) : null;
    if (nav) ro?.observe(nav);
    return () => {
      cancelAnimationFrame(raf);
      ro?.disconnect();
    };
  }, [pillActiveIndex, updatePill]);

  // Після першого отримання позиції — анімація «виростання» з центру (scale 0 → 1)
  useEffect(() => {
    if (!pillStyle || hasAnimatedInitial.current) return;
    hasAnimatedInitial.current = true;
    const raf = requestAnimationFrame(() => setPillScale(1));
    return () => cancelAnimationFrame(raf);
  }, [pillStyle]);

  // Закриття дропдауну: зміна маршруту, Escape, клік поза межами
  const prevPathname = useRef(rawPathname);
  useEffect(() => {
    if (prevPathname.current !== rawPathname) {
      prevPathname.current = rawPathname;
      setSolutionsOpen(false);
    }
    if (!solutionsOpen) return;
    const close = () => setSolutionsOpen(false);
    const onKeyDown = (e: KeyboardEvent) => e.key === "Escape" && close();
    const onMouseDown = (e: MouseEvent) => {
      const target = e.target as Node;
      if (
        navRef.current?.contains(target) ||
        dropdownRef.current?.contains(target)
      )
        return;
      close();
    };
    window.addEventListener("keydown", onKeyDown);
    document.addEventListener("mousedown", onMouseDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("mousedown", onMouseDown);
    };
  }, [rawPathname, solutionsOpen]);

  const solutionsItem = navMenuList[SOLUTIONS_INDEX];
  const isSolutionsActive = pillActiveIndex === SOLUTIONS_INDEX;

  return (
    <nav
      ref={navRef}
      className="relative my-2 hidden items-center rounded-full bg-[linear-gradient(90.95deg,rgba(231,231,231,0.8)_52.25%,rgba(255,255,255,0.8)_99.18%)] p-2 shadow-[inset_0px_4px_12.6px_0px_rgba(255,255,255,0.25)] backdrop-blur-[10px] xl:flex"
    >
      <div
        className="pointer-events-none absolute inset-0 rounded-full"
        style={{
          background:
            "linear-gradient(270.67deg, #F2F2F2 -9.58%, #C7C7C7 103.45%)",
          padding: "1px",
          WebkitMask:
            "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          WebkitMaskComposite: "xor",
          maskComposite: "exclude",
        }}
      />

      {/* Sliding active pill: при першому показі з’являється з центру (scale 0→1), далі їздить по пунктах */}
      {pillStyle && (
        <div
          className="pointer-events-none absolute z-0 origin-center rounded-full bg-black transition-[left,width,top,height,transform] duration-300 ease-out"
          style={{
            left: pillStyle.left,
            top: pillStyle.top,
            width: pillStyle.width,
            height: pillStyle.height,
            transform: `scale(${pillScale})`,
          }}
          aria-hidden
        />
      )}

      <ul className="relative z-10 flex list-none items-center gap-1 lg:gap-2">
        {navMenuList.map((item, i) => (
          <li
            key={item.titleKey}
            className={`flex ${item.slug ? "relative z-20" : "relative z-10"}`}
          >
            {item.slug ? (
              <Link
                ref={(el) => {
                  itemRefs.current[i] = el;
                }}
                href={localizePath(locale, item.slug)}
                onClick={() => setSolutionsOpen(false)}
                className={`relative z-10 whitespace-nowrap rounded-full border border-transparent px-3.5 py-3 text-[13px] font-medium leading-[120%] transition-[color,border] focus:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 focus-visible:ring-offset-transparent lg:px-4 lg:text-[14px] xl:hover:border-black ${
                  pillActiveIndex === i
                    ? "text-white"
                    : "text-black xl:hover:brightness-125"
                }`}
              >
                {t(item.titleKey)}
              </Link>
            ) : (
              <>
                <button
                  ref={(el) => {
                    itemRefs.current[i] = el;
                  }}
                  type="button"
                  onClick={() => setSolutionsOpen((prev) => !prev)}
                  className={`relative z-10 flex cursor-pointer items-center whitespace-nowrap rounded-full border border-transparent px-3.5 py-3 text-[13px] font-medium leading-[120%] transition-[color,border] focus:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 focus-visible:ring-offset-transparent lg:px-4 lg:text-[14px] xl:hover:border-black ${
                    isSolutionsActive
                      ? "text-white"
                      : "text-black xl:hover:brightness-125 xl:hover:text-black"
                  }`}
                  aria-expanded={solutionsOpen}
                  aria-haspopup="true"
                >
                  {t(item.titleKey)}
                  <ChevronIcon open={solutionsOpen} className="ml-2 size-4" />
                </button>
                {/* Solutions dropdown */}
                <div
                  ref={dropdownRef}
                  className="absolute left-0 top-full z-50 mt-4 min-w-[240px] rounded-[18px] bg-[linear-gradient(90.95deg,rgba(231,231,231,0.9)_52.25%,rgba(255,255,255,0.9)_99.18%)] shadow-[inset_0px_4px_12.6px_0px_rgba(255,255,255,0.25)] backdrop-blur-[10px] transition duration-200 ease-out"
                  style={{
                    opacity: solutionsOpen ? 1 : 0,
                    transform: solutionsOpen
                      ? "translateY(0) scale(1)"
                      : "translateY(-8px) scale(0.98)",
                    pointerEvents: solutionsOpen ? "auto" : "none",
                    visibility: solutionsOpen ? "visible" : "hidden",
                  }}
                >
                  <div
                    className="pointer-events-none absolute inset-0 rounded-[18px]"
                    style={{
                      background:
                        "linear-gradient(270.67deg, #F2F2F2 -9.58%, #C7C7C7 103.45%)",
                      padding: "1px",
                      WebkitMask:
                        "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                      WebkitMaskComposite: "xor",
                      maskComposite: "exclude",
                    }}
                  />
                  <ul className="py-2">
                    {solutionsItem.submenu?.map((sub) => (
                      <li key={sub.slug}>
                        <Link
                          href={localizePath(locale, sub.slug)}
                          className="block px-5 py-2.5 text-sm font-medium transition-colors xl:hover:bg-black/5 xl:hover:brightness-125"
                        >
                          {t(sub.titleKey)}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>

      <span className="relative z-10 mx-1 h-5 w-px bg-black/15" aria-hidden />
      <div className="relative z-20">
        <LanguageSwitcher locale={locale} />
      </div>
    </nav>
  );
}
