var speech_recognition=window.webkitSpeechRecognition
var recognition=new speech_recognition();
function start(){
    document.getElementById("textbox").value="";
    recognition.start();
}
recognition.onresult=function(event){
    console.log(event);
    var content=event.results[0][0].transcript;
    console.log(content);
    document.getElementById("textbox").value=content;
    if(content=="take my selfie"){
        speak();
    }
    else{
        console.log("say 'take my selfie' to take your picture")
    }
}
function speak(){
    var synth=window.speechSynthesis;
    speechData="taking your selfie in 5 seconds";
    var utterance=new SpeechSynthesisUtterance(speechData);
    synth.speak(utterance);
    Webcam.attach(camera);
    setTimeout(function(){
        take_snapshot();
        save();
    }, 5000);
}
Webcam.set({
    width: 350,
    height: 300,
    image_format: 'png',
    png_quality: 90,
});
camera=document.getElementById("camera");
function take_snapshot(){
    Webcam.snap(function(data_URL){
        document.getElementById("result").innerHTML="<img id='new_image' src='"+data_URL+"'>";
    });
}
function save(){
    link=document.getElementById("link");
    img=document.getElementById("new_image").src;
    link.href=img;
    link.click();
}