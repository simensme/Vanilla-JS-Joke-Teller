const button = document.getElementById('button');
const audio = document.getElementById('audio');
const audioElement = document.getElementById('audio')

// Disable & enable button
const toggleButton = () => {
    button.disabled = !button.disabled;
};

// Passing Joke to VoiceRSS API
const tellMe = yourJoke => {
    console.log('Tell me:', yourJoke);
    VoiceRSS.speech({
        key: '',
        src: yourJoke,
        hl: 'en-us',
        r: 0,
        c: 'mp3',
        f: '44khz_16bit_stereo',
        ssml: false
    });
};

// Retrieve Jokes from Jokes API
const getJokes = async () => {
    let joke = '';
    const APIURL = 'https://v2.jokeapi.dev/joke/Dark';
    try {
        const res = await fetch(APIURL);
        const data = await res.json();
        if (data.type == 'twopart') {
            joke = `${data.setup} ... ${data.delivery}`;
        } else {
            joke = data.joke;
        }
        // Text-to-speech
        tellMe(joke);
        // Disable Button
        toggleButton();
    } catch (err) {
        console.log('Jokes API error:', err);
    }
};

// Event listener
button.addEventListener('click', getJokes);
audioElement.addEventListener('ended', toggleButton);