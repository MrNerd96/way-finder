/* Fixed instruction phrases in the three languages a patient here is most
   likely to read. Room and department names are NOT translated here — they
   come from whatever the surveyor typed, including the "also known as" aliases.

   NOTE: the Telugu and Hindi strings below are a starting draft. Have a native
   speaker read them out loud before this goes in front of patients. */
var I18N = (function () {
  var STR = {
    en: {
      tagline: 'Find your way',
      whereAreYou: 'Where are you standing now?',
      whereTo: 'Where do you want to go?',
      tapToChoose: 'Tap to choose',
      showWay: 'Show me the way',
      searchPlaceholder: 'Room number or department',
      pickStart: 'Your location',
      pickDest: 'Your destination',
      noMatch: 'Nothing found. Try a room number, or ask at the help desk.',
      nothingYet: 'No places added yet. Switch to Survey mode and add some.',
      step: 'Step',
      of: 'of',
      next: 'Next',
      back: 'Back',
      startOver: 'Start again',
      straight: 'Go straight',
      left: 'Turn LEFT',
      right: 'Turn RIGHT',
      slightLeft: 'Bear slightly LEFT',
      slightRight: 'Bear slightly RIGHT',
      sharpLeft: 'Turn sharp LEFT',
      sharpRight: 'Turn sharp RIGHT',
      around: 'Turn around',
      liftUp: 'Take the LIFT UP',
      liftDown: 'Take the LIFT DOWN',
      stairsUp: 'Take the STAIRS UP',
      stairsDown: 'Take the STAIRS DOWN',
      toFloor: 'to floor',
      startAt: 'Start here',
      faceToward: 'Stand facing {}',
      arrived: 'You have arrived',
      onLeft: 'It will be on your LEFT',
      onRight: 'It will be on your RIGHT',
      aheadOfYou: 'It is straight ahead of you',
      about: 'about',
      metres: 'm',
      steps: 'steps',
      untilYouReach: 'until you reach {}',
      atThe: 'at {}',
      totalWalk: 'Total walk',
      noRoute: 'No path yet between these two places. Connect them in Survey mode.',
      samePlace: 'You are already there.',
      floor: 'Floor',
      ground: 'Ground',
      uncalibrated: 'Distances are rough — set the scale in Survey mode.'
    },
    te: {
      tagline: 'దారి చూపే యాప్',
      whereAreYou: 'మీరు ఇప్పుడు ఎక్కడ ఉన్నారు?',
      whereTo: 'మీరు ఎక్కడికి వెళ్లాలి?',
      tapToChoose: 'ఎంచుకోవడానికి నొక్కండి',
      showWay: 'దారి చూపించు',
      searchPlaceholder: 'గది నంబరు లేదా విభాగం',
      pickStart: 'మీ స్థానం',
      pickDest: 'మీ గమ్యం',
      noMatch: 'ఏమీ దొరకలేదు. గది నంబరు ప్రయత్నించండి లేదా సహాయ కేంద్రంలో అడగండి.',
      nothingYet: 'ఇంకా ఏ ప్రదేశాలూ చేర్చలేదు.',
      step: 'అడుగు',
      of: '/',
      next: 'తదుపరి',
      back: 'వెనుకకు',
      startOver: 'మళ్లీ మొదలు',
      straight: 'నేరుగా వెళ్లండి',
      left: 'ఎడమవైపు తిరగండి',
      right: 'కుడివైపు తిరగండి',
      slightLeft: 'కొద్దిగా ఎడమవైపు',
      slightRight: 'కొద్దిగా కుడివైపు',
      sharpLeft: 'బాగా ఎడమవైపు తిరగండి',
      sharpRight: 'బాగా కుడివైపు తిరగండి',
      around: 'వెనక్కి తిరగండి',
      liftUp: 'లిఫ్ట్‌లో పైకి వెళ్లండి',
      liftDown: 'లిఫ్ట్‌లో కిందికి వెళ్లండి',
      stairsUp: 'మెట్లు ఎక్కి పైకి వెళ్లండి',
      stairsDown: 'మెట్ల మీద కిందికి దిగండి',
      toFloor: 'అంతస్తుకు',
      startAt: 'ఇక్కడ మొదలుపెట్టండి',
      faceToward: '{} వైపు తిరిగి నిలబడండి',
      arrived: 'మీరు చేరుకున్నారు',
      onLeft: 'అది మీ ఎడమవైపు ఉంటుంది',
      onRight: 'అది మీ కుడివైపు ఉంటుంది',
      aheadOfYou: 'అది మీ ముందు నేరుగా ఉంది',
      about: 'సుమారు',
      metres: 'మీటర్లు',
      steps: 'అడుగులు',
      untilYouReach: '{} వచ్చే వరకు',
      atThe: '{} దగ్గర',
      totalWalk: 'మొత్తం నడక',
      noRoute: 'ఈ రెండు ప్రదేశాల మధ్య దారి లేదు.',
      samePlace: 'మీరు అక్కడే ఉన్నారు.',
      floor: 'అంతస్తు',
      ground: 'గ్రౌండ్',
      uncalibrated: 'దూరాలు సుమారుగా ఉన్నాయి.'
    },
    hi: {
      tagline: 'रास्ता दिखाने वाला ऐप',
      whereAreYou: 'आप अभी कहाँ खड़े हैं?',
      whereTo: 'आपको कहाँ जाना है?',
      tapToChoose: 'चुनने के लिए दबाइए',
      showWay: 'रास्ता दिखाइए',
      searchPlaceholder: 'कमरा नंबर या विभाग',
      pickStart: 'आपकी जगह',
      pickDest: 'आपकी मंज़िल',
      noMatch: 'कुछ नहीं मिला. कमरा नंबर आज़माइए या हेल्प डेस्क पर पूछिए.',
      nothingYet: 'अभी कोई जगह नहीं जोड़ी गई है.',
      step: 'कदम',
      of: '/',
      next: 'आगे',
      back: 'पीछे',
      startOver: 'फिर से शुरू',
      straight: 'सीधे जाइए',
      left: 'बाएँ मुड़िए',
      right: 'दाएँ मुड़िए',
      slightLeft: 'थोड़ा बाएँ',
      slightRight: 'थोड़ा दाएँ',
      sharpLeft: 'तेज़ बाएँ मुड़िए',
      sharpRight: 'तेज़ दाएँ मुड़िए',
      around: 'पीछे मुड़िए',
      liftUp: 'लिफ्ट से ऊपर जाइए',
      liftDown: 'लिफ्ट से नीचे जाइए',
      stairsUp: 'सीढ़ी से ऊपर जाइए',
      stairsDown: 'सीढ़ी से नीचे जाइए',
      toFloor: 'मंज़िल पर',
      startAt: 'यहाँ से शुरू कीजिए',
      faceToward: '{} की ओर मुँह करके खड़े होइए',
      arrived: 'आप पहुँच गए',
      onLeft: 'यह आपके बाएँ होगा',
      onRight: 'यह आपके दाएँ होगा',
      aheadOfYou: 'यह आपके ठीक सामने है',
      about: 'लगभग',
      metres: 'मीटर',
      steps: 'कदम',
      untilYouReach: '{} तक',
      atThe: '{} के पास',
      totalWalk: 'कुल चलना',
      noRoute: 'इन दोनों जगहों के बीच रास्ता नहीं है.',
      samePlace: 'आप वहीं पर हैं.',
      floor: 'मंज़िल',
      ground: 'ग्राउंड',
      uncalibrated: 'दूरियाँ अनुमानित हैं.'
    }
  };

  var current = 'en';
  var SPEECH = { en: 'en-IN', te: 'te-IN', hi: 'hi-IN' };

  return {
    langs: ['en', 'te', 'hi'],
    get: function () { return current; },
    set: function (l) { if (STR[l]) current = l; },
    t: function (key) {
      var pack = STR[current] || STR.en;
      return pack[key] !== undefined ? pack[key] : (STR.en[key] || key);
    },
    speechLang: function () { return SPEECH[current] || 'en-IN'; },

    /* Templates carry a {} where the landmark goes, because the preposition
       comes before the noun in English and after it in Telugu and Hindi. */
    fill: function (key, value) {
      var pack = STR[current] || STR.en;
      var tpl = pack[key] !== undefined ? pack[key] : (STR.en[key] || '{}');
      return tpl.replace('{}', value);
    }
  };
})();
