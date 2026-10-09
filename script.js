document.addEventListener('DOMContentLoaded', () => {
    // Tab Switching Logic
    const navItems = document.querySelectorAll('[data-target]');
    const views = document.querySelectorAll('.view-section');

    function switchView(targetId) {
        views.forEach(view => {
            view.classList.remove('active');
        });

        const targetView = document.getElementById(targetId + '-view');
        if (targetView) {
            targetView.classList.add('active');
        }

        navItems.forEach(item => {
            if (item.getAttribute('data-target') === targetId) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
        });

        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = item.getAttribute('data-target');
            switchView(targetId);
        });
    });

    // Timeline Filter Buttons Logic
    const filterBtns = document.querySelectorAll('.filter-btn');
    const timelineRows = document.querySelectorAll('.timeline-row');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filter = btn.getAttribute('data-filter');

            timelineRows.forEach(row => {
                if (filter === 'all' || row.getAttribute('data-category') === filter) {
                    row.style.display = 'grid';
                } else {
                    row.style.display = 'none';
                }
            });
        });
    });

    // Handle Challenge Submission Form via Custom Render Backend
    const challengeForm = document.getElementById('challengeForm');
    if (challengeForm) {
        challengeForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const formData = {
                name: document.getElementById('full-name').value,
                email: document.getElementById('email-address').value,
                category: document.getElementById('challengeCategory').value,
                message: document.getElementById('message').value
            };

            try {
                const response = await fetch('https://beast-hub-backend.onrender.com/api/submit-challenge', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                    body: JSON.stringify(formData)
                });

                const result = await response.json();

                if (response.ok && result.success) {
                    alert(`🎉 Success, ${formData.name}! Your proposal has been securely saved to your custom server database.`);
                    challengeForm.reset();
                    switchView('journey');
                } else {
                    alert('❌ Server error: ' + (result.error || 'Please try again later.'));
                }
            } catch (error) {
                alert('❌ Network error. Could not connect to the backend server.');
            }
        });
    }
});

// Direct YouTube Launch Modal Functions
function openVideoModal(title, videoId) {
    const modal = document.getElementById('videoModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalYoutubeLink = document.getElementById('modalYoutubeLink');

    modalTitle.textContent = title;
    modalYoutubeLink.href = `https://www.youtube.com/watch?v=${videoId}`;
    modal.classList.add('active');
}

function closeVideoModal() {
    const modal = document.getElementById('videoModal');
    modal.classList.remove('active');
}

window.addEventListener('click', (e) => {
    const modal = document.getElementById('videoModal');
    if (e.target === modal) {
        closeVideoModal();
    }
});