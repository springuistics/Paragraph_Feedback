var user_input = "";
const SW = ["at the same time", "it turn out that", "for the purpose of", "on the other hand", "it should be note", "in the case that", "can be see by", "at the same time", "wide range of","with respect to","to distinguish between","as explained by","this mean that","it follow that","also known as","the difference between","on account of","in order to","the reason for","the reason why","in this respect","in spite of", "so as to", "factor of this", "a number of", "matter of fact", "in other word", "in respect to", "in addition", "caused by", "for one", "in addition", "for instance", "for example", "regard as", "see that", "lead to", "divide into", "fall into", "consider as", "this imply", "this suggest", "bring about", "due to", "based on", "so that", "such as", "into account", "point to", "point out", "refer to", "include", "contrary", "illustrate", "exemplify", "misinterpret", "because", "since", "therefore", "cause", "yield", "moreover", "futhermore", "however", "although", "nevertheless", "yet", "though", "either", "instead", "if", "without", "specifically", "additionally", "consequently"];

function TimerSet(){
    document.getElementById('id01').style.display='block';
}

function OpenFB(){
    document.getElementById('get_feedback').style.display="block";
    document.getElementById('alltheresults').style.display="none";
    document.getElementById('timed_practice').style.display="none";
    document.getElementById('new_button_holder').style.display="none";
    document.getElementById('recheck_holder').style.display="none";
    document.getElementById('see_bun').style.display = "none";
    document.getElementById('see_bun').innerHTML = "Check feedback below:";
    StartTaskTimer();
}

function OpenTP(){
    document.getElementById('get_feedback').style.display="none";
    document.getElementById('alltheresults').style.display="none";
    document.getElementById('timed_practice').style.display="block";
    document.getElementById('new_button_holder').style.display="none";
    document.getElementById('recheck_holder').style.display="none";
    document.getElementById('see_bun').style.display = "none";
    document.getElementById('see_bun').innerHTML = "Check feedback below:";
    StartTaskTimer();
}

var the_counter = 900;
var Interval;
var old_results = {};
var timeKeep = 0;
var Interval2;
function StartTaskTimer(){
    clearInterval(Interval2);
    Interval2 = setInterval(keepTimeforActivity, 1000);
    function keepTimeforActivity(){
        timeKeep += 1;
    }
}
function StopTaskTimer(){
    clearInterval(Interval);
}


function TimerDoIt(){
    var min = document.getElementById('newmins').value;
    var sec = document.getElementById('newsecs').value;
    min = parseInt(min);
    sec = parseInt(sec);   
    if (isNaN(min)){
        min = 0;
    } 
    if (isNaN(sec)){
        sec = 0;
    }
    
    if (sec>= 60) {
        document.getElementById('time_err').innerHTML = "You cannot input more than 59 in the seconds block."
        document.getElementById('time_err').style.display = "block";
    } else if (min>=99) {
        document.getElementById('time_err').innerHTML = "You cannot input more than 99 in the minutes block."
        document.getElementById('time_err').style.display = "block";
    } else {
        the_counter = (min*60) + sec;
        if (sec <10 ) {
            sec = "0" + sec;
        } 
        document.getElementById('timer').innerHTML = min + " : " + sec;
        document.getElementById('id01').style.display='none';
    }
}

function StartTP(){
    document.getElementById('timerChanger').disabled = true;
    document.getElementById('text_input2').readOnly = false;
    document.getElementById('text_input2').style.background = "white";
    document.getElementById('text_input2').placeholder = "Write your paragraph here."
    var status = document.getElementById('start_button').innerHTML;
    if (status == "Start!"){
        document.getElementById('start_button').innerHTML = "Stop Early";
        document.getElementById('start_button').style.background="rgb(173, 1, 1)";
        //Handles the timer function.
        document.getElementById('timer').style.color = "white";
        clearInterval(Interval);
        Interval = setInterval(startTimer, 1000);
        //This function adds 0.1 seconds to the timer every 0.1 seconds. Its not actually starting the stopwatch itself.
        function startTimer(){
            the_counter -= 1;
            var the_thing = the_counter.toFixed(1);
            if (the_thing <=0) {
                //Stop the activity
                TimesUp();
            } else {
                if (the_thing <60) {
                    document.getElementById('timer').style.color = "red";
                }
                var minutes = Math.floor(the_thing / 60);
                var seconds = the_thing % 60;
                if (seconds <10) {
                    seconds = "0"+seconds;
                }
                document.getElementById('timer').innerHTML = minutes + " : " + seconds;
            }
            
        }
    } else if (status == "Stop Early") {
        document.getElementById('start_button').innerHTML = "Start!";
        document.getElementById('start_button').style.background="darkgreen";
        clearInterval(Interval);
        the_counter = 900;
        document.getElementById('timer').innerHTML = "15 : 00";
        TimesUp();
    }
    
}

function TimesUp(){
    clearInterval(Interval);
    document.getElementById('text_input2').readOnly = true;
    document.getElementById('text_input2').style.background = "lightskyblue";
    document.getElementById('see_bun').style.display = "block";
    document.getElementById('see_bun').innerHTML = "Check feedback below:";
    Check('text_input2', false);
    document.getElementById('new_button_holder').style.display="block";
    document.getElementById('timerChanger').disabled = false;
}

function Revise(){
    document.getElementById('new_button_holder').style.display="none";
    document.getElementById('recheck_holder').style.display="block";
    document.getElementById('see_bun').innerHTML = "Revise as much as you want, then push the 'Recheck and Compare' button";
    document.getElementById('text_input2').readOnly = false;
    document.getElementById('text_input2').style.background = "white";
}

function Reset(){
    document.getElementById('new_button_holder').style.display="none";
    document.getElementById('recheck_holder').style.display="none";
    document.getElementById('see_bun').style.display = "none";
    document.getElementById('see_bun').innerHTML = "Check feedback below:";
    old_results = {};
    document.getElementById('text_input2').readOnly = false;
    document.getElementById('text_input2').style.background = "lightskyblue";
    document.getElementById('text_input2').value = "";
    document.getElementById('text_input2').placeholder = "Push the 'Start!' button and then begin writing."
    document.getElementById('alltheresults').style.display="none";
}

function Check(text_input, is_comp) {
    document.getElementById('alltheresults').style.display="block";
    user_input = grabCleanText(text_input);
    let n_words = CountWords(user_input);
    //This if statement protects against students writing no or 1 words and creating problems for dumbNLP.
    if (n_words < 2){
        document.getElementById('sentence_advice').innerHTML = "Please write more than one word.";
    } else{
        let mls = CalculateMLS(user_input);
        let tempLemmaArray = Lemmatize(user_input);
        let theArgs = CheckForKeywordsAndPhrasesPreprocessed(tempLemmaArray, SW);
        let cttr = CalculateCTTRfromArray(false, tempLemmaArray);
        let NDW = DifferentWordsPreprocessed(tempLemmaArray);
        let ndw = NDW.NDW;
        let arg_cnt = theArgs.count;
        cttr = cttr.toFixed(2);
        mls = mls.toFixed(2);
        let compBoolean = 0;

        //Decide which section to plop them there results
        if (text_input == "text_input2" && is_comp == false){
            old_results = {"n_words": n_words, "ndw": ndw, "cttr": cttr, "mls": mls, "arg_cnt": arg_cnt};
        }
        if (is_comp == false){
            displayCharts(n_words, ndw, cttr, mls, arg_cnt);
            compBoolean = 0;
        } else if (is_comp == true){
            document.getElementById('new_button_holder').style.display="block";
            document.getElementById('recheck_holder').style.display="none";
            displayCompCharts(n_words, ndw, cttr, mls, arg_cnt);
            compBoolean = 1;
        }
    }
    


}

function displayCharts(n_words, ndw, cttr, mls, arg_cnt) {
    //delete old graphs and make the blank spaces
    if(document.getElementById('myLength')){
        document.getElementById('myLength').remove();
    }
    if(document.getElementById('myVariety')){
        document.getElementById('myVariety').remove();
    }
    if(document.getElementById('mySentence')){
        document.getElementById('mySentence').remove();
    }
    if(document.getElementById('myArg')){
        document.getElementById('myArg').remove();
    }
    let graphLength = document.createElement("canvas");
    graphLength.id="myLength";
    graphLength.className="losGraph";
    document.getElementById("length_graph").appendChild(graphLength);
    let graphVariety = document.createElement("canvas");
    graphVariety.id="myVariety";
    graphVariety.className="losGraph";
    document.getElementById("graph_container_variety").appendChild(graphVariety);
    let graphSentence = document.createElement("canvas");
    graphSentence.id="mySentence";
    graphSentence.className="losGraph";
    document.getElementById("graph_container_sentence").appendChild(graphSentence);
    let graphArg = document.createElement("canvas");
    graphArg.id="myArg";
    graphArg.className="losGraph";
    document.getElementById("arg_graph").appendChild(graphArg);

    //display charts
    var barColors = ["red", "blue", "green"];
    var xBars = ["Minimum Acceptable Length", "Your Text Length", "Good Length"];
    var yBars = [50, n_words, 110];
    new Chart("myLength", {type: "bar", data: {labels: xBars, datasets: [{backgroundColor: barColors, data: yBars, minBarLength: 20, label: 'Number of Words:'}]}, options: {scales: {y: {suggestedMin: 0}}, title: {display: true, text: "Length of Your Paragraph Versus Benchmarks"}}});
    var xVar = ["Minimum Variety Score", "Your Variety", "Good Variety Score"];
    var yVar = [3.9, cttr, 5];
    new Chart("myVariety", {type: "bar", data: {labels: xVar, datasets: [{backgroundColor: barColors, data: yVar, minBarLength: 20, label: 'Vocabulary Variety Score:'}]}, options: {scales: {y: {suggestedMin: 0}}, title: {display: true, text: "Amount of Your Vocabulary Variety Versus Benchmarks"}}});
    var xSent = ["Minimum Sentence Score", "Your Sentence Score", "Good Sentence Score"];
    var ySent = [10, mls, 20];
    new Chart("mySentence", {type: "bar", data: {labels: xSent, datasets: [{backgroundColor: barColors, data: ySent, minBarLength: 20, label: 'Sentence Length Score:'}]}, options: {scales: {y: {suggestedMin: 0}}, title: {display: true, text: "Average Length of Your Sentences Versus Benchmarks"}}});
    var xarg = ["Minimum Argument Score", "Your Argument Score", "Good Argument Score"];
    var yarg = [1, arg_cnt, 4];
    new Chart("myArg", {type: "bar", data: {labels: xarg, datasets: [{backgroundColor: barColors, data: yarg, minBarLength: 20, label: 'Argumentative Words and Phrases Score:'}]}, options: {scales: {y: {suggestedMin: 0}}, title: {display: true, text: "Argumentative Words and Phrases Score Versus Benchmarks"}}});

    //display advice
    final_results = "You wrote " + n_words + " words, " + ndw + " different words, and used " + arg_cnt + " argumentative words like those listed in Table 1 of Chapter 12. Your variety score is: " + cttr + " , and your average sentence length is: " + mls + " words per sentence";
    document.getElementById('results').innerHTML = final_results;
    
    let advice_length = "";
    if (n_words < 50) {
        advice_length = "Your paragraph is much too short. Focus on writing more and don't worry about anything else right now.";
    } else if (n_words > 49 && n_words < 100) {
        advice_length = "Your paragraph is past the minimum number of words, but you can still benefit from writing more. Use the words in Table 1 of Chapter 12 to help you think of more evidence to include.";
    } else if (n_words > 99 && n_words < 125) {
        advice_length = "Your paragraph has a good number of words. Writing a little bit more can still help you, but you should now also start to consider variety and sentence length.";
    } else {
        advice_length = "Your paragraph is sufficiently long! Writing more than this probably won't help you. Now shift your focus to marking your evidence with proper vocabulary, using a wide range of vocabulary, and longer sentences.";
    }
    document.getElementById('length_advice').innerHTML = advice_length;

    let advice_arg = "";
    if (arg_cnt < 1) {
        advice_arg = "Your paragraph doesn't seem to have very much evidence and clarification. You probably need to provide more evidence for your ideas.";
    } else if (arg_cnt >= 1 && arg_cnt < 3) {
        advice_arg = "Your paragraph uses some evidence and clarification, but needs more. Try to give more evidence and clearly connect your evidence to your ideas by using evidence and clarification vocabulary such as the words and phrases found in Table 1 of Chapter 12.";
    } else if (arg_cnt >= 3 && arg_cnt < 5) {
        advice_arg = "Your paragraph seemst to have a good amount of evidence and clarification. You probably have enough evidence, but you should probably use even more vocabulary that marks evidence and clarification, such as those found in Table 1 of Chatper 12, to make your points clearer.";
    } else {
        advice_arg = "Your paragraph seems to have a lot of evidence that is clearly marked by evidence and clarification vocabulary! Now shift your focus to using a wide range of vocabulary and longer sentences.";
    }
    document.getElementById('arg_advice').innerHTML = advice_arg;

    let advice_variety = "";
    if (cttr < 3.9) {
        advice_variety = "You are repeating the same words far too much in your paragraph. Use synonyms and focus on rewording. Do not focus on sentence length yet.";
    } else if (cttr >= 3.9 && cttr < 4.4) {
        advice_variety = "You have some variety in your vocabulary, but you are repeating the same words too often. Find synonyms or change the writing style. Consider using a wider variety of words from the tables in Chapters 10, 11, and 12."  ;
    } else if (cttr >= 4.4 && cttr < 4.8) {
        advice_variety = "Your paragraph has a good amount of vocabulary variety. However, you can still improve. Use a thesaurus to find synonymns, remember how to paraphrase and summarize (Chapter 2), and use a wide variety of the vocabulary and expressions in Pathways to Academic English (i.e., chapters 1, 2, 8, 10, 11, 12). ";
    } else {
        advice_variety = "You wrote with a lot of variety in your vocabulary. Good job!"
    }
    document.getElementById('variety_advice').innerHTML = advice_variety;

    let advice_sentence = "";
    if (mls < 10) {
        advice_sentence = "Your sentences are far too short on average. Use connecting words such as 'and,' 'but,' and 'because' to connect your sentences and ideas.";
    } else if (mls >= 10 && mls < 15) {
        advice_sentence = "Your sentences are somewhat complex, but you can still improve a lot in this area. Consider using dependent clauses, such as relative clauses, to add further explanation to ideas within some of your sentences."  ;
    } else if (mls >= 15 && mls < 20) {
        advice_sentence = "You have highly complex sentences, but you might be able to improve them further. Consider modifying more of your ideas with noun phrases, adjectives, and adverbs. ";
    } else {
        advice_sentence = "Your sentences are generally long and complex. Good job!"
    }
    document.getElementById('sentence_advice').innerHTML = advice_sentence;
};

function displayCompCharts(n_words, ndw, cttr, mls, arg_cnt){
    //delete old graphs and make the blank spaces
    if(document.getElementById('myLength')){
        document.getElementById('myLength').remove();
    }
    if(document.getElementById('myVariety')){
        document.getElementById('myVariety').remove();
    }
    if(document.getElementById('mySentence')){
        document.getElementById('mySentence').remove();
    }
    if(document.getElementById('myArg')){
        document.getElementById('myArg').remove();
    }
    let graphLength = document.createElement("canvas");
    graphLength.id="myLength";
    graphLength.className="losGraph";
    document.getElementById("length_graph").appendChild(graphLength);
    let graphVariety = document.createElement("canvas");
    graphVariety.id="myVariety";
    graphVariety.className="losGraph";
    document.getElementById("graph_container_variety").appendChild(graphVariety);
    let graphSentence = document.createElement("canvas");
    graphSentence.id="mySentence";
    graphSentence.className="losGraph";
    document.getElementById("graph_container_sentence").appendChild(graphSentence);
    let graphArg = document.createElement("canvas");
    graphArg.id="myArg";
    graphArg.className="losGraph";
    document.getElementById("arg_graph").appendChild(graphArg);

    //actually make them graphs
    var barColors = ["red", "blue", "purple", "green"];
    var xBars = ["Minimum Acceptable Length", "Old Text Length", "New Text Length", "Good Length"];
    var yBars = [50, old_results.n_words, n_words, 110];
    new Chart("myLength", {type: "bar", data: {labels: xBars, datasets: [{backgroundColor: barColors, data: yBars, minBarLength: 20, label: 'Number of Words:'}]}, options: {scales: {y: {suggestedMin: 0}}, title: {display: true, text: "Length of Your Paragraph Versus Benchmarks"}}});
    var xVar = ["Minimum Variety Score", "Old Variety", "New Variety", "Good Variety Score"];
    var yVar = [3.9, old_results.cttr, cttr, 5];
    new Chart("myVariety", {type: "bar", data: {labels: xVar, datasets: [{backgroundColor: barColors, data: yVar, minBarLength: 20, label: 'Vocabulary Variety Score:'}]}, options: {scales: {y: {suggestedMin: 0}}, title: {display: true, text: "Amount of Your Vocabulary Variety Versus Benchmarks"}}});
    var xSent = ["Minimum Sentence Score", "Old Sentence Score", "New Sentence Score", "Good Sentence Score"];
    var ySent = [10, old_results.mls, mls, 20];
    new Chart("mySentence", {type: "bar", data: {labels: xSent, datasets: [{backgroundColor: barColors, data: ySent, minBarLength: 20, label: 'Sentence Length Score:'}]}, options: {scales: {y: {suggestedMin: 0}}, title: {display: true, text: "Average Length of Your Sentences Versus Benchmarks"}}});
    var xarg = ["Minimum Argument Score", "Old Argument Score", "New Argument Score", "Good Argument Score"];
    var yarg = [1, old_results.arg_cnt, arg_cnt, 4];
    new Chart("myArg", {type: "bar", data: {labels: xarg, datasets: [{backgroundColor: barColors, data: yarg, minBarLength: 20, label: 'Argumentative Words and Phrases Score:'}]}, options: {scales: {y: {suggestedMin: 0}}, title: {display: true, text: "Argumentative Words and Phrases Score Versus Benchmarks"}}});

    //display advice
    var word_comp = n_words - old_results.n_words;
    var f_word_comp;
    if (word_comp > 0) {
        f_word_comp = "You wrote " + word_comp + " more words than last time. <br>";
    } else if (word_comp < 0 ) {
        f_word_comp = "You wrote " + Math.abs(word_comp) + " fewer words than last time. <br>";
    } else {f_word_comp = "You wrote the same number of words as last time. <br>";}
    var ndw_comp = ndw - old_results.ndw;
    var f_ndw_comp;
    if (ndw_comp > 0) {
        f_ndw_comp = "You wrote " + ndw_comp + " more unique words than last time. <br>";
    } else if (ndw_comp < 0 ) {
        f_ndw_comp = "You wrote " + Math.abs(ndw_comp) + " fewer unique words than last time. <br>";
    } else {f_ndw_comp = "You wrote the same number of unique words as last time. <br>";}
    var arg_comp = arg_cnt - old_results.arg_cnt;
    var f_arg_comp;
    if (arg_comp > 0) {
        f_arg_comp = "You wrote " + arg_comp + " more supporting detail markers than last time. <br>";
    } else if (arg_comp < 0 ) {
        f_arg_comp = "You wrote " + Math.abs(arg_comp) + " fewer supporting detail markers than last time. <br>";
    } else {f_arg_comp = "You wrote the same number of supporting detail markers as last time. <br>";}
    var mls_comp = mls - old_results.mls;
    var f_mls_comp;
    if (mls_comp > 0) {
        f_mls_comp = "You wrote an average of " + mls_comp + " more words per sentence than last time. <br>";
    } else if (mls_comp < 0 ) {
        f_mls_comp = "You wrote an average of " + Math.abs(mls_comp) + " fewer words per sentence than last time. <br>";
    } else {f_mls_comp = "On average, you wrote the same number of words per sentence as last time. <br>";}
    
    final_results = f_word_comp + f_ndw_comp + f_arg_comp + f_mls_comp;
    document.getElementById('results').innerHTML = final_results;
    
    let advice_length = "";
    if (n_words < 50) {
        advice_length = "Your paragraph is much too short. Focus on writing more and don't worry about anything else right now.";
    } else if (n_words > 49 && n_words < 100) {
        advice_length = "Your paragraph is past the minimum number of words, but you can still benefit from writing more. Use the words in Table 1 of Chapter 12 to help you think of more evidence to include.";
    } else if (n_words > 99 && n_words < 125) {
        advice_length = "Your paragraph has a good number of words. Writing a little bit more can still help you, but you should now also start to consider variety and sentence length.";
    } else {
        advice_length = "Your paragraph is sufficiently long! Writing more than this probably won't help you. Now shift your focus to marking your evidence with proper vocabulary, using a wide range of vocabulary, and longer sentences.";
    }
    document.getElementById('length_advice').innerHTML = advice_length;

    let advice_arg = "";
    if (arg_cnt < 1) {
        advice_arg = "Your paragraph doesn't seem to have very much evidence and clarification. You probably need to provide more evidence for your ideas.";
    } else if (arg_cnt >= 1 && arg_cnt < 3) {
        advice_arg = "Your paragraph uses some evidence and clarification, but needs more. Try to give more evidence and clearly connect your evidence to your ideas by using evidence and clarification vocabulary such as the words and phrases found in Table 1 of Chapter 12.";
    } else if (arg_cnt >= 3 && arg_cnt < 5) {
        advice_arg = "Your paragraph seemst to have a good amount of evidence and clarification. You probably have enough evidence, but you should probably use even more vocabulary that marks evidence and clarification, such as those found in Table 1 of Chatper 12, to make your points clearer.";
    } else {
        advice_arg = "Your paragraph seems to have a lot of evidence that is clearly marked by evidence and clarification vocabulary! Now shift your focus to using a wide range of vocabulary and longer sentences.";
    }
    document.getElementById('arg_advice').innerHTML = advice_arg;

    let advice_variety = "";
    if (cttr < 3.9) {
        advice_variety = "You are repeating the same words far too much in your paragraph. Use synonyms and focus on rewording. Do not focus on sentence length yet.";
    } else if (cttr >= 3.9 && cttr < 4.4) {
        advice_variety = "You have some variety in your vocabulary, but you are repeating the same words too often. Find synonyms or change the writing style. Consider using a wider variety of words from the tables in Chapters 10, 11, and 12."  ;
    } else if (cttr >= 4.4 && cttr < 4.8) {
        advice_variety = "Your paragraph has a good amount of vocabulary variety. However, you can still improve. Use a thesaurus to find synonymns, remember how to paraphrase and summarize (Chapter 2), and use a wide variety of the vocabulary and expressions in Pathways to Academic English (i.e., chapters 1, 2, 8, 10, 11, 12). ";
    } else {
        advice_variety = "You wrote with a lot of variety in your vocabulary. Good job!"
    }
    document.getElementById('variety_advice').innerHTML = advice_variety;

    let advice_sentence = "";
    if (mls < 10) {
        advice_sentence = "Your sentences are far too short on average. Use connecting words such as 'and,' 'but,' and 'because' to connect your sentences and ideas.";
    } else if (mls >= 10 && mls < 15) {
        advice_sentence = "Your sentences are somewhat complex, but you can still improve a lot in this area. Consider using dependent clauses, such as relative clauses, to add further explanation to ideas within some of your sentences."  ;
    } else if (mls >= 15 && mls < 20) {
        advice_sentence = "You have highly complex sentences, but you might be able to improve them further. Consider modifying more of your ideas with noun phrases, adjectives, and adverbs. ";
    } else {
        advice_sentence = "Your sentences are generally long and complex. Good job!"
    }
    document.getElementById('sentence_advice').innerHTML = advice_sentence;
}