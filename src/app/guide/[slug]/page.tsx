'use client';

import { useParams } from 'next/navigation';
import AuthWrapper from '@/components/AuthWrapper';
import { useLanguage } from '@/context/LanguageContext';
import { guides, GuideSection, GuideStep, GuideContentBlock } from '@/data/guides';
import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';

// 이미지 모달 컴포넌트
function ImageModal({ src, alt, onClose }: { src: string; alt: string; onClose: () => void }) {
  const isExternal = src.startsWith('http');
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
        {isExternal ? (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img
            src={src}
            alt={alt}
            className="w-full h-auto rounded-lg shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          />
        ) : (
          <Image
            src={src}
            alt={alt}
            width={1200}
            height={800}
            className="w-full h-auto rounded-lg shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          />
        )}
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

// 컨텐츠 블록 렌더러
function ContentBlockRenderer({
  block,
  language,
  t,
  onImageClick
}: {
  block: GuideContentBlock;
  language: string;
  t: (ko: string, en: string) => string;
  onImageClick: (src: string, alt: string) => void;
}) {
  switch (block.type) {
    case 'text':
      return (
        <p className="text-zinc-600 text-sm leading-relaxed">
          {language === 'ko' ? block.textKo : block.textEn}
        </p>
      );

    case 'callout': {
      const styles = {
        warning: 'bg-amber-50 border-amber-200 text-amber-900',
        info: 'bg-zinc-50 border-zinc-200 text-zinc-700',
        success: 'bg-emerald-50 border-emerald-200 text-emerald-900',
      };
      const icons = {
        warning: 'M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z',
        info: 'M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0Zm-9-3.75h.008v.008H12V8.25Z',
        success: 'M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0Z',
      };
      const calloutType = block.calloutType || 'info';
      return (
        <div className={`border rounded-lg p-4 flex gap-3 ${styles[calloutType]}`}>
          <svg className="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={icons[calloutType]} />
          </svg>
          <p className="text-sm leading-relaxed">
            {language === 'ko' ? block.textKo : block.textEn}
          </p>
        </div>
      );
    }

    case 'table':
      if (!block.table) return null;
      return (
        <div className="overflow-x-auto border border-zinc-200 rounded-lg">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-zinc-900 text-white">
                {block.table.headers.map((h, i) => (
                  <th key={i} className="text-left px-4 py-3 font-medium text-xs uppercase tracking-wider whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {block.table.rows.map((row, i) => (
                <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-zinc-50'}>
                  {row.map((cell, j) => (
                    <td key={j} className="px-4 py-3 text-zinc-700 border-t border-zinc-100">
                      {cell.startsWith('[') || cell.startsWith('{') ? (
                        <code className="text-xs bg-zinc-100 px-2 py-1 rounded font-mono">{cell}</code>
                      ) : cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );

    case 'code':
      if (!block.codeBlock) return null;
      return (
        <div className="bg-zinc-900 rounded-lg overflow-hidden">
          <div className="flex items-center justify-between px-4 py-2 border-b border-zinc-800">
            <span className="text-[10px] text-zinc-500 uppercase tracking-wider font-mono">{block.codeBlock.label}</span>
          </div>
          <pre className="p-4 overflow-x-auto">
            <code className="text-xs text-emerald-400 font-mono leading-relaxed whitespace-pre-wrap">{block.codeBlock.code}</code>
          </pre>
        </div>
      );

    case 'image':
      if (!block.image) return null;
      return (
        <div
          className="cursor-pointer group"
          onClick={() => onImageClick(block.image!.src, language === 'ko' ? block.image!.captionKo : block.image!.captionEn)}
        >
          <div className="relative rounded-lg overflow-hidden border border-zinc-200">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={block.image.src}
              alt={language === 'ko' ? block.image.captionKo : block.image.captionEn}
              className="w-full h-auto group-hover:scale-[1.02] transition-transform duration-300"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors" />
          </div>
          <p className="text-xs text-zinc-400 mt-2 text-center">
            {language === 'ko' ? block.image.captionKo : block.image.captionEn}
          </p>
        </div>
      );

    case 'steps':
      if (!block.steps) return null;
      return (
        <div className="space-y-3">
          {block.steps.map((step, i) => (
            <div key={i} className="flex gap-3 items-start">
              <span className="flex items-center justify-center w-7 h-7 rounded-full bg-zinc-900 text-white text-xs font-medium flex-shrink-0">
                {i + 1}
              </span>
              <p className="text-sm text-zinc-700 pt-1">
                {language === 'ko' ? step.textKo : step.textEn}
              </p>
            </div>
          ))}
        </div>
      );

    case 'flow':
      if (!block.flowItems) return null;
      return (
        <div className="flex items-center gap-2 flex-wrap bg-zinc-50 border border-zinc-200 rounded-lg p-5 justify-center">
          {block.flowItems.map((item, i) => (
            <div key={i} className="flex items-center gap-2">
              <span className="px-4 py-2 bg-white border border-zinc-300 rounded-lg text-sm font-medium text-zinc-800">
                {item}
              </span>
              {i < block.flowItems!.length - 1 && (
                <svg className="w-4 h-4 text-zinc-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              )}
            </div>
          ))}
        </div>
      );

    case 'legend':
      if (!block.legendItems) return null;
      return (
        <div className="bg-zinc-50 border border-zinc-200 rounded-lg p-4 space-y-2">
          {block.legendItems.map((item, i) => (
            <div key={i} className="flex items-center gap-3 text-sm">
              <span className={`w-3 h-3 rounded-sm flex-shrink-0 ${item.colorClass}`} />
              <span className="text-zinc-700">{language === 'ko' ? item.labelKo : item.labelEn}</span>
            </div>
          ))}
        </div>
      );

    default:
      return null;
  }
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

      {/* 컨텐츠 블록 */}
      {section.contentBlocks && section.contentBlocks.length > 0 && (
        <div className="space-y-5 pl-10">
          {section.contentBlocks.map((block, i) => (
            <ContentBlockRenderer
              key={i}
              block={block}
              language={language}
              t={t}
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
          <div className="max-w-7xl mx-auto lg:pl-[calc(16rem+2.5rem)]">
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

        {/* Content with Sidebar */}
        <section className="py-12 px-6">
          <div className="max-w-7xl mx-auto flex gap-10">
            {/* 왼쪽 목차 사이드바 */}
            <aside className="hidden lg:block w-64 flex-shrink-0">
              <nav className="sticky top-8">
                <p className="text-xs text-zinc-400 uppercase tracking-wider font-mono mb-4">
                  {t('목차', 'Contents')}
                </p>
                <ul className="space-y-1">
                  {guide.sections.map((section, index) => (
                    <li key={section.id}>
                      <a
                        href={`#${section.id}`}
                        className="group flex items-start gap-2.5 px-3 py-2 rounded-lg text-sm text-zinc-500 hover:text-zinc-900 hover:bg-zinc-100 transition-colors"
                      >
                        <span className="text-[10px] font-mono text-zinc-400 group-hover:text-zinc-600 mt-0.5 flex-shrink-0">
                          {String(index + 1).padStart(2, '0')}
                        </span>
                        <span className="leading-snug">
                          {language === 'ko' ? section.titleKo : section.titleEn}
                        </span>
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            </aside>

            {/* 메인 콘텐츠 */}
            <div className="flex-1 min-w-0">
              <div className="space-y-16">
                {guide.sections.map((section, index) => (
                  <div key={section.id} id={section.id} className="scroll-mt-12">
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
          </div>
        </section>
      </div>
    </AuthWrapper>
  );
}
