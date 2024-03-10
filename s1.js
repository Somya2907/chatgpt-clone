const sidebar = document.querySelector("#sidebar");
const hide_sidebar = document.querySelector(".hide-sidebar");
const new_chat_button = document.querySelector(".new-chat");

hide_sidebar.addEventListener("click", function() {
    sidebar.classList.toggle("hidden");
});

const user_menu = document.querySelector(".user-menu ul");
const show_user_menu = document.querySelector(".user-menu button");

show_user_menu.addEventListener("click", function() {
    if (user_menu.classList.contains("show")) {
        user_menu.classList.toggle("show");
        setTimeout(function() {
            user_menu.classList.toggle("show-animate");
        }, 200);
    } else {
        user_menu.classList.toggle("show-animate");
        setTimeout(function() {
            user_menu.classList.toggle("show");
        }, 50);
    }
});

const models = document.querySelectorAll(".model-selector button");

for (const model of models) {
    model.addEventListener("click", function() {
        document.querySelector(".model-selector button.selected")?.classList.remove("selected");
        model.classList.add("selected");
    });
}

const message_box = document.querySelector("#message");

message_box.addEventListener("keyup", function() {
    message_box.style.height = "auto";
    let height = message_box.scrollHeight + 2;
    if (height > 200) {
        height = 200;
    }
    message_box.style.height = height + "px";
});

function show_view(view_selector) {
    document.querySelectorAll(".view").forEach(view => {
        view.style.display = "none";
    });

    document.querySelector(view_selector).style.display = "flex";
}

new_chat_button.addEventListener("click", function() {
    show_view(".new-chat-view");
});

document.querySelectorAll(".conversation-button").forEach(button => {
    button.addEventListener("click", function() {
        show_view(".conversation-view");
    });
});

// Speech Recognition

const micButtons = document.querySelectorAll('.mic-button');
const resultDiv = document.getElementById('message');
let recognition = new webkitSpeechRecognition();

recognition.lang = 'hi-IN'; // Hindi - India
recognition.continuous = false;
recognition.interimResults = true;

micButtons.forEach(button => {
    button.addEventListener('click', () => {
        if (button.textContent === 'रिकॉर्डिंग शुरू करें') {
            recognition.start();
            button.textContent = 'रिकॉर्डिंग बंद करें';
            resultDiv.textContent = 'सुन रहा है...';
        } else {
            recognition.stop();
            button.textContent = 'रिकॉर्डिंग शुरू करें';
        }
    });
});

recognition.onresult = function(event) {
    let interimTranscript = '';
    for (let i = event.resultIndex; i < event.results.length; ++i) {
        if (event.results[i].isFinal) {
            resultDiv.textContent = event.results[i][0].transcript;
        } else {
            interimTranscript += event.results[i][0].transcript;
        }
    }
};

recognition.onerror = function(event) {
    resultDiv.textContent = 'पहचान में त्रुटि हुई: ' + event.error;
};
