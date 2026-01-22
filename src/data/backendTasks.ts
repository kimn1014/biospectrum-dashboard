import { TaskData } from '@/components/TaskCard';

export const backendTasks: TaskData[] = [
  {
    id: 'be-1',
    titleKo: '제품 마이그레이션',
    titleEn: 'Product Migration',
    status: 'completed',
    assignee: '김병학',
    memoKo: '효능을 가져와야 하는 제품 관련하여 확인 중',
    memoEn: 'Checking products that need to import efficacy data',
  },
  {
    id: 'be-2',
    titleKo: '배송 관련 작업',
    titleEn: 'Shipping Related Work',
    status: 'in-progress',
    assignee: '김병학',
    dueDate: '1월 23일',
    contentKo: [
      '작업간 필요한 코드 생성완료, 해당 코드 테스트 진행중',
      '샘플 제품에도 Fedex API 연동 필요',
    ],
    contentEn: [
      'Required code generation completed, testing in progress',
      'Fedex API integration needed for sample products',
    ],
    memoKo: '백엔드쪽 개발 완료시점은 1월 23일로 보고 있으나, 실제 테스트 및 수정 고려하면 차주중으로 작업 마무리 가능할 것으로 예상됨',
    memoEn: 'Backend development expected to be completed by January 23rd, but considering actual testing and fixes, work is expected to be finished within next week',
  },
  {
    id: 'be-3',
    titleKo: '자료 다운로드 페이지',
    titleEn: 'Resource Download Page',
    status: 'completed',
    assignee: '김병학',
    contentKo: [
      '개발 작업은 모두 완료',
      '백엔드 쪽에서 바이오스펙트럼측 AWS Credential로 변경 완료',
      '프론트에서 작업 마무리 진행중',
    ],
    contentEn: [
      'All development work completed',
      'Backend AWS credentials changed to Biospectrum',
      'Frontend finalizing the work',
    ],
    requiredInfoKo: [
      '바이오스펙트럼 AWS',
      'ID: biome@biospectrum.com',
    ],
    requiredInfoEn: [
      'Biospectrum AWS',
      'ID: biome@biospectrum.com',
    ],
  },
];
