'use client';

import AuthWrapper from '@/components/AuthWrapper';
import { useLanguage } from '@/context/LanguageContext';
import { guides } from '@/data/guides';
import Link from 'next/link';

export default function GuidePage() {
  const { t, language } = useLanguage();

  return (
    <AuthWrapper>
      <div className="min-h-screen">
        {/* Header */}
        <section className="pt-12 pb-12 px-6 border-b border-zinc-200">
          <div className="max-w-4xl mx-auto">
            <p className="text-xs text-zinc-400 uppercase tracking-wider mb-3 animate-fadeInUp">
              Documentation
            </p>
            <h1 className="text-3xl md:text-4xl font-semibold text-zinc-900 tracking-tight mb-4 animate-fadeInUp stagger-1">
              {t('어드민 가이드', 'Admin Guide')}
            </h1>
            <p className="text-zinc-500 animate-fadeInUp stagger-2">
              {t('쇼피파이 관리자를 위한 가이드 문서', 'Guide documents for Shopify administrators')}
            </p>
          </div>
        </section>

        {/* Guide List */}
        <section className="py-8 px-6">
          <div className="max-w-4xl mx-auto">
            <div className="space-y-px bg-zinc-200">
              {guides.map((guide, index) => (
                <Link
                  key={guide.id}
                  href={`/guide/${guide.slug}`}
                  className="group flex items-center justify-between bg-white p-6 hover:bg-zinc-50 transition-colors duration-300 animate-fadeInUp"
                  style={{ animationDelay: `${0.1 + index * 0.05}s` }}
                >
                  <div className="flex-1">
                    <p className="text-xs text-zinc-400 uppercase tracking-wider mb-2">
                      {String(index + 1).padStart(2, '0')}
                    </p>
                    <h3 className="text-base font-medium text-zinc-900 mb-1 group-hover:text-zinc-600 transition-colors">
                      {language === 'ko' ? guide.titleKo : guide.titleEn}
                    </h3>
                    <p className="text-sm text-zinc-500">
                      {language === 'ko' ? guide.descriptionKo : guide.descriptionEn}
                    </p>
                  </div>
                  <svg className="w-5 h-5 text-zinc-300 group-hover:text-zinc-900 group-hover:translate-x-1 transition-all duration-300 flex-shrink-0 ml-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 17L17 7M17 7H7M17 7v10" />
                  </svg>
                </Link>
              ))}
            </div>

            {/* Coming Soon */}
            <div className="mt-12 p-8 border border-dashed border-zinc-300 text-center animate-fadeInUp stagger-4">
              <p className="text-sm text-zinc-400 mb-1">
                {t('추가 가이드 예정', 'More guides coming soon')}
              </p>
              <p className="text-xs text-zinc-300">
                {t('필요한 가이드가 있으면 요청해주세요', 'Request if you need specific guides')}
              </p>
            </div>
          </div>
        </section>
      </div>
    </AuthWrapper>
  );
}
