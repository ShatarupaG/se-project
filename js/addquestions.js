document.getElementById('submitButton').addEventListener('click', function () {
  window.location.href = 'startSurvey.html';
});

document.addEventListener('DOMContentLoaded', async function () {
  const form = document.querySelector('form');

  form.addEventListener('submit', async function (event) {
      event.preventDefault();
    try {
      const response = await fetch('http://localhost:3000/getDocumentCount');
      const { documentCount } = await response.json();

      // Get form data
      const question1 = document.getElementById('Question 1').value;
      const question2 = document.getElementById('Question 2').value;
      const question3 = document.getElementById('Question 3').value;
      const question4 = document.getElementById('Question 4').value;

      // Check if question exists
      if (!(question1 || question2 || question3 || question4)) {
        alert('There is not questions to add.');
        return;
      }

      async function sendQuestion(questionNumber, questionText,countObj) {
          const questionData = {
            questionNumber: questionNumber,
            questionText: questionText,
          };
          countObj.count++;

          return fetch('http://localhost:3000/addquestion', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(questionData),
          })
            .then(response => response.json())
            .then(data => {
              console.log(`Success for question ${questionNumber}:`, data);
            })
            .catch((error) => {
              console.error(`Error for question ${questionNumber}:`, error);
            });
        }
        const countObj = { count: documentCount };

        if (question1) {
          await sendQuestion(documentCount, question1, countObj);
        }

        if (question2) {
          await sendQuestion(documentCount, question2, countObj);
        }

        if (question3) {
          await sendQuestion(documentCount, question3, countObj);
        }

        if (question4) {
          await sendQuestion(documentCount, question4, countObj);
        }
    }catch (error) {
      console.error('Error:', error);
    }


  });
});
