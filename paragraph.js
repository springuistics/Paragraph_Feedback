var user_input = "";
const SW4 = ["at the same time", "it turns out that", "for the purpose of", "on the other hand", "it should be noted", "in the case that", "can be seen by", "at the same time"];
const SW3 = ["wide range of","with respect to","to distinguish between","as explained by","this means that","it follows that","also known as","the difference between","on account of","in order to","the reason for","the reason why","in this respect","in spite of", "so as to", "factors of this", "a number of", "matter of fact", "in other words", "in respect to"];
const SW2 = ["in addition", "caused by", "for one", "in addition", "for instance", "for example", "regarded as", "seeing that", "leads to", "lead to", "leading to", "divided into", "fall into", "falls into", "falling into", "considered as", "this implies", "this suggests", "brings about", "bring about", "brought about", "bringing about", "due to", "based on", "so that", "such as", "into account", "points to", "point to", "pointing to", "pointed to", "points out", "point out", "pointing out", "pointed out", "refers to", "refer to", "regarded as"];
const SW1 = ["including", "include", "includes", "contrary", "illustrate", "illustrates", "exemplifies", "exemplify", "meaning", "misinterpret", "misinterprets", "misinterpreting", "because", "since", "therefore", "cause", "causes", "yield", "yields", "moreover", "futhermore", "however", "although", "nevertheless", "yet", "though", "either", "instead", "if", "without", "specifically", "additionally", "consequently"];


function Check() {
    var arg_cnt = 0;
    document.getElementById('alltheresults').style.display="block";
    user_input = document.getElementById('text_input').value;
    //set up array for checking
    let punct_count = 0;
    const punct = "!.?";
    for (let i= 0; i < user_input.length; i++){
        if(punct.includes(user_input[i])){
            punct_count++;
            };
        };
    let temp1 = user_input.toLowerCase();
    let temp2 = temp1.replace(/[.,\/#!$%\^&\*;:?{}=\-_`~()]/g,"");
    let temp3 = temp2.replace(/\s{2,}/g," ");
    var results1 = temp3.split(" ");
    var results = [];
    //splits up contractions into words
    function len(word, x) {let a = word.charAt(word.length + x); return a}
    results1.forEach(function(word){
        if (word == "i'm") {
            results.push("i");
            results.push("am");
        } else if (word=="won't") {
            results.push("will");
            results.push("not");
        } else if (len(word, -3 == "'re")) {
            results.push(word.slice(0,-3));
            results.push("are");
        } else if (len(word, -3) == "n't") {
            results.push(word.slice(0,-3));
            results.push("not");
        } else if (len(word, -3) == "'ve") {
            results.push(word.slice(0,-3));
            results.push("have");
        } else if (len(word, -3) == "'ll") {
            results.push(word.slice(0,-3));
            results.push("will");
        } else if (len(word, -2) == "'d") {
            results.push(word.slice(0,-2));
            results.push("would");
        } else if (len(word, -2) == "'s") {
            if (word == "here's" || word == "there's" || word == "he's" || word == "she's" || word == "it's" || word == "that's" || word == "this's") {
            results.push(word.slice(0,-2));
            results.push("is");
            }
        } else {results.push(word);}
    });
    //get data about argument counts
    var two_grams = [];
    var three_grams = [];
    var four_grams = [];
    results.forEach(function(word, index){
        let no_words = results.length;
        let checker = index + 1;
        if (checker < no_words){
            let n_word = word;
            let n2_word = results[index + 1];
            let my_gram = n_word.concat(' ', n2_word);
            two_grams.push(my_gram);
        }});
    results.forEach(function(word, index){
        let no_words = results.length;
        let checker = index + 2;
        if (checker < no_words){
            let n_word = word;
            let n2_word = results[index + 1];
            let n3_word = results[index + 2];
            let my_gram = n_word.concat(' ', n2_word, ' ', n3_word);
            three_grams.push(my_gram);
        }});
    results.forEach(function(word, index){
        let no_words = results.length;
        let checker = index + 3;
        if (checker < no_words){
            let n_word = word;
            let n2_word = results[index + 1];
            let n3_word = results[index + 2];
            let n4_word = results[index + 3];
            let my_gram = n_word.concat(' ', n2_word, ' ', n3_word, ' ', n4_word);
            four_grams.push(my_gram);
        }});
    four_grams.forEach(function(word){
        if (SW4.includes(word)){
            arg_cnt +=1;
        }
    });
    three_grams.forEach(function(word){
        if (SW3.includes(word)){
            arg_cnt +=1;
        }
    });
    two_grams.forEach(function(word){
        if (SW2.includes(word)){
            arg_cnt +=1;
        }
    });
    results.forEach(function(word){
        if (SW1.includes(word)){
            arg_cnt +=1;
        }
    });

    //get data about different words
    var n_words = results.length;
    var diff_words = [];

    results.forEach(function(word){
        //over-simplified attempt at lemmatizing
        var possible_lemma = "";
        const vowel = "aeiou";
        function len(word, x) {let a = word.charAt(word.length + x); return a}
        //lemmatize common irregular verbs
        if (word == "be" || word == "is" || word == "are" || word == "am" || word == "was" || word == "were" || word == "being" || word == "been") {
            possible_lemma = "be";
        } else if (word == "have" || word == "has" || word == "had") {
            possible_lemma = "have";
        } else if (word == "do" || word == "does" || word == "did" || word == "done") {
            possible_lemma = "do";
        } else if (word == "say" || word == "says" || word == "said" || word == "saying") {
            possible_lemma = "say";
        } else if (word == "goes" || word == "go" || word == "went" || word == "going" || word == "gone") {
            possible_lemma = "go";
        } else if (word == "get" || word == "gets" || word == "got" || word == "gotten" || word == "getting") {
            possible_lemma = "get";
        } else if (word == "make" || word == "makes" || word == "made" || word == "making") {
            possible_lemma = "make";
        } else if (word == "know" || word == "knows" || word == "knew" || word == "knowing" || word == "known") {
            possible_lemma = "know";
        } else if (word == "think" || word == "thinks" || word == "thought" || word == "thinking") {
            possible_lemma = "think";
        } else if (word == "take" || word == "takes" || word == "took" || word == "taken" || word == "taking") {
            possible_lemma = "take";
        } else if (word == "come" || word == "comes" || word == "came" || word == "coming") {
            possible_lemma = "come";
        }  else if (word == "find" || word == "finds" || word == "found" || word == "finding") {
            possible_lemma = "find";
        } else if (word == "give" || word == "gives" || word == "gave" || word == "given" || word == "giving") {
            possible_lemma = "give";
        } else if (word == "tell" || word == "tells" || word == "told" || word == "telling") {
            possible_lemma = "tell";
        } else if (word == "become" || word == "becomes" || word == "became" || word == "becoming") {
            possible_lemma = "become";
        } else if (word == "see" || word == "sees" || word == "saw" || word == "seen" || word == "seeing") {
            possible_lemma = "see";
        } else if (word == "show" || word == "shows" || word == "showed" || word == "shown" || word == "showing") {
            possible_lemma = "show";
        } else if (word == "leave" || word == "leaves" || word == "left" || word == "leaving") {
            possible_lemma = "leave";
        } else if (word == "bring" || word == "brings" || word == "brought" || word == "bringing") {
            possible_lemma = "bring";
        } else if (word == "keep" || word == "keeps" || word == "keft" || word == "keeping") {
            possible_lemma = "keep";
        } else if (word == "write" || word == "writes" || word == "written" || word == "wrote" || word == "writing") {
            possible_lemma = "write";
        } else if (word == "stand" || word == "stands" || word == "stood" || word == "standing") {
            possible_lemma = "stand";
        } else if (word == "understand" || word == "understands" || word == "understood" || word == "understanding") {
            possible_lemma = "understand";
        } else if (word == "speak" || word == "speaks" || word == "spoke" || word == "speaking" || word == "spoken") {
            possible_lemma = "speak";
        } else if (word == "buy" || word == "buys" || word == "bought" || word == "buying") {
            possible_lemma = "buy";
        } else if (word == "choose" || word == "chooses" || word == "chose" || word == "choosing" || word == "chosen") {
            possible_lemma = "choose";
        } 
        //lemmatize words with various common endings
          else if (word.endsWith('es')) {
            if (word.endsWith('es') && vowel.includes(len(word, -3))) {
            possible_lemma = word.slice(0, -2);
            } else if (word.endsWith('es') && len(word, -3) == "i") {
            possible_lemma = word.slice(0, -3) + "y";
            } else if (word.endsWith('es') && !vowel.includes(len(word, -3))) {
                if (len(word, -3) == len(word, -4)) {
                possible_lemma = word.slice(0, -3);
            }
         }
        } else if (word.endsWith('s')) {
                if (word.endsWith('s') && len(word, -2) == "s") {
                possible_lemma = word;
            }   else if (word.endsWith('s') && len(word, -2) == "i") {
                possible_lemma = word;
            }   else if (word.endsWith('s') && len(word, -2) == "'") {
                possible_lemma = word;
            }   else  {
                possible_lemma = word.slice(0, -1);
            }
        }
         else if (word.endsWith('er')) {
            if (len(word, -3) == len(word, -4)) {
                possible_lemma = word.slice(0, -3);
            } else if (len(word, -3) == "i") {
                possible_lemma = word.slice(0, -3) + "y";
            } else if (len(word, -3) == "u") {
                possible_lemma = word.slice(0, -1);
            } else if (!vowel.includes(len(word, -3)) && vowel.includes(len(word, -4))) {
                possible_lemma = word.slice(0, -1);
            }
        } else if (word.endsWith('est')) {
                if (len(word, -4) == len(word, -5)) {
                    possible_lemma = word.slice(0,-4);
                } else if (len(word, -4) == "i") {
                    possible_lemma = word.slice(0,-4) + "y";
                } else if (len(word, -4) == "u") {
                    possible_lemma = word.slice(0,-3);
                } else if (!vowel.includes(len(word, -4)) && !vowel.includes(len(word, -5))) {
                    possible_lemma = word.slice(0, -3);
                }
        } 
         else if (word.endsWith('ed')) {
                if (word == "red" || word == "led" || word == "bed" || word == "dead" || word == "shed" || word == "need" || word == "needed" || word == "weed") {
                    possible_lemma = word;
                } else if (len(word, -3) == "i") {
                    possible_lemma = word.slice(0,-3) + "y";
                } else if (len(word, -3) == "e") {
                    possible_lemma = word.slice(0,-2);
                } else if (len(word, -3) == len(word, -4)) {
                    possible_lemma = word.slice(0, -3);
                } else if (!vowel.includes(len(word, -3)) && !vowel.includes(len(word, -4))) {
                    possible_lemma = word.slice(0, -2);
                } else if (!vowel.includes(len(word, -3)) && vowel.includes(len(word, -4))) {
                    possible_lemma = word.slice(0, -1);
                }
        }     
         else if (word.endsWith('ing')) {
                if (word == "ring" || word == "king" || word == "sing" || word == "thing" || word == "wing" || word == "sling" || word == "swing" || word == "bring" || word == "spring" || word == "evening" || word == "string" || word == "during" || word == "ceiling") {
                    possible_lemma = word;
                } else if (word == "dying" || word == "lying" || word == "eying") {
                    possible_lemma = word.slice(0, -4) + "e";
                } else if (len(word, -4) == "y") {
                    possible_lemma = word.slice(0, -3);
                } else if (!vowel.includes(len(word, -4))) {
                    if (word == "mixing" || word == "waxing") {
                        possible_lemma = word.slice(0, -3);
                    } else if (vowel.includes(len(word, -5) && vowel.includes(len(word, -6)))) {
                        possible_lemma = word.slice(0, -3);
                    } else if (vowel.includes(len(word, -5))) {
                        possible_lemma = word.slice(0,-3) + "e";
                    } else if (len(word, -5) == "ll" || len(word, -5) == "rr") {
                        possible_lemma = word.slice(0, -3);
                    } else if (len(word, -5) == len(word, -4)) {
                        possible_lemma = word.slice(0,-4);
                    } else if (!vowel.includes(len(word, -5))) {
                        possible_lemma = word.slice(0, -3);
                    }
                }
                 else if (vowel.includes(len(word, -4)) && len(word, -4) == len(word, -5)) {
                    possible_lemma = word.slice(0,-3);
                }
        }
        else { possible_lemma = word;}

        if (!diff_words.includes(possible_lemma)){
            diff_words.push(possible_lemma);
        }
    });
    //process scores
    var ndw = diff_words.length;
    var cttr = 0;
    if (n_words > 0) {
        let cttr1 = ndw / ((2 * n_words) ** 0.5);
        cttr = cttr1.toFixed(2);
    }
    var mls = 0;
    if (punct_count > 0) {
        let mls1 = n_words / punct_count;
        mls = mls1.toFixed(2);
    }
    var argD = 0;
    if (punct_count > 0) {
        let argD1 = arg_cnt - (arg_cnt / punct_count);
        argD = argD1.toFixed(2);
    }

    //display charts
    var barColors = ["red", "blue", "green"];
    var xBars = ["Minimum Acceptable Length", "Your Text Length", "Good Length"];
    var yBars = [50, n_words, 100];
    new Chart("myLength", {type: "bar", data: {labels: xBars, datasets: [{backgroundColor: barColors, data: yBars, minBarLength: 20, label: 'Number of Words:'}]},options: {title: {display: true, text: "Length of Your Paragraph Versus Benchmarks"}}});
    var xVar = ["Minimum Variety Score", "Your Variety", "Good Variety Score"];
    var yVar = [3.5, cttr, 4.5];
    new Chart("myVariety", {type: "bar", data: {labels: xVar, datasets: [{backgroundColor: barColors, data: yVar, minBarLength: 20, label: 'Vocabulary Variety Score:'}]},options: {title: {display: true, text: "Amount of Your Vocabulary Variety Versus Benchmarks"}}});
    var xSent = ["Minimum Sentence Score", "Your Sentence Score", "Good Sentence Score"];
    var ySent = [10, mls, 18];
    new Chart("mySentence", {type: "bar", data: {labels: xSent, datasets: [{backgroundColor: barColors, data: ySent, minBarLength: 20, label: 'Sentence Length Score:'}]},options: {title: {display: true, text: "Average Length of Your Sentences Versus Benchmarks"}}});
    var xarg = ["Minimum Argument Score", "Your Argument Score", "Good Argument Score"];
    var yarg = [1, argD, 2];
    new Chart("myArg", {type: "bar", data: {labels: xarg, datasets: [{backgroundColor: barColors, data: yarg, minBarLength: 20, label: 'Argumentative Words and Phrases Score:'}]},options: {title: {display: true, text: "Argumentative Words and Phrases Score Versus Benchmarks"}}});

    //display advice
    final_results = "You wrote " + n_words + " words, " + ndw + " different words, and used " + arg_cnt + " argumentative words like those listed in Tale 1 of Chapter 11. Your variety score is: " + cttr + " , and your average sentence length is: " + mls + " words per sentence";
    document.getElementById('results').innerHTML = final_results;
    
    let advice_length = "";
    if (n_words < 50) {
        advice_length = "Your paragraph is much too short. Focus on writing more and don't worry about anything else right now.";
    } else if (n_words > 49 && n_words < 80) {
        advice_length = "Your paragraph is past the minimum number of words, but you can still benefit from writing more. Use the words in Table 1 of Chapter 11 to help you think of more evidence to include.";
    } else if (n_words > 79 && n_words < 116) {
        advice_length = "Your paragraph has a good number of words. Writing a little bit more can still help you, but you should now also start to consider variety and sentence length.";
    } else {
        advice_length = "Your paragraph is sufficiently long! Writing more than this probably won't help you. Now shift your focus to marking your evidence with proper vocabulary, using a wide range of vocabulary, and longer sentences.";
    }
    document.getElementById('length_advice').innerHTML = advice_length;

    let advice_arg = "";
    if (argD < 1) {
        advice_arg = "Your paragraph doesn't seem to have very much evidence and clarification. You probably need to provide more evidence for your ideas.";
    } else if (argD >= 1 && argD < 1.5) {
        advice_arg = "Your paragraph uses some evidence and clarification, but needs more. Try to give more evidence and clearly connect your evidence to your ideas by using evidence and clarification vocabulary such as the words and phrases found in Table 1 of Chapter 11.";
    } else if (argD >= 1.5 && argD < 2) {
        advice_arg = "Your paragraph seemst to have a good amount of evidence and clarification. You probably have enough evidence, but you should probably use even more vocabulary that marks evidence and clarification, such as those found in Table 1 of Chatper 11, to make your points clearer.";
    } else {
        advice_arg = "Your paragraph seems to have a lot of evidence that is clearly marked by evidence and clarification vocabulary! Now shift your focus to using a wide range of vocabulary and longer sentences.";
    }
    document.getElementById('arg_advice').innerHTML = advice_arg;

    let advice_variety = "";
    if (cttr < 3.5) {
        advice_variety = "You are repeating the same words far too much in your paragraph. Use synonyms and focus on rewording. Do not focus on sentence length yet.";
    } else if (cttr > 3.5 && cttr < 4.0) {
        advice_variety = "You have some variety in your vocabulary, but you are repeating the same words too often. Find synonyms or change the writing style. Consider using a wider variety of words from the tables in Chapters 10, 11, and 12."  ;
    } else if (cttr >= 4.0 && cttr < 4.7) {
        advice_variety = "Your paragraph has a good amount of vocabulary variety. However, you can still improve. Use a thesaurus to find synonymns, remember how to paraphrase and summarize (Chapter 2), and use a wide variety of the vocabulary and expressions in Pathways to Academic English (i.e., chapters 1, 2, 8, 10, 11, 12). ";
    } else {
        advice_variety = "You wrote with a lot of variety in your vocabulary. Good job!"
    }
    document.getElementById('variety_advice').innerHTML = advice_variety;

    let advice_sentence = "";
    if (mls < 10) {
        advice_sentence = "Your sentences are far too short on average. Use connecting words such as 'and,' 'but,' and 'because' to connect your sentences and ideas.";
    } else if (mls >= 10 && mls < 14) {
        advice_sentence = "Your sentences are somewhat complex, but you can still improve a lot in this area. Consider using dependent clauses, such as relative clauses, to add further explanation to ideas within some of your sentences."  ;
    } else if (mls >= 14 && mls < 18.1) {
        advice_sentence = "You have highly complex sentences, but you might be able to improve them further. Consider modifying more of your ideas with noun phrases, adjectives, and adverbs. ";
    } else {
        advice_sentence = "Your sentences are generally long and complex. Good job!"
    }
    document.getElementById('sentence_advice').innerHTML = advice_sentence;
};