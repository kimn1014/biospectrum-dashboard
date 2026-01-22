export interface Guide {
  id: string;
  titleKo: string;
  titleEn: string;
  descriptionKo: string;
  descriptionEn: string;
  icon: string;
  slug: string;
}

export const guides: Guide[] = [
  {
    id: 'guide-1',
    titleKo: '제품 정보 등록 및 수정 가이드',
    titleEn: 'Product Registration & Modification Guide',
    descriptionKo: 'Matrixify 앱을 활용한 제품 정보 등록 및 수정 방법',
    descriptionEn: 'How to register and modify product information using Matrixify app',
    icon: 'product',
    slug: 'product-registration',
  },
  {
    id: 'guide-2',
    titleKo: '업체별 차등 가격 적용 방법',
    titleEn: 'Vendor-specific Pricing Guide',
    descriptionKo: '카탈로그 기능을 활용한 업체별 가격 차등 적용 방법',
    descriptionEn: 'How to apply different pricing per vendor using catalog feature',
    icon: 'pricing',
    slug: 'vendor-pricing',
  },
  {
    id: 'guide-3',
    titleKo: '바이어 등록 방법',
    titleEn: 'Buyer Registration Guide',
    descriptionKo: 'Company 기능을 활용한 바이어 등록 방법',
    descriptionEn: 'How to register buyers using Company feature',
    icon: 'buyer',
    slug: 'buyer-registration',
  },
];
