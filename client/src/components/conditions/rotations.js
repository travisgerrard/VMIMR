import React from 'react';

export default [
  {
    name: 'All',
    amReportReq: false,
    noonReportReq: true,
    path: '/conditions/all',
    main: () => <h5>All</h5>
  },
  {
    name: 'Wards',
    amReportReq: false,
    noonReportReq: true,
    path: '/conditions/wards',
    main: () => <h2>Wards</h2>
  },
  {
    name: 'Nights',
    amReportReq: false,
    noonReportReq: false,
    exact: true,
    path: '/nights',
    sidebar: () => <div>nights</div>,
    main: () => <h2>Nights</h2>
  },
  {
    name: 'CCU',
    amReportReq: false,
    noonReportReq: false,
    exact: true,
    path: '/ccu'
  },
  {
    name: 'Leadership in QI Pathway',
    amReportReq: true,
    noonReportReq: true,
    exact: true,
    path: '/qi'
  },
  {
    name: 'Allergy & Immunology ',
    amReportReq: true,
    noonReportReq: true,
    exact: true,
    path: '/allergy'
  },
  {
    name: 'Anesthesia',
    amReportReq: true,
    noonReportReq: true,
    exact: true,
    path: '/anesthesia'
  },
  {
    name: 'Away rotation ',
    amReportReq: true,
    noonReportReq: true,
    exact: true,
    path: '/away'
  },
  {
    name: 'Cardiology',
    amReportReq: true,
    noonReportReq: true,
    exact: true,
    path: '/cardiology'
  },
  {
    name: 'Dermatology ',
    amReportReq: true,
    noonReportReq: true,
    exact: true,
    path: '/dermatology'
  },
  {
    name: 'Endocrinology ',
    amReportReq: true,
    noonReportReq: true,
    exact: true,
    path: '/endocrinology'
  },
  {
    name: 'ENT',
    amReportReq: true,
    noonReportReq: true,
    exact: true,
    path: '/ent'
  },
  {
    name: 'Gastroenterology ',
    amReportReq: true,
    noonReportReq: true,
    exact: true,
    path: '/gi'
  },
  {
    name: 'GIM ',
    amReportReq: true,
    noonReportReq: true,
    exact: true,
    path: '/gim'
  },
  {
    name: 'Primary Care PGY2 and/or PGY3',
    amReportReq: true,
    noonReportReq: true,
    exact: true,
    path: '/primarycare'
  },
  {
    name: 'Geriatrics',
    amReportReq: true,
    noonReportReq: true,
    exact: true,
    path: '/geriatrics'
  },
  {
    name: 'Gynecology / Women’s Health',
    amReportReq: true,
    noonReportReq: true,
    exact: true,
    path: '/gyn'
  },
  {
    name: 'Hematology/Oncology',
    amReportReq: true,
    noonReportReq: true,
    exact: true,
    path: '/hemeonc'
  },
  {
    name: 'Infectious Disease ',
    amReportReq: true,
    noonReportReq: true,
    exact: true,
    path: '/infectiousd'
  },
  {
    name: 'Nephrology  ',
    amReportReq: true,
    noonReportReq: true,
    exact: true,
    path: '/nephro'
  },
  {
    name: 'Neurology ',
    amReportReq: true,
    noonReportReq: true,
    exact: true,
    path: '/neuro'
  },
  {
    name: 'Ophthalmology',
    amReportReq: true,
    noonReportReq: true,
    exact: true,
    path: '/ophtho'
  },
  {
    name: 'O/P General Surgery',
    amReportReq: true,
    noonReportReq: true,
    exact: true,
    path: '/surgery'
  },
  {
    name: 'O/P Urology',
    amReportReq: true,
    noonReportReq: true,
    exact: true,
    path: '/urology'
  },
  {
    name: 'Musculoskeletal',
    amReportReq: true,
    noonReportReq: true,
    exact: true,
    path: '/msk'
  },
  {
    name: 'Palliative Care',
    amReportReq: true,
    noonReportReq: true,
    exact: true,
    path: '/palliative'
  },
  {
    name: 'Pathology',
    amReportReq: true,
    noonReportReq: true,
    exact: true,
    path: '/path'
  },
  {
    name: 'Ultrasound Procedures',
    amReportReq: true,
    noonReportReq: true,
    exact: true,
    path: '/procedures'
  },
  {
    name: 'Psychiatry - IP',
    amReportReq: true,
    noonReportReq: true,
    exact: true,
    path: '/psych'
  },
  {
    name: 'Pulmonary Medicine ',
    amReportReq: true,
    noonReportReq: true,
    exact: true,
    path: '/puml'
  },
  {
    name: 'Rheumatology ',
    amReportReq: true,
    noonReportReq: true,
    exact: true,
    path: '/rheum'
  },
  {
    name: 'Scholarly Project',
    amReportReq: true,
    noonReportReq: true,
    exact: true,
    path: '/scholarly'
  },
  {
    name: 'Special Request',
    amReportReq: true,
    noonReportReq: true,
    exact: true,
    path: '/specialreq'
  },
  {
    name: 'Swing- Hospital',
    amReportReq: true,
    noonReportReq: true,
    exact: true,
    path: '/swing'
  },
  {
    name: 'Float – Hospital',
    amReportReq: true,
    noonReportReq: true,
    exact: true,
    path: '/float'
  },
  {
    name: 'Systems-Based Practice ',
    amReportReq: true,
    noonReportReq: true,
    exact: true,
    path: '/'
  },
  {
    name: 'Hyperbaric Medicine',
    amReportReq: true,
    noonReportReq: true,
    exact: true,
    path: '/hyperbarics'
  }
];
