'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLanguage } from '@/context/LanguageContext';
import { useState } from 'react';

const navItems = [
  { href: '/', labelKo: '홈', labelEn: 'Home' },
  { href: '/frontend', labelKo: '프론트엔드', labelEn: 'Frontend' },
  { href: '/backend', labelKo: '백엔드', labelEn: 'Backend' },
  { href: '/tasks', labelKo: '작업', labelEn: 'Tasks' },
  { href: '/guide', labelKo: '가이드', labelEn: 'Guide' },
  { href: '/resources', labelKo: '자료실', labelEn: 'Resources' },
];

export default function Navbar() {
  const pathname = usePathname();
  const { language, toggleLanguage } = useLanguage();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-zinc-200/60">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <span className="text-xl font-semibold tracking-tight text-zinc-900">
              Biospectrum
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`relative px-4 py-2 text-sm font-medium transition-colors duration-200 ${
                    isActive
                      ? 'text-zinc-900'
                      : 'text-zinc-500 hover:text-zinc-900'
                  }`}
                >
                  {language === 'ko' ? item.labelKo : item.labelEn}
                  {isActive && (
                    <span className="absolute bottom-0 left-4 right-4 h-[2px] bg-zinc-900 rounded-full" />
                  )}
                </Link>
              );
            })}
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-4">
            <button
              onClick={toggleLanguage}
              className="text-sm font-medium text-zinc-500 hover:text-zinc-900 transition-colors duration-200"
            >
              {language === 'ko' ? 'EN' : 'KO'}
            </button>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 -mr-2 text-zinc-600 hover:text-zinc-900 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-zinc-200/60 animate-fadeIn">
            <div className="flex flex-col gap-1">
              {navItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`px-4 py-3 text-sm font-medium transition-colors duration-200 ${
                      isActive
                        ? 'text-zinc-900 bg-zinc-100'
                        : 'text-zinc-500 hover:text-zinc-900 hover:bg-zinc-50'
                    }`}
                  >
                    {language === 'ko' ? item.labelKo : item.labelEn}
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
