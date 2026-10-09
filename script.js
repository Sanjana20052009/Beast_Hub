document.addEventListener('DOMContentLoaded', () => {
    // Tab Switching Logic
    const navItems = document.querySelectorAll('[data-target]');
    const views = document.querySelectorAll('.view-section');

    function switchView(targetId) {
        // Hide all views
        views.forEach(view => {
            view.classList.remove('active');
        });

        // Show target view
        const targetView = document.getElementById(targetId + '-view');
        if (targetView) {
            targetView.classList.add('active');
        }

        // Update active nav styling
        navItems.forEach(item => {
            if (item.getAttribute('data-target') === targetId) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
        });

        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    // Attach click event listeners to all elements with data-target
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
            const email = document.getElementById('userEmail').value;
            const category = document.getElementById('challengeCategory').value;
            const description = document.getElementById('challengeDesc').value;

            // Log captured data (Simulating backend submission)
            console.log('Challenge Submission Captured:', { name, email, category, description });

            alert(`🎉 Success, ${name}! Your challenge proposal has been submitted to the Beast Hub production backend.`);
            
            challengeForm.reset();
            switchView('challenges');
        });
    }
});