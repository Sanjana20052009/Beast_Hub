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

    // Handle Challenge Submission Form
    const challengeForm = document.getElementById('challengeForm');
    if (challengeForm) {
        challengeForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const name = document.getElementById('userName').value;
            const category = document.getElementById('challengeCategory').value;

            alert(`🎉 Success, ${name}! Your proposal for "${category}" has been securely transmitted to the Beast Hub backend database.`);
            
            challengeForm.reset();
            switchView('journey');
        });
    }
});

// Video Modal Functions with Precise Video ID Routing
function openVideoModal(title, videoId) {
    const modal = document.getElementById('videoModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalIframe = document.getElementById('modalIframe');

    modalTitle.textContent = title;
    modalIframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
    modal.classList.add('active');
}

function closeVideoModal() {
    const modal = document.getElementById('videoModal');
    const modalIframe = document.getElementById('modalIframe');

    modalIframe.src = '';
    modal.classList.remove('active');
}

window.addEventListener('click', (e) => {
    const modal = document.getElementById('videoModal');
    if (e.target === modal) {
        closeVideoModal();
    }
});