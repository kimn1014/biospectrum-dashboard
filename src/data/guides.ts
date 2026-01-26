// 가이드 섹션 내 개별 스텝
export interface GuideStep {
  titleKo: string;
  titleEn: string;
  descriptionKo: string;
  descriptionEn: string;
  image?: string;
}

// 가이드 섹션 (카드 형태로 표시)
export interface GuideSection {
  id: string;
  titleKo: string;
  titleEn: string;
  descriptionKo?: string;
  descriptionEn?: string;
  steps?: GuideStep[];
  bulletPointsKo?: string[];
  bulletPointsEn?: string[];
  subSections?: {
    titleKo: string;
    titleEn: string;
    bulletPointsKo: string[];
    bulletPointsEn: string[];
  }[];
  image?: string;
  note?: {
    titleKo: string;
    titleEn: string;
    contentKo: string;
    contentEn: string;
  };
}

// 가이드 메타데이터
export interface Guide {
  id: string;
  titleKo: string;
  titleEn: string;
  descriptionKo: string;
  descriptionEn: string;
  icon: string;
  slug: string;
  sections: GuideSection[];
}

export const guides: Guide[] = [
  {
    id: '1',
    titleKo: '회원가입 및 설정 로직 가이드',
    titleEn: 'Registration & Settings Logic Guide',
    descriptionKo: 'B2B 회원 승인 절차 및 고객 관리 앱 사용 방법',
    descriptionEn: 'B2B member approval process and customer management app usage',
    icon: 'users',
    slug: 'registration',
    sections: [
      {
        id: 'purchase-policy',
        titleKo: '구매 정책',
        titleEn: 'Purchase Policy',
        descriptionKo: 'Biospectrum의 B2B 전용 구매 정책에 대해 안내합니다.',
        descriptionEn: 'Information about Biospectrum\'s B2B-only purchase policy.',
        subSections: [
          {
            titleKo: '비회원 구매 제한',
            titleEn: 'Non-member Purchase Restrictions',
            bulletPointsKo: [
              '비회원은 상품을 구매할 수 없습니다',
              '구매 버튼 / Add to Cart 버튼이 비활성화됩니다'
            ],
            bulletPointsEn: [
              'Non-members cannot purchase products',
              'Purchase button / Add to Cart button is disabled'
            ]
          },
          {
            titleKo: '회원 전용 구매',
            titleEn: 'Members-only Purchase',
            bulletPointsKo: [
              '회원만 상품 구매가 가능합니다',
              '모든 회원은 B2B 회원 전용입니다'
            ],
            bulletPointsEn: [
              'Only members can purchase products',
              'All members are B2B members only'
            ]
          },
          {
            titleKo: 'B2B 회원이란?',
            titleEn: 'What is a B2B Member?',
            bulletPointsKo: [
              'Shopify Company에 등록된 고객',
              'Biospectrum에서 승인(Authorized)된 고객'
            ],
            bulletPointsEn: [
              'Customers registered in Shopify Company',
              'Customers authorized by Biospectrum'
            ]
          }
        ]
      },
      {
        id: 'b2b-approval',
        titleKo: 'B2B 회원 승인 로직',
        titleEn: 'B2B Member Approval Logic',
        descriptionKo: 'Company 소속 고객만 활성 B2B 회원이 되도록 다음과 같은 절차를 적용합니다.',
        descriptionEn: 'The following process is applied so that only Company-affiliated customers become active B2B members.',
        bulletPointsKo: [
          '회원 가입 시, 고객 계정은 비활성(Inactive) 상태로 생성됩니다',
          'Biospectrum 관리자가 고객 계정을 승인(Approve) 또는 거절(Disapprove) 합니다',
          '승인된 고객만 Company와 연결된 활성 B2B 회원이 되며, 상품 구매가 가능합니다'
        ],
        bulletPointsEn: [
          'When signing up, customer accounts are created in Inactive status',
          'Biospectrum admin approves or disapproves customer accounts',
          'Only approved customers become active B2B members connected to Company and can purchase products'
        ],
        note: {
          titleKo: '참고',
          titleEn: 'Note',
          contentKo: '이를 통해 승인되지 않은 고객의 구매를 방지합니다.',
          contentEn: 'This prevents unauthorized customers from making purchases.'
        }
      },
      {
        id: 'app-info',
        titleKo: '고객 승인 앱 안내',
        titleEn: 'Customer Approval App Guide',
        descriptionKo: '다음 앱을 설치 및 설정 완료했습니다.',
        descriptionEn: 'The following app has been installed and configured.',
        note: {
          titleKo: '앱 이름',
          titleEn: 'App Name',
          contentKo: 'Enhance: Approve New Customers',
          contentEn: 'Enhance: Approve New Customers'
        },
        bulletPointsKo: [
          '기존 커스텀 회원가입 UI를 변경하지 않습니다',
          'Shopify의 기존 고객 데이터에 영향을 주거나 덮어쓰지 않습니다',
          '모든 회원가입 폼 데이터는 Shopify 고객 프로필의 Notes 섹션에 저장됩니다',
          'Shopify Admin 및 App Admin 페이지에서 확인 가능합니다',
          '관리자가 승인하기 전까지 고객은 상품 구매가 불가능합니다',
          '고객 승인/거절 및 관련 설정은 모두 App Admin 페이지에서 관리됩니다'
        ],
        bulletPointsEn: [
          'Does not change the existing custom registration UI',
          'Does not affect or overwrite existing Shopify customer data',
          'All registration form data is saved in the Notes section of Shopify customer profile',
          'Can be viewed in Shopify Admin and App Admin pages',
          'Customers cannot purchase products until approved by admin',
          'Customer approval/rejection and related settings are all managed in App Admin page'
        ]
      },
      {
        id: 'how-it-works',
        titleKo: '동작 방식',
        titleEn: 'How It Works',
        descriptionKo: '회원가입부터 승인까지의 전체 프로세스입니다.',
        descriptionEn: 'The complete process from registration to approval.',
        steps: [
          {
            titleKo: '회원가입',
            titleEn: 'Registration',
            descriptionKo: '고객이 회원가입 페이지에서 계정을 등록합니다.',
            descriptionEn: 'Customer registers an account on the registration page.'
          },
          {
            titleKo: 'Shopify Admin 확인',
            titleEn: 'Shopify Admin Check',
            descriptionKo: '회원가입이 완료되면, 고객 정보가 Shopify Admin에 표시됩니다. Notes 섹션에서 회원가입 폼 데이터를 확인할 수 있습니다.',
            descriptionEn: 'Once registration is complete, customer information is displayed in Shopify Admin. Registration form data can be viewed in the Notes section.',
            image: '/images/guides/registration/step-01.png'
          },
          {
            titleKo: 'Pending 상태',
            titleEn: 'Pending Status',
            descriptionKo: '회원가입 후, 고객 상태는 앱 대시보드에 Pending 상태로 표시됩니다.',
            descriptionEn: 'After registration, customer status is displayed as Pending in the app dashboard.',
            image: '/images/guides/registration/step-06.png'
          },
          {
            titleKo: '카트 버튼 숨김',
            titleEn: 'Cart Button Hidden',
            descriptionKo: '고객이 회원가입을 완료하고 승인 대기(Pending) 상태일 경우, "카트에 담기" 버튼은 숨김 처리됩니다.',
            descriptionEn: 'When a customer completes registration and is in Pending status, the "Add to Cart" button is hidden.',
            image: '/images/guides/registration/step-02.png'
          },
          {
            titleKo: '관리자 승인',
            titleEn: 'Admin Approval',
            descriptionKo: 'Biospectrum 관리자는 앱을 통해 고객 정보를 확인한 후, 승인(Approve)을 선택하여 고객 계정을 활성화할 수 있습니다.',
            descriptionEn: 'Biospectrum admin can view customer information through the app and select Approve to activate the customer account.',
            image: '/images/guides/registration/step-03.png'
          },
          {
            titleKo: '승인 완료',
            titleEn: 'Approval Complete',
            descriptionKo: '고객이 앱을 통해 승인되면, 승인 이메일을 수신하며, "카트에 담기" 버튼이 표시됩니다.',
            descriptionEn: 'Once the customer is approved through the app, they receive an approval email and the "Add to Cart" button is displayed.',
            image: '/images/guides/registration/step-04.png'
          }
        ]
      },
      {
        id: 'app-dashboard',
        titleKo: '앱 대시보드',
        titleEn: 'App Dashboard',
        descriptionKo: '앱 대시보드에서의 고객 관리 방법입니다.',
        descriptionEn: 'How to manage customers in the app dashboard.',
        steps: [
          {
            titleKo: 'Pending 고객 확인',
            titleEn: 'Check Pending Customers',
            descriptionKo: '앱 대시보드(Apps Dashboard)에서 새로 가입한 고객은 Pending 상태로 표시됩니다.',
            descriptionEn: 'Newly registered customers are displayed as Pending status in the Apps Dashboard.',
            image: '/images/guides/registration/step-06.png'
          },
          {
            titleKo: '버튼 텍스트 커스터마이징',
            titleEn: 'Button Text Customization',
            descriptionKo: '고객이 승인 대기(Pending) 상태인 동안, "카트에 담기" 버튼 또는 텍스트를 커스터마이징하여 계정이 승인 대기 중임을 안내할 수 있습니다.',
            descriptionEn: 'While customers are in Pending status, you can customize the "Add to Cart" button or text to inform them that their account is pending approval.',
            image: '/images/guides/registration/step-07.png'
          },
          {
            titleKo: '고객 승인',
            titleEn: 'Approve Customer',
            descriptionKo: 'Biospectrum에서 고객을 승인(Approve)하면, 고객 상태가 변경됩니다.',
            descriptionEn: 'When Biospectrum approves the customer, the customer status changes.',
            image: '/images/guides/registration/step-08.png'
          },
          {
            titleKo: '승인 이메일 발송',
            titleEn: 'Approval Email Sent',
            descriptionKo: '고객이 앱을 통해 승인되면, (수정 가능한) 승인 이메일을 받게 됩니다.',
            descriptionEn: 'When the customer is approved through the app, they receive a (customizable) approval email.',
            image: '/images/guides/registration/step-09.png'
          },
          {
            titleKo: '설정 저장',
            titleEn: 'Save Settings',
            descriptionKo: '설정을 완료한 후, "Save" 버튼을 클릭합니다.',
            descriptionEn: 'After completing the settings, click the "Save" button.',
            image: '/images/guides/registration/step-10.png'
          }
        ]
      }
    ]
  }
];
