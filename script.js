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

    // Attach click events to all buttons and nav links with data-target
    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = item.getAttribute('data-target');
            switchView(targetId);
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

// Video Modal Functions
function openVideoModal(title, videoUrl) {
    const modal = document.getElementById('videoModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalIframe = document.getElementById('modalIframe');

    modalTitle.textContent = title;
    modalIframe.src = videoUrl;
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