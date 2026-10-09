export type Language = 'en' | 'zh-TW';

export interface Translations {
  nav: {
    brand: string;
    capabilities: string;
    workbench: string;
    equipment: string;
    publications: string;
    team: string;
    reserveAccess: string;
    switchThemeLight: string;
    switchThemeDark: string;
    themeMode: string;
    lightMode: string;
    nightMode: string;
    switchLang: string;
  };
  hero: {
    kicker: string;
    dept: string;
    standards: string;
    title: string;
    desc: string;
    launchWorkbench: string;
    reserveTime: string;
    benchTag: string;
    acquisitionActive: string;
    ch1Label: string;
    ch2Label: string;
    timebase: string;
    rfFreq: string;
    freeze: string;
    run: string;
    stat1Label: string;
    stat1Unit: string;
    stat2Label: string;
    stat2Unit: string;
    stat3Label: string;
    stat4Label: string;
  };
  capabilities: {
    tag: string;
    subtag: string;
    title: string;
    desc: string;
    thrustNum: string;
    lead: string;
    architecture: string;
    validationMetrics: string;
    closeDossier: string;
    dossierTag: string;
  };
  workbench: {
    tag: string;
    subtag: string;
    title: string;
    desc: string;
    oscillogram: string;
    fftSpectrum: string;
    freezeAcq: string;
    resumeAcq: string;
    resetParams: string;
    triggerStatus: string;
    ch1Metrics: string;
    ch2Metrics: string;
    transferGain: string;
    carrierFreq: string;
    circuitDynamics: string;
    synthControls: string;
    liveScpi: string;
    excitationWaveform: string;
    inputFreq: string;
    driveAmp: string;
    phaseOffset: string;
    noiseInjection: string;
    horizontalTimebase: string;
    probingChannels: string;
    exportCsv: string;
    savePng: string;
  };
  equipment: {
    tag: string;
    subtag: string;
    title: string;
    desc: string;
    searchPlaceholder: string;
    allCat: string;
    rfCat: string;
    semiCat: string;
    cleanroomCat: string;
    powerCat: string;
    specLabel: string;
    clearanceLabel: string;
    custodianLabel: string;
    rateLabel: string;
    reserveButton: string;
    noResults: string;
    operational: string;
    inCalibration: string;
    reserved: string;
  };
  publications: {
    tag: string;
    subtag: string;
    title: string;
    desc: string;
    searchPlaceholder: string;
    allCat: string;
    rfCat: string;
    powerCat: string;
    vlsiCat: string;
    quantumCat: string;
    citations: string;
    viewDetails: string;
    hideDetails: string;
    copyBibtex: string;
    bibtexCopied: string;
    doiPortal: string;
    paperAbstract: string;
    noResults: string;
  };
  team: {
    tag: string;
    subtag: string;
    title: string;
    desc: string;
    focusLabel: string;
    recentPaperLabel: string;
    citationsLabel: string;
    proposeCollab: string;
  };
  faq: {
    tag: string;
    title: string;
    desc: string;
  };
  footer: {
    about: string;
    quad: string;
    hours: string;
    cleanroomNotice: string;
    researchCol: string;
    infraCol: string;
    noticesCol: string;
    noticesDesc: string;
    subscribed: string;
    subscribePlaceholder: string;
    applyAccess: string;
    copyright: string;
    compliance: string;
  };
  modal: {
    tag: string;
    title: string;
    desc: string;
    instrumentLabel: string;
    nameLabel: string;
    emailLabel: string;
    dateLabel: string;
    slotLabel: string;
    clearanceLabel: string;
    abstractLabel: string;
    abstractPlaceholder: string;
    submitButton: string;
    confirmedTitle: string;
    confirmedDesc: string;
    resId: string;
    apparatus: string;
    session: string;
    investigator: string;
    doneButton: string;
    nameError: string;
    emailError: string;
    abstractError: string;
    morningSlot: string;
    afternoonSlot: string;
    eveningSlot: string;
    fullDaySlot: string;
  };
}

export const translations: Record<Language, Translations> = {
  en: {
    nav: {
      brand: 'ElectricalEngineering',
      capabilities: 'Capabilities',
      workbench: 'Workbench',
      equipment: 'Equipment',
      publications: 'Publications',
      team: 'Team',
      reserveAccess: 'Reserve Lab Access',
      switchThemeLight: 'Switch to Light Mode',
      switchThemeDark: 'Switch to Night Mode',
      themeMode: 'Theme Mode',
      lightMode: 'Light Mode',
      nightMode: 'Night Mode',
      switchLang: 'Language',
    },
    hero: {
      kicker: 'Advanced Research Laboratory',
      dept: 'Department of Electrical Engineering',
      standards: 'IEEE Standards Compliant',
      title: 'Pioneering Silicon Architectures, RF Systems & Quantum Instrumentation.',
      desc: 'We investigate atomic-scale semiconductor physics, multi-gigahertz mixed-signal interfaces, wide-bandgap GaN/SiC power topologies, and cryogenic sensor readouts for the next era of computing.',
      launchWorkbench: 'Launch Virtual Workbench',
      reserveTime: 'Reserve Instrument Time',
      benchTag: 'BENCH #04 · RF SUITE',
      acquisitionActive: 'ACQUISITION ACTIVE',
      ch1Label: 'CH1: 500 mV/div',
      ch2Label: 'CH2: 200 mV/div',
      timebase: 'TB: 10 ns/div',
      rfFreq: 'RF Frequency:',
      freeze: 'FREEZE',
      run: 'RUN',
      stat1Label: 'Vector Measurement Bandwidth',
      stat1Unit: 'GHz',
      stat2Label: 'Silicon Tapeout Node',
      stat2Unit: 'nm',
      stat3Label: 'IEEE Journal Publications',
      stat4Label: 'Cleanroom Facility Uptime',
    },
    capabilities: {
      tag: 'CORE RESEARCH PILLARS',
      subtag: 'SILICON, RF & QUANTUM',
      title: 'Fundamental & Applied Engineering thrusts',
      desc: 'Our lab bridges semiconductor physics and scalable cyber-physical systems across four synchronized research domains.',
      thrustNum: 'Research Thrust',
      lead: 'Lead:',
      architecture: 'Architecture Topology:',
      validationMetrics: 'Target Validation Metrics',
      closeDossier: 'Close Dossier',
      dossierTag: 'RESEARCH SPECIFICATION DOSSIER',
    },
    workbench: {
      tag: 'INTERACTIVE TESTBENCH',
      subtag: 'HARDWARE-CALIBRATED SIMULATION',
      title: 'Virtual RF & Silicon Testbench Console',
      desc: 'Test and inspect circuit topologies fabricated in our cleanroom. Modulate excitation frequencies, adjust input drive levels, and inspect time-domain oscillograms alongside real-time harmonic FFT spectra.',
      oscillogram: 'Oscillogram',
      fftSpectrum: 'FFT Spectrum',
      freezeAcq: 'Freeze Acquisition',
      resumeAcq: 'Resume Acquisition',
      resetParams: 'Reset Parameters',
      triggerStatus: 'TRIGGER: AUTO · 50Ω COUPLING',
      ch1Metrics: 'CH1 Vpp / Vrms',
      ch2Metrics: 'CH2 Vpp / Vrms',
      transferGain: 'Circuit Transfer (Av)',
      carrierFreq: 'Carrier Frequency',
      circuitDynamics: 'Circuit Dynamics:',
      synthControls: 'Synthesizer Controls',
      liveScpi: 'LIVE SCPI',
      excitationWaveform: 'Excitation Waveform',
      inputFreq: 'Input Frequency',
      driveAmp: 'Peak-to-Peak Drive (Vpp)',
      phaseOffset: 'Phase Offset (Δθ)',
      noiseInjection: 'Thermal Noise Injection',
      horizontalTimebase: 'Horizontal Timebase',
      probingChannels: 'Probing Channels:',
      exportCsv: 'Export Waveform Dataset (.CSV)',
      savePng: 'Save Scope PNG Snapshot',
    },
    equipment: {
      tag: 'FACILITY APPARATUS',
      subtag: 'CALIBRATED HARDWARE INVENTORY',
      title: 'Precision Instrumentation & Cleanroom Suite',
      desc: 'Standard-compliant multi-gigahertz test equipment, cryogenic probe stations, and sub-micron fabrication tools accessible to certified researchers.',
      searchPlaceholder: 'Search instrument or model...',
      allCat: 'All',
      rfCat: 'RF & Microwaves',
      semiCat: 'Semiconductor',
      cleanroomCat: 'Cleanroom',
      powerCat: 'Power Systems',
      specLabel: 'Specification:',
      clearanceLabel: 'Clearance:',
      custodianLabel: 'Custodian:',
      rateLabel: 'Rate:',
      reserveButton: 'Reserve Apparatus Slot',
      noResults: 'No instruments found matching',
      operational: 'Operational',
      inCalibration: 'In Calibration',
      reserved: 'Reserved',
    },
    publications: {
      tag: 'PEER-REVIEWED RESEARCH',
      subtag: 'IEEE & ACM ARCHIVES',
      title: 'Journal Publications & Conference Papers',
      desc: 'Recent archival contributions to solid-state circuits, power conversion topologies, and cryogenic instrumentation.',
      searchPlaceholder: 'Search author, topic, or DOI...',
      allCat: 'All',
      rfCat: 'RF Systems',
      powerCat: 'Power Semi',
      vlsiCat: 'VLSI',
      quantumCat: 'Quantum',
      citations: 'Citations:',
      viewDetails: 'View Abstract & BibTeX',
      hideDetails: 'Hide Abstract & BibTeX',
      copyBibtex: 'Copy BibTeX',
      bibtexCopied: 'BibTeX Copied!',
      doiPortal: 'DOI Portal',
      paperAbstract: 'Paper Abstract:',
      noResults: 'No publications found matching',
    },
    team: {
      tag: 'LABORATORY PERSONNEL',
      subtag: 'FACULTY & RESEARCH SCIENTISTS',
      title: 'Faculty, Engineers & Investigators',
      desc: 'Leading academic inquiry and directing multi-institution microelectronics consortia with industrial partners.',
      focusLabel: 'Focus:',
      recentPaperLabel: 'Recent Paper',
      citationsLabel: 'Total Citations:',
      proposeCollab: 'Propose Collaboration',
    },
    faq: {
      tag: 'OPERATING PROTOCOLS & COMPLIANCE',
      title: 'Laboratory Protocols & Facility Guidelines',
      desc: 'Essential procedures regarding cleanroom access, instrument checkout, safety clearance levels, and collaborative project timelines.',
    },
    footer: {
      about: 'Premier research laboratory dedicated to atomic-scale semiconductor physics, gigahertz RF systems, wide-bandgap energy conversion, and quantum computing interfaces.',
      quad: 'EE Research Quadrangle · Room 418',
      hours: 'Operating Hours: 08:00 – 22:00 Daily',
      cleanroomNotice: 'Class 100 Cleanroom & Cryogenics Sub-Basement',
      researchCol: 'Research',
      infraCol: 'Infrastructure',
      noticesCol: 'Research Colloquia Notices',
      noticesDesc: 'Receive monthly invitations to guest IEEE lectures, cleanroom workshop schedules, and preprint releases.',
      subscribed: 'Subscribed to Colloquium Notices',
      subscribePlaceholder: 'name@institution.edu',
      applyAccess: 'Apply for Equipment Access or Lab Tour →',
      copyright: '© 2026 ElectricalEngineering Research Laboratory. Affiliated with IEEE Solid-State Circuits & Microwave Theory Societies.',
      compliance: 'EHS Level 1-3 Compliant · ITAR & EAR Regulated · Cleanroom ISO 14644-1',
    },
    modal: {
      tag: 'APPARATUS DISPATCH & ACCESS',
      title: 'Reserve Laboratory Slot',
      desc: 'Schedule calibrated bench time or request collaboration on cleanroom fabrication equipment.',
      instrumentLabel: 'Target Instrument / Station',
      nameLabel: 'Researcher Full Name',
      emailLabel: 'Institutional Email',
      dateLabel: 'Desired Session Date',
      slotLabel: 'Slot Duration',
      clearanceLabel: 'Safety Clearance Level',
      abstractLabel: 'Experiment Scope & Device Under Test (DUT)',
      abstractPlaceholder: 'Outline wafer parameters, expected frequency band, RF port requirements, or sample mounting needs...',
      submitButton: 'Submit Apparatus Booking',
      confirmedTitle: 'Apparatus Reservation Confirmed',
      confirmedDesc: 'Your access request has been logged in the lab scheduler. A confirmation dossier and door-lock PIN have been dispatched to your email.',
      resId: 'RESERVATION ID:',
      apparatus: 'APPARATUS:',
      session: 'SESSION:',
      investigator: 'INVESTIGATOR:',
      doneButton: 'Done',
      nameError: 'Full name is required',
      emailError: 'Valid academic or corporate email is required',
      abstractError: 'Please describe your experiment objectives (min 15 characters)',
      morningSlot: '09:00 - 13:00 (Morning Session)',
      afternoonSlot: '13:30 - 17:30 (Afternoon Session)',
      eveningSlot: '18:00 - 22:00 (Evening / Unattended)',
      fullDaySlot: 'Full Day (09:00 - 18:00)',
    },
  },
  'zh-TW': {
    nav: {
      brand: '電機工程實驗室',
      capabilities: '研究主軸',
      workbench: '虛擬工作台',
      equipment: '實驗儀器',
      publications: '論文發表',
      team: '研究團隊',
      reserveAccess: '預約實驗室時段',
      switchThemeLight: '切換至日間模式',
      switchThemeDark: '切換至夜間模式',
      themeMode: '主題模式',
      lightMode: '日間模式',
      nightMode: '夜間模式',
      switchLang: '語言',
    },
    hero: {
      kicker: '先進前瞻研究實驗室',
      dept: '電機工程學系',
      standards: '符合 IEEE 國際學術標準',
      title: '引領矽架構、超高頻射頻系統與量子儀測的前瞻探索。',
      desc: '我們致力於原子尺度半導體物理、多吉赫茲混合訊號介面、寬能隙 GaN/SiC 功率拓撲以及低溫感測器讀出電路，開創次世代運算基石。',
      launchWorkbench: '啟動虛擬實驗工作台',
      reserveTime: '預約儀器使用時段',
      benchTag: '工作台 #04 · 射頻高頻量測區',
      acquisitionActive: '訊號擷取進行中',
      ch1Label: '第一通道: 500 mV/格',
      ch2Label: '第二通道: 200 mV/格',
      timebase: '時基: 10 ns/格',
      rfFreq: '射頻載波頻率:',
      freeze: '凍結波形',
      run: '連續擷取',
      stat1Label: '向量量測頻寬極限',
      stat1Unit: 'GHz',
      stat2Label: '先進矽晶片下線製程',
      stat2Unit: 'nm',
      stat3Label: 'IEEE 頂級期刊論文',
      stat4Label: '無塵室潔淨設施可用率',
    },
    capabilities: {
      tag: '核心研究主軸',
      subtag: '矽晶片 · 射頻系統 · 量子工程',
      title: '基礎物理探索與系統應用雙軌驅動',
      desc: '本實驗室橫跨四個相互協同的研究領域，架構半導體微觀物理至大規模資通訊系統之技術橋樑。',
      thrustNum: '專題研究主軸',
      lead: '計畫主持人:',
      architecture: '架構電路拓撲:',
      validationMetrics: '目標驗證量測指標',
      closeDossier: '關閉技術檔案',
      dossierTag: '研究專題規格手冊',
    },
    workbench: {
      tag: '互動式實驗工作台',
      subtag: '經過硬體校正的高擬真模擬',
      title: '虛擬射頻與矽電路即時量測控制台',
      desc: '測試並檢視本實驗室無塵室試產之電路拓撲。即時調節激勵頻率、輸入推動強度，並同時觀測時域示波圖與即時諧波快速傅立葉變換 (FFT) 頻譜。',
      oscillogram: '時域示波圖',
      fftSpectrum: 'FFT 頻譜分析',
      freezeAcq: '凍結訊號擷取',
      resumeAcq: '繼續動態擷取',
      resetParams: '重設所有參數',
      triggerStatus: '觸發模式: 自動 · 50Ω 阻抗匹配',
      ch1Metrics: '通道一 峰對峰值 / 均方根值',
      ch2Metrics: '通道二 峰對峰值 / 均方根值',
      transferGain: '電路傳遞增益 (Av)',
      carrierFreq: '載波激勵頻率',
      circuitDynamics: '電路動態行為說明:',
      synthControls: '訊號合成儀參數控制',
      liveScpi: 'SCPI 連線中',
      excitationWaveform: '激勵輸入波形',
      inputFreq: '激勵輸入頻率',
      driveAmp: '峰對峰推動電壓 (Vpp)',
      phaseOffset: '相位偏移角度 (Δθ)',
      noiseInjection: '熱雜訊注入比例',
      horizontalTimebase: '水平時基縮放倍率',
      probingChannels: '探針量測通道:',
      exportCsv: '匯出量測數據集 (.CSV)',
      savePng: '儲存示波器螢幕快照 (PNG)',
    },
    equipment: {
      tag: '實驗室專屬儀器設備',
      subtag: '高精度校正硬體資產目錄',
      title: '精密儀器陣列與百級無塵室專區',
      desc: '提供符合嚴格規範的多吉赫茲量測儀器、極低溫探針台以及深亞微米微影製造工具，供合格認證研究人員預約。',
      searchPlaceholder: '搜尋儀器名稱或型號...',
      allCat: '全部',
      rfCat: '射頻與微波',
      semiCat: '半導體製程',
      cleanroomCat: '無塵室設施',
      powerCat: '功率電子系統',
      specLabel: '技術規格:',
      clearanceLabel: '安全授權等級:',
      custodianLabel: '設備負責人:',
      rateLabel: '使用費率:',
      reserveButton: '預約該儀器時段',
      noResults: '查無符合條件之儀器：',
      operational: '運作正常',
      inCalibration: '校正維護中',
      reserved: '已被預約',
    },
    publications: {
      tag: '同儕審查學術成就',
      subtag: 'IEEE 與 ACM 典藏論文',
      title: '學術期刊論文與頂級國際研討會',
      desc: '本實驗室近期於固態電路、超高頻功率轉換拓撲與極低溫儀測領域之突破性發表。',
      searchPlaceholder: '搜尋作者、主題或 DOI...',
      allCat: '全部',
      rfCat: '射頻系統',
      powerCat: '功率半導體',
      vlsiCat: '超大型積體電路',
      quantumCat: '量子工程',
      citations: '被引用次數:',
      viewDetails: '檢視論文摘要與 BibTeX',
      hideDetails: '收起摘要與 BibTeX',
      copyBibtex: '複製 BibTeX',
      bibtexCopied: 'BibTeX 已複製！',
      doiPortal: 'DOI 論文入口',
      paperAbstract: '論文完整摘要:',
      noResults: '查無符合搜尋條件之論文：',
    },
    team: {
      tag: '實驗室成員名錄',
      subtag: '教授與專任研究科學家',
      title: '指導教授、工程師與研究員',
      desc: '引領前瞻學術探究，並與國內外產業界知名半導體聯盟主持跨校產學合作計畫。',
      focusLabel: '主要專長:',
      recentPaperLabel: '近期代表著作',
      citationsLabel: '累積學術引用:',
      proposeCollab: '提出產學合作洽詢',
    },
    faq: {
      tag: '運作規範與合規指引',
      title: '實驗室規章與設施管理準則',
      desc: '包含無塵室進出防護、高單價儀器借用、安全認證層級以及產學合作專案時程安排等重要須知。',
    },
    footer: {
      about: '專注於原子級半導體物理、吉赫茲射頻積體電路、寬能隙高功率轉換技術及量子運算微波介面之卓越頂尖實驗室。',
      quad: '電機工程研究大樓 · 418 室',
      hours: '開放時間: 每日 08:00 – 22:00',
      cleanroomNotice: '百級無塵室專區 & 地下極低溫量測實驗室',
      researchCol: '研究領域',
      infraCol: '基礎設施',
      noticesCol: '學術研討會最新通知',
      noticesDesc: '每月定期寄送 IEEE 特邀講座、無塵室工作坊排程及最新預印本論文發布通知。',
      subscribed: '已成功訂閱學術專題通知',
      subscribePlaceholder: 'name@institution.edu',
      applyAccess: '申請儀器權限或預約實驗室參訪 →',
      copyright: '© 2026 電機工程前瞻研究實驗室 (ElectricalEngineering Lab). 隸屬於 IEEE 固態電路學會與微波理論學會。',
      compliance: 'EHS 1-3 級環境安全合規 · 符合 ITAR 與 EAR 規範 · 無塵室 ISO 14644-1 標準',
    },
    modal: {
      tag: '儀器調度與權限申請',
      title: '預約實驗室儀器時段',
      desc: '安排校正儀器工作台時段，或申請使用百級無塵室微結構製作設備。',
      instrumentLabel: '目標儀器 / 實驗工作台',
      nameLabel: '研究員姓名',
      emailLabel: '學術機構或企業信箱',
      dateLabel: '預計使用日期',
      slotLabel: '時段長度',
      clearanceLabel: '安全訓練合格級別',
      abstractLabel: '實驗主旨與待測物 (DUT) 概述',
      abstractPlaceholder: '簡述晶圓材質、預期測試頻段、射頻接頭需求或特殊封裝樣品載台需求...',
      submitButton: '送出儀器預約申請',
      confirmedTitle: '儀器時段預約已成功登記',
      confirmedDesc: '您的申請已記入實驗室時程系統，詳細確認文件與門禁進出 PIN 碼已同步寄發至您的電子郵件。',
      resId: '預約單號:',
      apparatus: '預約儀器:',
      session: '預約時段:',
      investigator: '申請人員:',
      doneButton: '完成',
      nameError: '請輸入研究員姓名',
      emailError: '請輸入有效的學術或企業電子郵件',
      abstractError: '請簡述實驗主旨與待測物（至少 15 個字元）',
      morningSlot: '09:00 - 13:00 (上午時段)',
      afternoonSlot: '13:30 - 17:30 (下午時段)',
      eveningSlot: '18:00 - 22:00 (夜間 / 無人看守)',
      fullDaySlot: '全日時段 (09:00 - 18:00)',
    },
  },
};
