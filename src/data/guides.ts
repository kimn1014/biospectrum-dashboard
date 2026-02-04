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
  },
  {
    id: '3',
    titleKo: 'AWS 사용 방법 가이드',
    titleEn: 'AWS Usage Guide',
    descriptionKo: 'AWS S3를 사용한 COA 파일 업로드 및 배송 요율 등록 방법 안내',
    descriptionEn: 'Guide for COA file upload and shipping rate registration using AWS S3',
    icon: 'cloud',
    slug: 'aws-guide',
    sections: [
      {
        id: 'coa-upload',
        titleKo: 'COA 파일 업로드',
        titleEn: 'COA File Upload',
        descriptionKo: '구매 후 Lot 번호를 입력해서 확인 가능한 COA 파일의 경우 AWS에 일괄 등록해 주시면 됩니다. 아래 이미지를 참고하셔서 등록 부탁드립니다.',
        descriptionEn: 'For COA files that can be verified by entering the Lot number after purchase, please register them in bulk on AWS. Please refer to the images below.',
        contentBlocks: [
          {
            type: 'steps',
            steps: [
              { textKo: 'AWS Management Console 상단 검색창에 "S3"를 입력하고 S3 서비스를 선택합니다', textEn: 'Enter "S3" in the AWS Management Console search bar and select S3 service' },
              { textKo: '범용 버킷 목록에서 "biospectrum" 버킷을 클릭합니다', textEn: 'Click the "biospectrum" bucket from the general-purpose bucket list' },
              { textKo: '버킷 내 "doc/" 폴더를 선택하여 COA 파일을 업로드할 위치로 이동합니다', textEn: 'Select the "doc/" folder in the bucket to navigate to the COA file upload location' }
            ]
          },
          {
            type: 'image',
            image: {
              src: 'https://t9018523380.p.clickup-attachments.com/t9018523380/3d9224c4-1d05-4c6f-9a69-d93ff16a6b31/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA%202026-01-23%20%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE%204.27.45.png',
              captionKo: 'AWS 콘솔에서 S3 검색 후 서비스 선택',
              captionEn: 'Search S3 in AWS Console and select the service'
            }
          },
          {
            type: 'image',
            image: {
              src: 'https://t9018523380.p.clickup-attachments.com/t9018523380/ee6b1400-e016-4ac5-b160-3ae3debd1741/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA%202026-01-23%20%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE%204.27.59.png',
              captionKo: 'biospectrum 버킷 선택 (아시아 태평양 서울 ap-northeast-2)',
              captionEn: 'Select biospectrum bucket (Asia Pacific Seoul ap-northeast-2)'
            }
          },
          {
            type: 'image',
            image: {
              src: 'https://t9018523380.p.clickup-attachments.com/t9018523380/f172e48d-ef08-4d77-8d06-586d5e353dcc/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA%202026-01-23%20%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE%204.28.26.png',
              captionKo: 'doc/ 폴더 내 업로드 화면 - "파일 추가" 버튼 클릭',
              captionEn: 'Upload screen in doc/ folder - Click "Add files" button'
            }
          }
        ]
      },
      {
        id: 'coa-upload-methods',
        titleKo: 'COA 파일 업로드 방법',
        titleEn: 'COA File Upload Methods',
        descriptionKo: '두 가지 방법으로 파일을 업로드할 수 있습니다.',
        descriptionEn: 'Files can be uploaded in two ways.',
        contentBlocks: [
          {
            type: 'text',
            textKo: '방법 1: S3 콘솔의 doc/ 폴더에서 좌측 파일 탐색기에서 파일을 드래그하여 업로드합니다.',
            textEn: 'Method 1: Drag and drop files from the file explorer to the S3 console doc/ folder.'
          },
          {
            type: 'image',
            image: {
              src: 'https://t9018523380.p.clickup-attachments.com/t9018523380/ae11bfc8-83a8-4215-b184-4e00c4f30e1d/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA%202026-01-23%20%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE%204.28.36.png',
              captionKo: '방법 1: 파일 탐색기에서 S3 콘솔로 드래그 앤 드롭',
              captionEn: 'Method 1: Drag and drop from file explorer to S3 console'
            }
          },
          {
            type: 'text',
            textKo: '방법 2: "업로드" 버튼을 클릭한 후, 파일을 선택하여 업로드합니다.',
            textEn: 'Method 2: Click the "Upload" button, then select files to upload.'
          },
          {
            type: 'image',
            image: {
              src: 'https://t9018523380.p.clickup-attachments.com/t9018523380/f63125fb-34ae-42ff-a18f-3a556577d88e/SCR-20260123-ondw.png',
              captionKo: '방법 2: doc/ 폴더에서 "업로드" 버튼 클릭',
              captionEn: 'Method 2: Click "Upload" button in doc/ folder'
            }
          },
          {
            type: 'image',
            image: {
              src: 'https://t9018523380.p.clickup-attachments.com/t9018523380/2ee3847c-93c2-4790-9068-9d84826819b0/SCR-20260123-onnm.png',
              captionKo: '업로드할 파일 선택 후 "업로드" 버튼 클릭하여 완료',
              captionEn: 'Select files to upload then click "Upload" to complete'
            }
          }
        ]
      },
      {
        id: 'shipping-rate',
        titleKo: '배송 요율 등록 방법',
        titleEn: 'Shipping Rate Registration',
        descriptionKo: '배송 요율 등록도 AWS에서 등록해 주시면 됩니다. 파일 등록 과정은 COA와 동일하나 shipping 폴더로 접속합니다.',
        descriptionEn: 'Shipping rates can also be registered on AWS. The file registration process is the same as COA, but access the shipping folder instead.',
        contentBlocks: [
          {
            type: 'callout',
            calloutType: 'info',
            textKo: '현재 매일 정오 12:00 (정오)에 자동 sync를 진행합니다.',
            textEn: 'Currently, automatic sync runs daily at 12:00 PM (noon).'
          },
          {
            type: 'text',
            textKo: 'biospectrum 버킷에서 doc/ 대신 shipping/ 폴더로 접속합니다.',
            textEn: 'Navigate to the shipping/ folder instead of doc/ in the biospectrum bucket.'
          },
          {
            type: 'image',
            image: {
              src: 'https://t9018523380.p.clickup-attachments.com/t9018523380/2818141f-5125-4f68-af67-bf7517ec21a9/SCR-20260128-nkwz.png',
              captionKo: 'biospectrum 버킷 내 shipping/ 폴더로 접속',
              captionEn: 'Navigate to shipping/ folder in biospectrum bucket'
            }
          }
        ]
      },
      {
        id: 'shipping-naming',
        titleKo: '배송 요율 파일명 규칙',
        titleEn: 'Shipping Rate File Naming Rules',
        contentBlocks: [
          {
            type: 'callout',
            calloutType: 'warning',
            textKo: '파일명은 shipping_rate_YYYYMMDD 날짜 형식을 반드시 준수하여 업로드해야 합니다. 예: shipping_rate_20260122.xlsx',
            textEn: 'File names must strictly follow the shipping_rate_YYYYMMDD date format. Example: shipping_rate_20260122.xlsx'
          },
          {
            type: 'text',
            textKo: '시스템은 가장 최신 날짜의 파일을 파싱하여 sync를 맞추는 구조입니다.',
            textEn: 'The system parses the file with the most recent date to synchronize data.'
          },
          {
            type: 'image',
            image: {
              src: 'https://t9018523380.p.clickup-attachments.com/t9018523380/829c6996-5ad1-4e01-beb2-0aeb7b93310f/SCR-20260128-nlbv.png',
              captionKo: 'shipping/ 폴더에 shipping_rate_YYYYMMDD.xlsx 형식으로 업로드',
              captionEn: 'Upload to shipping/ folder with shipping_rate_YYYYMMDD.xlsx format'
            }
          }
        ]
      },
      {
        id: 'manual-sync',
        titleKo: '수동 싱크 변경 방법',
        titleEn: 'Manual Sync Method',
        descriptionKo: '윈도우 cmd 또는 Mac 터미널을 켠 후 아래 명령어를 입력하시면 됩니다.',
        descriptionEn: 'Open Windows cmd or Mac terminal and enter the following command.',
        contentBlocks: [
          {
            type: 'code',
            codeBlock: {
              label: '수동 싱크 명령어',
              code: 'curl -X POST "https://biospectrum-shipping.lukuku.co/api/v1/rates/sync?format=text"'
            }
          }
        ]
      },
      {
        id: 'rate-query',
        titleKo: '각 요율 조회 (반영 확인 API)',
        titleEn: 'Rate Query (Verification API)',
        descriptionKo: '아래 명령어로 현재 등록된 요율 데이터를 조회할 수 있습니다.',
        descriptionEn: 'You can query the currently registered rate data with the following commands.',
        contentBlocks: [
          {
            type: 'code',
            codeBlock: {
              label: '현재 운송비 조회',
              code: 'curl "https://biospectrum-shipping.lukuku.co/api/v1/rates/shipping-rates?format=text"'
            }
          },
          {
            type: 'code',
            codeBlock: {
              label: '박스 규격 조회',
              code: 'curl "https://biospectrum-shipping.lukuku.co/api/v1/rates/box-specs?format=text"'
            }
          },
          {
            type: 'code',
            codeBlock: {
              label: '패킹 규칙 조회',
              code: 'curl "https://biospectrum-shipping.lukuku.co/api/v1/rates/packing-rules?format=text"'
            }
          }
        ]
      },
      {
        id: 'excel-template',
        titleKo: '엑셀 파일 형식',
        titleEn: 'Excel File Format',
        descriptionKo: '엑셀 파일 형식은 아래 첨부파일 아래에 추가하는 형식으로 파일명 수정 후 등록 진행해 주세요.',
        descriptionEn: 'Please modify the file name and register using the format of the attached file below.',
        contentBlocks: [
          {
            type: 'callout',
            calloutType: 'info',
            textKo: '템플릿 파일: shipping_rate_20260122.xlsx — 해당 파일을 다운로드 후, 데이터를 추가/수정하여 파일명을 새 날짜로 변경한 뒤 shipping/ 폴더에 업로드하세요.',
            textEn: 'Template file: shipping_rate_20260122.xlsx — Download this file, add/edit data, change the file name to a new date, then upload to the shipping/ folder.'
          }
        ]
      },
      {
        id: 'sample-product',
        titleKo: '샘플 제품 등록시 유의 사항',
        titleEn: 'Sample Product Registration Notes',
        descriptionKo: '바이오스펙트럼측 sample 제품 등록시 넣어야 할 metafield 입니다.',
        descriptionEn: 'These are the metafields required when registering Biospectrum sample products.',
        contentBlocks: [
          {
            type: 'table',
            table: {
              headers: ['Metafield', '값', '설명'],
              rows: [
                ['Is Sample', 'True', '샘플 제품 여부를 True로 설정'],
                ['packing case', '기입 (예: pa001)', '패킹 케이스 코드 입력']
              ]
            }
          },
          {
            type: 'callout',
            calloutType: 'warning',
            textKo: '샘플 제품의 경우 반드시 Is Sample:True로 설정 해주셔야 합니다. Packing case는 제품 Variant 등록시 꼭 입력해 주셔야 합니다.',
            textEn: 'For sample products, you must set Is Sample: True. Packing case must be entered when registering product Variants.'
          },
          {
            type: 'image',
            image: {
              src: 'https://t9018523380.p.clickup-attachments.com/t9018523380/05450888-ad2f-49c2-824f-ae68cd08c736/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA%202026-01-28%20%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE%203.17.17.png',
              captionKo: 'Shopify Admin > 제품 > Metafields에서 Is Sample: True, packing case 값 기입',
              captionEn: 'Set Is Sample: True and packing case value in Shopify Admin > Products > Metafields'
            }
          }
        ]
      }
    ]
  },
  {
    id: '4',
    titleKo: '업체별 차등 가격 적용 방법',
    titleEn: 'Company-specific Differential Pricing Guide',
    descriptionKo: 'Company(거래처 관리)와 Catalog(카탈로그) 기능을 활용한 업체별 맞춤 가격 설정 방법 안내',
    descriptionEn: 'Guide for setting up custom pricing per company using Company and Catalog features',
    icon: 'dollar-sign',
    slug: 'pricing',
    sections: [
      {
        id: 'overview',
        titleKo: '개요',
        titleEn: 'Overview',
        descriptionKo: '업체별 차등 가격을 적용하기 위해서는 Company(거래처 관리) 기능과 Catalog(카탈로그) 기능을 함께 이해하고 활용해야 합니다.',
        descriptionEn: 'To apply differential pricing per company, you need to understand and use both the Company (client management) and Catalog features together.',
        contentBlocks: [
          {
            type: 'flow',
            flowItems: ['Company 등록', 'Catalog 생성', '가격 규칙 설정', 'Company에 할당']
          },
          {
            type: 'callout',
            calloutType: 'info',
            textKo: 'Company는 거래처(법인)를 관리하는 기능이고, Catalog는 해당 거래처에 적용할 가격 정책을 설정하는 기능입니다. 두 기능을 조합하여 업체별 맞춤 단가를 제공할 수 있습니다.',
            textEn: 'Company manages business clients, and Catalog sets pricing policies for those clients. By combining both features, you can provide custom pricing per company.'
          }
        ]
      },
      {
        id: 'company-feature',
        titleKo: 'Company 기능 (B2B 거래처 관리)',
        titleEn: 'Company Feature (B2B Client Management)',
        descriptionKo: 'Shopify B2B 기능에서 고객을 회사(Company) 단위로 등록하여 관리할 수 있습니다.',
        descriptionEn: 'In Shopify B2B, you can register and manage customers at the Company level.',
        contentBlocks: [
          {
            type: 'table',
            table: {
              headers: ['구분', '기존 Shopify', 'B2B Company 기능'],
              rows: [
                ['고객 관리 단위', '개인(Customer) 단위', '회사(Company) 단위'],
                ['담당자 관리', '개별 고객만 관리', '여러 담당자 등록 가능 (구매, 회계 등)'],
                ['가격 정책', '모든 고객 동일 가격', '회사별 차등 가격 적용 가능']
              ]
            }
          },
          {
            type: 'callout',
            calloutType: 'success',
            textKo: '예시: "ABC Trading"이라는 회사를 Company로 등록하고, 그 안에 구매 담당자, 회계 담당자 등 여러 명의 담당자를 계정으로 연결할 수 있습니다.',
            textEn: 'Example: Register "ABC Trading" as a Company, then link multiple contacts such as purchase managers and accountants to that company.'
          }
        ]
      },
      {
        id: 'catalog-feature',
        titleKo: 'Catalog 기능 (차등 가격 관리)',
        titleEn: 'Catalog Feature (Differential Pricing)',
        descriptionKo: 'Catalog는 회사별로 다른 가격 정책을 적용할 수 있도록 돕는 핵심 기능입니다.',
        descriptionEn: 'Catalog is the key feature that enables applying different pricing policies per company.',
        contentBlocks: [
          {
            type: 'text',
            textKo: '카탈로그를 통해 세 가지 방식의 가격 조정이 가능합니다:',
            textEn: 'Three types of price adjustments are available through catalogs:'
          },
          {
            type: 'table',
            table: {
              headers: ['가격 조정 방식', '설명', '활용 예시'],
              rows: [
                ['전체 가격 조정', '모든 제품 가격에 일괄 할인/인상 적용', '전 제품 10% 할인 적용'],
                ['특정 제품 개별 가격', '특정 제품에만 별도의 단가 설정', 'A 제품만 $50으로 고정'],
                ['구간별(볼륨) 가격', '수량별 차등 가격 적용', '수량이 많을수록 단가 할인']
              ]
            }
          }
        ]
      },
      {
        id: 'volume-pricing',
        titleKo: '구간별(볼륨) 가격 설정',
        titleEn: 'Volume-based Pricing Setup',
        descriptionKo: '수량 구간에 따라 단가를 차등 적용할 수 있습니다. 대량 구매 고객에게 더 낮은 단가를 제공하는 데 활용됩니다.',
        descriptionEn: 'You can apply different unit prices based on quantity tiers. This is used to offer lower prices to bulk purchasers.',
        contentBlocks: [
          {
            type: 'table',
            table: {
              headers: ['수량 구간', '단가', '비고'],
              rows: [
                ['1 ~ 99개', '$10', '기본 가격'],
                ['100개 이상', '$9', '10% 할인'],
                ['500개 이상', '$7', '30% 할인']
              ]
            }
          },
          {
            type: 'image',
            image: {
              src: 'https://t9018523380.p.clickup-attachments.com/t9018523380/bce7ad17-ec99-4dc0-9384-2cd85149dded/image.png',
              captionKo: '구간별 전체 가격 조정 화면 - 수량 규칙 및 수량별 가격 설정',
              captionEn: 'Volume-based pricing screen - quantity rules and tier pricing setup'
            }
          }
        ]
      },
      {
        id: 'catalog-csv',
        titleKo: '카탈로그 대량 관리 (CSV 활용)',
        titleEn: 'Bulk Catalog Management (CSV)',
        descriptionKo: 'CSV 파일을 활용하여 가격/수량 규칙을 대량으로 관리할 수 있습니다.',
        descriptionEn: 'You can manage pricing and quantity rules in bulk using CSV files.',
        contentBlocks: [
          {
            type: 'steps',
            steps: [
              { textKo: '카탈로그 생성 후 가격/수량 규칙 데이터를 CSV 파일로 내보내기(Export)', textEn: 'Export pricing/quantity rule data to CSV file after creating a catalog' },
              { textKo: 'CSV 파일에서 가격 및 수량 규칙을 일괄 수정', textEn: 'Bulk edit pricing and quantity rules in the CSV file' },
              { textKo: '수정된 CSV 파일을 다시 가져오기(Import)하여 대량 업데이트 완료', textEn: 'Import the modified CSV file to complete bulk update' }
            ]
          },
          {
            type: 'image',
            image: {
              src: 'https://t9018523380.p.clickup-attachments.com/t9018523380/f82186fa-0c48-4aa2-a161-38de45a93a7c/image.png',
              captionKo: 'CSV 파일을 활용한 구간별 개별 제품 가격 조정 화면',
              captionEn: 'Volume-based individual product pricing adjustment using CSV file'
            }
          },
          {
            type: 'callout',
            calloutType: 'info',
            textKo: 'CSV 파일을 활용하면 수백 개의 제품 가격을 한번에 수정할 수 있어, 대량의 제품을 관리할 때 매우 효율적입니다.',
            textEn: 'Using CSV files allows you to modify hundreds of product prices at once, making it very efficient for managing large product catalogs.'
          }
        ]
      },
      {
        id: 'catalog-assignment',
        titleKo: '카탈로그 할당 시 주의사항',
        titleEn: 'Catalog Assignment Notes',
        contentBlocks: [
          {
            type: 'table',
            table: {
              headers: ['항목', '제한 사항'],
              rows: [
                ['Company Location당 카탈로그', '최대 25개 할당 가능'],
                ['스토어 전체 카탈로그', '최대 10,000개 생성 가능']
              ]
            }
          },
          {
            type: 'callout',
            calloutType: 'warning',
            textKo: '동일 제품이 여러 카탈로그에 다른 가격으로 포함된 경우, 가장 낮은 가격이 고객에게 표시됩니다. 동일한 최저가일 경우, 먼저 생성된 카탈로그의 규칙이 적용됩니다.',
            textEn: 'If the same product is included in multiple catalogs at different prices, the lowest price is displayed to the customer. If prices are equal, the rule from the earlier-created catalog applies.'
          },
          {
            type: 'text',
            textKo: '예시: A 카탈로그에서 양초가 $9이고, B 카탈로그에서 양초가 $7인 경우 → 고객에게는 $7로 표시됩니다.',
            textEn: 'Example: If a candle is $9 in Catalog A and $7 in Catalog B → the customer sees $7.'
          }
        ]
      },
      {
        id: 'summary',
        titleKo: '핵심 정리',
        titleEn: 'Summary',
        contentBlocks: [
          {
            type: 'table',
            table: {
              headers: ['기능', '역할', '핵심 포인트'],
              rows: [
                ['Company', '거래처(법인 고객) 관리', '담당자 여러 명 등록 가능'],
                ['Catalog', '차등 가격 정책 적용', '회사별, 제품별, 수량별 가격 설정'],
                ['활용 방법', '카탈로그 → 회사 할당', '업체별 맞춤 단가 제공']
              ]
            }
          },
          {
            type: 'flow',
            flowItems: ['Company 등록', 'Catalog 생성 & 가격 설정', 'Company에 Catalog 할당', '업체별 맞춤 단가 적용 완료']
          }
        ]
      }
    ]
  }
];
