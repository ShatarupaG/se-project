document.addEventListener('DOMContentLoaded', async function () {

    async function getSessionUser() {
        try {
            const response = await fetch('http://localhost:3000/getSessionUser');
            const userData = await response.json();
            return userData;
        } catch (error) {
            console.error('Error fetching session user data:', error);
            return null;
        }
    }

    async function getSessionLastQuestionNumber() {
        try {
            const response = await fetch('http://localhost:3000/getSessionLastQuestionNumber');
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error fetching session lastQuestionNumber:', error);
            return null;
        }
    }

    await getSessionLastQuestionNumber();

    const questionTextContainer = document.getElementById('question-text');
    const saveButton = document.getElementById('saveBtn');
    const nextButton = document.getElementById('nextBtn');
    const radioOptions = document.querySelectorAll('input[name="decision"]');

    const user = await getSessionUser();
    console.log(user);

    const lastQuestionNumber = await getSessionLastQuestionNumber();
    console.log(lastQuestionNumber);

    let questionNumber = 1;

    async function fetchQuestion() {
        try {
            const response = await fetch(`http://localhost:3000/question?questionNumber=${questionNumber}`);
            const data = await response.json();
            questionTextContainer.textContent = data.questionText;
            saveButton.setAttribute('disabled', true);
            radioOptions.forEach(radioOption => {
                radioOption.checked = false;
            });

            // Check if it's the last question
            if (questionNumber === lastQuestionNumber.lastQuestionNum) {
                // Make the "Finish Survey" button visible
                document.getElementById('finishSurveyBtn').style.display = 'inline-block';
            } else {
                // Hide the "Finish Survey" button
                document.getElementById('finishSurveyBtn').style.display = 'none';
            }

        } catch (error) {
            console.error('Error fetching question:', error);
        }
    }

    fetchQuestion();

    radioOptions.forEach(radioOption => {
        radioOption.addEventListener('change', function () {
            saveButton.removeAttribute('disabled');
        });
    });

    saveButton.addEventListener('click', async function (event) {
        event.preventDefault();

        const selectedOption = document.querySelector('input[name="decision"]:checked');
        if (!selectedOption) {
            alert('Please select a response.');
            return;
        }

        const responseValue = selectedOption.value;

        const responseData = {
            userId: user._id,
            questionNumber,
            response: responseValue,
        };

        try {
            const response = await fetch('http://localhost:3000/saveResponse', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(responseData),
            });

            if (response.ok) {
                console.log('Response saved successfully.');
            } else {
                console.error('Failed to save response.');
            }
        } catch (error) {
            console.error('Error saving response:', error);
        }

        saveButton.setAttribute('disabled', true);
        if (questionNumber === lastQuestionNumber.lastQuestionNum) {
            
        } else {
            nextButton.removeAttribute('disabled');
        }
        
    });

    nextButton.addEventListener('click', function () {
        questionNumber++;
        fetchQuestion();
        nextButton.setAttribute('disabled', true);
    });
});
