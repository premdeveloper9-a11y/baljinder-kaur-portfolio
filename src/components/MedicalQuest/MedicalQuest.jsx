import React, { useEffect, useMemo, useState } from "react";
import "./MedicalQuest.css";

/* =========================================================
   MEDICAL QUEST
   SEQUENCE-BASED CAMPAIGN
========================================================= */

const STORAGE_KEY = "medicalQuestProgress_v2";

/* =========================================================
   DEPARTMENTS
========================================================= */

const DEPARTMENTS = [
  {
    id: "radiology",
    name: "RADIOLOGY",
    icon: "🩻",
    description: "Master X-Ray, CT and diagnostic imaging.",
    color: "#7ad7ea",
  },
  {
    id: "urology",
    name: "UROLOGY",
    icon: "🫘",
    description: "Explore the urinary system and its disorders.",
    color: "#7ad7ea",
  },
  {
    id: "dermatology",
    name: "DERMATOLOGY",
    icon: "🧴",
    description: "Understand the skin and its protective systems.",
    color: "#d59cff",
  },
  {
    id: "cardiology",
    name: "CARDIOLOGY",
    icon: "❤️",
    description: "Learn the heart and cardiovascular system.",
    color: "#ff8297",
  },
  {
    id: "neurology",
    name: "NEUROLOGY",
    icon: "🧠",
    description: "Explore the brain and nervous system.",
    color: "#b58cff",
  },
  {
    id: "orthopedics",
    name: "ORTHOPEDICS",
    icon: "🦴",
    description: "Study bones, joints and movement.",
    color: "#d8e7ee",
  },
];

/* =========================================================
   RADIOLOGY
========================================================= */

const RADIOLOGY_MISSIONS = [
  {
    id: "R01",
    department: "radiology",
    number: 1,
    title: "THE CHEST SCAN",
    difficulty: "EASY",
    question:
      "Which structure is primarily evaluated in a chest X-Ray?",
    options: [
      "Heart and lungs",
      "Kidneys",
      "Urinary bladder",
      "Femur",
    ],
    correct: 0,
    xp: 50,
    knowledge:
      "A chest X-Ray is commonly used to examine the lungs, heart, airways and surrounding structures.",
  },

  {
    id: "R02",
    department: "radiology",
    number: 2,
    title: "THE WHITE SHADOW",
    difficulty: "MEDIUM",
    question:
      "On a standard X-Ray image, which material generally appears most radiopaque?",
    options: [
      "Air",
      "Fat",
      "Soft tissue",
      "Bone",
    ],
    correct: 3,
    xp: 75,
    knowledge:
      "Bone absorbs more X-Rays than soft tissue and therefore generally appears brighter or more radiopaque.",
  },

  {
    id: "R03",
    department: "radiology",
    number: 3,
    title: "CT COMMAND",
    difficulty: "HARD",
    question:
      "What does CT primarily provide?",
    options: [
      "Cross-sectional images",
      "Only surface photographs",
      "Blood pressure readings",
      "Skin temperature",
    ],
    correct: 0,
    xp: 100,
    knowledge:
      "Computed Tomography combines multiple X-Ray measurements with computer processing to create detailed cross-sectional images.",
  },
];

/* =========================================================
   UROLOGY
========================================================= */

const UROLOGY_MISSIONS = [
  {
    id: "U01",
    department: "urology",
    number: 1,
    title: "KIDNEY CONTROL",
    difficulty: "EASY",
    question:
      "What is one major function of the kidneys?",
    options: [
      "Pump blood",
      "Filter waste from blood",
      "Digest food",
      "Produce bile",
    ],
    correct: 1,
    xp: 50,
    knowledge:
      "The kidneys filter blood, remove metabolic waste and help regulate fluid and electrolyte balance.",
  },

  {
    id: "U02",
    department: "urology",
    number: 2,
    title: "THE URETER PATH",
    difficulty: "MEDIUM",
    question:
      "What connects each kidney to the urinary bladder?",
    options: [
      "Urethra",
      "Ureter",
      "Aorta",
      "Trachea",
    ],
    correct: 1,
    xp: 75,
    knowledge:
      "The ureters are muscular tubes that transport urine from the kidneys to the urinary bladder.",
  },

  {
    id: "U03",
    department: "urology",
    number: 3,
    title: "BLADDER EXIT",
    difficulty: "HARD",
    question:
      "Which structure carries urine from the bladder to the outside?",
    options: [
      "Ureter",
      "Urethra",
      "Renal artery",
      "Esophagus",
    ],
    correct: 1,
    xp: 100,
    knowledge:
      "The urethra is the tube through which urine exits the urinary bladder.",
  },
];

/* =========================================================
   DERMATOLOGY
========================================================= */

const DERMATOLOGY_MISSIONS = [
  {
    id: "D01",
    department: "dermatology",
    number: 1,
    title: "SKIN BARRIER",
    difficulty: "EASY",
    question:
      "What is one major function of the skin?",
    options: [
      "Protect the body from the environment",
      "Pump blood",
      "Filter urine",
      "Produce insulin",
    ],
    correct: 0,
    xp: 50,
    knowledge:
      "The skin acts as a protective barrier and also contributes to temperature regulation, sensation and fluid balance.",
  },

  {
    id: "D02",
    department: "dermatology",
    number: 2,
    title: "SUN DEFENSE",
    difficulty: "MEDIUM",
    question:
      "Which pigment contributes to skin color and provides some protection from UV radiation?",
    options: [
      "Hemoglobin",
      "Melanin",
      "Keratin",
      "Collagen",
    ],
    correct: 1,
    xp: 75,
    knowledge:
      "Melanin is a pigment produced by specialized skin cells and contributes to skin, hair and eye color.",
  },

  {
    id: "D03",
    department: "dermatology",
    number: 3,
    title: "SKIN DETECTIVE",
    difficulty: "HARD",
    question:
      "Which structure contains hair follicles and many sweat glands?",
    options: [
      "Dermis",
      "Bone marrow",
      "Cartilage",
      "Pleura",
    ],
    correct: 0,
    xp: 100,
    knowledge:
      "The dermis lies beneath the epidermis and contains hair follicles, sweat glands, nerves and blood vessels.",
  },
];

/* =========================================================
   CARDIOLOGY
========================================================= */

const CARDIOLOGY_MISSIONS = [
  {
    id: "C01",
    department: "cardiology",
    number: 1,
    title: "HEART CONTROL",
    difficulty: "EASY",
    question:
      "Which organ pumps blood throughout the body?",
    options: [
      "Liver",
      "Heart",
      "Kidney",
      "Lung",
    ],
    correct: 1,
    xp: 50,
    knowledge:
      "The heart is a muscular organ that pumps blood through the pulmonary and systemic circulations.",
  },

  {
    id: "C02",
    department: "cardiology",
    number: 2,
    title: "THE RED ROUTE",
    difficulty: "MEDIUM",
    question:
      "Which vessels generally carry blood away from the heart?",
    options: [
      "Veins",
      "Arteries",
      "Capillaries only",
      "Lymph vessels",
    ],
    correct: 1,
    xp: 75,
    knowledge:
      "Arteries generally carry blood away from the heart, while veins generally return blood toward the heart.",
  },

  {
    id: "C03",
    department: "cardiology",
    number: 3,
    title: "HEART RHYTHM",
    difficulty: "HARD",
    question:
      "What does an ECG primarily record?",
    options: [
      "Electrical activity of the heart",
      "Bone density",
      "Lung volume only",
      "Kidney filtration",
    ],
    correct: 0,
    xp: 100,
    knowledge:
      "An electrocardiogram records the electrical activity of the heart over time.",
  },
];

/* =========================================================
   NEUROLOGY
========================================================= */

const NEUROLOGY_MISSIONS = [
  {
    id: "N01",
    department: "neurology",
    number: 1,
    title: "BRAIN COMMAND",
    difficulty: "EASY",
    question:
      "Which organ is the main control center of the nervous system?",
    options: [
      "Heart",
      "Brain",
      "Liver",
      "Kidney",
    ],
    correct: 1,
    xp: 50,
    knowledge:
      "The brain coordinates many functions including movement, sensation, thought and regulation of body systems.",
  },

  {
    id: "N02",
    department: "neurology",
    number: 2,
    title: "SIGNAL PATH",
    difficulty: "MEDIUM",
    question:
      "Which cells transmit electrical and chemical signals in the nervous system?",
    options: [
      "Neurons",
      "Platelets",
      "Osteocytes",
      "Adipocytes",
    ],
    correct: 0,
    xp: 75,
    knowledge:
      "Neurons are specialized cells that communicate information using electrical signals and chemical messengers.",
  },

  {
    id: "N03",
    department: "neurology",
    number: 3,
    title: "BRAIN SHIELD",
    difficulty: "HARD",
    question:
      "Which structure protects the brain inside the skull?",
    options: [
      "Cranium",
      "Femur",
      "Pelvis",
      "Scapula",
    ],
    correct: 0,
    xp: 100,
    knowledge:
      "The cranium is the part of the skull that surrounds and protects the brain.",
  },
];

/* =========================================================
   ORTHOPEDICS
========================================================= */

const ORTHOPEDICS_MISSIONS = [
  {
    id: "O01",
    department: "orthopedics",
    number: 1,
    title: "BONE FRAME",
    difficulty: "EASY",
    question:
      "What is one major function of the skeleton?",
    options: [
      "Support and protect the body",
      "Produce bile",
      "Filter urine",
      "Digest food",
    ],
    correct: 0,
    xp: 50,
    knowledge:
      "The skeleton provides structural support, protects organs and works with muscles to enable movement.",
  },

  {
    id: "O02",
    department: "orthopedics",
    number: 2,
    title: "JOINT CONTROL",
    difficulty: "MEDIUM",
    question:
      "What is the primary function of a joint?",
    options: [
      "Connect bones and allow movement",
      "Pump blood",
      "Filter waste",
      "Produce hormones only",
    ],
    correct: 0,
    xp: 75,
    knowledge:
      "Joints connect bones and, depending on their type, allow different degrees and directions of movement.",
  },

  {
    id: "O03",
    department: "orthopedics",
    number: 3,
    title: "THE LONG BONE",
    difficulty: "HARD",
    question:
      "Which is an example of a long bone?",
    options: [
      "Femur",
      "Patella",
      "Vertebra",
      "Skull bone",
    ],
    correct: 0,
    xp: 100,
    knowledge:
      "The femur is the longest and one of the strongest bones in the human body.",
  },
];

/* =========================================================
   COMPLETE CAMPAIGN
========================================================= */

const CAMPAIGN = [
  ...RADIOLOGY_MISSIONS,
  ...UROLOGY_MISSIONS,
  ...DERMATOLOGY_MISSIONS,
  ...CARDIOLOGY_MISSIONS,
  ...NEUROLOGY_MISSIONS,
  ...ORTHOPEDICS_MISSIONS,
];

/* =========================================================
   DEPARTMENT MISSION MAP
========================================================= */

const DEPARTMENT_MISSIONS = {
  radiology: RADIOLOGY_MISSIONS,
  urology: UROLOGY_MISSIONS,
  dermatology: DERMATOLOGY_MISSIONS,
  cardiology: CARDIOLOGY_MISSIONS,
  neurology: NEUROLOGY_MISSIONS,
  orthopedics: ORTHOPEDICS_MISSIONS,
};

/* =========================================================
   INITIAL PROGRESS
========================================================= */

const getInitialProgress = () => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);

    if (!saved) {
      return {
        xp: 0,
        level: 1,
        streak: 0,
        bestStreak: 0,
        lives: 3,
        completedMissions: [],
        currentMissionId: "R01",
      };
    }

    const parsed = JSON.parse(saved);

    const completed =
      Array.isArray(parsed.completedMissions)
        ? parsed.completedMissions
        : Object.keys(
            parsed.completedMissions || {}
          ).filter(
            (key) =>
              parsed.completedMissions[key]
          );

    return {
      xp: Number(parsed.xp) || 0,
      level: Number(parsed.level) || 1,
      streak: Number(parsed.streak) || 0,
      bestStreak:
        Number(parsed.bestStreak) || 0,
      lives:
        typeof parsed.lives === "number"
          ? parsed.lives
          : 3,
      completedMissions: completed,
      currentMissionId:
        parsed.currentMissionId ||
        "R01",
    };
  } catch (error) {
    console.error(
      "Medical Quest progress load error:",
      error
    );

    return {
      xp: 0,
      level: 1,
      streak: 0,
      bestStreak: 0,
      lives: 3,
      completedMissions: [],
      currentMissionId: "R01",
    };
  }
};

/* =========================================================
   COMPONENT
========================================================= */

function MedicalQuest({ onClose }) {
  const [screen, setScreen] = useState("intro");

  const [progress, setProgress] = useState(
    getInitialProgress
  );

  const [selectedAnswer, setSelectedAnswer] =
    useState(null);

  const [missionState, setMissionState] =
    useState("playing");

  const [showKnowledge, setShowKnowledge] =
    useState(false);

  const [showLevelUp, setShowLevelUp] =
    useState(false);

  const [showDepartmentComplete, setShowDepartmentComplete] =
    useState(false);

  /* =========================================================
     SAVE
  ========================================================= */

  useEffect(() => {
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(progress)
      );
    } catch (error) {
      console.error(
        "Medical Quest progress save error:",
        error
      );
    }
  }, [progress]);

  /* =========================================================
     CURRENT MISSION
  ========================================================= */

  const currentMission = useMemo(() => {
    return (
      CAMPAIGN.find(
        (mission) =>
          mission.id ===
          progress.currentMissionId
      ) || CAMPAIGN[0]
    );
  }, [progress.currentMissionId]);

  /* =========================================================
     CURRENT DEPARTMENT
  ========================================================= */

  const currentDepartment = useMemo(() => {
    return DEPARTMENTS.find(
      (department) =>
        department.id ===
        currentMission.department
    );
  }, [currentMission]);

  /* =========================================================
     CURRENT DEPARTMENT MISSIONS
  ========================================================= */

  const currentDepartmentMissions =
    DEPARTMENT_MISSIONS[
      currentMission.department
    ] || [];

  /* =========================================================
     CURRENT MISSION NUMBER
  ========================================================= */

  const currentMissionNumber =
    currentDepartmentMissions.findIndex(
      (mission) =>
        mission.id ===
        currentMission.id
    ) + 1;

  /* =========================================================
     GLOBAL CAMPAIGN POSITION
  ========================================================= */

  const globalMissionNumber =
    CAMPAIGN.findIndex(
      (mission) =>
        mission.id ===
        currentMission.id
    ) + 1;

  /* =========================================================
     XP
  ========================================================= */

  const currentLevelXP =
    progress.xp % 200;

  const xpPercentage = Math.min(
    (currentLevelXP / 200) * 100,
    100
  );

  /* =========================================================
     COMPLETED DEPARTMENTS
  ========================================================= */

  const isDepartmentCompleted = (
    departmentId
  ) => {
    const missions =
      DEPARTMENT_MISSIONS[
        departmentId
      ] || [];

    return missions.every((mission) =>
      progress.completedMissions.includes(
        mission.id
      )
    );
  };

  /* =========================================================
     DEPARTMENT UNLOCK
     
     A department unlocks ONLY after the
     previous department is completed.
  ========================================================= */

  const isDepartmentUnlocked = (
    departmentIndex
  ) => {
    if (departmentIndex === 0) {
      return true;
    }

    const previousDepartment =
      DEPARTMENTS[
        departmentIndex - 1
      ];

    return isDepartmentCompleted(
      previousDepartment.id
    );
  };

  /* =========================================================
     GET FIRST UNFINISHED MISSION
  ========================================================= */

  const getNextUnfinishedMission = () => {
    return (
      CAMPAIGN.find(
        (mission) =>
          !progress.completedMissions.includes(
            mission.id
          )
      ) || null
    );
  };

  /* =========================================================
     NEXT MISSION
  ========================================================= */

  const getNextMission = (
    currentMissionId
  ) => {
    const currentIndex =
      CAMPAIGN.findIndex(
        (mission) =>
          mission.id ===
          currentMissionId
      );

    if (
      currentIndex === -1 ||
      currentIndex >=
        CAMPAIGN.length - 1
    ) {
      return null;
    }

    return CAMPAIGN[
      currentIndex + 1
    ];
  };

  /* =========================================================
     RESET ANSWER STATE
  ========================================================= */

  const resetAnswerState = () => {
    setSelectedAnswer(null);
    setMissionState("playing");
  };

  /* =========================================================
     START GAME
  ========================================================= */

  const startGame = () => {
    const nextMission =
      getNextUnfinishedMission();

    if (nextMission) {
      setProgress((previous) => ({
        ...previous,
        currentMissionId:
          nextMission.id,
      }));
    }

    setScreen("map");
  };

  /* =========================================================
     CONTINUE QUEST
     
     This is the MAIN sequence button.
  ========================================================= */

  const continueQuest = () => {
    const nextMission =
      getNextUnfinishedMission();

    if (!nextMission) {
      setScreen("campaignComplete");
      return;
    }

    setProgress((previous) => ({
      ...previous,
      currentMissionId:
        nextMission.id,
      lives:
        previous.lives > 0
          ? previous.lives
          : 3,
    }));

    resetAnswerState();

    setScreen("mission");
  };

  /* =========================================================
     OPEN DEPARTMENT
     
     User cannot jump ahead.
  ========================================================= */

  const openDepartment = (
    department,
    departmentIndex
  ) => {
    const unlocked =
      isDepartmentUnlocked(
        departmentIndex
      );

    if (!unlocked) {
      return;
    }

    const missions =
      DEPARTMENT_MISSIONS[
        department.id
      ] || [];

    const firstUnfinished =
      missions.find(
        (mission) =>
          !progress.completedMissions.includes(
            mission.id
          )
      );

    if (!firstUnfinished) {
      return;
    }

    setProgress((previous) => ({
      ...previous,
      currentMissionId:
        firstUnfinished.id,
    }));

    resetAnswerState();

    setScreen("mission");
  };

  /* =========================================================
     SUBMIT ANSWER
  ========================================================= */

  const submitAnswer = () => {
    if (
      selectedAnswer === null ||
      missionState !== "playing"
    ) {
      return;
    }

    const correct =
      selectedAnswer ===
      currentMission.correct;

    if (correct) {
      const newXP =
        progress.xp +
        currentMission.xp;

      const newLevel =
        Math.floor(newXP / 200) + 1;

      const previousLevel =
        progress.level;

      const completed =
        progress.completedMissions.includes(
          currentMission.id
        )
          ? progress.completedMissions
          : [
              ...progress.completedMissions,
              currentMission.id,
            ];

      setProgress((previous) => ({
        ...previous,
        xp: newXP,
        level: newLevel,
        streak:
          previous.streak + 1,
        bestStreak: Math.max(
          previous.bestStreak,
          previous.streak + 1
        ),
        completedMissions:
          completed,
      }));

      if (newLevel > previousLevel) {
        setShowLevelUp(true);
      }

      setMissionState("correct");

      return;
    }

    /* =====================================================
       WRONG ANSWER

       Mission STILL gets completed after answer.
       Therefore the same question will NEVER return.
    ===================================================== */

    setProgress((previous) => ({
      ...previous,
      lives: Math.max(
        previous.lives - 1,
        0
      ),
      streak: 0,
      completedMissions:
        previous.completedMissions.includes(
          currentMission.id
        )
          ? previous.completedMissions
          : [
              ...previous.completedMissions,
              currentMission.id,
            ],
    }));

    setMissionState("wrong");
  };

  /* =========================================================
     CONTINUE AFTER ANSWER
  ========================================================= */

  const continueAfterAnswer = () => {
    setShowKnowledge(false);

    const nextMission =
      getNextMission(
        currentMission.id
      );

    /* =====================================================
       CURRENT DEPARTMENT COMPLETE
    ===================================================== */

    const departmentComplete =
      isDepartmentCompleted(
        currentMission.department
      );

    if (departmentComplete) {
      setShowDepartmentComplete(true);
      return;
    }

    /* =====================================================
       NEXT MISSION
    ===================================================== */

    if (!nextMission) {
      setScreen("campaignComplete");
      return;
    }

    setProgress((previous) => ({
      ...previous,
      currentMissionId:
        nextMission.id,
    }));

    resetAnswerState();

    setScreen("mission");
  };

  /* =========================================================
     AFTER DEPARTMENT COMPLETE
  ========================================================= */

  const continueAfterDepartment = () => {
    setShowDepartmentComplete(false);

    const nextMission =
      getNextUnfinishedMission();

    if (!nextMission) {
      setScreen("campaignComplete");
      return;
    }

    setProgress((previous) => ({
      ...previous,
      currentMissionId:
        nextMission.id,
    }));

    resetAnswerState();

    setScreen("map");
  };

  /* =========================================================
     BACK TO MAP
  ========================================================= */

  const backToMap = () => {
    resetAnswerState();
    setScreen("map");
  };

  /* =========================================================
     RESET EVERYTHING
  ========================================================= */

  const resetAllProgress = () => {
    const fresh = {
      xp: 0,
      level: 1,
      streak: 0,
      bestStreak: 0,
      lives: 3,
      completedMissions: [],
      currentMissionId: "R01",
    };

    localStorage.removeItem(
      STORAGE_KEY
    );

    setProgress(fresh);

    setShowKnowledge(false);
    setShowLevelUp(false);
    setShowDepartmentComplete(false);

    resetAnswerState();

    setScreen("intro");
  };

  /* =========================================================
     DEPARTMENT PROGRESS
  ========================================================= */

  const getDepartmentProgress = (
    departmentId
  ) => {
    const missions =
      DEPARTMENT_MISSIONS[
        departmentId
      ] || [];

    const completed =
      missions.filter((mission) =>
        progress.completedMissions.includes(
          mission.id
        )
      ).length;

    return {
      completed,
      total: missions.length,
      percentage:
        missions.length > 0
          ? (completed /
              missions.length) *
            100
          : 0,
    };
  };

  /* =========================================================
     RENDER
  ========================================================= */

  return (
    <div className="medicalQuestOverlay">
      <div className="medicalQuestScanlines"></div>

      {/* CLOSE */}

      <button
        type="button"
        className="medicalQuestClose cursor-target"
        onClick={onClose}
        aria-label="Close Medical Quest"
      >
        ✕
      </button>

      {/* =====================================================
          INTRO
      ===================================================== */}

      {screen === "intro" && (
        <section className="medicalQuestIntro">
          <div className="medicalQuestLogo">
            <span className="medicalQuestEyebrow">
              JANTA X-RAY CLINIC PRESENTS
            </span>

            <div className="medicalQuestNameBox">
              <span>MEDICAL</span>
              <strong>QUEST</strong>
            </div>

            <p>
              EXPLORE • PLAY • LEARN MEDICINE
            </p>
          </div>

          <button
            type="button"
            className="medicalQuestStartButton cursor-target"
            onClick={startGame}
          >
            START QUEST
            <span>→</span>
          </button>

          <small className="medicalQuestDisclaimer">
            Educational game only. Not a medical
            diagnostic tool.
          </small>
        </section>
      )}

      {/* =====================================================
          MAP
      ===================================================== */}

      {screen === "map" && (
        <section className="medicalQuestMap">
          <header className="medicalQuestHeader">
            <div>
              <span className="medicalQuestEyebrow">
                MEDICAL QUEST
              </span>

              <h1>
                DEPARTMENT MAP
              </h1>
            </div>

            <div className="medicalQuestStats">
              <div>
                <small>LEVEL</small>

                <strong>
                  {progress.level}
                </strong>
              </div>

              <div>
                <small>XP</small>

                <strong>
                  {progress.xp}
                </strong>
              </div>

              <div>
                <small>STREAK</small>

                <strong>
                  🔥 {progress.streak}
                </strong>
              </div>
            </div>
          </header>

          {/* XP */}

          <div className="medicalQuestMapFooter">
            <div className="medicalQuestXPBar">
              <div
                className="medicalQuestXPFill"
                style={{
                  width: `${xpPercentage}%`,
                }}
              ></div>
            </div>

            <span>
              {currentLevelXP} / 200 XP
            </span>
          </div>

          {/* =================================================
              MAIN CONTINUE BUTTON
          ================================================= */}

          <button
            type="button"
            className="medicalQuestStartButton medicalQuestContinueButton cursor-target"
            onClick={continueQuest}
          >
            CONTINUE QUEST
            <span>→</span>
          </button>

          {/* =================================================
              DEPARTMENT GRID
          ================================================= */}

          <div className="medicalQuestDepartmentGrid">
            {DEPARTMENTS.map(
              (
                department,
                departmentIndex
              ) => {
                const unlocked =
                  isDepartmentUnlocked(
                    departmentIndex
                  );

                const departmentProgress =
                  getDepartmentProgress(
                    department.id
                  );

                const completed =
                  departmentProgress.completed ===
                  departmentProgress.total;

                const isCurrent =
                  currentMission.department ===
                  department.id;

                return (
                  <button
                    type="button"
                    key={department.id}
                    className={`medicalQuestDepartmentCard ${
                      !unlocked
                        ? "locked"
                        : ""
                    } ${
                      completed
                        ? "completed"
                        : ""
                    } ${
                      isCurrent
                        ? "active"
                        : ""
                    } cursor-target`}
                    onClick={() =>
                      openDepartment(
                        department,
                        departmentIndex
                      )
                    }
                  >
                    <span className="medicalQuestDepartmentIcon">
                      {department.icon}
                    </span>

                    <div>
                      <h2>
                        {department.name}
                      </h2>

                      {!unlocked ? (
                        <p>
                          COMPLETE PREVIOUS
                          DEPARTMENT
                        </p>
                      ) : (
                        <>
                          <p>
                            {
                              department.description
                            }
                          </p>

                          <small>
                            {departmentProgress.completed}{" "}
                            /{" "}
                            {
                              departmentProgress.total
                            }{" "}
                            MISSIONS
                          </small>
                        </>
                      )}
                    </div>

                    <span className="medicalQuestDepartmentArrow">
                      {!unlocked
                        ? "🔒"
                        : completed
                        ? "✓"
                        : isCurrent
                        ? "→"
                        : "○"}
                    </span>
                  </button>
                );
              }
            )}
          </div>

          <button
            type="button"
            className="medicalQuestReset cursor-target"
            onClick={resetAllProgress}
          >
            RESET PROGRESS
          </button>
        </section>
      )}

      {/* =====================================================
          MISSION
      ===================================================== */}

      {screen === "mission" &&
        currentMission && (
          <section className="medicalQuestMissionScreen">
            <header className="medicalQuestMissionHeader">
              <button
                type="button"
                className="medicalQuestBackButton cursor-target"
                onClick={backToMap}
              >
                ← MAP
              </button>

              <div>
                <span className="medicalQuestEyebrow">
                  {
                    currentDepartment?.name
                  }
                </span>

                <h1>
                  {currentMission.title}
                </h1>
              </div>

              <div className="medicalQuestMissionStats">
                <div>
                  <small>
                    XP
                  </small>

                  <strong>
                    {progress.xp}
                  </strong>
                </div>

                <div>
                  <small>
                    LIVES
                  </small>

                  <strong>
                    {"❤️".repeat(
                      progress.lives
                    ) || "—"}
                  </strong>
                </div>

                <div>
                  <small>
                    STREAK
                  </small>

                  <strong>
                    🔥{" "}
                    {
                      progress.streak
                    }
                  </strong>
                </div>
              </div>
            </header>

            <div className="medicalQuestMissionProgress">
              <div>
                MISSION{" "}
                {
                  currentMissionNumber
                }{" "}
                /{" "}
                {
                  currentDepartmentMissions.length
                }
              </div>

              <div className="medicalQuestProgressTrack">
                <span
                  style={{
                    width: `${
                      (currentMissionNumber /
                        currentDepartmentMissions.length) *
                      100
                    }%`,
                  }}
                ></span>
              </div>
            </div>

            {/* =================================================
                RADIOLOGY VISUAL
            ================================================= */}

            {currentMission.department ===
              "radiology" && (
              <div className="radiologyMission">
                <div className="radiologyMissionTop">
                  <div className="radiologyScanBadge">
                    LIVE SCAN
                  </div>

                  <span className="missionDifficulty">
                    {
                      currentMission.difficulty
                    }
                  </span>
                </div>

                <div className="radiologyScanArea">
                  <div className="radiologyScanFrame">
                    <div className="radiologyScanGrid"></div>

                    <div className="radiologyScanBody">
                      <div className="scanHead"></div>
                      <div className="scanNeck"></div>
                      <div className="scanChest"></div>
                      <div className="scanLung left"></div>
                      <div className="scanLung right"></div>
                      <div className="scanHeart"></div>
                      <div className="scanSpine"></div>
                      <div className="scanAbdomen"></div>
                    </div>

                    <span className="scanCorner scanTL"></span>
                    <span className="scanCorner scanTR"></span>
                    <span className="scanCorner scanBL"></span>
                    <span className="scanCorner scanBR"></span>

                    <span className="scanLine"></span>
                  </div>

                  <div className="scanData">
                    <span>
                      SUBJECT: MEDICAL QUEST
                    </span>

                    <span>
                      MODE: LEARNING
                    </span>

                    <span>
                      SCAN: ACTIVE
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* =================================================
                UROLOGY VISUAL
            ================================================= */}

            {currentMission.department ===
              "urology" && (
              <div className="urologyMission">
                <div className="urologyMissionTop">
                  <span className="urologyPathStatus">
                    URINARY SYSTEM • ACTIVE
                  </span>

                  <span className="missionDifficulty">
                    {
                      currentMission.difficulty
                    }
                  </span>
                </div>

                <div className="urologyBody">
                  <div className="urologyAnatomy">
                    <div className="kidneyVisual leftKidney">
                      <span className="kidneyLabel">
                        LEFT KIDNEY
                      </span>
                    </div>

                    <div className="kidneyVisual rightKidney">
                      <span className="kidneyLabel">
                        RIGHT KIDNEY
                      </span>
                    </div>

                    <div className="ureterVisual leftUreter"></div>

                    <div className="ureterVisual rightUreter"></div>

                    <div className="bladderVisual">
                      <span className="bladderLabel">
                        BLADDER
                      </span>
                    </div>

                    <div className="urethraVisual">
                      <span className="urinaryLabel">
                        URETHRA
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* =================================================
                DERMATOLOGY VISUAL
            ================================================= */}

            {currentMission.department ===
              "dermatology" && (
              <div className="dermatologyMission">
                <div className="dermatologyMissionTop">
                  <span className="dermatologyBadge">
                    SKIN LAB • ACTIVE
                  </span>

                  <span className="missionDifficulty">
                    {
                      currentMission.difficulty
                    }
                  </span>
                </div>

                <div className="dermatologyBody">
                  <div className="skinScanVisual">
                    <div className="skinScanGrid"></div>

                    <div className="skinLayer skinEpidermis">
                      EPIDERMIS
                    </div>

                    <div className="skinLayer skinDermis">
                      DERMIS
                    </div>

                    <div className="skinLayer skinSubcutaneous">
                      SUBCUTANEOUS
                    </div>

                    <div className="skinHair">
                      <span></span>
                    </div>

                    <div className="skinPore skinPoreOne"></div>
                    <div className="skinPore skinPoreTwo"></div>
                    <div className="skinPore skinPoreThree"></div>
                  </div>
                </div>
              </div>
            )}

            {/* =================================================
                GENERIC VISUAL FOR FUTURE DEPARTMENTS
            ================================================= */}

            {[
              "cardiology",
              "neurology",
              "orthopedics",
            ].includes(
              currentMission.department
            ) && (
              <div className="medicalQuestGenericMission">
                <div className="medicalQuestGenericIcon">
                  {
                    currentDepartment?.icon
                  }
                </div>

                <span>
                  DEPARTMENT SIMULATION
                </span>
              </div>
            )}

            {/* =================================================
                QUESTION
            ================================================= */}

            <div className="medicalQuestQuestionBlock">
              <span>
                QUESTION{" "}
                {globalMissionNumber
                  .toString()
                  .padStart(2, "0")}
              </span>

              <h2>
                {currentMission.question}
              </h2>
            </div>

            {/* =================================================
                ANSWERS
            ================================================= */}

            <div className="medicalQuestUniversalAnswers">
              {currentMission.options.map(
                (
                  option,
                  index
                ) => {
                  const isSelected =
                    selectedAnswer ===
                    index;

                  const isCorrect =
                    missionState !==
                      "playing" &&
                    index ===
                      currentMission.correct;

                  const isWrong =
                    missionState ===
                      "wrong" &&
                    isSelected;

                  return (
                    <button
                      type="button"
                      key={option}
                      className={`medicalQuestUniversalAnswer ${
                        isSelected
                          ? "selected"
                          : ""
                      } ${
                        isCorrect
                          ? "correct"
                          : ""
                      } ${
                        isWrong
                          ? "wrong"
                          : ""
                      } cursor-target`}
                      onClick={() => {
                        if (
                          missionState ===
                          "playing"
                        ) {
                          setSelectedAnswer(
                            index
                          );
                        }
                      }}
                    >
                      <span>
                        0
                        {index + 1}
                      </span>

                      {option}
                    </button>
                  );
                }
              )}
            </div>

            {/* =================================================
                SUBMIT
            ================================================= */}

            {missionState ===
              "playing" && (
              <button
                type="button"
                className="medicalQuestSubmitButton cursor-target"
                onClick={
                  submitAnswer
                }
                disabled={
                  selectedAnswer ===
                  null
                }
              >
                SUBMIT ANSWER →
              </button>
            )}

            {/* =================================================
                RESULT
            ================================================= */}

            {missionState !==
              "playing" && (
              <div
                className={`medicalQuestMissionResult ${
                  missionState ===
                  "correct"
                    ? "success"
                    : "failure"
                }`}
              >
                <div className="missionResultIcon">
                  {missionState ===
                  "correct"
                    ? "✓"
                    : "×"}
                </div>

                <div>
                  <strong>
                    {missionState ===
                    "correct"
                      ? "MISSION COMPLETE"
                      : "ANSWER RECORDED"}
                  </strong>

                  <p>
                    {missionState ===
                    "correct"
                      ? `+${currentMission.xp} XP • STREAK ${progress.streak}`
                      : "Incorrect answer. The correct answer is highlighted. Mission recorded and the campaign continues."}
                  </p>
                </div>

                <button
                  type="button"
                  className="medicalQuestResultButton cursor-target"
                  onClick={() =>
                    setShowKnowledge(true)
                  }
                >
                  KNOWLEDGE →
                </button>
              </div>
            )}
          </section>
        )}

      {/* =====================================================
          KNOWLEDGE CARD
      ===================================================== */}

      {showKnowledge &&
        currentMission && (
          <div className="medicalQuestKnowledgeOverlay">
            <div className="knowledgeCard">
              <span className="medicalQuestEyebrow">
                KNOWLEDGE UNLOCKED
              </span>

              <div className="knowledgeIcon">
                🧠
              </div>

              <h2>
                {currentMission.title}
              </h2>

              <p>
                {currentMission.knowledge}
              </p>

              <button
                type="button"
                className="medicalQuestStartButton cursor-target"
                onClick={
                  continueAfterAnswer
                }
              >
                CONTINUE QUEST →
              </button>
            </div>
          </div>
        )}

      {/* =====================================================
          DEPARTMENT COMPLETE
      ===================================================== */}

      {showDepartmentComplete && (
        <div className="medicalQuestKnowledgeOverlay">
          <div className="knowledgeCard medicalQuestUnlockCard">
            <span className="medicalQuestEyebrow">
              DEPARTMENT COMPLETE
            </span>

            <div className="knowledgeIcon">
              ✓
            </div>

            <h2>
              {
                currentDepartment?.name
              }
            </h2>

            <p>
              All missions in this department
              are complete. The next medical
              department is now available.
            </p>

            <button
              type="button"
              className="medicalQuestStartButton cursor-target"
              onClick={
                continueAfterDepartment
              }
            >
              NEXT DEPARTMENT →
            </button>
          </div>
        </div>
      )}

      {/* =====================================================
          LEVEL UP
      ===================================================== */}

      {showLevelUp && (
        <div className="medicalQuestKnowledgeOverlay">
          <div className="knowledgeCard">
            <span className="medicalQuestEyebrow">
              SYSTEM UPDATE
            </span>

            <div className="knowledgeIcon">
              ⚡
            </div>

            <h2>
              LEVEL UP!
            </h2>

            <p>
              You reached Level{" "}
              {progress.level}.
              Keep completing missions to
              advance through Medical Quest.
            </p>

            <button
              type="button"
              className="medicalQuestStartButton cursor-target"
              onClick={() =>
                setShowLevelUp(false)
              }
            >
              CONTINUE →
            </button>
          </div>
        </div>
      )}

      {/* =====================================================
          CAMPAIGN COMPLETE
      ===================================================== */}

      {screen ===
        "campaignComplete" && (
        <section className="medicalQuestMissionScreen">
          <div className="medicalQuestMissionPreview">
            <span className="medicalQuestEyebrow">
              CAMPAIGN COMPLETE
            </span>

            <div className="missionResultIcon">
              ✓
            </div>

            <h1>
              MEDICAL QUEST MASTER
            </h1>

            <p>
              You completed the entire
              Medical Quest campaign.
              Every department mission has
              been completed.
            </p>

            <div className="missionResultStats">
              <div>
                <small>
                  XP
                </small>

                <strong>
                  {progress.xp}
                </strong>
              </div>

              <div>
                <small>
                  LEVEL
                </small>

                <strong>
                  {progress.level}
                </strong>
              </div>

              <div>
                <small>
                  MISSIONS
                </small>

                <strong>
                  {
                    progress
                      .completedMissions
                      .length
                  }
                </strong>
              </div>
            </div>

            <div className="missionResultActions">
              <button
                type="button"
                className="medicalQuestStartButton cursor-target"
                onClick={() =>
                  setScreen("map")
                }
              >
                VIEW MAP →
              </button>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}

export default MedicalQuest;