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
    path: '/conditions/nights',
    sidebar: () => <div>nights</div>,
    main: () => <h2>Nights</h2>
  },
  {
    name: 'CCU',
    amReportReq: false,
    noonReportReq: false,
    exact: true,
    path: '/conditions/ccu'
  },
  {
    name: 'Leadership in QI Pathway',
    amReportReq: true,
    noonReportReq: true,
    exact: true,
    path: '/conditions/qi'
  },
  {
    name: 'Allergy & Immunology ',
    amReportReq: true,
    noonReportReq: true,
    exact: true,
    path: '/conditions/allergy'
  },
  {
    name: 'Anesthesia',
    amReportReq: true,
    noonReportReq: true,
    exact: true,
    path: '/conditions/anesthesia'
  },
  {
    name: 'Away rotation ',
    amReportReq: true,
    noonReportReq: true,
    exact: true,
    path: '/conditions/away'
  },
  {
    name: 'Cardiology',
    amReportReq: true,
    noonReportReq: true,
    exact: true,
    path: '/conditions/cardiology'
  },
  {
    name: 'Dermatology ',
    amReportReq: true,
    noonReportReq: true,
    exact: true,
    path: '/conditions/dermatology'
  },
  {
    name: 'Endocrinology ',
    amReportReq: true,
    noonReportReq: true,
    exact: true,
    path: '/conditions/endocrinology'
  },
  {
    name: 'ENT',
    amReportReq: true,
    noonReportReq: true,
    exact: true,
    path: '/conditions/ent'
  },
  {
    name: 'Gastroenterology ',
    amReportReq: true,
    noonReportReq: true,
    exact: true,
    path: '/conditions/gi'
  },
  {
    name: 'GIM ',
    amReportReq: true,
    noonReportReq: true,
    exact: true,
    path: '/conditions/gim'
  },
  {
    name: 'Primary Care PGY2 and/or PGY3',
    amReportReq: true,
    noonReportReq: true,
    exact: true,
    path: '/conditions/primarycare'
  },
  {
    name: 'Geriatrics',
    amReportReq: true,
    noonReportReq: true,
    exact: true,
    path: '/conditions/geriatrics'
  },
  {
    name: 'Gynecology / Women’s Health',
    amReportReq: true,
    noonReportReq: true,
    exact: true,
    path: '/conditions/gyn'
  },
  {
    name: 'Hematology/Oncology',
    amReportReq: true,
    noonReportReq: true,
    exact: true,
    path: '/conditions/hemeonc'
  },
  {
    name: 'Infectious Disease ',
    amReportReq: true,
    noonReportReq: true,
    exact: true,
    path: '/conditions/infectiousdisease'
  },
  {
    name: 'Nephrology  ',
    amReportReq: true,
    noonReportReq: true,
    exact: true,
    path: '/conditions/nephro'
  },
  {
    name: 'Neurology ',
    amReportReq: true,
    noonReportReq: true,
    exact: true,
    path: '/conditions/neuro'
  },
  {
    name: 'Ophthalmology',
    amReportReq: true,
    noonReportReq: true,
    exact: true,
    path: '/conditions/ophtho'
  },
  {
    name: 'O/P General Surgery',
    amReportReq: true,
    noonReportReq: true,
    exact: true,
    path: '/conditions/surgery'
  },
  {
    name: 'O/P Urology',
    amReportReq: true,
    noonReportReq: true,
    exact: true,
    path: '/conditions/urology'
  },
  {
    name: 'Musculoskeletal',
    amReportReq: true,
    noonReportReq: true,
    exact: true,
    path: '/conditions/msk'
  },
  {
    name: 'Palliative Care',
    amReportReq: true,
    noonReportReq: true,
    exact: true,
    path: '/conditions/palliative'
  },
  {
    name: 'Pathology',
    amReportReq: true,
    noonReportReq: true,
    exact: true,
    path: '/conditions/path'
  },
  {
    name: 'Ultrasound Procedures',
    amReportReq: true,
    noonReportReq: true,
    exact: true,
    path: '/conditions/procedures'
  },
  {
    name: 'Psychiatry - IP',
    amReportReq: true,
    noonReportReq: true,
    exact: true,
    path: '/conditions/psych'
  },
  {
    name: 'Pulmonary Medicine ',
    amReportReq: true,
    noonReportReq: true,
    exact: true,
    path: '/conditions/pulm'
  },
  {
    name: 'Rheumatology ',
    amReportReq: true,
    noonReportReq: true,
    exact: true,
    path: '/conditions/rheum'
  },
  {
    name: 'Scholarly Project',
    amReportReq: true,
    noonReportReq: true,
    exact: true,
    path: '/conditions/scholarly'
  },
  {
    name: 'Special Request',
    amReportReq: true,
    noonReportReq: true,
    exact: true,
    path: '/conditions/specialreq'
  },
  {
    name: 'Swing- Hospital',
    amReportReq: true,
    noonReportReq: true,
    exact: true,
    path: '/conditions/swing'
  },
  {
    name: 'Float – Hospital',
    amReportReq: true,
    noonReportReq: true,
    exact: true,
    path: '/conditions/float'
  },
  {
    name: 'Systems-Based Practice ',
    amReportReq: true,
    noonReportReq: true,
    exact: true,
    path: '/conditions/sbp'
  },
  {
    name: 'Hyperbaric Medicine',
    amReportReq: true,
    noonReportReq: true,
    exact: true,
    path: '/conditions/hyperbarics'
  }
];
