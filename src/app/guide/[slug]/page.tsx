'use client';

import { useParams } from 'next/navigation';
import AuthWrapper from '@/components/AuthWrapper';
import { useLanguage } from '@/context/LanguageContext';
import { guides, GuideSection, GuideStep } from '@/data/guides';
import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';

// 이미지 모달 컴포넌트
function ImageModal({ src, alt, onClose }: { src: string; alt: string; onClose: () => void }) {
  return (
    <div
      className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 animate-fadeIn"
      onClick={onClose}
    >
      <div className="relative max-w-5xl w-full">
        <button
          onClick={onClose}
          className="absolute -top-12 right-0 text-white hover:text-zinc-300 transition-colors"
        >
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <Image
          src={src}
          alt={alt}
          width={1200}
          height={800}
          className="w-full h-auto rounded-lg shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        />
      </div>
    </div>
  );
}

// 스텝 카드 컴포넌트
function StepCard({
  step,
  index,
  language,
  onImageClick
}: {
  step: GuideStep;
  index: number;
  language: string;
  onImageClick: (src: string, alt: string) => void;
}) {
  return (
    <div className="bg-white border border-zinc-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300 animate-fadeInUp flex flex-col" style={{ animationDelay: `${0.1 + index * 0.05}s` }}>
      {/* 텍스트 섹션 (위) */}
      <div className="p-5">
        <div className="flex items-center gap-3 mb-3">
          <span className="flex items-center justify-center w-8 h-8 rounded-full bg-zinc-900 text-white text-sm font-medium flex-shrink-0">
            {index + 1}
          </span>
          <h4 className="font-medium text-zinc-900">
            {language === 'ko' ? step.titleKo : step.titleEn}
          </h4>
        </div>
        <p className="text-sm text-zinc-600 leading-relaxed pl-11">
          {language === 'ko' ? step.descriptionKo : step.descriptionEn}
        </p>
      </div>
      {/* 이미지 섹션 (아래) */}
      {step.image && (
        <div
          className="relative w-full h-48 bg-zinc-100 cursor-pointer group overflow-hidden mt-auto border-t border-zinc-200"
          onClick={() => onImageClick(step.image!, language === 'ko' ? step.titleKo : step.titleEn)}
        >
          <Image
            src={step.image}
            alt={language === 'ko' ? step.titleKo : step.titleEn}
            fill
            className="object-contain p-2 group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center">
            <svg className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
            </svg>
          </div>
        </div>
      )}
    </div>
  );
}

// 섹션 컴포넌트
function SectionCard({
  section,
  index,
  language,
  t,
  onImageClick
}: {
  section: GuideSection;
  index: number;
  language: string;
  t: (ko: string, en: string) => string;
  onImageClick: (src: string, alt: string) => void;
}) {
  const hasSteps = section.steps && section.steps.length > 0;

  return (
    <div className="animate-fadeInUp" style={{ animationDelay: `${0.1 + index * 0.1}s` }}>
      {/* 섹션 헤더 */}
      <div className="flex items-center gap-4 mb-6">
        <span className="text-xs text-zinc-400 uppercase tracking-wider font-mono">
          {String(index + 1).padStart(2, '0')}
        </span>
        <h2 className="text-xl font-semibold text-zinc-900">
          {language === 'ko' ? section.titleKo : section.titleEn}
        </h2>
      </div>

      {/* 섹션 설명 */}
      {(section.descriptionKo || section.descriptionEn) && (
        <p className="text-zinc-600 mb-6 pl-10">
          {language === 'ko' ? section.descriptionKo : section.descriptionEn}
        </p>
      )}

      {/* 노트 박스 */}
      {section.note && (
        <div className="bg-zinc-900 text-white p-4 rounded-lg mb-6 ml-10">
          <p className="text-xs text-zinc-400 uppercase tracking-wider mb-1">
            {language === 'ko' ? section.note.titleKo : section.note.titleEn}
          </p>
          <p className="text-sm font-medium">
            {language === 'ko' ? section.note.contentKo : section.note.contentEn}
          </p>
        </div>
      )}

      {/* 불릿 포인트 */}
      {section.bulletPointsKo && section.bulletPointsKo.length > 0 && (
        <ul className="space-y-2 mb-6 pl-10">
          {(language === 'ko' ? section.bulletPointsKo : section.bulletPointsEn || []).map((point, i) => (
            <li key={i} className="flex items-start gap-3 text-sm text-zinc-600">
              <span className="w-1.5 h-1.5 rounded-full bg-zinc-400 mt-2 flex-shrink-0" />
              {point}
            </li>
          ))}
        </ul>
      )}

      {/* 서브섹션 */}
      {section.subSections && section.subSections.length > 0 && (
        <div className="space-y-4 mb-6 pl-10">
          {section.subSections.map((sub, i) => (
            <div key={i} className="bg-zinc-50 border border-zinc-200 rounded-lg p-4">
              <h4 className="font-medium text-zinc-900 mb-3">
                {language === 'ko' ? sub.titleKo : sub.titleEn}
              </h4>
              <ul className="space-y-2">
                {(language === 'ko' ? sub.bulletPointsKo : sub.bulletPointsEn).map((point, j) => (
                  <li key={j} className="flex items-start gap-3 text-sm text-zinc-600">
                    <svg className="w-4 h-4 text-zinc-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}

      {/* 섹션 이미지 */}
      {section.image && !hasSteps && (
        <div
          className="ml-10 mb-6 cursor-pointer group"
          onClick={() => onImageClick(section.image!, language === 'ko' ? section.titleKo : section.titleEn)}
        >
          <div className="relative rounded-lg overflow-hidden border border-zinc-200">
            <Image
              src={section.image}
              alt={language === 'ko' ? section.titleKo : section.titleEn}
              width={800}
              height={500}
              className="w-full h-auto group-hover:scale-[1.02] transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors" />
          </div>
          <p className="text-xs text-zinc-400 mt-2 text-center">
            {t('클릭하여 확대', 'Click to enlarge')}
          </p>
        </div>
      )}

      {/* 스텝 그리드 */}
      {hasSteps && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pl-10">
          {section.steps!.map((step, i) => (
            <StepCard
              key={i}
              step={step}
              index={i}
              language={language}
              onImageClick={onImageClick}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default function GuideDetailPage() {
  const params = useParams();
  const { t, language } = useLanguage();
  const slug = params.slug as string;
  const [modalImage, setModalImage] = useState<{ src: string; alt: string } | null>(null);

  const guide = guides.find(g => g.slug === slug);
  const guideIndex = guides.findIndex(g => g.slug === slug);

  const handleImageClick = (src: string, alt: string) => {
    setModalImage({ src, alt });
  };

  const closeModal = () => {
    setModalImage(null);
  };

  if (!guide) {
    return (
      <AuthWrapper>
        <div className="min-h-screen pt-12 px-6">
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
      <div className="min-h-screen bg-zinc-50">
        {/* 이미지 모달 */}
        {modalImage && (
          <ImageModal
            src={modalImage.src}
            alt={modalImage.alt}
            onClose={closeModal}
          />
        )}

        {/* Header */}
        <section className="bg-white pt-12 pb-12 px-6 border-b border-zinc-200">
          <div className="max-w-5xl mx-auto">
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

        {/* 목차 */}
        <section className="bg-white border-b border-zinc-200 py-4 px-6 sticky top-0 z-10">
          <div className="max-w-5xl mx-auto">
            <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
              <span className="text-xs text-zinc-400 uppercase tracking-wider flex-shrink-0">
                {t('목차', 'Contents')}:
              </span>
              {guide.sections.map((section, index) => (
                <a
                  key={section.id}
                  href={`#${section.id}`}
                  className="text-xs text-zinc-600 hover:text-zinc-900 bg-zinc-100 hover:bg-zinc-200 px-3 py-1.5 rounded-full transition-colors flex-shrink-0"
                >
                  {String(index + 1).padStart(2, '0')}. {language === 'ko' ? section.titleKo : section.titleEn}
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* Content */}
        <section className="py-12 px-6">
          <div className="max-w-5xl mx-auto">
            <div className="space-y-16">
              {guide.sections.map((section, index) => (
                <div key={section.id} id={section.id} className="scroll-mt-24">
                  <SectionCard
                    section={section}
                    index={index}
                    language={language}
                    t={t}
                    onImageClick={handleImageClick}
                  />
                </div>
              ))}
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
