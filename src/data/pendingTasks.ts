export interface PendingTask {
  id: string;
  titleKo: string;
  titleEn: string;
  descriptionKo: string;
  descriptionEn: string;
  memoKo?: string;
  memoEn?: string;
  priority: 'high' | 'medium' | 'low';
}

export const pendingTasks: PendingTask[] = [
  {
    id: 'pt-1',
    titleKo: '제품 정보 등록 및 수정 (Matrixify 기반)',
    titleEn: 'Product Information Registration & Modification (Matrixify-based)',
    descriptionKo: '백엔드쪽 제품 정보 등록 모두 마무리 되면 가이드 전달하여 민선님(바이오스펙트럼)측에 미비된 제품 정보 등록 및 수정 요청 예정',
    descriptionEn: 'Once backend product information registration is complete, guide will be delivered to Minseon (Biospectrum) for missing product information registration and modification',
    priority: 'high',
  },
  {
    id: 'pt-2',
    titleKo: 'PG 등록 (토스페이먼츠)',
    titleEn: 'PG Registration (TossPayments)',
    descriptionKo: '토스페이먼츠측에 필요 서류 전달 중',
    descriptionEn: 'Delivering required documents to TossPayments',
    memoKo: 'PG등록간 루쿠쿠측 도움 필요하면 말씀 부탁드립니다.',
    memoEn: 'Please let us know if you need help from Lukuku during PG registration.',
    priority: 'high',
  },
];
