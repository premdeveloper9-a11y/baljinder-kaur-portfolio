import React, { useEffect, useMemo, useState } from "react";
import "./RadiologyCommandCenter.css";

const TOTAL_LEVELS = 5;

const modalities = [
  {
    id: 1,
    name: "X-RAY",
    icon: "🩻",
    subtitle: "SCAN DETECTION",
  },
  {
    id: 2,
    name: "CT",
    icon: "🧠",
    subtitle: "SLICE SEQUENCE",
  },
  {
    id: 3,
    name: "MRI",
    icon: "🧲",
    subtitle: "MEMORY SCAN",
  },
  {
    id: 4,
    name: "ULTRASOUND",
    icon: "〰️",
    subtitle: "ECHO PATTERN",
  },
  {
    id: 5,
    name: "PET-CT",
    icon: "☢️",
    subtitle: "TARGET SCAN",
  },
];

const initialStats = {
  xray: 0,
  ct: 0,
  mri: 0,
  ultrasound: 0,
  petct: 0,
};

const randomBetween = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

function RadiologyCommandCenter({ onClose }) {
  const [gameStarted, setGameStarted] = useState(false);
  const [gameFinished, setGameFinished] = useState(false);

  const [playerName, setPlayerName] = useState("");

  const [currentLevel, setCurrentLevel] = useState(1);
  const [score, setScore] = useState(0);
  const [combo, setCombo] = useState(0);
  const [bestCombo, setBestCombo] = useState(0);

  const [timeLeft, setTimeLeft] = useState(20);
  const [mistakes, setMistakes] = useState(0);
  const [totalClicks, setTotalClicks] = useState(0);

  const [stats, setStats] = useState(initialStats);

  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  const [xrayTarget, setXrayTarget] = useState(null);

  const [ctSequence, setCtSequence] = useState([]);
  const [ctAnswer, setCtAnswer] = useState([]);

  const [mriCards, setMriCards] = useState([]);
  const [mriSelected, setMriSelected] = useState([]);
  const [mriMatched, setMriMatched] = useState([]);

  const [ultrasoundPattern, setUltrasoundPattern] = useState([]);
  const [ultrasoundAnswer, setUltrasoundAnswer] = useState([]);

  const [petTarget, setPetTarget] = useState(null);
  const [petFound, setPetFound] = useState(false);

  const [levelStartTime, setLevelStartTime] = useState(Date.now());
  const [levelTimes, setLevelTimes] = useState([]);

  const [reportId] = useState(
    () =>
      `JXC-${Date.now().toString().slice(-6)}-${randomBetween(
        100,
        999
      )}`
  );

  const averageAccuracy = useMemo(() => {
    if (!totalClicks) return 0;

    const successfulActions = totalClicks - mistakes;

    return Math.max(
      0,
      Math.min(100, Math.round((successfulActions / totalClicks) * 100))
    );
  }, [totalClicks, mistakes]);

  const totalTime = useMemo(() => {
    return levelTimes.reduce((sum, value) => sum + value, 0);
  }, [levelTimes]);

  const performanceProfile = useMemo(() => {
    if (score >= 450) return "RADIOLOGY ACE";
    if (score >= 350) return "SCAN SPECIALIST";
    if (score >= 250) return "SHARP OBSERVER";
    if (score >= 150) return "STEADY OPERATOR";
    return "ROOKIE SCANNER";
  }, [score]);

  const showMessage = (text, type = "") => {
    setMessage(text);
    setMessageType(type);

    setTimeout(() => {
      setMessage("");
      setMessageType("");
    }, 900);
  };

  const resetGame = () => {
    setGameStarted(false);
    setGameFinished(false);

    setCurrentLevel(1);
    setScore(0);
    setCombo(0);
    setBestCombo(0);

    setTimeLeft(20);
    setMistakes(0);
    setTotalClicks(0);

    setStats(initialStats);

    setMessage("");
    setMessageType("");

    setXrayTarget(null);

    setCtSequence([]);
    setCtAnswer([]);

    setMriCards([]);
    setMriSelected([]);
    setMriMatched([]);

    setUltrasoundPattern([]);
    setUltrasoundAnswer([]);

    setPetTarget(null);
    setPetFound(false);

    setLevelTimes([]);
    setLevelStartTime(Date.now());
  };

  const startGame = () => {
    const cleanedName = playerName.trim();

    if (!cleanedName) {
      showMessage("ENTER PLAYER NAME", "error");
      return;
    }

    setPlayerName(cleanedName);
    setGameStarted(true);
    setGameFinished(false);

    setCurrentLevel(1);
    setScore(0);
    setCombo(0);
    setBestCombo(0);

    setTimeLeft(20);
    setMistakes(0);
    setTotalClicks(0);

    setStats(initialStats);
    setLevelTimes([]);
    setLevelStartTime(Date.now());

    showMessage("RADIOLOGY SHIFT STARTED", "success");
  };

  /*
   * ---------------------------------------------------------
   * LEVEL GENERATORS
   * ---------------------------------------------------------
   */

  const generateXrayLevel = () => {
    const target = randomBetween(1, 6);
    setXrayTarget(target);
    setTimeLeft(15);
    setLevelStartTime(Date.now());
  };

  const generateCTLevel = () => {
    const numbers = [1, 2, 3, 4, 5, 6];

    const shuffled = [...numbers].sort(() => Math.random() - 0.5);

    setCtSequence(shuffled);
    setCtAnswer([]);
    setTimeLeft(20);
    setLevelStartTime(Date.now());
  };

  const generateMRILevel = () => {
    const symbols = ["🦴", "🧠", "❤️", "🫁"];

    const cards = [
      { id: 1, symbol: symbols[0], matched: false },
      { id: 2, symbol: symbols[1], matched: false },
      { id: 3, symbol: symbols[2], matched: false },
      { id: 4, symbol: symbols[3], matched: false },
      { id: 5, symbol: symbols[0], matched: false },
      { id: 6, symbol: symbols[1], matched: false },
      { id: 7, symbol: symbols[2], matched: false },
      { id: 8, symbol: symbols[3], matched: false },
    ];

    const shuffled = cards.sort(() => Math.random() - 0.5);

    setMriCards(shuffled);
    setMriSelected([]);
    setMriMatched([]);
    setTimeLeft(25);
    setLevelStartTime(Date.now());
  };

  const generateUltrasoundLevel = () => {
    const pattern = Array.from({ length: 4 }, () =>
      randomBetween(1, 4)
    );

    setUltrasoundPattern(pattern);
    setUltrasoundAnswer([]);
    setTimeLeft(18);
    setLevelStartTime(Date.now());
  };

  const generatePETCTLevel = () => {
    const target = randomBetween(1, 9);

    setPetTarget(target);
    setPetFound(false);
    setTimeLeft(15);
    setLevelStartTime(Date.now());
  };

  /*
   * ---------------------------------------------------------
   * LEVEL START
   * ---------------------------------------------------------
   */

  useEffect(() => {
    if (!gameStarted || gameFinished) return;

    if (currentLevel === 1) {
      generateXrayLevel();
    }

    if (currentLevel === 2) {
      generateCTLevel();
    }

    if (currentLevel === 3) {
      generateMRILevel();
    }

    if (currentLevel === 4) {
      generateUltrasoundLevel();
    }

    if (currentLevel === 5) {
      generatePETCTLevel();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentLevel, gameStarted]);

  /*
   * ---------------------------------------------------------
   * TIMER
   * ---------------------------------------------------------
   */

  useEffect(() => {
    if (!gameStarted || gameFinished) return;

    if (timeLeft <= 0) {
      handleLevelTimeout();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((previous) => previous - 1);
    }, 1000);

    return () => clearInterval(timer);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timeLeft, gameStarted, gameFinished]);

  /*
   * ---------------------------------------------------------
   * LEVEL COMPLETION
   * ---------------------------------------------------------
   */

  const completeLevel = (earnedPoints, statKey) => {
    const elapsed = Math.max(
      1,
      Math.round((Date.now() - levelStartTime) / 1000)
    );

    setLevelTimes((previous) => [...previous, elapsed]);

    setScore((previous) => previous + earnedPoints);

    setCombo((previous) => {
      const nextCombo = previous + 1;

      setBestCombo((best) => Math.max(best, nextCombo));

      return nextCombo;
    });

    setStats((previous) => ({
      ...previous,
      [statKey]: Math.min(
        100,
        previous[statKey] + randomBetween(82, 98)
      ),
    }));

    showMessage(`LEVEL CLEAR +${earnedPoints}`, "success");

    setTimeout(() => {
      if (currentLevel >= TOTAL_LEVELS) {
        finishGame(earnedPoints);
      } else {
        setCurrentLevel((previous) => previous + 1);
      }
    }, 850);
  };

  const handleLevelTimeout = () => {
    setMistakes((previous) => previous + 1);
    setCombo(0);

    showMessage("TIME OUT", "error");

    if (currentLevel >= TOTAL_LEVELS) {
      finishGame(0);
      return;
    }

    setTimeout(() => {
      setCurrentLevel((previous) => previous + 1);
    }, 700);
  };

  /*
   * ---------------------------------------------------------
   * LEVEL 1 — X-RAY DETECTION
   * ---------------------------------------------------------
   */

  const handleXrayClick = (zone) => {
    if (!xrayTarget) return;

    setTotalClicks((previous) => previous + 1);

    if (zone === xrayTarget) {
      const bonus = timeLeft * 3 + 50;

      completeLevel(bonus, "xray");
    } else {
      setMistakes((previous) => previous + 1);
      setCombo(0);
      showMessage("WRONG SCAN", "error");
    }
  };

  /*
   * ---------------------------------------------------------
   * LEVEL 2 — CT SLICE SEQUENCE
   * ---------------------------------------------------------
   */

  const handleCTSlice = (number) => {
    if (ctAnswer.includes(number)) return;

    setTotalClicks((previous) => previous + 1);

    const expected = ctAnswer.length + 1;

    if (number === expected) {
      const updatedAnswer = [...ctAnswer, number];

      setCtAnswer(updatedAnswer);

      if (updatedAnswer.length === ctSequence.length) {
        const bonus = timeLeft * 2 + 70;

        completeLevel(bonus, "ct");
      } else {
        showMessage("CORRECT SLICE", "success");
      }
    } else {
      setMistakes((previous) => previous + 1);
      setCombo(0);
      showMessage("WRONG ORDER", "error");
    }
  };

  /*
   * ---------------------------------------------------------
   * LEVEL 3 — MRI MEMORY
   * ---------------------------------------------------------
   */

  const handleMRICard = (card) => {
    if (
      mriSelected.includes(card.id) ||
      mriMatched.includes(card.id) ||
      mriSelected.length >= 2
    ) {
      return;
    }

    setTotalClicks((previous) => previous + 1);

    const selected = [...mriSelected, card.id];

    setMriSelected(selected);

    if (selected.length === 2) {
      const firstCard = mriCards.find(
        (item) => item.id === selected[0]
      );

      const secondCard = mriCards.find(
        (item) => item.id === selected[1]
      );

      if (
        firstCard &&
        secondCard &&
        firstCard.symbol === secondCard.symbol
      ) {
        setTimeout(() => {
          const newMatched = [
            ...mriMatched,
            firstCard.id,
            secondCard.id,
          ];

          setMriMatched(newMatched);
          setMriSelected([]);

          showMessage("MATCH FOUND", "success");

          if (newMatched.length === mriCards.length) {
            const bonus = timeLeft * 2 + 90;

            completeLevel(bonus, "mri");
          }
        }, 350);
      } else {
        setMistakes((previous) => previous + 1);
        setCombo(0);

        setTimeout(() => {
          setMriSelected([]);
        }, 500);

        showMessage("NO MATCH", "error");
      }
    }
  };

  /*
   * ---------------------------------------------------------
   * LEVEL 4 — ULTRASOUND PATTERN
   * ---------------------------------------------------------
   */

  const handleUltrasoundValue = (value) => {
    const position = ultrasoundAnswer.length;

    setTotalClicks((previous) => previous + 1);

    if (value === ultrasoundPattern[position]) {
      const updatedAnswer = [...ultrasoundAnswer, value];

      setUltrasoundAnswer(updatedAnswer);

      if (updatedAnswer.length === ultrasoundPattern.length) {
        const bonus = timeLeft * 3 + 60;

        completeLevel(bonus, "ultrasound");
      } else {
        showMessage("ECHO MATCH", "success");
      }
    } else {
      setMistakes((previous) => previous + 1);
      setCombo(0);
      showMessage("PATTERN LOST", "error");

      setUltrasoundAnswer([]);
    }
  };

  /*
   * ---------------------------------------------------------
   * LEVEL 5 — PET-CT TARGET
   * ---------------------------------------------------------
   */

  const handlePETTarget = (target) => {
    if (petFound) return;

    setTotalClicks((previous) => previous + 1);

    if (target === petTarget) {
      setPetFound(true);

      const bonus = timeLeft * 4 + 100;

      completeLevel(bonus, "petct");
    } else {
      setMistakes((previous) => previous + 1);
      setCombo(0);

      showMessage("WRONG TARGET", "error");
    }
  };

  /*
   * ---------------------------------------------------------
   * FINISH GAME
   * ---------------------------------------------------------
   */

  const finishGame = (lastPoints = 0) => {
    setGameFinished(true);
    setGameStarted(false);

    setCombo(0);

    setScore((previous) => previous + lastPoints);

    showMessage("SHIFT COMPLETED", "success");
  };

  /*
   * ---------------------------------------------------------
   * PRINT REPORT
   * ---------------------------------------------------------
   */

  const printReport = () => {
    window.print();
  };

  /*
   * ---------------------------------------------------------
   * STAT HELPERS
   * ---------------------------------------------------------
   */

  const getStatValue = (key) => {
    const value = stats[key];

    if (!value) return 0;

    return Math.min(100, value);
  };

  /*
   * ---------------------------------------------------------
   * START SCREEN
   * ---------------------------------------------------------
   */

  if (!gameStarted && !gameFinished) {
    return (
      <div className="radiologyOverlay">
        <div className="radiologyCommandCenter">
          <button
            className="radiologyCloseBtn"
            onClick={onClose}
            type="button"
            aria-label="Close Radiology Command Center"
          >
            ×
          </button>

          <div className="commandScanline"></div>

          <div className="commandHeader">
            <div className="commandLogo">
              <span className="commandLogoIcon">🩻</span>

              <div>
                <strong>JANTA X-RAY CLINIC</strong>
                <span>RADIOLOGY DEPARTMENT</span>
              </div>
            </div>

            <div className="commandStatus">
              <span className="statusPulse"></span>
              SYSTEM ONLINE
            </div>
          </div>

          <div className="commandHero">
            <span className="commandEyebrow">
              RADIOLOGY COMMAND CENTER
            </span>

            <h1>
              NIGHT
              <span>SHIFT</span>
            </h1>

            <p>
              Test your scan detection, memory, sequence and
              reaction skills across five radiology challenges.
            </p>
          </div>

          <div className="modalityGrid">
            {modalities.map((modality) => (
              <div className="modalityCard" key={modality.id}>
                <span className="modalityIcon">{modality.icon}</span>

                <div>
                  <strong>{modality.name}</strong>
                  <small>{modality.subtitle}</small>
                </div>

                <span className="modalityNumber">
                  0{modality.id}
                </span>
              </div>
            ))}
          </div>

          <div className="startPanel">
            <div className="playerInputWrap">
              <span>OPERATOR ID</span>

              <input
                type="text"
                value={playerName}
                maxLength={24}
                placeholder="ENTER YOUR NAME"
                onChange={(event) =>
                  setPlayerName(event.target.value)
                }
                onKeyDown={(event) => {
                  if (event.key === "Enter") {
                    startGame();
                  }
                }}
              />
            </div>

            <button
              className="startShiftBtn"
              type="button"
              onClick={startGame}
            >
              <span>START RADIOLOGY SHIFT</span>
              <strong>→</strong>
            </button>
          </div>

          <div className="commandFooter">
            <span>5 LEVELS</span>
            <span>•</span>
            <span>ARCADE MODE</span>
            <span>•</span>
            <span>PRINTABLE REPORT</span>
          </div>
        </div>
      </div>
    );
  }

  /*
   * ---------------------------------------------------------
   * FINAL REPORT
   * ---------------------------------------------------------
   */

  if (gameFinished) {
    return (
      <div className="radiologyOverlay reportOverlay">
        <div className="radiologyReport">
          <button
            className="radiologyCloseBtn reportCloseBtn"
            onClick={onClose}
            type="button"
            aria-label="Close report"
          >
            ×
          </button>

          <div className="printReportArea">
            <div className="reportHeader">
              <div>
                <span className="reportSmallTitle">
                  JANTA X-RAY CLINIC
                </span>

                <h1>RADIOLOGY SHIFT REPORT</h1>

                <p>
                  RADIOLOGY COMMAND CENTER · GAME PERFORMANCE
                  REPORT
                </p>
              </div>

              <div className="reportScanIcon">🩻</div>
            </div>

            <div className="reportMeta">
              <div>
                <span>OPERATOR</span>
                <strong>{playerName}</strong>
              </div>

              <div>
                <span>REPORT ID</span>
                <strong>{reportId}</strong>
              </div>

              <div>
                <span>DATE</span>
                <strong>
                  {new Date().toLocaleDateString("en-IN")}
                </strong>
              </div>
            </div>

            <div className="reportScoreBox">
              <span>FINAL SCORE</span>

              <strong>{score}</strong>

              <small>/ 500+</small>

              <div className="reportProfile">
                {performanceProfile}
              </div>
            </div>

            <div className="reportStatsGrid">
              <div className="reportStat">
                <span>🩻 X-RAY</span>
                <strong>{getStatValue("xray")}%</strong>
                <div>
                  <i
                    style={{
                      width: `${getStatValue("xray")}%`,
                    }}
                  ></i>
                </div>
              </div>

              <div className="reportStat">
                <span>🧠 CT</span>
                <strong>{getStatValue("ct")}%</strong>
                <div>
                  <i
                    style={{
                      width: `${getStatValue("ct")}%`,
                    }}
                  ></i>
                </div>
              </div>

              <div className="reportStat">
                <span>🧲 MRI</span>
                <strong>{getStatValue("mri")}%</strong>
                <div>
                  <i
                    style={{
                      width: `${getStatValue("mri")}%`,
                    }}
                  ></i>
                </div>
              </div>

              <div className="reportStat">
                <span>〰️ ULTRASOUND</span>
                <strong>
                  {getStatValue("ultrasound")}%
                </strong>
                <div>
                  <i
                    style={{
                      width: `${getStatValue("ultrasound")}%`,
                    }}
                  ></i>
                </div>
              </div>

              <div className="reportStat">
                <span>☢️ PET-CT</span>
                <strong>{getStatValue("petct")}%</strong>
                <div>
                  <i
                    style={{
                      width: `${getStatValue("petct")}%`,
                    }}
                  ></i>
                </div>
              </div>

              <div className="reportStat">
                <span>🎯 ACCURACY</span>
                <strong>{averageAccuracy}%</strong>
                <div>
                  <i
                    style={{
                      width: `${averageAccuracy}%`,
                    }}
                  ></i>
                </div>
              </div>
            </div>

            <div className="reportSummary">
              <div>
                <span>BEST COMBO</span>
                <strong>x{bestCombo}</strong>
              </div>

              <div>
                <span>MISTAKES</span>
                <strong>{mistakes}</strong>
              </div>

              <div>
                <span>SHIFT TIME</span>
                <strong>
                  {Math.floor(totalTime / 60)
                    .toString()
                    .padStart(2, "0")}
                  :
                  {(totalTime % 60)
                    .toString()
                    .padStart(2, "0")}
                </strong>
              </div>
            </div>

            <div className="reportMessage">
              <strong>{performanceProfile}</strong>

              <p>
                Radiology Command Center shift completed.
                Your performance reflects gameplay skills in
                the simulated challenges.
              </p>
            </div>

            <div className="reportDisclaimer">
              Entertainment & educational game only. This
              result is not a medical diagnosis or clinical
              assessment.
            </div>
          </div>

          <div className="reportActions noPrint">
            <button
              className="printReportBtn"
              type="button"
              onClick={printReport}
            >
              🖨 PRINT REPORT
            </button>

            <button
              className="playAgainBtn"
              type="button"
              onClick={resetGame}
            >
              ↻ PLAY AGAIN
            </button>

            <button
              className="exitReportBtn"
              type="button"
              onClick={onClose}
            >
              EXIT
            </button>
          </div>
        </div>
      </div>
    );
  }

  /*
   * ---------------------------------------------------------
   * ACTIVE GAME
   * ---------------------------------------------------------
   */

  return (
    <div className="radiologyOverlay">
      <div className="radiologyGame">
        <div className="commandScanline"></div>

        <header className="gameTopBar">
          <div className="gameBrand">
            <span>🩻</span>

            <div>
              <strong>JANTA X-RAY CLINIC</strong>
              <small>RADIOLOGY COMMAND CENTER</small>
            </div>
          </div>

          <div className="gameLevel">
            LEVEL {currentLevel}
            <span>/ {TOTAL_LEVELS}</span>
          </div>

          <div className="gameStats">
            <div>
              <small>SCORE</small>
              <strong>{score}</strong>
            </div>

            <div>
              <small>COMBO</small>
              <strong>x{combo}</strong>
            </div>

            <div className="gameTimer">
              <small>TIME</small>
              <strong>
                {timeLeft.toString().padStart(2, "0")}
              </strong>
            </div>
          </div>
        </header>

        <div className="gameProgress">
          <span
            style={{
              width: `${(currentLevel / TOTAL_LEVELS) * 100}%`,
            }}
          ></span>
        </div>

        <main className="gameContent">
          {currentLevel === 1 && (
            <section className="gameLevelPanel xrayLevel">
              <div className="levelHeading">
                <span>LEVEL 01</span>

                <h2>X-RAY DETECTION</h2>

                <p>
                  Locate the highlighted scan target before
                  the timer reaches zero.
                </p>
              </div>

              <div className="xrayScanner">
                <div className="scanFrame">
                  <div className="scanGrid"></div>

                  <div className="xrayBody">
                    <div className="xrayHead"></div>

                    <div className="xraySpine"></div>

                    <div className="xrayRib rib1"></div>
                    <div className="xrayRib rib2"></div>
                    <div className="xrayRib rib3"></div>
                    <div className="xrayRib rib4"></div>
                    <div className="xrayRib rib5"></div>

                    <div className="xrayLung left"></div>
                    <div className="xrayLung right"></div>

                    <button
                      className="xrayTarget zone1"
                      onClick={() => handleXrayClick(1)}
                      type="button"
                      aria-label="X-ray zone 1"
                    >
                      <span>01</span>
                    </button>

                    <button
                      className="xrayTarget zone2"
                      onClick={() => handleXrayClick(2)}
                      type="button"
                      aria-label="X-ray zone 2"
                    >
                      <span>02</span>
                    </button>

                    <button
                      className="xrayTarget zone3"
                      onClick={() => handleXrayClick(3)}
                      type="button"
                      aria-label="X-ray zone 3"
                    >
                      <span>03</span>
                    </button>

                    <button
                      className="xrayTarget zone4"
                      onClick={() => handleXrayClick(4)}
                      type="button"
                      aria-label="X-ray zone 4"
                    >
                      <span>04</span>
                    </button>

                    <button
                      className="xrayTarget zone5"
                      onClick={() => handleXrayClick(5)}
                      type="button"
                      aria-label="X-ray zone 5"
                    >
                      <span>05</span>
                    </button>

                    <button
                      className="xrayTarget zone6"
                      onClick={() => handleXrayClick(6)}
                      type="button"
                      aria-label="X-ray zone 6"
                    >
                      <span>06</span>
                    </button>
                  </div>

                  <div className="scanLine"></div>
                </div>

                <div className="xrayInstruction">
                  <span>SCAN TARGET</span>

                  <strong>
                    ZONE {xrayTarget || "--"}
                  </strong>
                </div>
              </div>
            </section>
          )}

          {currentLevel === 2 && (
            <section className="gameLevelPanel ctLevel">
              <div className="levelHeading">
                <span>LEVEL 02</span>

                <h2>CT SLICE SEQUENCE</h2>

                <p>
                  Reconstruct the scan by selecting slices in
                  the correct numerical order.
                </p>
              </div>

              <div className="ctSequenceBoard">
                {ctSequence.map((number) => {
                  const selected = ctAnswer.includes(number);

                  return (
                    <button
                      key={number}
                      className={`ctSlice ${
                        selected ? "selected" : ""
                      }`}
                      type="button"
                      disabled={selected}
                      onClick={() => handleCTSlice(number)}
                    >
                      <span className="sliceRing"></span>

                      <strong>{number}</strong>

                      <small>
                        SLICE
                        <br />
                        0{number}
                      </small>
                    </button>
                  );
                })}
              </div>

              <div className="ctSequenceStatus">
                <span>RECONSTRUCTION</span>

                <strong>
                  {ctAnswer.length} / {ctSequence.length}
                </strong>
              </div>
            </section>
          )}

          {currentLevel === 3 && (
            <section className="gameLevelPanel mriLevel">
              <div className="levelHeading">
                <span>LEVEL 03</span>

                <h2>MRI MEMORY SCAN</h2>

                <p>
                  Find matching anatomical scan symbols.
                  Complete all pairs to clear the level.
                </p>
              </div>

              <div className="mriMemoryGrid">
                {mriCards.map((card) => {
                  const selected = mriSelected.includes(card.id);
                  const matched = mriMatched.includes(card.id);

                  return (
                    <button
                      key={card.id}
                      type="button"
                      className={`mriCard ${
                        selected ? "selected" : ""
                      } ${matched ? "matched" : ""}`}
                      onClick={() => handleMRICard(card)}
                      disabled={matched}
                    >
                      <span className="mriCardBack">
                        {selected || matched
                          ? card.symbol
                          : "✦"}
                      </span>

                      <small>MR-{card.id}</small>
                    </button>
                  );
                })}
              </div>

              <div className="mriStatus">
                MATCHED {mriMatched.length / 2} /{" "}
                {mriCards.length / 2}
              </div>
            </section>
          )}

          {currentLevel === 4 && (
            <section className="gameLevelPanel ultrasoundLevel">
              <div className="levelHeading">
                <span>LEVEL 04</span>

                <h2>ULTRASOUND ECHO</h2>

                <p>
                  Reproduce the echo pattern by selecting the
                  correct signal sequence.
                </p>
              </div>

              <div className="ultrasoundMonitor">
                <div className="ultrasoundGrid"></div>

                <div className="ultrasoundWave">
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                </div>

                <div className="ultrasoundLabels">
                  <span>GAIN</span>
                  <span>DEPTH</span>
                  <span>FREQ</span>
                  <span>MODE B</span>
                </div>
              </div>

              <div className="ultrasoundPattern">
                <span>RECREATE SIGNAL</span>

                <div className="patternPreview">
                  {ultrasoundPattern.map((value, index) => (
                    <i
                      key={`${value}-${index}`}
                      className={
                        index < ultrasoundAnswer.length
                          ? "filled"
                          : ""
                      }
                    >
                      {index < ultrasoundAnswer.length
                        ? value
                        : "?"}
                    </i>
                  ))}
                </div>

                <div className="patternButtons">
                  {[1, 2, 3, 4].map((value) => (
                    <button
                      key={value}
                      type="button"
                      onClick={() =>
                        handleUltrasoundValue(value)
                      }
                    >
                      {value}
                    </button>
                  ))}
                </div>
              </div>
            </section>
          )}

          {currentLevel === 5 && (
            <section className="gameLevelPanel petctLevel">
              <div className="levelHeading">
                <span>LEVEL 05</span>

                <h2>PET-CT TARGET</h2>

                <p>
                  Locate the highlighted metabolic target
                  inside the scan field.
                </p>
              </div>

              <div className="petScanner">
                <div className="petGrid"></div>

                {Array.from({ length: 9 }).map((_, index) => {
                  const zone = index + 1;

                  return (
                    <button
                      key={zone}
                      type="button"
                      className={`petZone petZone${zone} ${
                        petFound && petTarget === zone
                          ? "found"
                          : ""
                      }`}
                      onClick={() => handlePETTarget(zone)}
                      aria-label={`PET-CT zone ${zone}`}
                    >
                      <span></span>
                      <small>{zone}</small>
                    </button>
                  );
                })}

                <div className="petScanLine"></div>
              </div>

              <div className="petInstruction">
                <span>TARGET SIGNAL</span>

                <strong>
                  LOCATE THE ACTIVE REGION
                </strong>
              </div>
            </section>
          )}
        </main>

        <footer className="gameBottomBar">
          <div>
            OPERATOR:
            <strong>{playerName}</strong>
          </div>

          <div className="gameMessage">
            {message && (
              <span className={messageType}>
                {message}
              </span>
            )}
          </div>

          <div>
            SYSTEM:
            <strong className="onlineText">ONLINE</strong>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default RadiologyCommandCenter;