var user_input = "";

function Check() {
    document.getElementById('alltheresults').style.display="block";
    user_input = document.getElementById('text_input').value;
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
    
    var n_words = results.length;
    var diff_words = [];

    results.forEach(function(word){
        //over-simplified attempt at lemmatizing
        var possible_lemma = "";
        const vowel = "aeiou";
        function len(word, x) {let a = word.charAt(word.length + x); return a}
        //lemmatize frequent verbs
        if (word == "be" || word == "is" || word == "are" || word == "am" || word == "was" || word == "were") {
            possible_lemma = "be";
        } else if (word == "have" || word == "has" || word == "had") {
            possible_lemma = "have";
        } else if (word == "do" || word == "does" || word == "did") {
            possible_lemma = "do";
        } else if (word == "say" || word == "says" || word == "said" || word == "saying") {
            possible_lemma = "say";
        } else if (word == "goes" || word == "go" || word == "went" || word == "going") {
            possible_lemma = "go";
        } else if (word == "get" || word == "gets" || word == "got" || word == "gotten" || word == "getting") {
            possible_lemma = "get";
        } else if (word == "make" || word == "makes" || word == "made" || word == "making") {
            possible_lemma = "make";
        } else if (word == "know" || word == "knows" || word == "knew" || word == "knowing") {
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
            }   else  {
                possible_lemma = word.slice(0, -1);
            }
        }
         else if (word.endsWith('er') && len(word, -3) == len(word, -4)) {
            possible_lemma = word.slice(0, -3);
        } else if (word.endsWith('est') && len(word, -4) == len(word, -5)) {
            possible_lemma = word.slice(0,-4);
        } else if (word.endsWith('ed') && len(word, -3) == "i") {
            possible_lemma = word.slice(0,-3) + "y";
        } else if (word.endsWith('ed') && len(word, -3) == len(word, -4)){
            possible_lemma = word.slice(0, -3);
        } else if (word.endsWith('ed') && !vowel.includes(len(word, -3)) && !vowel.includes(len(word, -4))) {
            possible_lemma = word.slice(0, -2);
        } else if (word.endsWith('ed') && !vowel.includes(len(word, -3)) && vowel.includes(len(word, -4))) {
            possible_lemma = word.slice(0, -1);
        } else if (word.endsWith('ing') && len(word, -4) == "y") {
            possible_lemma = word.slice(0, -3);
        } else if (word.endsWith('ing') && !vowel.includes(len(word, -4))) {
            if (vowel.includes(len(word, -5))) {
                possible_lemma = word.slice(0,-3) + "e";
            } else if (len(word, -5) == len(word, -4)) {
                possible_lemma = word.slice(0,-4);
            }
        } else if (word.endsWith('ing') && vowel.includes(len(word, -4)) && len(word, -4) == len(word, -5)) {
            possible_lemma = word.slice(0,-3);
        } else { possible_lemma = word;}

        if (!diff_words.includes(possible_lemma)){
            diff_words.push(possible_lemma);
        }
    });
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
    
    //display advice
    final_results = "You wrote " + n_words + " words, " + ndw + " different words, your variety score is: " + cttr + " , and your average sentence length is: " + mls + " words per sentence";
    document.getElementById('results').innerHTML = final_results;
    
    let advice_length = "";
    if (n_words < 50) {
        advice_length = "Your paragraph is much too short. Focus on writing more and don't worry about anything else right now.";
    } else if (n_words > 49 && n_words < 80) {
        advice_length = "Your paragraph is past the minimum number of words, but you can still benefit from writing more. Use the words in Table 1 of Chapter 11 to help you think of more evidence to include.";
    } else if (n_words > 79 && n_words < 116) {
        advice_length = "Your paragraph has a good number of words. Writing a little bit more can still help you, but you should now also start to consider variety and sentence length.";
    } else {
        advice_length = "Your paragraph is sufficiently long! Writing more than this probably won't help you. Now shift your focus to using a wide range of vocabulary and longer sentences.";
    }
    document.getElementById('length_advice').innerHTML = advice_length;

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