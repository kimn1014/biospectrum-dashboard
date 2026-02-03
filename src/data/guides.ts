// 가이드 섹션 내 개별 스텝
export interface GuideStep {
  titleKo: string;
  titleEn: string;
  descriptionKo: string;
  descriptionEn: string;
  image?: string;
}

// 테이블 정의
export interface GuideTable {
  headers: string[];
  rows: string[][];
}

// 코드 블록 정의
export interface GuideCodeBlock {
  label: string;
  code: string;
}

// 이미지 with caption
export interface GuideImage {
  src: string;
  captionKo: string;
  captionEn: string;
}

// 컨텐츠 블록 (유연한 구성)
export interface GuideContentBlock {
  type: 'text' | 'table' | 'code' | 'image' | 'callout' | 'steps' | 'flow' | 'legend';
  textKo?: string;
  textEn?: string;
  table?: GuideTable;
  codeBlock?: GuideCodeBlock;
  image?: GuideImage;
  calloutType?: 'warning' | 'info' | 'success';
  steps?: { textKo: string; textEn: string }[];
  flowItems?: string[];
  legendItems?: { colorClass: string; labelKo: string; labelEn: string }[];
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
  // 확장: 유연한 컨텐츠 블록
  contentBlocks?: GuideContentBlock[];
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
          },
          {
            titleKo: '고객 승인 처리',
            titleEn: 'Customer Approval Processing',
            bulletPointsKo: [
              '고객 계정의 승인 및 승인 거절은 서드파티(외부) 앱에서 처리해야 합니다'
            ],
            bulletPointsEn: [
              'Customer account approval and rejection must be processed through a third-party (external) app'
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
  },
  {
    id: '2',
    titleKo: '상품정보 입력 및 수정 가이드',
    titleEn: 'Product Information Entry & Edit Guide',
    descriptionKo: 'Matrixify를 활용한 상품 메타필드 대량 입력/수정 방법 안내',
    descriptionEn: 'Guide for bulk product metafield entry/editing using Matrixify',
    icon: 'package',
    slug: 'product-info',
    sections: [
      {
        id: 'overview',
        titleKo: '개요',
        titleEn: 'Overview',
        descriptionKo: 'Shopify에서 제품 등록, 제품 정보 입력/수정 등 모든 제품 관련 작업은 Shopify Admin > Products(제품) 섹션에서 진행하실 수 있습니다.',
        descriptionEn: 'All product-related tasks such as product registration and information entry/editing can be done in the Shopify Admin > Products section.',
        contentBlocks: [
          {
            type: 'text',
            textKo: '바이오스펙트럼 쇼피파이 스토어의 경우 제품마다 상세페이지에 노출되어야 하는 정보가 다르고, 노출해야 할 정보가 많아 메타필드(Metafields)를 생성해서 해당 메타필드를 통해 제품정보를 노출하고 있습니다.',
            textEn: 'Since BioSpectrum\'s Shopify store requires different information for each product detail page and has a large amount of data to display, Metafields are used to manage and expose product information.'
          },
          {
            type: 'text',
            textKo: '마이그레이션 요청 주셨던 제품 및 제품 정보는 현재 모두 이관 완료된 상태입니다. 마이그레이션이 불가한 일부 정보의 경우 아래 가이드를 참고하시어 직접 입력해 주셔야 합니다.',
            textEn: 'All products and product information requested for migration have been fully migrated. For some information that could not be migrated, please refer to the guide below and enter it manually.'
          },
          {
            type: 'callout',
            calloutType: 'warning',
            textKo: '대량 작업 필수: 현재 스토어에는 1,000개 이상의 제품이 등록되어 있어, 각 제품의 메타필드를 하나씩 수동 입력하는 방식은 비효율적입니다. 따라서 Matrixify 앱을 필수적으로 사용합니다.',
            textEn: 'Bulk work required: With over 1,000 products registered in the store, manually entering metafields one by one is inefficient. Therefore, the Matrixify app is essential.'
          }
        ]
      },
      {
        id: 'matrixify-intro',
        titleKo: 'Matrixify 앱을 사용하는 이유',
        titleEn: 'Why Use the Matrixify App',
        bulletPointsKo: [
          '제품 정보 입력 항목을 엑셀 파일로 추출(Export) 할 수 있고',
          '엑셀에서 내용을 일괄 입력/수정한 뒤',
          '다시 Import하여 제품 정보를 대량으로 등록/수정할 수 있도록 도와주는 앱입니다'
        ],
        bulletPointsEn: [
          'You can export product information fields to an Excel file',
          'Edit content in bulk within Excel',
          'Then import to register/edit product information in bulk'
        ],
        contentBlocks: [
          {
            type: 'callout',
            calloutType: 'info',
            textKo: 'JSON 형식 주의: 일부 메타필드 값은 JSON 코드 형식으로 입력되도록 구성되어 있습니다. 반드시 가이드에 안내된 형식 그대로 입력/수정해 주셔야 상세 페이지에서 정보가 정상적으로 노출됩니다.',
            textEn: 'JSON format notice: Some metafield values are configured to be entered in JSON code format. You must follow the exact format specified in the guide for information to display correctly on detail pages.'
          },
          {
            type: 'callout',
            calloutType: 'success',
            textKo: '테스트 상품 참고: 테스트 상품인 "Dr.BRID C™ FACE Basic Shot (Lukuku Test)"에 예시로 모든 정보(JSON 포함)를 입력해 두었으니, 다른 제품 등록 시 참고 부탁드립니다.',
            textEn: 'Test product reference: All information (including JSON) has been entered as an example in the test product "Dr.BRID C™ FACE Basic Shot (Lukuku Test)". Please refer to it when registering other products.'
          }
        ]
      },
      {
        id: 'export-flow',
        titleKo: 'Matrixify Export & Import 작업 흐름',
        titleEn: 'Matrixify Export & Import Workflow',
        contentBlocks: [
          {
            type: 'flow',
            flowItems: ['Matrixify 앱 이동', 'Export (엑셀 추출)', '엑셀에서 편집', 'Import (업로드)']
          },
          {
            type: 'image',
            image: {
              src: 'https://t9018523380.p.clickup-attachments.com/t9018523380/595b2484-1165-472c-a0ad-86593db5b621/image.png',
              captionKo: 'Shopify Admin 좌측 메뉴 > Apps > Matrixify 선택',
              captionEn: 'Shopify Admin left menu > Apps > Matrixify'
            }
          },
          {
            type: 'steps',
            steps: [
              { textKo: 'Matrixify에서 New Export로 이동합니다', textEn: 'Go to New Export in Matrixify' },
              { textKo: 'Latest export를 선택한 뒤, Export as Excel을 클릭합니다', textEn: 'Select Latest export, then click Export as Excel' },
              { textKo: '시트 선택 화면에서 Products를 선택합니다', textEn: 'Select Products on the sheet selection screen' },
              { textKo: '모든 열(Columns)이 포함되어 있는지 확인한 후 Export를 클릭합니다', textEn: 'Verify all columns are included, then click Export' }
            ]
          },
          {
            type: 'image',
            image: {
              src: 'https://t9018523380.p.clickup-attachments.com/t9018523380/0b1b34ce-58d4-415a-95a0-f36eab53ed28/image.png',
              captionKo: 'Matrixify New Export 화면 - Preset: Latest Export, Format: Matrixify Excel',
              captionEn: 'Matrixify New Export screen - Preset: Latest Export, Format: Matrixify Excel'
            }
          }
        ]
      },
      {
        id: 'excel-example',
        titleKo: '엑셀 예시 (테스트용 상품)',
        titleEn: 'Excel Example (Test Product)',
        bulletPointsKo: [
          '상품은 이미지/옵션(Variants) 때문에 한 상품이 여러 행(row)으로 구성될 수 있습니다',
          '주요 상품 정보는 보통 첫 번째 행에 위치합니다',
          '엑셀에 데이터를 입력/수정할 때는 지정된 형식(포맷)을 반드시 그대로 따라야 정상 반영됩니다'
        ],
        bulletPointsEn: [
          'A single product can span multiple rows due to images/variants',
          'Main product information is usually in the first row',
          'When entering/editing data in Excel, you must follow the specified format exactly'
        ],
        contentBlocks: [
          {
            type: 'image',
            image: {
              src: 'https://t9018523380.p.clickup-attachments.com/t9018523380/067afae1-987e-4fb6-a294-347ac42922ea/image.png',
              captionKo: 'Export된 엑셀 파일 예시 - 테스트 상품의 행 구성',
              captionEn: 'Exported Excel file example - test product row structure'
            }
          }
        ]
      },
      {
        id: 'input-guide',
        titleKo: '엑셀 시트 상품 정보 입력 방법',
        titleEn: 'How to Enter Product Info in Excel Sheet',
        contentBlocks: [
          {
            type: 'legend',
            legendItems: [
              { colorClass: 'bg-zinc-900', labelKo: 'AB → 입력이 필요한 열 (필수 입력/수정 대상)', labelEn: 'AB → Column that needs input (required)' },
              { colorClass: 'bg-zinc-900', labelKo: '검정 텍스트 = 그대로 유지', labelEn: 'Black text = Keep as is' },
              { colorClass: 'bg-red-500', labelKo: '빨강 텍스트 = 변경 필요', labelEn: 'Red text = Needs to be changed' }
            ]
          },
          {
            type: 'image',
            image: {
              src: 'https://t9018523380.p.clickup-attachments.com/t9018523380/b38eb3d0-1fd3-4170-9556-7fad0c491dc2/image.png',
              captionKo: '컬렉션 페이지 - 각 필드와 Metafield 매핑 안내',
              captionEn: 'Collection page - field and Metafield mapping guide'
            }
          },
          {
            type: 'table',
            table: {
              headers: ['표시 항목', 'Metafield', '엑셀 컬럼', '입력 형식 예시'],
              rows: [
                ['썸네일 뱃지', 'custom.product_badges', 'CP', '["임상","특허","논문"]'],
                ['제품명 (Title)', 'Title', 'D', '제품명 텍스트'],
                ['Source (원료명)', 'custom.key_ingredients_title', 'DB', '병풀(Centella Asiatica)'],
                ['Efficacy (효능)', 'custom.effect_list', 'DL', '["항염","항노화"]'],
                ['INCI 목록', 'custom.inci_list', 'CT', '["Angelica Polymorpha Sinensis Root Extract"]']
              ]
            }
          }
        ]
      },
      {
        id: 'pdp-fields',
        titleKo: 'PDP (상세 페이지) 필드 안내',
        titleEn: 'PDP (Product Detail Page) Field Guide',
        descriptionKo: '제품 상세 페이지(PDP)에서 노출되는 각 탭별 정보와 입력 방법을 안내합니다.',
        descriptionEn: 'Guide for information displayed on each tab of the Product Detail Page (PDP).',
        contentBlocks: [
          {
            type: 'image',
            image: {
              src: 'https://t9018523380.p.clickup-attachments.com/t9018523380/52affefd-298d-4aad-b5b3-a4e3e05178a5/image.png',
              captionKo: 'PDP 상세 페이지 - 전체 필드 매핑 (Source, Efficacy, INCI, 인증 뱃지, 영상, 탭 타이틀 등)',
              captionEn: 'PDP detail page - Full field mapping (Source, Efficacy, INCI, badges, video, tab titles, etc.)'
            }
          },
          {
            type: 'table',
            table: {
              headers: ['표시 항목', 'Metafield', '컬럼', '입력 형식'],
              rows: [
                ['임상시험 완료 뱃지', 'custom.clinical_trial', 'CU', '임상시험 완료'],
                ['Source (원료)', 'custom.key_ingredients_title', 'DB', '텍스트'],
                ['Efficacy (효능)', 'custom.effect_list', 'DL', '["항염","항노화"]'],
                ['INCI', 'custom.inci_list', 'CT', '["Angelica Polymorpha..."]'],
                ['인증 뱃지', 'custom.certification_badges', 'DP', '["Test","Test2"]'],
                ['영상 링크', 'custom.product_youtube_video_link [url]', 'DA', 'https://youtu.be/IF2c6gTagzY'],
                ['영상 갤러리', 'custom.gallery_video_content [json]', 'CZ', 'JSON 형식 (아래 참고)']
              ]
            }
          },
          {
            type: 'code',
            codeBlock: {
              label: 'JSON - 영상 갤러리 (CZ)',
              code: '[{"title":"원료 소개 영상 시청하기","description":"Description"}]'
            }
          },
          {
            type: 'table',
            table: {
              headers: ['표시 항목', 'Metafield', '컬럼', '입력 형식'],
              rows: [
                ['특허 정보 탭 타이틀', 'custom.product_tab_description_1', 'DC', '특허 정보'],
                ['특허 정보 내용', 'custom.product_tab_description_1', 'DD', 'KR 10-2024-0123456... 텍스트'],
                ['논문 정보 탭 타이틀', 'custom.product_tab_title_2', 'DE', '논문 정보'],
                ['논문 정보 내용', 'custom.product_tab_2', 'DF', 'Anti-inflammatory... 텍스트']
              ]
            }
          }
        ]
      },
      {
        id: 'pdp-price',
        titleKo: 'PDP - 용량 / 가격 / 설명 영역',
        titleEn: 'PDP - Volume / Price / Description Area',
        contentBlocks: [
          {
            type: 'image',
            image: {
              src: 'https://t9018523380.p.clickup-attachments.com/t9018523380/7dba862e-71e7-4340-82f1-ca6376f30789/image.png',
              captionKo: 'PDP - 용량, 옵션, 가격, 설명(Description) 영역',
              captionEn: 'PDP - Volume, options, price, description area'
            }
          },
          {
            type: 'table',
            table: {
              headers: ['표시 항목', '컬럼', '설명'],
              rows: [
                ['용량', 'AK', '용량 값 입력'],
                ['옵션', 'AL', '옵션이 여러 개 있을 경우, 각 옵션을 다른 줄에 작성'],
                ['Variant Price', 'AW', '용량이 옵션 줄에 맞게 가격을 작성'],
                ['설명 (Description)', 'E', 'HTML 형식으로 입력']
              ]
            }
          },
          {
            type: 'code',
            codeBlock: {
              label: 'HTML - Description (E 컬럼)',
              code: '<p><span>• 병풀은 ...\n<br>• 센텔라아시아티코사이드, ...\n<br>• 습한 ...\n<br>• 우리가 ...\n<br>• 특별한 ...\nspan></p>'
            }
          }
        ]
      },
      {
        id: 'pdp-clinical',
        titleKo: 'PDP - 임상시험 정보 (효능 정보 탭)',
        titleEn: 'PDP - Clinical Trial Info (Efficacy Tab)',
        contentBlocks: [
          {
            type: 'image',
            image: {
              src: 'https://t9018523380.p.clickup-attachments.com/t9018523380/0e170c8f-abe0-4902-b6e7-453a147c816f/image.png',
              captionKo: 'PDP 효능 정보 탭 - 임상시험 결과, 프로토콜, 키포인트 데이터',
              captionEn: 'PDP efficacy info tab - clinical trial results, protocol, key points data'
            }
          },
          {
            type: 'text',
            textKo: '임상시험 결과 리스트 — Metafield: custom.clinical_trial_list [json] — 컬럼 CW',
            textEn: 'Clinical trial results list — Metafield: custom.clinical_trial_list [json] — Column CW'
          },
          {
            type: 'code',
            codeBlock: {
              label: 'JSON - 임상시험 결과 리스트 (CW)',
              code: '[\n  {"percentage":"+47.2%","title":"콜라겐 생성 증가","subtitle":"안마(PDRN)센터 우수"},\n  {"percentage":"+47.1%","title":"콜라겐 생성 증가","subtitle":"안마(PDRN)센터 우수"},\n  {"percentage":"-20.3%","title":"콜라겐 생성 증가","subtitle":"안마(PDRN)센터 우수"},\n  {"percentage":"+47.1%","title":"콜라겐 생성 증가","subtitle":"안마(PDRN)센터 우수"}\n]'
            }
          },
          {
            type: 'text',
            textKo: '임상시험 프로토콜 — Metafield: custom.clinical_trial_protocol [json] — 컬럼 CX',
            textEn: 'Clinical trial protocol — Metafield: custom.clinical_trial_protocol [json] — Column CX'
          },
          {
            type: 'code',
            codeBlock: {
              label: 'JSON - 임상시험 프로토콜 (CX)',
              code: '[\n  {"title":"시험 방법","description":"CCorneometer를 이용한 피부 수분도 측정"},\n  {"title":"시험 대상","description":"건성 피부를 가진 20~50세 여성 30명"},\n  {"title":"시험 대상","description":"1일 2회(아침, 저녁), 12주간 얼굴 전체에 도포"},\n  {"title":"주요 결과","description":"피부 수분도 38% 증가, 탄력도 24% 개선, 홍조 48% 감소, 수분감 만족도 92%+(p=0.001)"}\n]'
            }
          },
          {
            type: 'text',
            textKo: '임상시험 결과 키포인트 — Metafield: custom.clinical_trial_results_key_points [json] — 컬럼 CY',
            textEn: 'Clinical trial results key points — Metafield: custom.clinical_trial_results_key_points [json] — Column CY'
          },
          {
            type: 'code',
            codeBlock: {
              label: 'JSON - 임상시험 결과 키포인트 (CY)',
              code: '[\n  {"title":"시험 방법","description":"CCorneometer를 이용한 피부 수분도 측정 from metafield"},\n  {"title":"시험 농도","description":"CCorneometer를 이용한 피부 수분도 측정"},\n  {"title":"측정시점","description":"CCorneometer를 이용한 피부 수분도 측정"},\n  {"title":"주요결과","description":"CCorneometer를 이용한 피부 수분도 측정"}\n]'
            }
          },
          {
            type: 'text',
            textKo: '임상시험 이미지 — Metafield: custom.clinical_images [list.file_reference] — 컬럼 EB — 링크 입력',
            textEn: 'Clinical trial images — Metafield: custom.clinical_images [list.file_reference] — Column EB — Enter link'
          }
        ]
      },
      {
        id: 'pdp-invitro',
        titleKo: 'PDP - In Vitro 정보 (효능 정보 탭)',
        titleEn: 'PDP - In Vitro Info (Efficacy Tab)',
        contentBlocks: [
          {
            type: 'image',
            image: {
              src: 'https://t9018523380.p.clickup-attachments.com/t9018523380/83a0f182-fb6d-49ac-bda2-89e6a273e50e/image.png',
              captionKo: 'PDP 효능 정보 탭 - In Vitro 시험 데이터',
              captionEn: 'PDP efficacy info tab - In Vitro test data'
            }
          },
          {
            type: 'text',
            textKo: 'In Vitro 효능 상세 — Metafield: custom.effect_details [json] — 컬럼 CQ',
            textEn: 'In Vitro efficacy details — Metafield: custom.effect_details [json] — Column CQ'
          },
          {
            type: 'code',
            codeBlock: {
              label: 'JSON - In Vitro 효능 상세 (CQ)',
              code: '[\n  {"title":"test","description":"중국 약전(허가)가 ...","percent":"70%"},\n  {"title":"test","description":"중국 ...","percent":"70%"}\n]'
            }
          },
          {
            type: 'text',
            textKo: 'In Vitro 타이틀 — Metafield: custom.invitrotitle [json] — 컬럼 DK',
            textEn: 'In Vitro title — Metafield: custom.invitrotitle [json] — Column DK'
          },
          {
            type: 'code',
            codeBlock: {
              label: 'JSON - In Vitro 타이틀 (DK)',
              code: '[{"title":"중국 ASPs개정 및 등록 완료 안내"}]'
            }
          },
          {
            type: 'text',
            textKo: 'In Vitro 결과 — Metafield: custom.invitroresult [json] — 컬럼 DJ',
            textEn: 'In Vitro results — Metafield: custom.invitroresult [json] — Column DJ'
          },
          {
            type: 'code',
            codeBlock: {
              label: 'JSON - In Vitro 결과 (DJ)',
              code: '[\n  {"Result":"중국 ASPS Result개정 및 등록 완료 안내"},\n  {"Result":"중국 ASDC Result개정 및 등록 완료 안내"}\n]'
            }
          },
          {
            type: 'text',
            textKo: 'In Vitro 결과 키포인트 — Metafield: custom.invitro_results_key_points [json] — 컬럼 DW',
            textEn: 'In Vitro results key points — Metafield: custom.invitro_results_key_points [json] — Column DW'
          },
          {
            type: 'code',
            codeBlock: {
              label: 'JSON - In Vitro 결과 키포인트 (DW)',
              code: '[\n  {"title":"시험 농도","description":"Test"},\n  {"title":"시험 농도","description":"Test"},\n  {"title":"측정시점","description":"TEST"},\n  {"title":"주요결과","description":"TEST"}\n]'
            }
          },
          {
            type: 'text',
            textKo: 'In Vitro 이미지 — Metafield: custom.invitroimages [list.file_reference] — 컬럼 DH — 링크 입력',
            textEn: 'In Vitro images — Metafield: custom.invitroimages [list.file_reference] — Column DH — Enter link'
          }
        ]
      },
      {
        id: 'pdp-ingredient',
        titleKo: 'PDP - 전성분 정보 탭',
        titleEn: 'PDP - Full Ingredients Tab',
        contentBlocks: [
          {
            type: 'image',
            image: {
              src: 'https://t9018523380.p.clickup-attachments.com/t9018523380/a1c04df9-7c10-43ee-aa08-96967a0c073f/image.png',
              captionKo: 'PDP 전성분 정보 탭 - INCI, 관용명, 기능 테이블',
              captionEn: 'PDP full ingredients tab - INCI, generic name, function table'
            }
          },
          {
            type: 'text',
            textKo: 'Metafield: custom.ingredient_table [json] — 컬럼 CR',
            textEn: 'Metafield: custom.ingredient_table [json] — Column CR'
          },
          {
            type: 'code',
            codeBlock: {
              label: 'JSON - 전성분 테이블 (CR)',
              code: '{"headings":{"inci":"INCI","generic_name":"관용명","function":"기능"},\n"rows":[\n  {"inci":"Centella Asiatica Extract","generic_name":"병풀수출물","function":"피부 진정"},\n  {"inci":"Centella Asiatica Extract","generic_name":"병풀수출분","function":"피부 진정"},\n  {"inci":"Madecassic Acid","generic_name":"마데카식애씨드","function":"보호"}\n]}'
            }
          }
        ]
      },
      {
        id: 'pdp-usage',
        titleKo: 'PDP - 사용가이드 탭',
        titleEn: 'PDP - Usage Guide Tab',
        contentBlocks: [
          {
            type: 'image',
            image: {
              src: 'https://t9018523380.p.clickup-attachments.com/t9018523380/fbf99e9d-f1f5-4030-9c03-70ccd86947e4/image.png',
              captionKo: 'PDP 사용가이드 탭 - 제품 적용 및 관리 가이드 테이블',
              captionEn: 'PDP usage guide tab - product application and management guide table'
            }
          },
          {
            type: 'text',
            textKo: 'Metafield: custom.usage_guide [json] — 컬럼 CS',
            textEn: 'Metafield: custom.usage_guide [json] — Column CS'
          },
          {
            type: 'code',
            codeBlock: {
              label: 'JSON - 사용가이드 (CS)',
              code: '{"title":"제품 적용 및 관리 가이드","rows":[\n  {"label":"INCI","value":"Water, Pentylene Glycol, Spinacia Oleracea (Spinach) Leaf Extract, Caprylyl Glycol, Sodium DNA"},\n  {"label":"권장 사용량","value":"제품에 따라 1 ~ 5%까지 사용 가능합니다."},\n  {"label":"제조 가이드","value":"가열하의 경우 수상에 첨가하거나 가용화 후 첨가하십길 권장합니다."},\n  {"label":"보관 및 유통기한","value":"가열하의 경우 수상에 첨가하거나 가용화 후 첨가하십길 권장합니다."}\n]}'
            }
          }
        ]
      },
      {
        id: 'pdp-download',
        titleKo: 'PDP - 자료 다운로드 탭',
        titleEn: 'PDP - Document Download Tab',
        contentBlocks: [
          {
            type: 'image',
            image: {
              src: 'https://t9018523380.p.clickup-attachments.com/t9018523380/2c3764a8-df0c-48fb-be3c-8a7a295379fb/image.png',
              captionKo: 'PDP 자료 다운로드 탭 - MSDS, SPEC 문서 다운로드',
              captionEn: 'PDP document download tab - MSDS, SPEC documents'
            }
          },
          {
            type: 'text',
            textKo: 'Metafield: custom.product_documentation [list.file_reference] — 컬럼 DI',
            textEn: 'Metafield: custom.product_documentation [list.file_reference] — Column DI'
          }
        ]
      },
      {
        id: 'image-upload',
        titleKo: 'Matrixify를 통해 상품 이미지 업로드',
        titleEn: 'Upload Product Images via Matrixify',
        contentBlocks: [
          {
            type: 'image',
            image: {
              src: 'https://t9018523380.p.clickup-attachments.com/t9018523380/2ce4a1ae-2718-424d-a5ad-86da1008bae8/image.png',
              captionKo: 'PDP 제품 이미지 영역',
              captionEn: 'PDP product image area'
            }
          },
          {
            type: 'steps',
            steps: [
              { textKo: 'Shopify admin에서 Content → Files를 통해 이미지를 업로드', textEn: 'Upload images via Content → Files in Shopify admin' },
              { textKo: '이미지를 업로드한 후, 생성된 파일 URL을 복사 (Copy link)', textEn: 'After uploading, copy the generated file URL (Copy link)' },
              { textKo: '해당 이미지를 시트의 적절한 이미지 필드(AB 열)에 붙여넣고, 다른 이미지는 다른 행에 입력합니다', textEn: 'Paste the image URL in the appropriate image field (column AB), other images go in separate rows' }
            ]
          },
          {
            type: 'image',
            image: {
              src: 'https://t9018523380.p.clickup-attachments.com/t9018523380/ca06bab7-639a-4c85-b26f-1d6132f824e2/image.png',
              captionKo: 'Shopify Admin > Content > Files 에서 Upload files 클릭',
              captionEn: 'Click Upload files in Shopify Admin > Content > Files'
            }
          },
          {
            type: 'image',
            image: {
              src: 'https://t9018523380.p.clickup-attachments.com/t9018523380/4d7c7053-add2-408e-8e3c-03a479b3e6a7/image.png',
              captionKo: '업로드된 파일의 Copy link 버튼으로 URL 복사',
              captionEn: 'Copy URL using the Copy link button of uploaded file'
            }
          },
          {
            type: 'image',
            image: {
              src: 'https://t9018523380.p.clickup-attachments.com/t9018523380/44bc00b0-2624-4cbd-b028-a2f4e567a8a9/image.png',
              captionKo: '엑셀 시트 Image Src (AB 컬럼)에 URL 붙여넣기',
              captionEn: 'Paste URL in Excel sheet Image Src (column AB)'
            }
          }
        ]
      },
      {
        id: 'clinical-images',
        titleKo: '임상시험 이미지 업로드',
        titleEn: 'Clinical Trial Image Upload',
        bulletPointsKo: [
          '동일한 방식으로 업로드합니다',
          '이미지 URL을 복사한 뒤, 엑셀의 EB 컬럼에 붙여넣어 주시면 됩니다'
        ],
        bulletPointsEn: [
          'Upload in the same way',
          'Copy the image URL and paste it in the EB column in Excel'
        ],
        contentBlocks: [
          {
            type: 'image',
            image: {
              src: 'https://t9018523380.p.clickup-attachments.com/t9018523380/90a56ddc-d41a-4706-9b0f-7985b4fc6b0c/image.png',
              captionKo: '엑셀 EB 컬럼에 임상시험 이미지 URL 입력',
              captionEn: 'Enter clinical trial image URL in Excel EB column'
            }
          }
        ]
      },
      {
        id: 'invitro-images',
        titleKo: 'In Vitro 이미지 업로드',
        titleEn: 'In Vitro Image Upload',
        bulletPointsKo: [
          'In Vitro 이미지도 위와 동일한 방식으로 업로드합니다',
          '이미지 URL을 복사한 뒤, 엑셀의 DH 컬럼에 붙여넣어 주시면 됩니다'
        ],
        bulletPointsEn: [
          'Upload In Vitro images the same way',
          'Copy image URL and paste in Excel DH column'
        ],
        contentBlocks: [
          {
            type: 'image',
            image: {
              src: 'https://t9018523380.p.clickup-attachments.com/t9018523380/2ebe4c66-33d7-48cc-80d5-b3c871838796/image.png',
              captionKo: '엑셀 DH 컬럼에 In Vitro 이미지 URL 입력',
              captionEn: 'Enter In Vitro image URL in Excel DH column'
            }
          }
        ]
      },
      {
        id: 'file-upload',
        titleKo: 'Matrixify를 통해 상품 자료 업로드',
        titleEn: 'Upload Product Documents via Matrixify',
        contentBlocks: [
          {
            type: 'image',
            image: {
              src: 'https://t9018523380.p.clickup-attachments.com/t9018523380/2c3764a8-df0c-48fb-be3c-8a7a295379fb/image.png',
              captionKo: 'PDP 자료 다운로드 영역 - MSDS_KR, MSDS_EN, SPEC_KR, SPEC_EN',
              captionEn: 'PDP document download area - MSDS_KR, MSDS_EN, SPEC_KR, SPEC_EN'
            }
          },
          {
            type: 'steps',
            steps: [
              { textKo: 'Shopify admin에서 Content → Files를 통해 자료 업로드', textEn: 'Upload documents via Content → Files in Shopify admin' },
              { textKo: '자료를 업로드한 후, 생성된 파일 URL을 복사 (Copy link)', textEn: 'After uploading, copy the generated file URL (Copy link)' },
              { textKo: '해당 자료를 시트의 필드(DI 열)에 붙여넣으시면 됩니다', textEn: 'Paste the document URL in the DI column of the sheet' }
            ]
          }
        ]
      },
      {
        id: 'smart-filter',
        titleKo: '각 제품별 스마트 필터 추가 방법',
        titleEn: 'How to Add Smart Filters per Product',
        contentBlocks: [
          {
            type: 'image',
            image: {
              src: 'https://t9018523380.p.clickup-attachments.com/t9018523380/2fd8e1a5-060a-4b86-bb97-1fe3165cc2ca/image.png',
              captionKo: 'Filter & Search 패널 - 효능별, 시험 자료, 인증/규격, 트렌드 필터',
              captionEn: 'Filter & Search panel - by efficacy, test data, certification, trend'
            }
          },
          {
            type: 'image',
            image: {
              src: 'https://t9018523380.p.clickup-attachments.com/t9018523380/a219e958-3dc3-4203-9b75-5d5842f4d254/image.png',
              captionKo: '필터별 Metafield 컬럼 및 입력 값 예시 테이블',
              captionEn: 'Metafield column and input value examples per filter'
            }
          },
          {
            type: 'table',
            table: {
              headers: ['필터', 'Metafield 엑셀 컬럼', '입력 값 예시'],
              rows: [
                ['효능', 'custom.product_efficacy — DX', '["항노화","진정/항염","항눈썹"]'],
                ['시험 자료', 'custom.product_test_data_filter — DY', '["임상","특허"]'],
                ['인증/규격', 'custom.certification_tags_filter — EA', '["유기농 인증","COSMOS","ECOCERT","Halal"]'],
                ['트렌드', 'custom.product_trend_filter — DZ', '["국내 원산지","슬로우 에이징","업사이클링"]']
              ]
            }
          }
        ]
      },
      {
        id: 'import-guide',
        titleKo: 'Matrixify Import (업로드) 방법',
        titleEn: 'Matrixify Import (Upload) Method',
        contentBlocks: [
          {
            type: 'steps',
            steps: [
              { textKo: 'Import 섹션에서 "Add file"을 클릭', textEn: 'Click "Add file" in the Import section' },
              { textKo: '완성된 입력 파일을 업로드', textEn: 'Upload the completed input file' }
            ]
          },
          {
            type: 'image',
            image: {
              src: 'https://t9018523380.p.clickup-attachments.com/t9018523380/e01bef08-332c-48d4-9b95-b8d2c6920363/image.png',
              captionKo: 'Matrixify Import - Add file 버튼 클릭 후 엑셀 파일 업로드',
              captionEn: 'Matrixify Import - Click Add file button then upload Excel file'
            }
          },
          {
            type: 'callout',
            calloutType: 'info',
            textKo: '상품 정보 등록 진행하시면서 어려운 점이 있으면 언제든 편하게 말씀해주세요. 확인 후 자세히 안내드리겠습니다.',
            textEn: 'If you encounter any difficulties while registering product information, please feel free to reach out. We will review and provide detailed guidance.'
          }
        ]
      }
    ]
  }
];
