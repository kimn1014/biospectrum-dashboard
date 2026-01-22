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
      '내부에서 디자인 및 기능 QA 및 QA fix 진행중',
      '민선님(바이오스펙트럼) QA 사항 반영중',
      'In-vitro 효능 부분 가로사이즈 통일',
      'INCI 리스트 사이에 콤마(,)를 넣어서 구분 노출',
      'In-vitro 이미지 영역 관련 수정',
    ],
    contentEn: [
      'Internal design and functionality QA and fixes in progress',
      'Reflecting QA items from Minseon (Biospectrum)',
      'Unifying horizontal size for In-vitro efficacy section',
      'Adding commas between INCI list items for distinction',
      'Modifying In-vitro image area',
    ],
  },
  {
    id: 'fe-3',
    titleKo: '제품 카드(썸네일) 제품 정보 노출 관련 작업',
    titleEn: 'Product Card (Thumbnail) Information Display',
    status: 'completed',
    assignee: 'Sonang, 김병학',
    memoKo: '내부 검수 후 민선님(바이오스펙트럼)에게 전달 예정',
    memoEn: 'Will be delivered to Minseon (Biospectrum) after internal review',
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
