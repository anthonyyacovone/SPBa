/*
-- Speeded Plausibility and Bias Adults: SPBa -- 
   By: Anthony Yacovone (10/16/18) 
   Built from the Toronto-Psycholinguistics-Experiments Template 

*/

// Determine the sequence of the experiment 
var shuffleSequence = seq("consent", "demo","instructions", "practice_instructions", 
    sepWith("sep", startsWith("repeat")), sepWith("sep", startsWith("norepeat")),
    // "test_instructions", 
    sepWith("sep", rshuffle(startsWith("spba"))));//, startsWith("fill"))), "exit"); //"debrief","exit");
    /*"practice", 
    "ready","normal","ready2","medium","ready3","fast","start",
    sepWith("sep", seq("drag")), 
    "next",
    sepWith("sep", startsWith("answer")))*/

// Define experiment-specific variables 
                                                                  // sets the list number in the Latin Square design
var practiceItemTypes = ["repeat_training1","repeat_training2","repeat_training3",
                         "norepeat_training1","norepeat_training2","norepeat_training3",];  // determines which items have the blue "practice" label 
var centerItems = true;                                                                     // centers the presentation of items (not necessary for this experiment)
var showProgressBar = false;

// Define the defaults for the controller in this experiment (no need for the DashedSentence, Acceptability and DashedAcceptabilty Judgments
var defaults = [
    "Separator", {
        transfer: 2000, //wait for 1000ms
          //other options: "keypress", "click"
        normalMessage: "Please get ready to listen to the next sentence.", //message to be displayed
        errorMessage: "Wrong. Please wait for the next sentence." //message to be displayed in red
    },

    "Message", {
        //"html" option is obligatory
        hideProgressBar: true,
        transfer: "click",
        countsForProgressBar: true,
    },

   
    "Question", {
        //"as" option is obligatory
        as: ["Yes", "No"],
        hasCorrect: true,
          //if a question has a correct answer,
            //keep it as the first element of the "as" option
        countsForProgressBar: true,

    },
  
    "Form", {
        //"html" option is obligatory
        hideProgressBar: false,
        continueOnReturn: true,
        saveReactionTime: true,
        countsForProgressBar: true,

    }, 
    
    "FlashSentence", {
        timeout: 1000,
    },
];



// Define the experimental stimuli, this includes both target and filler trials 

var items = [

    /*
    ===================
    SEPARATOR
    The pause needed between each item of the experiment
    ===================
    */


    //ends when key is press
    ["sep", "Message", {html: "<i>Are you ready to hear the sentence?</i>", transfer: 'click'}],


    
    ["consent", "Form", {consentRequired: true, continueMessage:"Click here to continue", html: {include: "harvard_consent_2018.html" }} ],
    ["demo", "Form", {consentRequired: true, continueMessage:"Click here to continue", html: {include: "harvard_demographics.html" }} ],
    ["debrief", "Form", {consentRequired: true, continueMessage:"Click here to continue", html: {include: "harvard_debrief.html" }} ],
    ["exit", "Form", {consentRequired: true, continueMessage:"Click here to continue", html: {include: "exit.html" }} ],
    ["instructions", "Form", {consentRequired: true, continueMessage:"Click here to continue", html: {include: "instructions1.html" }} ],
    ["practice_instructions", "Form", {consentRequired: true, continueMessage:"Click here to continue", html: {include: "instructions2.html" }} ],


    /*
    ===================
    INTRODUCTION
    Can include files for Questionnaires, consent forms etc...
    ===================
    */

    ["intro",                                                                     //name of controller for the sequence in the beginning
      "Form",                                                                     //type
      {html: { include: "example_intro.html" },                                   //obligatory option that includes a HTML file that is a questionnaire
      validators: {                                                               //age has to be a number
        age: function (s) { if (s.match(/^\d+$/)) return true; 
                            else return "Bad value for \u2018age\u2019"; }} } ], // alert message when the validator is violated

    
    ["ready", "Message", {html: "<center><b>INTRODUCTIONS:</b> Listen to incrementally faster audio and recall information</center>", transfer: 'keypress'}],

    
    /*
    ===================
    TRAINING: WITH REPEATS
    ===================
    */
    
    ["repeat_training1", "Message", {
      html: {
        include: 'sound_display.html'
      },
      transfer: 'click'
    },
     "Form", {html: 'What did you hear (type entire sentence)?: <input type="text" name="repeat1" class="obligatory" spellcheck="value">', 
      validators: {
        repeat1: function (s) { if (s.match(/[tT]he dragon eats a lot[.!?]?/)) return true;       // the input needs to be letters (at least 2)
                                else return "Bad value for \u2018this question\u2019";}}, }, ],
     
     ["repeat_training2", "Message", {
      html: {
        include: 'sound_display_med.html'
      },
      transfer: 'click'
    },
     "Form", {html: 'Who went to the store?: <input type="text" name="repeat2" class="obligatory" spellcheck="value">', 
      validators: {
        repeat2: function (s) { if (s.match(/[tT]he chicken from the city[.!?]?/)) return true;       // the input needs to be letters (at least 2)
                                else return "Bad value for \u2018this question\u2019";}}, }, ],

      
    ["repeat_training3", "Message", {
      html: {
        include: 'sound_display_fast.html'
      },
      transfer: 'click'
    },
     "Form", {html: 'What did Andrew visit?: <input type="text" name="repeat3" class="obligatory" spellcheck="value">', 
      validators: {
        repeat3: function (s) { if (s.match(/[tT]he elephant[.!?]?/)) return true;       // the input needs to be letters (at least 2) 
                                else return "Bad value for \u2018this question\u2019";}}, }, ],

    ["ready2", "Message", {html: "<center><b>INTRODUCTIONS:</b> Listen to incrementally faster audio and recall information</center>", transfer: 'keypress'}],

    /*
    ===================
    TRAINING: WITHOUT REPEATS
    ===================
    */
   
      ["norepeat_training1", "FlashSentence", {s: "3..."},"FlashSentence", {s: "2..."},"FlashSentence", {s: "1..."},
      "Message", {
      html: {
        include: 'sound_nodisplay.html'
      },
      transfer: 'click'
    },
     "Form", {html: 'What did Parker send the monkey?: <input type="text" name="norepeat1" class="obligatory" spellcheck="value">', 
      validators: {
        norepeat1: function (s) { if (s.match(/[aA] present[.!?]?/)) return true;       // the input needs to be letters (at least 2)
                                else return "Bad value for \u2018this question\u2019";}}, }, ],
     
     ["norepeat_training2", "FlashSentence", {s: "3..."},"FlashSentence", {s: "2..."},"FlashSentence", {s: "1..."},
     "Message", {
      html: {
        include: 'sound_nodisplay.html'
      },
      transfer: 'click'
    },
     "Form", {html: 'What did Sarah do before the giraffe\'s party?: <input type="text" name="norepeat2" class="obligatory" spellcheck="value">', 
      validators: {
        norepeat2: function (s) { if (s.match(/[uU]se a wrench to fix the [tT][vV][.!?]?/)) return true;       // the input needs to be letters (at least 2)
                                else return "Bad value for \u2018this question\u2019";}}, }, ],

      
    ["norepeat_training3", "FlashSentence", {s: "3..."},"FlashSentence", {s: "2..."},"FlashSentence", {s: "1..."},
    "Message", {
      html: {
        include: 'sound_nodisplay.html'
      },
      transfer: 'click'
    },
     "Form", {html: 'Who did Michael want to ask about the midterm?: <input type="text" name="norepeat3" class="obligatory" spellcheck="value">', 
      validators: {
        norepeat3: function (s) { if (s.match(/[tT]he rabbit from school[.!?]?/)) return true;       // the input needs to be letters (at least 2) 
                                else return "Bad value for \u2018this question\u2019";}}, }, ],

     
     /*
    ===================
    TEST PHASE: 
     
     SPBA: 
     HO = High Plausibility, Original Speed 
     HF = High Plausibility, Fast Speed 
     LO = Low Plausibility, Original Speed 
     LF = Low Plausibilityk, Fast Speed
     
     Fillers:
     fill-o = filler at original speed 
     fill-h = filler at fast speed
     
    ===================
    */
     
     // TARGET 1:
    
     [["spba-ho",1], "FlashSentence", {s: "3..."},"FlashSentence", {s: "2..."},"FlashSentence", {s: "1..."}, 
      "Message", {
      html: {
        include: 'sound_nodisplay.html'
      },
      transfer: 'click'
    },
     "Form", {html: 'Please write the sentence you just heard?: <input type="text" name="answer" class="obligatory" spellcheck="value">', 
      validators: {
        answer: function (s) { if (s.match(/^(([a-zA-Z]{2,})\s*)+$/)) return true;       // the input needs to be letters (at least 2)
                                else return "Bad value for \u2018this question\u2019";}}, }, ],
    
     [["spba-hf",1], "FlashSentence", {s: "3..."},"FlashSentence", {s: "2..."},"FlashSentence", {s: "1..."},
      "Message", {
      html: {
        include: 'sound_nodisplay.html'
      },
      transfer: 'click'
    },
     "Form", {html: 'Please write the sentence you just heard?: <input type="text" name="answer" class="obligatory" spellcheck="value">', 
      validators: {
        answer: function (s) { if (s.match(/^(([a-zA-Z]{2,})\s*)+$/)) return true;       // the input needs to be letters (at least 2)
                                else return "Bad value for \u2018this question\u2019";}}, }, ],

     [["spba-lo",1], "FlashSentence", {s: "3..."},"FlashSentence", {s: "2..."},"FlashSentence", {s: "1..."},
      "Message", {
      html: {
        include: 'sound_nodisplay.html'
      },
      transfer: 'click'
    },
     "Form", {html: 'Please write the sentence you just heard?: <input type="text" name="answer" class="obligatory" spellcheck="value">', 
      validators: {
        answer: function (s) { if (s.match(/^(([a-zA-Z]{2,})\s*)+$/)) return true;       // the input needs to be letters (at least 2)
                                else return "Bad value for \u2018this question\u2019";}}, }, ],

     [["spba-lf",1], "FlashSentence", {s: "3..."},"FlashSentence", {s: "2..."},"FlashSentence", {s: "1..."},
      "Message", {
      html: {
        include: 'sound_nodisplay.html'
      },
      transfer: 'click'
    },
     "Form", {html: 'Please write the sentence you just heard?: <input type="text" name="answer" class="obligatory" spellcheck="value">', 
      validators: {
        answer: function (s) { if (s.match(/^(([a-zA-Z]{2,})\s*)+$/)) return true;       // the input needs to be letters (at least 2)
                                else return "Bad value for \u2018this question\u2019";}}, }, ],

// TARGET 2:
    
     [["spba-ho",2], "FlashSentence", {s: "3..."},"FlashSentence", {s: "2..."},"FlashSentence", {s: "1..."},
      "Message", {
      html: {
        include: 'sound_nodisplay.html'
      },
      transfer: 'click'
    },
     "Form", {html: 'Please write the sentence you just heard?: <input type="text" name="answer" class="obligatory" spellcheck="value">', 
      validators: {
        answer: function (s) { if (s.match(/^(([a-zA-Z]{2,})\s*)+$/)) return true;       // the input needs to be letters (at least 2)
                                else return "Bad value for \u2018this question\u2019";}}, }, ],
    
     [["spba-hf",2], "FlashSentence", {s: "3..."},"FlashSentence", {s: "2..."},"FlashSentence", {s: "1..."},
      "Message", {
      html: {
        include: 'sound_nodisplay.html'
      },
      transfer: 'click'
    },
     "Form", {html: 'Please write the sentence you just heard?: <input type="text" name="answer" class="obligatory" spellcheck="value">', 
      validators: {
        answer: function (s) { if (s.match(/^(([a-zA-Z]{2,})\s*)+$/)) return true;       // the input needs to be letters (at least 2)
                                else return "Bad value for \u2018this question\u2019";}}, }, ],

     [["spba-lo",2], "FlashSentence", {s: "3..."},"FlashSentence", {s: "2..."},"FlashSentence", {s: "1..."},
      "Message", {
      html: {
        include: 'sound_nodisplay.html'
      },
      transfer: 'click'
    },
     "Form", {html: 'Please write the sentence you just heard?: <input type="text" name="answer" class="obligatory" spellcheck="value">', 
      validators: {
        answer: function (s) { if (s.match(/^(([a-zA-Z]{2,})\s*)+$/)) return true;       // the input needs to be letters (at least 2)
                                else return "Bad value for \u2018this question\u2019";}}, }, ],

     [["spba-lf",2], "FlashSentence", {s: "3..."},"FlashSentence", {s: "2..."},"FlashSentence", {s: "1..."},
      "Message", {
      html: {
        include: 'sound_nodisplay.html'
      },
      transfer: 'click'
    },
     "Form", {html: 'Please write the sentence you just heard?: <input type="text" name="answer" class="obligatory" spellcheck="value">', 
      validators: {
        answer: function (s) { if (s.match(/^(([a-zA-Z]{2,})\s*)+$/)) return true;       // the input needs to be letters (at least 2)
                                else return "Bad value for \u2018this question\u2019";}}, }, ],

// TARGET 3:
    
     [["spba-ho",3], "FlashSentence", {s: "3..."},"FlashSentence", {s: "2..."},"FlashSentence", {s: "1..."},
      "Message", {
      html: {
        include: 'sound_nodisplay.html'
      },
      transfer: 'click'
    },
     "Form", {html: 'Please write the sentence you just heard?: <input type="text" name="answer" class="obligatory" spellcheck="value">', 
      validators: {
        answer: function (s) { if (s.match(/^(([a-zA-Z]{2,})\s*)+$/)) return true;       // the input needs to be letters (at least 2)
                                else return "Bad value for \u2018this question\u2019";}}, }, ],
    
     [["spba-hf",3], "FlashSentence", {s: "3..."},"FlashSentence", {s: "2..."},"FlashSentence", {s: "1..."},
      "Message", {
      html: {
        include: 'sound_nodisplay.html'
      },
      transfer: 'click'
    },
     "Form", {html: 'Please write the sentence you just heard?: <input type="text" name="answer" class="obligatory" spellcheck="value">', 
      validators: {
        answer: function (s) { if (s.match(/^(([a-zA-Z]{2,})\s*)+$/)) return true;       // the input needs to be letters (at least 2)
                                else return "Bad value for \u2018this question\u2019";}}, }, ],

     [["spba-lo",3], "FlashSentence", {s: "3..."},"FlashSentence", {s: "2..."},"FlashSentence", {s: "1..."},
      "Message", {
      html: {
        include: 'sound_nodisplay.html'
      },
      transfer: 'click'
    },
     "Form", {html: 'Please write the sentence you just heard?: <input type="text" name="answer" class="obligatory" spellcheck="value">', 
      validators: {
        answer: function (s) { if (s.match(/^(([a-zA-Z]{2,})\s*)+$/)) return true;       // the input needs to be letters (at least 2)
                                else return "Bad value for \u2018this question\u2019";}}, }, ],

     [["spba-lf",3], "FlashSentence", {s: "3..."},"FlashSentence", {s: "2..."},"FlashSentence", {s: "1..."},
      "Message", {
      html: {
        include: 'sound_nodisplay.html'
      },
      transfer: 'click'
    },
     "Form", {html: 'Please write the sentence you just heard?: <input type="text" name="answer" class="obligatory" spellcheck="value">', 
      validators: {
        answer: function (s) { if (s.match(/^(([a-zA-Z]{2,})\s*)+$/)) return true;       // the input needs to be letters (at least 2)
                                else return "Bad value for \u2018this question\u2019";}}, }, ],

// TARGET 4:
    
     [["spba-ho",4], "FlashSentence", {s: "3..."},"FlashSentence", {s: "2..."},"FlashSentence", {s: "1..."},
      "Message", {
      html: {
        include: 'sound_nodisplay.html'
      },
      transfer: 'click'
    },
     "Form", {html: 'Please write the sentence you just heard?: <input type="text" name="answer" class="obligatory" spellcheck="value">', 
      validators: {
        answer: function (s) { if (s.match(/^(([a-zA-Z]{2,})\s*)+$/)) return true;       // the input needs to be letters (at least 2)
                                else return "Bad value for \u2018this question\u2019";}}, }, ],
    
     [["spba-hf",4], "FlashSentence", {s: "3..."},"FlashSentence", {s: "2..."},"FlashSentence", {s: "1..."},
      "Message", {
      html: {
        include: 'sound_nodisplay.html'
      },
      transfer: 'click'
    },
     "Form", {html: 'Please write the sentence you just heard?: <input type="text" name="answer" class="obligatory" spellcheck="value">', 
      validators: {
        answer: function (s) { if (s.match(/^(([a-zA-Z]{2,})\s*)+$/)) return true;       // the input needs to be letters (at least 2)
                                else return "Bad value for \u2018this question\u2019";}}, }, ],

     [["spba-lo",4], "FlashSentence", {s: "3..."},"FlashSentence", {s: "2..."},"FlashSentence", {s: "1..."},
      "Message", {
      html: {
        include: 'sound_nodisplay.html'
      },
      transfer: 'click'
    },
     "Form", {html: 'Please write the sentence you just heard?: <input type="text" name="answer" class="obligatory" spellcheck="value">', 
      validators: {
        answer: function (s) { if (s.match(/^(([a-zA-Z]{2,})\s*)+$/)) return true;       // the input needs to be letters (at least 2)
                                else return "Bad value for \u2018this question\u2019";}}, }, ],

     [["spba-lf",4], "FlashSentence", {s: "3..."},"FlashSentence", {s: "2..."},"FlashSentence", {s: "1..."},
      "Message", {
      html: {
        include: 'sound_nodisplay.html'
      },
      transfer: 'click'
    },
     "Form", {html: 'Please write the sentence you just heard?: <input type="text" name="answer" class="obligatory" spellcheck="value">', 
      validators: {
        answer: function (s) { if (s.match(/^(([a-zA-Z]{2,})\s*)+$/)) return true;       // the input needs to be letters (at least 2)
                                else return "Bad value for \u2018this question\u2019";}}, }, ],

// TARGET 5:
    
     [["spba-ho",5], "FlashSentence", {s: "3..."},"FlashSentence", {s: "2..."},"FlashSentence", {s: "1..."},
      "Message", {
      html: {
        include: 'sound_nodisplay.html'
      },
      transfer: 'click'
    },
     "Form", {html: 'Please write the sentence you just heard?: <input type="text" name="answer" class="obligatory" spellcheck="value">', 
      validators: {
        answer: function (s) { if (s.match(/^(([a-zA-Z]{2,})\s*)+$/)) return true;       // the input needs to be letters (at least 2)
                                else return "Bad value for \u2018this question\u2019";}}, }, ],
    
     [["spba-hf",5], "FlashSentence", {s: "3..."},"FlashSentence", {s: "2..."},"FlashSentence", {s: "1..."},
      "Message", {
      html: {
        include: 'sound_nodisplay.html'
      },
      transfer: 'click'
    },
     "Form", {html: 'Please write the sentence you just heard?: <input type="text" name="answer" class="obligatory" spellcheck="value">', 
      validators: {
        answer: function (s) { if (s.match(/^(([a-zA-Z]{2,})\s*)+$/)) return true;       // the input needs to be letters (at least 2)
                                else return "Bad value for \u2018this question\u2019";}}, }, ],

     [["spba-lo",5], "FlashSentence", {s: "3..."},"FlashSentence", {s: "2..."},"FlashSentence", {s: "1..."},
      "Message", {
      html: {
        include: 'sound_nodisplay.html'
      },
      transfer: 'click'
    },
     "Form", {html: 'Please write the sentence you just heard?: <input type="text" name="answer" class="obligatory" spellcheck="value">', 
      validators: {
        answer: function (s) { if (s.match(/^(([a-zA-Z]{2,})\s*)+$/)) return true;       // the input needs to be letters (at least 2)
                                else return "Bad value for \u2018this question\u2019";}}, }, ],

     [["spba-lf",5], "FlashSentence", {s: "3..."},"FlashSentence", {s: "2..."},"FlashSentence", {s: "1..."},
      "Message", {
      html: {
        include: 'sound_nodisplay.html'
      },
      transfer: 'click'
    },
     "Form", {html: 'Please write the sentence you just heard?: <input type="text" name="answer" class="obligatory" spellcheck="value">', 
      validators: {
        answer: function (s) { if (s.match(/^(([a-zA-Z]{2,})\s*)+$/)) return true;       // the input needs to be letters (at least 2)
                                else return "Bad value for \u2018this question\u2019";}}, }, ],

// TARGET 6:
    
     [["spba-ho",6], "FlashSentence", {s: "3..."},"FlashSentence", {s: "2..."},"FlashSentence", {s: "1..."},
      "Message", {
      html: {
        include: 'sound_nodisplay.html'
      },
      transfer: 'click'
    },
     "Form", {html: 'Please write the sentence you just heard?: <input type="text" name="answer" class="obligatory" spellcheck="value">', 
      validators: {
        answer: function (s) { if (s.match(/^(([a-zA-Z]{2,})\s*)+$/)) return true;       // the input needs to be letters (at least 2)
                                else return "Bad value for \u2018this question\u2019";}}, }, ],
    
     [["spba-hf",6], "FlashSentence", {s: "3..."},"FlashSentence", {s: "2..."},"FlashSentence", {s: "1..."},
      "Message", {
      html: {
        include: 'sound_nodisplay.html'
      },
      transfer: 'click'
    },
     "Form", {html: 'Please write the sentence you just heard?: <input type="text" name="answer" class="obligatory" spellcheck="value">', 
      validators: {
        answer: function (s) { if (s.match(/^(([a-zA-Z]{2,})\s*)+$/)) return true;       // the input needs to be letters (at least 2)
                                else return "Bad value for \u2018this question\u2019";}}, }, ],

     [["spba-lo",6], "FlashSentence", {s: "3..."},"FlashSentence", {s: "2..."},"FlashSentence", {s: "1..."},
      "Message", {
      html: {
        include: 'sound_nodisplay.html'
      },
      transfer: 'click'
    },
     "Form", {html: 'Please write the sentence you just heard?: <input type="text" name="answer" class="obligatory" spellcheck="value">', 
      validators: {
        answer: function (s) { if (s.match(/^(([a-zA-Z]{2,})\s*)+$/)) return true;       // the input needs to be letters (at least 2)
                                else return "Bad value for \u2018this question\u2019";}}, }, ],

     [["spba-lf",6], "FlashSentence", {s: "3..."},"FlashSentence", {s: "2..."},"FlashSentence", {s: "1..."},
      "Message", {
      html: {
        include: 'sound_nodisplay.html'
      },
      transfer: 'click'
    },
     "Form", {html: 'Please write the sentence you just heard?: <input type="text" name="answer" class="obligatory" spellcheck="value">', 
      validators: {
        answer: function (s) { if (s.match(/^(([a-zA-Z]{2,})\s*)+$/)) return true;       // the input needs to be letters (at least 2)
                                else return "Bad value for \u2018this question\u2019";}}, }, ],

    

// Filler 7:
    
     [["f-o",7], "FlashSentence", {s: "3..."},"FlashSentence", {s: "2..."},"FlashSentence", {s: "1..."},
      "Message", {
      html: {
        include: 'sound_nodisplay.html'
      },
      transfer: 'click'
    },
     "Form", {html: 'Please write the sentence you just heard?: <input type="text" name="answer" class="obligatory" spellcheck="value">', 
      validators: {
        answer: function (s) { if (s.match(/^(([a-zA-Z]{2,})\s*)+$/)) return true;       // the input needs to be letters (at least 2)
                                else return "Bad value for \u2018this question\u2019";}}, }, ],
    
     [["f-f",7], "FlashSentence", {s: "3..."},"FlashSentence", {s: "2..."},"FlashSentence", {s: "1..."},
      "Message", {
      html: {
        include: 'sound_nodisplay.html'
      },
      transfer: 'click'
    },
     "Form", {html: 'Please write the sentence you just heard?: <input type="text" name="answer" class="obligatory" spellcheck="value">', 
      validators: {
        answer: function (s) { if (s.match(/^(([a-zA-Z]{2,})\s*)+$/)) return true;       // the input needs to be letters (at least 2)
                                else return "Bad value for \u2018this question\u2019";}}, }, ],

// Filler 8:
    
     [["f-o",8], "FlashSentence", {s: "3..."},"FlashSentence", {s: "2..."},"FlashSentence", {s: "1..."},
      "Message", {
      html: {
        include: 'sound_nodisplay.html'
      },
      transfer: 'click'
    },
     "Form", {html: 'Please write the sentence you just heard?: <input type="text" name="answer" class="obligatory" spellcheck="value">', 
      validators: {
        answer: function (s) { if (s.match(/^(([a-zA-Z]{2,})\s*)+$/)) return true;       // the input needs to be letters (at least 2)
                                else return "Bad value for \u2018this question\u2019";}}, }, ],
    
     [["f-f",8], "FlashSentence", {s: "3..."},"FlashSentence", {s: "2..."},"FlashSentence", {s: "1..."},
      "Message", {
      html: {
        include: 'sound_nodisplay.html'
      },
      transfer: 'click'
    },
     "Form", {html: 'Please write the sentence you just heard?: <input type="text" name="answer" class="obligatory" spellcheck="value">', 
      validators: {
        answer: function (s) { if (s.match(/^(([a-zA-Z]{2,})\s*)+$/)) return true;       // the input needs to be letters (at least 2)
                                else return "Bad value for \u2018this question\u2019";}}, }, ],

// Filler 9:
    
     [["f-o",9], "FlashSentence", {s: "3..."},"FlashSentence", {s: "2..."},"FlashSentence", {s: "1..."},
      "Message", {
      html: {
        include: 'sound_nodisplay.html'
      },
      transfer: 'click'
    },
     "Form", {html: 'Please write the sentence you just heard?: <input type="text" name="answer" class="obligatory" spellcheck="value">', 
      validators: {
        answer: function (s) { if (s.match(/^(([a-zA-Z]{2,})\s*)+$/)) return true;       // the input needs to be letters (at least 2)
                                else return "Bad value for \u2018this question\u2019";}}, }, ],
    
     [["f-f",9], "FlashSentence", {s: "3..."},"FlashSentence", {s: "2..."},"FlashSentence", {s: "1..."},
      "Message", {
      html: {
        include: 'sound_nodisplay.html'
      },
      transfer: 'click'
    },
     "Form", {html: 'Please write the sentence you just heard?: <input type="text" name="answer" class="obligatory" spellcheck="value">', 
      validators: {
        answer: function (s) { if (s.match(/^(([a-zA-Z]{2,})\s*)+$/)) return true;       // the input needs to be letters (at least 2)
                                else return "Bad value for \u2018this question\u2019";}}, }, ],

// Filler 10:
    
     [["f-o",10], "FlashSentence", {s: "3..."},"FlashSentence", {s: "2..."},"FlashSentence", {s: "1..."},
      "Message", {
      html: {
        include: 'sound_nodisplay.html'
      },
      transfer: 'click'
    },
     "Form", {html: 'Please write the sentence you just heard?: <input type="text" name="answer" class="obligatory" spellcheck="value">', 
      validators: {
        answer: function (s) { if (s.match(/^(([a-zA-Z]{2,})\s*)+$/)) return true;       // the input needs to be letters (at least 2)
                                else return "Bad value for \u2018this question\u2019";}}, }, ],
    
     [["f-f",10], "FlashSentence", {s: "3..."},"FlashSentence", {s: "2..."},"FlashSentence", {s: "1..."},
      "Message", {
      html: {
        include: 'sound_nodisplay.html'
      },
      transfer: 'click'
    },
     "Form", {html: 'Please write the sentence you just heard?: <input type="text" name="answer" class="obligatory" spellcheck="value">', 
      validators: {
        answer: function (s) { if (s.match(/^(([a-zA-Z]{2,})\s*)+$/)) return true;       // the input needs to be letters (at least 2)
                                else return "Bad value for \u2018this question\u2019";}}, }, ],

// Filler 11:
    
     [["f-o",11], "FlashSentence", {s: "3..."},"FlashSentence", {s: "2..."},"FlashSentence", {s: "1..."},
      "Message", {
      html: {
        include: 'sound_nodisplay.html'
      },
      transfer: 'click'
    },
     "Form", {html: 'Please write the sentence you just heard?: <input type="text" name="answer" class="obligatory" spellcheck="value">', 
      validators: {
        answer: function (s) { if (s.match(/^(([a-zA-Z]{2,})\s*)+$/)) return true;       // the input needs to be letters (at least 2)
                                else return "Bad value for \u2018this question\u2019";}}, }, ],
    
     [["f-f",11], "FlashSentence", {s: "3..."},"FlashSentence", {s: "2..."},"FlashSentence", {s: "1..."},
      "Message", {
      html: {
        include: 'sound_nodisplay.html'
      },
      transfer: 'click'
    },
     "Form", {html: 'Please write the sentence you just heard?: <input type="text" name="answer" class="obligatory" spellcheck="value">', 
      validators: {
        answer: function (s) { if (s.match(/^(([a-zA-Z]{2,})\s*)+$/)) return true;       // the input needs to be letters (at least 2)
                                else return "Bad value for \u2018this question\u2019";}}, }, ],

// Filler 12:
    
     [["f-o",12], "FlashSentence", {s: "3..."},"FlashSentence", {s: "2..."},"FlashSentence", {s: "1..."},
      "Message", {
      html: {
        include: 'sound_nodisplay.html'
      },
      transfer: 'click'
    },
     "Form", {html: 'Please write the sentence you just heard?: <input type="text" name="answer" class="obligatory" spellcheck="value">', 
      validators: {
        answer: function (s) { if (s.match(/^(([a-zA-Z]{2,})\s*)+$/)) return true;       // the input needs to be letters (at least 2)
                                else return "Bad value for \u2018this question\u2019";}}, }, ],
    
     [["f-f",12], "FlashSentence", {s: "3..."},"FlashSentence", {s: "2..."},"FlashSentence", {s: "1..."},
      "Message", {
      html: {
        include: 'sound_nodisplay.html'
      },
      transfer: 'click'
    },
     "Form", {html: 'Please write the sentence you just heard?: <input type="text" name="answer" class="obligatory" spellcheck="value">', 
      validators: {
        answer: function (s) { if (s.match(/^(([a-zA-Z]{2,})\s*)+$/)) return true;       // the input needs to be letters (at least 2)
                                else return "Bad value for \u2018this question\u2019";}}, }, ],

// Filler 13:
    
     [["f-o",13], "FlashSentence", {s: "3..."},"FlashSentence", {s: "2..."},"FlashSentence", {s: "1..."},
      "Message", {
      html: {
        include: 'sound_nodisplay.html'
      },
      transfer: 'click'
    },
     "Form", {html: 'Please write the sentence you just heard?: <input type="text" name="answer" class="obligatory" spellcheck="value">', 
      validators: {
        answer: function (s) { if (s.match(/^(([a-zA-Z]{2,})\s*)+$/)) return true;       // the input needs to be letters (at least 2)
                                else return "Bad value for \u2018this question\u2019";}}, }, ],
    
     [["f-f",13], "FlashSentence", {s: "3..."},"FlashSentence", {s: "2..."},"FlashSentence", {s: "1..."},
      "Message", {
      html: {
        include: 'sound_nodisplay.html'
      },
      transfer: 'click'
    },
     "Form", {html: 'Please write the sentence you just heard?: <input type="text" name="answer" class="obligatory" spellcheck="value">', 
      validators: {
        answer: function (s) { if (s.match(/^(([a-zA-Z]{2,})\s*)+$/)) return true;       // the input needs to be letters (at least 2)
                                else return "Bad value for \u2018this question\u2019";}}, }, ],

// Filler 14:
    
     [["f-o",14], "FlashSentence", {s: "3..."},"FlashSentence", {s: "2..."},"FlashSentence", {s: "1..."},
      "Message", {
      html: {
        include: 'sound_nodisplay.html'
      },
      transfer: 'click'
    },
     "Form", {html: 'Please write the sentence you just heard?: <input type="text" name="answer" class="obligatory" spellcheck="value">', 
      validators: {
        answer: function (s) { if (s.match(/^(([a-zA-Z]{2,})\s*)+$/)) return true;       // the input needs to be letters (at least 2)
                                else return "Bad value for \u2018this question\u2019";}}, }, ],
    
     [["f-f",14], "FlashSentence", {s: "3..."},"FlashSentence", {s: "2..."},"FlashSentence", {s: "1..."},
      "Message", {
      html: {
        include: 'sound_nodisplay.html'
      },
      transfer: 'click'
    },
     "Form", {html: 'Please write the sentence you just heard?: <input type="text" name="answer" class="obligatory" spellcheck="value">', 
      validators: {
        answer: function (s) { if (s.match(/^(([a-zA-Z]{2,})\s*)+$/)) return true;       // the input needs to be letters (at least 2)
                                else return "Bad value for \u2018this question\u2019";}}, }, ],

// Filler 15:
    
     [["f-o",15], "FlashSentence", {s: "3..."},"FlashSentence", {s: "2..."},"FlashSentence", {s: "1..."},
      "Message", {
      html: {
        include: 'sound_nodisplay.html'
      },
      transfer: 'click'
    },
     "Form", {html: 'Please write the sentence you just heard?: <input type="text" name="answer" class="obligatory" spellcheck="value">', 
      validators: {
        answer: function (s) { if (s.match(/^(([a-zA-Z]{2,})\s*)+$/)) return true;       // the input needs to be letters (at least 2)
                                else return "Bad value for \u2018this question\u2019";}}, }, ],
    
     [["f-f",15], "FlashSentence", {s: "3..."},"FlashSentence", {s: "2..."},"FlashSentence", {s: "1..."},
      "Message", {
      html: {
        include: 'sound_nodisplay.html'
      },
      transfer: 'click'
    },
     "Form", {html: 'Please write the sentence you just heard?: <input type="text" name="answer" class="obligatory" spellcheck="value">', 
      validators: {
        answer: function (s) { if (s.match(/^(([a-zA-Z]{2,})\s*)+$/)) return true;       // the input needs to be letters (at least 2)
                                else return "Bad value for \u2018this question\u2019";}}, }, ],

// Filler 16:
    
     [["f-o",16], "FlashSentence", {s: "3..."},"FlashSentence", {s: "2..."},"FlashSentence", {s: "1..."},
      "Message", {
      html: {
        include: 'sound_nodisplay.html'
      },
      transfer: 'click'
    },
     "Form", {html: 'Please write the sentence you just heard?: <input type="text" name="answer" class="obligatory" spellcheck="value">', 
      validators: {
        answer: function (s) { if (s.match(/^(([a-zA-Z]{2,})\s*)+$/)) return true;       // the input needs to be letters (at least 2)
                                else return "Bad value for \u2018this question\u2019";}}, }, ],
    
     [["f-f",16], "FlashSentence", {s: "3..."},"FlashSentence", {s: "2..."},"FlashSentence", {s: "1..."},
      "Message", {
      html: {
        include: 'sound_nodisplay.html'
      },
      transfer: 'click'
    },
     "Form", {html: 'Please write the sentence you just heard?: <input type="text" name="answer" class="obligatory" spellcheck="value">', 
      validators: {
        answer: function (s) { if (s.match(/^(([a-zA-Z]{2,})\s*)+$/)) return true;       // the input needs to be letters (at least 2)
                                else return "Bad value for \u2018this question\u2019";}}, }, ],

// Filler 17:
    
     [["f-o",17], "FlashSentence", {s: "3..."},"FlashSentence", {s: "2..."},"FlashSentence", {s: "1..."},
      "Message", {
      html: {
        include: 'sound_nodisplay.html'
      },
      transfer: 'click'
    },
     "Form", {html: 'Please write the sentence you just heard?: <input type="text" name="answer" class="obligatory" spellcheck="value">', 
      validators: {
        answer: function (s) { if (s.match(/^(([a-zA-Z]{2,})\s*)+$/)) return true;       // the input needs to be letters (at least 2)
                                else return "Bad value for \u2018this question\u2019";}}, }, ],
    
     [["f-f",17], "FlashSentence", {s: "3..."},"FlashSentence", {s: "2..."},"FlashSentence", {s: "1..."},
      "Message", {
      html: {
        include: 'sound_nodisplay.html'
      },
      transfer: 'click'
    },
     "Form", {html: 'Please write the sentence you just heard?: <input type="text" name="answer" class="obligatory" spellcheck="value">', 
      validators: {
        answer: function (s) { if (s.match(/^(([a-zA-Z]{2,})\s*)+$/)) return true;       // the input needs to be letters (at least 2)
                                else return "Bad value for \u2018this question\u2019";}}, }, ],

// Filler 18:
    
     [["f-o",18], "FlashSentence", {s: "3..."},"FlashSentence", {s: "2..."},"FlashSentence", {s: "1..."},
      "Message", {
      html: {
        include: 'sound_nodisplay.html'
      },
      transfer: 'click'
    },
     "Form", {html: 'Please write the sentence you just heard?: <input type="text" name="answer" class="obligatory" spellcheck="value">', 
      validators: {
        answer: function (s) { if (s.match(/^(([a-zA-Z]{2,})\s*)+$/)) return true;       // the input needs to be letters (at least 2)
                                else return "Bad value for \u2018this question\u2019";}}, }, ],
    
     [["f-f",18], "FlashSentence", {s: "3..."},"FlashSentence", {s: "2..."},"FlashSentence", {s: "1..."},
      "Message", {
      html: {
        include: 'sound_nodisplay.html'
      },
      transfer: 'click'
    },
     "Form", {html: 'Please write the sentence you just heard?: <input type="text" name="answer" class="obligatory" spellcheck="value">', 
      validators: {
        answer: function (s) { if (s.match(/^(([a-zA-Z]{2,})\s*)+$/)) return true;       // the input needs to be letters (at least 2)
                                else return "Bad value for \u2018this question\u2019";}}, }, ],




    ];
