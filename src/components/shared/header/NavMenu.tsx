"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import ChevronIcon from "@/components/shared/icons/ChevronIcon";
import { navMenuList, getActiveIndex } from "@/constants/navMenu";

export default function NavMenu() {
  const pathname = usePathname();
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

  // When Solutions is open, pill stays on Solutions; otherwise follows pathname
  const pillActiveIndex = solutionsOpen ? 2 : activeIndex;

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

  // Перше оновлення + ретраї для надійного показу при завантаженні
  useEffect(() => {
    const run = () => updatePill();
    run();
    const nav = navRef.current;
    const ro = nav ? new ResizeObserver(run) : null;
    if (nav) ro?.observe(nav);
    const t1 = setTimeout(run, 50);
    const t2 = setTimeout(run, 150);
    const t3 = setTimeout(run, 400);
    const onLoad = () => run();
    window.addEventListener("load", onLoad);
    const t4 = setTimeout(run, 500);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
      window.removeEventListener("load", onLoad);
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

  // Close dropdown: on pathname change, Escape, or click outside
  const prevPathname = useRef(pathname);
  useEffect(() => {
    if (prevPathname.current !== pathname) {
      prevPathname.current = pathname;
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
  }, [pathname, solutionsOpen]);

  const solutionsItem = navMenuList[2];
  const isSolutionsActive = pillActiveIndex === 2;

  return (
    <nav
      ref={navRef}
      className="hidden md:flex relative my-2 p-2 rounded-full bg-[linear-gradient(90.95deg,rgba(231,231,231,0.8)_52.25%,rgba(255,255,255,0.8)_99.18%)] shadow-[inset_0px_4px_12.6px_0px_rgba(255,255,255,0.25)] backdrop-blur-[10px]"
    >
      <div
        className="absolute inset-0 rounded-full pointer-events-none"
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
          className="absolute rounded-full bg-black origin-center pointer-events-none z-0 transition-[left,width,top,height,transform] duration-300 ease-out"
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

      <ul className="relative z-10 flex items-center gap-3 list-none">
        {navMenuList.map((item, i) => (
          <li
            key={item.title}
            className={`flex ${item.slug ? "relative z-20" : "relative z-10"}`}
          >
            {item.slug ? (
              <Link
                ref={(el) => {
                  itemRefs.current[i] = el;
                }}
                href={item.slug}
                onClick={() => setSolutionsOpen(false)}
                className={`relative z-10 px-4.5 py-3 rounded-full text-[14px] font-medium leading-[120%] border border-transparent transition-[color,border] focus:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 focus-visible:ring-offset-transparent xl:hover:border-black ${pillActiveIndex === i ? "text-white" : "text-black xl:hover:brightness-125"}`}
              >
                {item.title}
              </Link>
            ) : (
              <>
                <button
                  ref={(el) => {
                    itemRefs.current[i] = el;
                  }}
                  type="button"
                  onClick={() => setSolutionsOpen((prev) => !prev)}
                  className={`cursor-pointer relative z-10 flex items-center px-4.5 py-3 rounded-full text-[14px] font-medium leading-[120%] border border-transparent transition-[color,border] focus:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 focus-visible:ring-offset-transparent xl:hover:border-black ${isSolutionsActive ? "text-white" : "text-black xl:hover:brightness-125 xl:hover:text-black"}`}
                  aria-expanded={solutionsOpen}
                  aria-haspopup="true"
                >
                  {item.title}
                  <ChevronIcon open={solutionsOpen} className="ml-2.5 size-4" />
                </button>
                {/* Solutions dropdown */}
                <div
                  ref={dropdownRef}
                  className="absolute left-0 top-full mt-4 min-w-[220px] rounded-[18px] bg-[linear-gradient(90.95deg,rgba(231,231,231,0.8)_52.25%,rgba(255,255,255,0.8)_99.18%)] shadow-[inset_0px_4px_12.6px_0px_rgba(255,255,255,0.25)] backdrop-blur-[10px] transition duration-200 ease-out z-50"
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
                    className="absolute inset-0 rounded-[18px] pointer-events-none"
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
                          href={sub.slug}
                          className="block px-5 py-2.5 text-sm font-medium transition-colors xl:hover:brightness-125 xl:hover:bg-black/5"
                        >
                          {sub.title}
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
    </nav>
  );
}
