export interface PendingTask {
  id: string;
  titleKo: string;
  titleEn: string;
  descriptionKo: string;
  descriptionEn: string;
  memoKo?: string;
  memoEn?: string;
  priority: 'high' | 'medium' | 'low';
  status: 'pending' | 'in-progress' | 'done';
}

export const pendingTasks: PendingTask[] = [
  {
    id: 'pt-1',
    titleKo: '제품 정보 등록 및 수정 (Matrixify 기반)',
    titleEn: 'Product Information Registration & Modification (Matrixify-based)',
    descriptionKo: '가이드 전달 완료',
    descriptionEn: 'Guide delivery completed',
    priority: 'high',
    status: 'in-progress',
  },
  {
    id: 'pt-2',
    titleKo: 'PG 등록 (토스페이먼츠)',
    titleEn: 'PG Registration (TossPayments)',
    descriptionKo: '필요서류 전달 완료',
    descriptionEn: 'Required documents delivery completed',
    memoKo: 'PG등록간 루쿠쿠측 도움 필요하면 말씀 부탁드립니다.',
    memoEn: 'Please let us know if you need help from Lukuku during PG registration.',
    priority: 'high',
    status: 'in-progress',
  },
];
