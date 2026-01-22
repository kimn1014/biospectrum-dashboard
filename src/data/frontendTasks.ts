import { TaskData } from '@/components/TaskCard';

export const frontendTasks: TaskData[] = [
  {
    id: 'fe-1',
    titleKo: '구매 & 로그인 로직',
    titleEn: 'Purchase & Login Logic',
    status: 'in-progress',
    assignee: 'Faisal, Amir',
    contentKo: [
      '비회원 구매버튼 비활성화 및 회원가입시 비활성화 상태로 회원등록 되는 로직 개발 완료',
      '내부 검수 진행중',
    ],
    contentEn: [
      'Non-member purchase button disabled, member registration in disabled state logic completed',
      'Internal review in progress',
    ],
    requiredInfoKo: [
      'CFM: Custom Field Manager 앱 사용하여 기능 구현',
    ],
    requiredInfoEn: [
      'Feature implemented using CFM: Custom Field Manager app',
    ],
    memoKo: '한국어 회원가입 폼에서 회원가입 신청 버튼이 사라지는 이슈 확인. 앱과 쇼피파이 코드 간에 충돌이 원인임을 파악, 앱사측과 논의하여 CFM: Custom Field Manager 해당 앱 사용시 해당 이슈 해결 가능함 확인.',
    memoEn: 'Issue identified: Registration button disappears in Korean signup form. Conflict between app and Shopify code identified, discussed with app vendor and confirmed that using CFM: Custom Field Manager app resolves this issue.',
  },
  {
    id: 'fe-2',
    titleKo: 'PDP UX 수정',
    titleEn: 'PDP UX Modification',
    status: 'in-progress',
    assignee: 'Sonang',
    contentKo: [
      '민선님(바이오스펙트럼) QA 사항 반영중',
      '  1. In-vitro 효능 부분 가로사이즈 통일 - 완료',
      '  2. INCI 리스트 복수개 일시 콤마(,)를 넣거나, 적절한 방식으로 구분 되도록 수정 - 수정중',
      '  3. PDP 섹션 간격 수정(섹션 비활성화 상황도 고려) - 수정중',
    ],
    contentEn: [
      'Reflecting QA items from Minseon (Biospectrum)',
      '  1. In-vitro efficacy section horizontal size unification - Completed',
      '  2. Adding commas or appropriate separators for multiple INCI list items - In progress',
      '  3. PDP section spacing adjustment (considering section disabled state) - In progress',
    ],
  },
  {
    id: 'fe-3',
    titleKo: '제품 카드(썸네일) 제품 정보 노출 관련 작업',
    titleEn: 'Product Card (Thumbnail) Information Display',
    status: 'completed',
    assignee: 'Sonang, 김병학',
    memoKo: '효능(efficacy / effect list)이 제품 썸네일에 노출되지 않는 이슈를 확인했습니다. 해당 문제는 기능원료(key ingredients) 메타필드와 효능 메타필드가 연결되어 있던 로직 때문에 발생했습니다. 이에 따라 key ingredients 값의 존재 여부와 관계없이 효능이 노출되도록 로직을 수정했으며, 현재 수정 완료된 상태입니다.',
    memoEn: 'Identified an issue where efficacy/effect list was not displayed on product thumbnails. This occurred because the efficacy metafield was linked to the key ingredients metafield logic. The logic has been modified so that efficacy is displayed regardless of key ingredients value existence. This fix is now complete.',
  },
  {
    id: 'fe-4',
    titleKo: 'About us UX 수정',
    titleEn: 'About Us UX Modification',
    status: 'completed',
    assignee: 'Sonang',
  },
  {
    id: 'fe-5',
    titleKo: '자료 다운로드 페이지',
    titleEn: 'Resource Download Page',
    status: 'in-progress',
    assignee: 'Faisal',
    contentKo: [
      '바이오스펙트럼 측 AWS로 변경 완료',
      '프론트 측에서 백엔드 엔드포인트 전달 받아 작업 마무리 진행중',
    ],
    contentEn: [
      'Changed to Biospectrum AWS completed',
      'Frontend finalizing work with backend endpoint',
    ],
  },
  {
    id: 'fe-6',
    titleKo: 'PDP → PDF 변환기능',
    titleEn: 'PDP to PDF Conversion',
    status: 'in-progress',
    assignee: 'Faraz',
    contentKo: [
      '기능은 모두 개발 완료',
      '변환 되는 PDF 관련하여 수정 진행중',
      '코드 충돌 방지를 위해 PDP UX 수정 완료 후 마무리 예정',
    ],
    contentEn: [
      'All functionality development completed',
      'Modifying the converted PDF',
      'Will be finalized after PDP UX modification to prevent code conflicts',
    ],
  },
];
