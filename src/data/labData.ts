export interface ResearchPillar {
  id: string;
  title: string;
  leadInvestigator: string;
  abstract: string;
  specs: { label: string; value: string }[];
  highlight: string;
  image: string;
  topics: string[];
  schematicSummary: string;
}

export interface EquipmentItem {
  id: string;
  name: string;
  model: string;
  category: 'RF & Microwaves' | 'Semiconductor' | 'Cleanroom' | 'Power Systems';
  specs: string;
  status: 'Operational' | 'In Calibration' | 'Reserved';
  clearanceLevel: 'Level 1 General' | 'Level 2 Cleanroom' | 'Level 3 Cryo/HV';
  hourlyRate: string;
  custodian: string;
  image: string;
  description: string;
}

export interface Publication {
  id: string;
  title: string;
  authors: string[];
  venue: string;
  year: number;
  category: 'VLSI' | 'RF Systems' | 'Power Semi' | 'Quantum';
  doi: string;
  citations: number;
  abstract: string;
  bibtex: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  specialty: string;
  office: string;
  email: string;
  citations: number;
  recentPaper: string;
}

export const RESEARCH_PILLARS: ResearchPillar[] = [
  {
    id: 'rf-thz',
    title: 'High-Frequency RF & Terahertz Communications',
    leadInvestigator: 'Prof. Alistair Vance, IEEE Fellow',
    abstract: 'Synthesizing sub-millimeter wave phased arrays, low-phase-noise monolithic microwave integrated circuits (MMICs), and cryogenic s-parameter characterization up to 110 GHz for next-generation orbital and 6G telecom links.',
    specs: [
      { label: 'Frequency Band', value: '24 GHz - 110 GHz' },
      { label: 'Noise Figure', value: '< 1.4 dB @ 60 GHz' },
      { label: 'Substrate Node', value: '130nm SiGe BiCMOS' },
      { label: 'Peak PAE', value: '44.8%' },
    ],
    highlight: 'Ultra-low jitter phased array transceiver fabricated on 130nm SiGe',
    image: '/assets/images/equipment_vector_analyzer_1791340267542.jpg',
    topics: ['Sub-THz Waveguides', 'Monolithic Phased Arrays', 'Cryogenic S-Parameters', 'Beamforming DSP'],
    schematicSummary: 'Differential balanced Gilbert-cell mixer coupled with 4-stage cascode low-noise preamplifier.',
  },
  {
    id: 'power-semi',
    title: 'Wide-Bandgap Power Electronics & Grid Topologies',
    leadInvestigator: 'Dr. Elena Rostova',
    abstract: 'Designing ultra-compact Gallium Nitride (GaN) and Silicon Carbide (SiC) resonant power converters with multi-megahertz switching speeds, achieving >99.4% peak conversion efficiency for grid-scale energy storage and aerospace propulsion.',
    specs: [
      { label: 'Switching Speed', value: '5.0 MHz PWM' },
      { label: 'Peak Efficiency', value: '99.42%' },
      { label: 'Power Density', value: '38 kW/L' },
      { label: 'Breakdown Voltage', value: '1.2 kV / 3.3 kV' },
    ],
    highlight: 'Bidirectional totem-pole PFC with zero-voltage soft switching',
    image: '/assets/images/hero_ee_lab_bench_1791340254877.jpg',
    topics: ['GaN HEMT Drivers', 'SiC Resonant Converters', 'Planar Magnetics', 'Parasitic Inductance Mitigation'],
    schematicSummary: 'Interleaved bridgeless totem-pole with active gate voltage clamp and ultra-fast dv/dt sensor.',
  },
  {
    id: 'vlsi-neuromorphic',
    title: 'Neuromorphic Silicon & In-Memory Computing',
    leadInvestigator: 'Prof. Marcus Chen',
    abstract: 'Realizing analog compute-in-memory (CIM) architectures, mixed-signal vector-matrix multipliers, and asynchronous spiking neural network cores fabricated at deep sub-micron process nodes for edge intelligence.',
    specs: [
      { label: 'Process Node', value: '28 nm FD-SOI' },
      { label: 'Compute Density', value: '41.2 TOPS/W' },
      { label: 'Crossbar Array', value: '1024 x 1024 ReRAM' },
      { label: 'Read Latency', value: '3.2 ns' },
    ],
    highlight: 'Non-volatile resistive crossbar with on-chip temperature drift cancellation',
    image: '/assets/images/research_silicon_wafer_1791340287221.jpg',
    topics: ['Resistive RAM (ReRAM)', 'Analog Crossbars', 'Spiking Neurons', 'Sub-Threshold CMOS'],
    schematicSummary: 'Current-mode differential sense amplifier with offset-compensated capacitor bank.',
  },
  {
    id: 'quantum-cryo',
    title: 'Cryogenic Electronics & Quantum Interconnects',
    leadInvestigator: 'Dr. Sarah Lindqvist',
    abstract: 'Developing 4-Kelvin CMOS control circuitry, superconducting parametric amplifiers, and ultra-high impedance readouts to interface with transmon qubit arrays without adding thermal load.',
    specs: [
      { label: 'Operating Temp', value: '4.2 K - 20 mK' },
      { label: 'Thermal Budget', value: '< 2.5 mW @ 4K' },
      { label: 'Fidelity Gain', value: '+26 dB SNR' },
      { label: 'Phase Noise', value: '-128 dBc/Hz' },
    ],
    highlight: 'Cryo-CMOS qubit controller dissipating under 1.8 milliwatts inside dilution refrigerator',
    image: '/assets/images/equipment_cryogenic_probe_1791340277507.jpg',
    topics: ['4K Cryo-CMOS', 'Parametric Readout', 'Qubit Multiplexing', 'Thermal Transport'],
    schematicSummary: 'Josephson parametric converter with cryogenic micro-strip circulator feedback.',
  },
];

export const EQUIPMENT_LIST: EquipmentItem[] = [
  {
    id: 'vna-67g',
    name: 'Keysight N5227B PNA Microwave Network Analyzer',
    model: '10 MHz - 67 GHz (Configurable 110 GHz extension)',
    category: 'RF & Microwaves',
    specs: '4-Port, 136 dB dynamic range at test port, calibrated with electronic calibration modules (ECal).',
    status: 'Operational',
    clearanceLevel: 'Level 1 General',
    hourlyRate: '$45/hr (Academic) · $120/hr (Industry)',
    custodian: 'Ing. David Vance',
    image: '/assets/images/equipment_vector_analyzer_1791340267542.jpg',
    description: 'Premier RF characterization station for S-parameters, non-linear X-parameters, and pulsed-RF noise measurements.',
  },
  {
    id: 'cryo-probe-1',
    name: 'Lake Shore CRX-VF Cryogenic Vacuum Probe Station',
    model: 'Variable Field Superconducting Magnet (up to 2.5T)',
    category: 'Semiconductor',
    specs: 'Base temperature 4.5 K to 475 K, 4 micro-manipulated triaxial arm probes, optical sapphire viewport.',
    status: 'Operational',
    clearanceLevel: 'Level 3 Cryo/HV',
    hourlyRate: '$65/hr (Academic) · $160/hr (Industry)',
    custodian: 'Dr. Sarah Lindqvist',
    image: '/assets/images/equipment_cryogenic_probe_1791340277507.jpg',
    description: 'Precision non-destructive wafer testing under ultra-high vacuum and cryogenic temperatures with magnetic field capability.',
  },
  {
    id: 'scope-16g',
    name: 'Teledyne LeCroy WaveMaster 8000HD Oscilloscope',
    model: '16 GHz Bandwidth, 12-Bit High Definition (8 Channels)',
    category: 'RF & Microwaves',
    specs: '320 GSa/s maximum sampling rate, 8 Gpts memory depth, full jitter decomposition suite.',
    status: 'Operational',
    clearanceLevel: 'Level 1 General',
    hourlyRate: '$35/hr (Academic) · $95/hr (Industry)',
    custodian: 'Ing. David Vance',
    image: '/assets/images/hero_ee_lab_bench_1791340254877.jpg',
    description: 'High-speed serial data compliance testing for PCIe 6.0, DDR5, and multi-lane differential signals.',
  },
  {
    id: 'wafer-stepper',
    name: 'ASML PAS 5500/100D i-Line Wafer Stepper',
    model: 'Sub-350nm Photolithography Cleanroom System',
    category: 'Cleanroom',
    specs: 'Class 100 cleanroom bay, 200mm/300mm wafer compatibility, alignment accuracy < 35 nm.',
    status: 'Operational',
    clearanceLevel: 'Level 2 Cleanroom',
    hourlyRate: '$80/hr (Academic) · $210/hr (Industry)',
    custodian: 'Ing. Mei-Ling Zhou',
    image: '/assets/images/research_silicon_wafer_1791340287221.jpg',
    description: 'Precision microelectronic fabrication stepper for prototyping custom analog and MEMS mask sets.',
  },
  {
    id: 'hv-tester',
    name: 'Tektronix GaN/SiC High-Voltage Curve Tracer',
    model: '3 kV Peak Voltage / 100 A Pulsed Current Source',
    category: 'Power Systems',
    specs: 'Sub-picoamp resolution leakage current detection, high-temperature hot-chuck up to 300°C.',
    status: 'In Calibration',
    clearanceLevel: 'Level 3 Cryo/HV',
    hourlyRate: '$40/hr (Academic) · $110/hr (Industry)',
    custodian: 'Dr. Elena Rostova',
    image: '/assets/images/hero_ee_lab_bench_1791340254877.jpg',
    description: 'Static and dynamic avalanche breakdown testing for wide-bandgap semiconductors and epitaxial layer validation.',
  },
  {
    id: 'wire-bonder',
    name: 'Kulicke & Soffa Automatic Wedge & Ball Wire Bonder',
    model: 'Sub-micron Rotary Ultrasonic Gold & Aluminum Head',
    category: 'Cleanroom',
    specs: 'Wire diameter 17.5 µm - 50 µm, deep-access capability for RF cavity packaging.',
    status: 'Operational',
    clearanceLevel: 'Level 2 Cleanroom',
    hourlyRate: '$30/hr (Academic) · $85/hr (Industry)',
    custodian: 'Ing. Mei-Ling Zhou',
    image: '/assets/images/research_silicon_wafer_1791340287221.jpg',
    description: 'Package assembly for custom silicon dies, hybrid microwave circuits, and ceramic carrier substrates.',
  },
];

export const PUBLICATIONS: Publication[] = [
  {
    id: 'pub-2026-1',
    title: 'A 94-GHz Phased-Array Transceiver in 28-nm FD-SOI with 41.6% Transmitter Efficiency and True Time-Delay Beamforming',
    authors: ['A. Vance', 'J. K. Thornton', 'E. Rostova', 'M. Chen'],
    venue: 'IEEE Journal of Solid-State Circuits (JSSC)',
    year: 2026,
    category: 'RF Systems',
    doi: '10.1109/JSSC.2026.3481920',
    citations: 18,
    abstract: 'This paper presents a fully-integrated 94-GHz 16-element transceiver front-end implementing analog true time-delay (TTD) cells alongside digital phase compensation. Fabricated in standard 28-nm FD-SOI, the architecture suppresses beam squint across a 12-GHz fractional bandwidth with total power consumption under 142 mW per channel.',
    bibtex: `@article{vance2026phased,
  title={A 94-GHz Phased-Array Transceiver in 28-nm FD-SOI with 41.6% Transmitter Efficiency},
  author={Vance, Alistair and Thornton, J. K. and Rostova, Elena and Chen, Marcus},
  journal={IEEE Journal of Solid-State Circuits},
  year={2026},
  volume={61},
  number={4},
  pages={1042--1056}
}`,
  },
  {
    id: 'pub-2025-2',
    title: 'Zero-Voltage-Switched GaN Totem-Pole Inverter Operating at 5 MHz with Adaptive Slew-Rate Gate Drivers',
    authors: ['E. Rostova', 'D. Vance', 'S. Lindqvist'],
    venue: 'IEEE Transactions on Power Electronics (TPEL)',
    year: 2025,
    category: 'Power Semi',
    doi: '10.1109/TPEL.2025.3394012',
    citations: 46,
    abstract: 'We report a bidirectional 3.3-kW totem-pole PFC inverter utilizing enhancement-mode GaN transistors driven by active current-source gate drivers. By synchronizing body-diode conduction periods with dynamic resonance tracking, switching losses are curtailed by 68% relative to conventional hard-switched architectures.',
    bibtex: `@article{rostova2025totem,
  title={Zero-Voltage-Switched GaN Totem-Pole Inverter Operating at 5 MHz with Adaptive Slew-Rate Gate Drivers},
  author={Rostova, Elena and Vance, David and Lindqvist, Sarah},
  journal={IEEE Transactions on Power Electronics},
  year={2025},
  volume={40},
  number={8},
  pages={9411--9423}
}`,
  },
  {
    id: 'pub-2025-1',
    title: 'Analog Resistive Compute-in-Memory Crossbars with In-Situ Thermal Drift Nullification in 28-nm CMOS',
    authors: ['M. Chen', 'T. Hashimoto', 'A. Vance'],
    venue: 'IEEE International Solid-State Circuits Conference (ISSCC)',
    year: 2025,
    category: 'VLSI',
    doi: '10.1109/ISSCC.2025.2918401',
    citations: 62,
    abstract: 'Compute-in-memory arrays suffer severe precision degradation from conductive state drift. Here we demonstrate a differential capacitor-coupled sensing topology that suppresses thermal gradient fluctuations across a 1024x1024 array, reaching 41.2 TOPS/W at 8-bit integer inference accuracy.',
    bibtex: `@inproceedings{chen2025analog,
  title={Analog Resistive Compute-in-Memory Crossbars with In-Situ Thermal Drift Nullification},
  author={Chen, Marcus and Hashimoto, T. and Vance, Alistair},
  booktitle={IEEE International Solid-State Circuits Conference},
  year={2025},
  pages={210--212}
}`,
  },
  {
    id: 'pub-2024-3',
    title: 'Cryo-CMOS Parametric Readout Interface Operating at 4.2 Kelvin for Transmon Qubit State Estimation',
    authors: ['S. Lindqvist', 'H. Bergström', 'M. Chen'],
    venue: 'IEEE Transactions on Quantum Engineering',
    year: 2024,
    category: 'Quantum',
    doi: '10.1109/TQE.2024.3189901',
    citations: 54,
    abstract: 'Interface electronics within cryostats must balance ultra-low noise temperature against rigid milliwatt thermal dissipation limits. This work demonstrates a cascode HEMT preamplifier dissipating 1.8 mW at 4.2 K, achieving a noise figure equivalent to 3.8 photons at 6.4 GHz.',
    bibtex: `@article{lindqvist2024cryo,
  title={Cryo-CMOS Parametric Readout Interface Operating at 4.2 Kelvin for Transmon Qubit State Estimation},
  author={Lindqvist, Sarah and Bergstr{\"o}m, H. and Chen, Marcus},
  journal={IEEE Transactions on Quantum Engineering},
  year={2024},
  volume={5},
  pages={1--11}
}`,
  },
  {
    id: 'pub-2024-2',
    title: 'Monolithic Gallium Nitride Gate Driver with Integrated Galvanic Isolation and 200 V/ns Common-Mode Transient Immunity',
    authors: ['E. Rostova', 'A. Vance', 'D. Vance'],
    venue: 'IEEE Journal of Emerging and Selected Topics in Power Electronics',
    year: 2024,
    category: 'Power Semi',
    doi: '10.1109/JESTPE.2024.3112440',
    citations: 39,
    abstract: 'Fabricated on an integrated GaN-on-Si platform, this smart driver integrates on-chip differential capacitive isolation that withstands transients exceeding 200 V/ns without false triggering, enabling reliable ultra-fast bridge leg commutation.',
    bibtex: `@article{rostova2024driver,
  title={Monolithic Gallium Nitride Gate Driver with Integrated Galvanic Isolation},
  author={Rostova, Elena and Vance, Alistair and Vance, David},
  journal={IEEE Journal of Emerging and Selected Topics in Power Electronics},
  year={2024},
  volume={12},
  number={3},
  pages={2801--2812}
}`,
  },
];

export const TEAM_MEMBERS: TeamMember[] = [
  {
    id: 'team-1',
    name: 'Prof. Alistair Vance, Ph.D.',
    role: 'Principal Investigator & Lab Director',
    specialty: 'High-Frequency RF, Terahertz Integrated Circuits, MMIC Design',
    office: 'EE Research Quad · Room 418',
    email: 'a.vance@ee-laboratory.edu',
    citations: 4120,
    recentPaper: '94-GHz Phased-Array Transceiver in 28-nm FD-SOI (JSSC)',
  },
  {
    id: 'team-2',
    name: 'Dr. Elena Rostova',
    role: 'Associate Professor & Power Lead',
    specialty: 'Wide-Bandgap GaN/SiC Semiconductors, MHz Resonant Topologies',
    office: 'EE Research Quad · Room 412',
    email: 'e.rostova@ee-laboratory.edu',
    citations: 2890,
    recentPaper: '5-MHz Zero-Voltage GaN Inverter (TPEL)',
  },
  {
    id: 'team-3',
    name: 'Prof. Marcus Chen, Ph.D.',
    role: 'Professor of Computer Engineering',
    specialty: 'Neuromorphic VLSI, In-Memory Crossbars, Sub-Threshold CMOS',
    office: 'EE Research Quad · Room 424',
    email: 'm.chen@ee-laboratory.edu',
    citations: 3450,
    recentPaper: 'Resistive CIM Crossbars with Drift Nullification (ISSCC)',
  },
  {
    id: 'team-4',
    name: 'Dr. Sarah Lindqvist',
    role: 'Senior Research Scientist',
    specialty: 'Cryogenic Semiconductor Physics, Superconducting Qubit Readout',
    office: 'Cryogenics Sub-Basement · Bay C-04',
    email: 's.lindqvist@ee-laboratory.edu',
    citations: 1840,
    recentPaper: '4.2 K Parametric Readout Interface (TQE)',
  },
  {
    id: 'team-5',
    name: 'Ing. David Vance',
    role: 'Chief Testbench & RF Systems Engineer',
    specialty: 'VNA Calibration, High-Speed Signal Integrity, 110 GHz Probing',
    office: 'Instrumentation Lab · Station 02',
    email: 'd.vance@ee-laboratory.edu',
    citations: 720,
    recentPaper: 'Automated 110-GHz On-Wafer De-Embedding Methodologies',
  },
  {
    id: 'team-6',
    name: 'Ing. Mei-Ling Zhou',
    role: 'Cleanroom Fabrication Manager',
    specialty: 'Class 100 Microfabrication, Deep Reactive Ion Etching, Wire Bonding',
    office: 'Cleanroom Gowning Suite · Room 102',
    email: 'ml.zhou@ee-laboratory.edu',
    citations: 910,
    recentPaper: 'Sub-Micron Photolithography Optimization for MEMS Resonators',
  },
];

export const LAB_FAQS = [
  {
    q: 'What training is required before operating laboratory instruments independently?',
    a: 'All researchers and visiting engineers must complete the general Environmental Health & Safety (EHS) orientation plus Level 1 Electrical Safety certification. Class 100 Cleanroom access requires Level 2 gowning and chemical handling qualification. Operating cryogenic vacuum stations or high-voltage testbenches (>50V / >10A) requires Level 3 supervised checkout with our designated custodian.',
  },
  {
    q: 'Can external industry partners or non-affiliated academic researchers book equipment?',
    a: 'Yes. We provide scheduled access under university collaborative agreements and industry service frameworks. External reservations include standard calibration verification, probe consumables, and baseline technical consultation by our laboratory engineers.',
  },
  {
    q: 'How are probe tip calibrations maintained for the 67 GHz / 110 GHz VNA stations?',
    a: 'Our Keysight PNA stations are calibrated daily using impedance standard substrates (ISS) with Short-Open-Load-Thru (SOLT) and Line-Reflect-Match (LRM) de-embedding routines. Probe wear is monitored with optical microscopy after every 200 touchdowns.',
  },
  {
    q: 'Is remote automated data acquisition supported on the testbench instruments?',
    a: 'Yes. All primary oscilloscopes, network analyzers, and source measure units (SMUs) are interconnected via isolated Gigabit LAN and GPIB-over-VXI11. Automated test sequences can be triggered via Python SCPI scripts and our authenticated laboratory API.',
  },
];
