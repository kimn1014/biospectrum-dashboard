'use client';

import { useParams } from 'next/navigation';
import AuthWrapper from '@/components/AuthWrapper';
import { useLanguage } from '@/context/LanguageContext';
import { guides } from '@/data/guides';
import Link from 'next/link';

export default function GuideDetailPage() {
  const params = useParams();
  const { t, language } = useLanguage();
  const slug = params.slug as string;

  const guide = guides.find(g => g.slug === slug);
  const guideIndex = guides.findIndex(g => g.slug === slug);

  if (!guide) {
    return (
      <AuthWrapper>
        <div className="min-h-screen pt-28 px-6">
          <div className="max-w-4xl mx-auto text-center py-20">
            <p className="text-zinc-400 mb-4">
              {t('가이드를 찾을 수 없습니다', 'Guide not found')}
            </p>
            <Link href="/guide" className="text-zinc-900 hover:underline">
              {t('가이드 목록으로', 'Back to guides')}
            </Link>
          </div>
        </div>
      </AuthWrapper>
    );
  }

  return (
    <AuthWrapper>
      <div className="min-h-screen">
        {/* Header */}
        <section className="pt-28 pb-12 px-6 border-b border-zinc-200">
          <div className="max-w-4xl mx-auto">
            <Link
              href="/guide"
              className="inline-flex items-center gap-2 text-sm text-zinc-400 hover:text-zinc-900 transition-colors mb-6 animate-fadeInUp"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" />
              </svg>
              {t('가이드 목록', 'All Guides')}
            </Link>
            <p className="text-xs text-zinc-400 uppercase tracking-wider mb-3 animate-fadeInUp stagger-1">
              {String(guideIndex + 1).padStart(2, '0')} — Documentation
            </p>
            <h1 className="text-3xl md:text-4xl font-semibold text-zinc-900 tracking-tight mb-4 animate-fadeInUp stagger-2">
              {language === 'ko' ? guide.titleKo : guide.titleEn}
            </h1>
            <p className="text-zinc-500 animate-fadeInUp stagger-3">
              {language === 'ko' ? guide.descriptionKo : guide.descriptionEn}
            </p>
          </div>
        </section>

        {/* Content */}
        <section className="py-12 px-6">
          <div className="max-w-4xl mx-auto">
            {/* Template Notice */}
            <div className="p-6 border border-dashed border-zinc-300 mb-12 animate-fadeInUp stagger-4">
              <p className="text-sm text-zinc-500">
                {t(
                  '이 가이드는 템플릿입니다. 실제 내용이 곧 추가될 예정입니다.',
                  'This guide is a template. Actual content will be added soon.'
                )}
              </p>
            </div>

            {/* Sections */}
            <div className="space-y-12">
              {/* Section 1 */}
              <div className="animate-fadeInUp stagger-4">
                <div className="flex items-center gap-4 mb-6">
                  <span className="text-xs text-zinc-400 uppercase tracking-wider">01</span>
                  <h2 className="text-xl font-medium text-zinc-900">
                    {t('개요', 'Overview')}
                  </h2>
                </div>
                <div className="p-6 bg-zinc-50 border border-zinc-200">
                  <p className="text-sm text-zinc-400 italic">
                    {t('가이드 개요 내용이 여기에 추가됩니다.', 'Guide overview content will be added here.')}
                  </p>
                </div>
              </div>

              {/* Section 2 */}
              <div className="animate-fadeInUp stagger-5">
                <div className="flex items-center gap-4 mb-6">
                  <span className="text-xs text-zinc-400 uppercase tracking-wider">02</span>
                  <h2 className="text-xl font-medium text-zinc-900">
                    {t('시작하기', 'Getting Started')}
                  </h2>
                </div>
                <div className="p-6 bg-zinc-50 border border-zinc-200">
                  <p className="text-sm text-zinc-400 italic">
                    {t('시작 가이드 내용이 여기에 추가됩니다.', 'Getting started content will be added here.')}
                  </p>
                </div>
              </div>

              {/* Section 3 */}
              <div className="animate-fadeInUp stagger-6">
                <div className="flex items-center gap-4 mb-6">
                  <span className="text-xs text-zinc-400 uppercase tracking-wider">03</span>
                  <h2 className="text-xl font-medium text-zinc-900">
                    {t('단계별 가이드', 'Step-by-Step Guide')}
                  </h2>
                </div>
                <div className="space-y-px bg-zinc-200">
                  {[1, 2, 3].map((step) => (
                    <div key={step} className="p-6 bg-white">
                      <p className="text-xs text-zinc-400 uppercase tracking-wider mb-2">
                        {t('단계', 'Step')} {step}
                      </p>
                      <p className="text-sm text-zinc-400 italic">
                        {t('단계별 가이드 내용이 여기에 추가됩니다.', 'Step-by-step guide content will be added here.')}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Section 4 */}
              <div className="animate-fadeInUp">
                <div className="flex items-center gap-4 mb-6">
                  <span className="text-xs text-zinc-400 uppercase tracking-wider">04</span>
                  <h2 className="text-xl font-medium text-zinc-900">
                    {t('주의사항', 'Important Notes')}
                  </h2>
                </div>
                <div className="p-6 bg-zinc-900 text-white">
                  <p className="text-sm text-zinc-400 italic">
                    {t('주의사항 내용이 여기에 추가됩니다.', 'Important notes content will be added here.')}
                  </p>
                </div>
              </div>
            </div>

            {/* Back Link */}
            <div className="mt-16 pt-8 border-t border-zinc-200">
              <Link
                href="/guide"
                className="inline-flex items-center gap-2 text-sm text-zinc-500 hover:text-zinc-900 transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" />
                </svg>
                {t('가이드 목록으로', 'Back to Guides')}
              </Link>
            </div>
          </div>
        </section>
      </div>
    </AuthWrapper>
  );
}
