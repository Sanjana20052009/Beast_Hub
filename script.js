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

    // Handle Challenge Submission Form via Formspree Backend
    const challengeForm = document.getElementById('fs-frm');
    if (challengeForm) {
        challengeForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const form = e.target;
            const data = new FormData(form);

            try {
                const response = await fetch(form.action, {
                    method: form.method,
                    body: data,
                    headers: {
                        'Accept': 'application/json'
                    }
                });

                if (response.ok) {
                    const name = document.getElementById('full-name').value;
                    alert(`🎉 Success, ${name}! Your proposal has been securely transmitted to the Beast Hub community vault.`);
                    challengeForm.reset();
                    switchView('journey');
                } else {
                    alert('❌ There was a problem submitting your form. Please try again later.');
                }
            } catch (error) {
                alert('❌ Network error. Please check your connection and try again.');
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