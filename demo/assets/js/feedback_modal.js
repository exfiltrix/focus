document.addEventListener('DOMContentLoaded', () => {
    const openFeedbackModalBtn = document.getElementById('openFeedbackModal');
    const feedbackModalOverlay = document.getElementById('feedbackModalOverlay');
    const closeFeedbackModalBtn = document.getElementById('closeFeedbackModal');
    const submitFeedbackBtn = feedbackModalOverlay.querySelector('.btn--primary'); // The submit button inside the modal
    const feedbackNameInput = document.getElementById('feedbackName'); // New: Name input field
    const feedbackTextarea = feedbackModalOverlay.querySelector('textarea');
    const testimonialsGrid = document.querySelector('.testimonials__grid');
    const starRatingInputs = feedbackModalOverlay.querySelectorAll('.star-rating input[type="radio"]');
    const starLabels = feedbackModalOverlay.querySelectorAll('.star-rating label');

    if (openFeedbackModalBtn && feedbackModalOverlay && closeFeedbackModalBtn && submitFeedbackBtn && feedbackNameInput && feedbackTextarea && testimonialsGrid) {
        openFeedbackModalBtn.addEventListener('click', () => {
            feedbackModalOverlay.style.display = 'flex';
            // Reset fields on opening
            feedbackNameInput.value = ''; // Reset name input
            feedbackTextarea.value = '';
            starRatingInputs.forEach(radio => radio.checked = false);
            starLabels.forEach(label => label.style.color = '#ccc');
        });

        closeFeedbackModalBtn.addEventListener('click', () => {
            feedbackModalOverlay.style.display = 'none';
        });

        feedbackModalOverlay.addEventListener('click', (event) => {
            if (event.target === feedbackModalOverlay) {
                feedbackModalOverlay.style.display = 'none';
            }
        });

        // Star rating interactivity
        starLabels.forEach(label => {
            label.addEventListener('click', () => {
                const value = label.previousElementSibling.value;
                starLabels.forEach(star => {
                    const starValue = star.previousElementSibling.value;
                    if (starValue <= value) {
                        star.style.color = '#ffc107'; // Gold color for selected stars
                    } else {
                        star.style.color = '#ccc'; // Grey for unselected stars
                    }
                });
            });
        });

        // Handle feedback submission
        submitFeedbackBtn.addEventListener('click', () => {
            const feedbackName = feedbackNameInput.value.trim(); // Get name
            const feedbackText = feedbackTextarea.value.trim();
            const selectedRating = feedbackModalOverlay.querySelector('.star-rating input[type="radio"]:checked');

            if (!feedbackText && !selectedRating) {
                alert('Пожалуйста, напишите отзыв или поставьте оценку.');
                return;
            }

            const ratingValue = selectedRating ? parseInt(selectedRating.value) : 0;
            const reviewerName = feedbackName || 'Анонимный Пользователь'; // Use name or default

            // Create a new testimonial card
            const newTestimonialCard = document.createElement('div');
            newTestimonialCard.classList.add('card', 'testimonial-card');

            let starsHtml = '';
            for (let i = 0; i < 5; i++) {
                starsHtml += `<span style="color: ${i < ratingValue ? '#ffc107' : '#ccc'};">&#9733;</span>`; // ★ character
            }

            const testimonialContent = `
                <div style="display: flex; justify-content: center; margin-bottom: 1rem;">${starsHtml}</div>
                <p class="card__content">"${feedbackText || 'Без текста отзыва'}"</p>
                <h4 class="ref-card" style="margin-top: 1rem; font-weight: 600;">${reviewerName}</h4>
            `;
            newTestimonialCard.innerHTML = testimonialContent;

            // Add the new testimonial to the grid
            if (testimonialsGrid) {
                testimonialsGrid.prepend(newTestimonialCard); // Add to the beginning
            }

            // Clear form and close modal
            feedbackNameInput.value = ''; // Clear name input
            feedbackTextarea.value = '';
            starRatingInputs.forEach(radio => radio.checked = false);
            starLabels.forEach(label => label.style.color = '#ccc');
            feedbackModalOverlay.style.display = 'none';

            alert('Спасибо за ваш отзыв! Он добавлен на страницу (только для текущей сессии).');
        });
    }
});